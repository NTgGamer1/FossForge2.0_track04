import { colors } from './colors'; import { radius } from './radius'; import { shadows } from './shadows'; import { spacing } from './spacing'; import { typography } from './typography';
export const theme = { colors, radius, shadows, spacing, typography } as const;
export { colors, type ColorToken } from './colors'; export { fontFamilies, typography, type TypographyVariant } from './typography'; export { spacing } from './spacing'; export { radius } from './radius'; export { shadows } from './shadows';
