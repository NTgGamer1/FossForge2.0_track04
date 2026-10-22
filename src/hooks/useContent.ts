import awsarRaw from '../data/awsar.json';
import eduanchorsRaw from '../data/eduanchors.json';
import type { AwsarData, EduanchorsData } from '../types/content';

// Cast JSON imports to typed interfaces
const awsar = awsarRaw as unknown as AwsarData;
const eduanchors = eduanchorsRaw as unknown as EduanchorsData;

export function useContent() {
  return { awsar, eduanchors };
}

