import type { Programme } from '../types/content';

/** Returns the display name for a programme in the given language.
 *  Stage 7 passes the language from the LanguageProvider.
 */
export function getName(item: Programme, lang: 'en' | 'hi' = 'en'): string {
  return lang === 'hi' ? item.hi : item.en;
}
