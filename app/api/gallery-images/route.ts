import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_EXTS = ['.mp4', '.mov', '.webm'];

export async function GET() {
  const dir = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(dir);

  const photos = files
    .filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => ({ src: `/images/${f}`, alt: 'Bergen Celloforeningen' }));

  const videos = files
    .filter(f => VIDEO_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => ({ src: `/images/${f}` }));

  return NextResponse.json({ photos, videos });
}