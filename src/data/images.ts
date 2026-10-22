// Static image require map — no dynamic require() allowed
// Add new entries here when real images are added to assets/images/

const images = {
  'logo.png': require('../../assets/images/logo.png'),
  'hero.jpg': require('../../assets/hero.webp'),
  'gallery-1.jpg': require('../../assets/hackathon img/download (1).webp'),
  'gallery-2.jpg': require('../../assets/hackathon img/download (2).webp'),
  'gallery-3.jpg': require('../../assets/hackathon img/download (3).webp'),
  'gallery-4.jpg': require('../../assets/hackathon img/download (4).webp'),
  'gallery-5.jpg': require('../../assets/hackathon img/download (5).webp'),
  'gallery-6.jpg': require('../../assets/hackathon img/download (6).webp'),
  'gallery-7.jpg': require('../../assets/hackathon img/download (7).webp'),
  'gallery-8.jpg': require('../../assets/hackathon img/download (8).webp'),
  'gallery-9.jpg': require('../../assets/hackathon img/download (9).webp'),
  'gallery-10.jpg': require('../../assets/hackathon img/download (10).webp'),
  'gallery-11.jpg': require('../../assets/hackathon img/download (11).webp'),
  'gallery-12.jpg': require('../../assets/hackathon img/download (12).webp'),
  'news-1.jpg': require('../../assets/hackathon img/download (13).webp'),
  'news-2.jpg': require('../../assets/hackathon img/download (14).webp'),
  'news-3.jpg': require('../../assets/hackathon img/download (15).webp'),
  'video-1.jpg': require('../../assets/hackathon img/download (16).webp'),
  'video-2.jpg': require('../../assets/hackathon img/download (17).webp'),
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: string): ReturnType<typeof require> | null {
  if (key in images) {
    return images[key as ImageKey];
  }
  return null;
}

export default images;

