export function getName(
  item: { nameEn: string; nameHi: string },
  lang: 'en' | 'hi' = 'en'
): string {
  return lang === 'hi' ? item.nameHi : item.nameEn;
}

