import { useMemo } from 'react';
import awsarEn from '../data/awsar.json';
import eduanchorsEn from '../data/eduanchors.json';
import awsarHi from '../data/awsar.hi.json';
import eduanchorsHi from '../data/eduanchors.hi.json';
import { useLanguage } from '../contexts/LanguageContext';
import type { AwsarData, EduanchorsData } from '../types/content';

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge<T>(target: T, source: any): T {
  if (!source) return target;
  if (!isObject(target) || !isObject(source)) {
    return source !== undefined ? (source as T) : target;
  }

  const output: any = { ...target };
  for (const key of Object.keys(source)) {
    if (key in target) {
      if (Array.isArray(source[key]) && Array.isArray((target as any)[key])) {
        // For array of items with IDs, merge matching elements
        const targetArr = (target as any)[key];
        const sourceArr = source[key];
        output[key] = sourceArr.map((sItem: any, index: number) => {
          if (sItem && typeof sItem === 'object' && sItem.id) {
            const match = targetArr.find((tItem: any) => tItem.id === sItem.id);
            return match ? deepMerge(match, sItem) : sItem;
          }
          const tItem = targetArr[index];
          return tItem ? deepMerge(tItem, sItem) : sItem;
        });
      } else if (isObject(source[key])) {
        output[key] = deepMerge((target as any)[key], source[key]);
      } else if (source[key] !== undefined && source[key] !== null) {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  }
  return output as T;
}

export function useContent() {
  const { lang } = useLanguage();

  const awsar = useMemo(() => {
    if (lang === 'hi') {
      return deepMerge(awsarEn as unknown as AwsarData, awsarHi);
    }
    return awsarEn as unknown as AwsarData;
  }, [lang]);

  const eduanchors = useMemo(() => {
    if (lang === 'hi') {
      return deepMerge(eduanchorsEn as unknown as EduanchorsData, eduanchorsHi);
    }
    return eduanchorsEn as unknown as EduanchorsData;
  }, [lang]);

  return { awsar, eduanchors, lang };
}
