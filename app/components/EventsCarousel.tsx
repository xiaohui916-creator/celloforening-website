'use client';

import { useEffect, useState } from 'react';
import styles from './EventsCarousel.module.css';

type Photo = { src: string; alt: string };

export default function EventsCarousel() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetch('/api/gallery-images')
      .then(res => res.json())
      .then(data => {
        if (data.photos?.length) setPhotos(data.photos);
      });
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    const timer = setInterval(() => {
      setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section id="aktiviteter" className={styles.section}>
      <div className={styles.container}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Tilbakeblikk</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
          Bilder og minner fra tidligere aktiviteter
        </p>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            overflow: 'hidden',
            borderRadius: '1rem',
          }}>
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
                  filter: 'blur(1.5px) brightness(0.92)',
                }}
                role="img"
                aria-label={photo.alt}
              />
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            fontSize: '0.9rem',
            color: '#666',
            fontStyle: 'italic',
            minHeight: '1.4em',
          }}>
            {photos[currentPhotoIndex]?.alt}
          </p>
        </div>

      </div>
    </section>
  );
}