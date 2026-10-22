import en from "./en.json";

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends Record<string, string>
    ? `${K}.${keyof T[K] & string}`
    : never;
}[keyof T & string];

type TranslationKey = NestedKeyOf<typeof en>;

/** Minimal t() stub — returns English string. Stage 7 swaps in i18next. */
export function t(key: TranslationKey): string {
  const [section, field] = key.split(".") as [keyof typeof en, string];
  const sectionObj = en[section] as Record<string, string> | undefined;
  if (sectionObj && field in sectionObj) {
    return sectionObj[field];
  }
  return key;
}
