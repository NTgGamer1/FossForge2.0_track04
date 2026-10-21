import { Text as NativeText, type StyleProp, type TextProps as NativeTextProps, type TextStyle } from 'react-native';
import { theme, type ColorToken, type TypographyVariant } from '../theme';
export type TextProps = Omit<NativeTextProps, 'style'> & { variant?: TypographyVariant; color?: ColorToken; style?: StyleProp<TextStyle> };
export function Text({ variant = 'bodyMd', color = 'textPrimary', style, ...props }: TextProps) { return <NativeText {...props} style={[theme.typography[variant], { color: theme.colors[color] }, style]} />; }
