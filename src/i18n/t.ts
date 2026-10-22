import en from './en.json';
import hi from './hi.json';
import { useLanguage, type Language } from '../contexts/LanguageContext';

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends Record<string, string>
    ? `${K}.${keyof T[K] & string}`
    : never;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<typeof en>;

export function translate(key: TranslationKey, lang: Language = 'en'): string {
  const dict = lang === 'hi' ? hi : en;
  const [section, field] = key.split('.') as [keyof typeof en, string];
  const sectionObj = (dict as Record<string, any>)[section];
  if (sectionObj && field in sectionObj) {
    return sectionObj[field];
  }
  // Fallback to English
  const enSection = en[section] as Record<string, string> | undefined;
  if (enSection && field in enSection) {
    return enSection[field];
  }
  return key;
}

export function t(key: TranslationKey): string {
  return translate(key, 'en');
}

export function useTranslation() {
  const { lang, toggleLang, setLang } = useLanguage();
  return {
    t: (key: TranslationKey) => translate(key, lang),
    lang,
    toggleLang,
    setLang,
  };
}
