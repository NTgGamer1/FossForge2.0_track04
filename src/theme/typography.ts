import type { TextStyle } from 'react-native';

export const fontFamilies = { interRegular: 'Inter_400Regular', interMedium: 'Inter_500Medium', interSemiBold: 'Inter_600SemiBold', interBold: 'Inter_700Bold', devanagariRegular: 'NotoSansDevanagari_400Regular', devanagariSemiBold: 'NotoSansDevanagari_600SemiBold', devanagariBold: 'NotoSansDevanagari_700Bold' } as const;

export const typography = {
  displayLg: { fontFamily: fontFamilies.interBold, fontSize: 32, lineHeight: 40, letterSpacing: -0.64 }, displayMd: { fontFamily: fontFamilies.interBold, fontSize: 26, lineHeight: 34, letterSpacing: -0.26 }, headlineLg: { fontFamily: fontFamilies.interSemiBold, fontSize: 22, lineHeight: 28, letterSpacing: -0.22 }, headlineMd: { fontFamily: fontFamilies.interSemiBold, fontSize: 18, lineHeight: 24 }, titleSm: { fontFamily: fontFamilies.interSemiBold, fontSize: 16, lineHeight: 22 }, bodyLg: { fontFamily: fontFamilies.interRegular, fontSize: 16, lineHeight: 24 }, bodyMd: { fontFamily: fontFamilies.interRegular, fontSize: 14, lineHeight: 20 }, bodySm: { fontFamily: fontFamilies.interRegular, fontSize: 12, lineHeight: 18 }, labelLg: { fontFamily: fontFamilies.interSemiBold, fontSize: 14, lineHeight: 20, letterSpacing: 0.14 }, labelMd: { fontFamily: fontFamilies.interSemiBold, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 }, labelSm: { fontFamily: fontFamilies.interBold, fontSize: 10, lineHeight: 14, letterSpacing: 0.4 }, devanagariBody: { fontFamily: fontFamilies.devanagariRegular, fontSize: 14, lineHeight: 22 }, devanagariLabel: { fontFamily: fontFamilies.devanagariSemiBold, fontSize: 12, lineHeight: 18 },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
