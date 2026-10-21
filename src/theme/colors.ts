/** AWSAR India's shared palette, derived from the Stitch design system. */
export const colors = {
  primary: '#0A1F5E', secondary: '#D4357C', eduanchorsTeal: '#0E9F6E', eduanchorsBlue: '#1E3C72', background: '#F4F6FB', textPrimary: '#0B1536', textSecondary: '#4E5D78', textMuted: '#8A97AB', borderSubtle: '#E2E8F0', urgentHelpline: '#E02424', surfaceCard: '#FFFFFF', surfaceSubtle: '#F0F4FA',
  surface: '#F7F9FE', surfaceDim: '#D8DADF', surfaceBright: '#F7F9FE', surfaceContainerLowest: '#FFFFFF', surfaceContainerLow: '#F1F4F9', surfaceContainer: '#ECEEF3', surfaceContainerHigh: '#E6E8ED', surfaceContainerHighest: '#E0E2E7', surfaceVariant: '#E0E2E7', onSurface: '#181C20', onSurfaceVariant: '#454650', inverseSurface: '#2D3135', inverseOnSurface: '#EFF1F6', outline: '#757681', outlineVariant: '#C5C5D2', surfaceTint: '#4A5B9B',
  onPrimary: '#FFFFFF', primaryContainer: '#0A1F5E', onPrimaryContainer: '#7889CD', inversePrimary: '#B7C4FF', materialPrimary: '#000B37', primaryFixed: '#DCE1FF', primaryFixedDim: '#B7C4FF', onPrimaryFixed: '#001552', onPrimaryFixedVariant: '#324381',
  onSecondary: '#FFFFFF', secondaryContainer: '#FE579D', onSecondaryContainer: '#610032', materialSecondary: '#B41764', secondaryFixed: '#FFD9E2', secondaryFixedDim: '#FFB0C9', onSecondaryFixed: '#3E001E', onSecondaryFixedVariant: '#8E004C',
  tertiary: '#00130D', onTertiary: '#FFFFFF', tertiaryContainer: '#002B21', onTertiaryContainer: '#389C81', tertiaryFixed: '#94F5D6', tertiaryFixedDim: '#78D8BA', onTertiaryFixed: '#002018', onTertiaryFixedVariant: '#005140', error: '#BA1A1A', onError: '#FFFFFF', errorContainer: '#FFDAD6', onErrorContainer: '#93000A', onBackground: '#181C20',
  iconNavy: '#E8EDF9', iconMagenta: '#FCE8F1', iconTeal: '#E4F7F0', iconBlue: '#E8F0FB', iconRed: '#FDE8E8', iconAmber: '#FFF4DE', iconPurple: '#F1EDFF',
} as const;

export type ColorToken = keyof typeof colors;
