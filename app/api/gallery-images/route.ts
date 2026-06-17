import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTS = ['.mp4', '.mov', '.webm'];

function fileNameToLabel(filename: string): string {
  const name = path.basename(filename, path.extname(filename));
  const words = name.replace(/[-_]/g, ' ').split(' ');
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function GET() {
  const dir = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(dir);

  const photos = files
    .filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => ({ src: `/images/${f}`, alt: fileNameToLabel(f) }));

  const videos = files
    .filter(f => VIDEO_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => ({ src: `/images/${f}`, alt: fileNameToLabel(f) }));

  return NextResponse.json({ photos, videos });
}