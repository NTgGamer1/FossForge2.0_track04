import type { ViewStyle } from 'react-native';
const navyShadow = '#0A1F5E';
export const shadows = {
  level1: { shadowColor: navyShadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  level2: { shadowColor: navyShadow, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 6 },
  level3: { shadowColor: navyShadow, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 8 },
} as const satisfies Record<string, ViewStyle>;
