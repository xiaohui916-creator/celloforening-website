'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './EventsCarousel.module.css';

type Photo = { src: string; alt: string };
type Video = { src: string };

export default function EventsCarousel() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 自动从文件夹读取
  useEffect(() => {
    fetch('/api/gallery-images')
      .then(res => res.json())
      .then(data => {
        if (data.photos?.length) setPhotos(data.photos);
        if (data.videos?.length) setVideos(data.videos);
      });
  }, []);

  // 图片自动轮播
  useEffect(() => {
    if (photos.length === 0) return;
    const timer = setInterval(() => {
      setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos]);

  if (photos.length === 0 && videos.length === 0) return null;

  return (
    <section id="aktiviteter" className={styles.section}>
      <div className={styles.container}>
        <div style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}>

          {/* 左边：图片自动轮播 */}
          {photos.length > 0 && (
            <div style={{ flex: 1, position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '1rem' }}>
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${photo.src}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: i === currentPhotoIndex ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                  role="img"
                  aria-label={photo.alt}
                />
              ))}
            </div>
          )}

          {/* 右边：视频轮播 */}
{videos.length > 0 && (
  <div style={{ flex: 1, aspectRatio: '16/9', position: 'relative', borderRadius: '1rem' }}>
    <video
      key={videos[currentVideoIndex].src}
      src={videos[currentVideoIndex].src}
      autoPlay
      muted
      controls
      playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }}
      onEnded={() => setCurrentVideoIndex(prev => (prev + 1) % videos.length)}
    />
    {videos.length > 1 && (
      <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        <button
          onClick={() => setCurrentVideoIndex(prev => (prev - 1 + videos.length) % videos.length)}
          style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '2.2rem', height: '2.2rem', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >‹</button>
        <button
          onClick={() => setCurrentVideoIndex(prev => (prev + 1) % videos.length)}
          style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '2.2rem', height: '2.2rem', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >›</button>
      </div>
    )}
  </div>
)}

        </div>
      </div>
    </section>
  );
}