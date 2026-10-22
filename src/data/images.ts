// Static image require map — no dynamic require() allowed
// Add new entries here when real images are added to assets/images/

const images = {
  'logo.png': require('../../assets/images/logo.png'),
  'hero.jpg': require('../../assets/images/hero.jpg'),
  'gallery-1.jpg': require('../../assets/images/gallery-1.jpg'),
  'gallery-2.jpg': require('../../assets/images/gallery-2.jpg'),
  'gallery-3.jpg': require('../../assets/images/gallery-3.jpg'),
  'gallery-4.jpg': require('../../assets/images/gallery-4.jpg'),
  'gallery-5.jpg': require('../../assets/images/gallery-5.jpg'),
  'gallery-6.jpg': require('../../assets/images/gallery-6.jpg'),
  'gallery-7.jpg': require('../../assets/images/gallery-7.jpg'),
  'gallery-8.jpg': require('../../assets/images/gallery-8.jpg'),
  'gallery-9.jpg': require('../../assets/images/gallery-9.jpg'),
  'gallery-10.jpg': require('../../assets/images/gallery-10.jpg'),
  'gallery-11.jpg': require('../../assets/images/gallery-11.jpg'),
  'gallery-12.jpg': require('../../assets/images/gallery-12.jpg'),
  'news-1.jpg': require('../../assets/images/news-1.jpg'),
  'news-2.jpg': require('../../assets/images/news-2.jpg'),
  'news-3.jpg': require('../../assets/images/news-3.jpg'),
  'video-1.jpg': require('../../assets/images/video-1.jpg'),
  'video-2.jpg': require('../../assets/images/video-2.jpg'),
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: string): ReturnType<typeof require> | null {
  if (key in images) {
    return images[key as ImageKey];
  }
  return null;
}

export default images;

