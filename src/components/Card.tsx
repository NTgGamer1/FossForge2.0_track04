import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { theme, type ColorToken } from '../theme';

export interface CardProps extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  leftAccentColor?: ColorToken | string;
  padding?: number;
}

export function Card({
  children,
  style,
  leftAccentColor,
  padding = 16,
  ...props
}: CardProps) {
  const resolvedAccent = leftAccentColor
    ? leftAccentColor in theme.colors
      ? theme.colors[leftAccentColor as ColorToken]
      : leftAccentColor
    : undefined;

  return (
    <View
      style={[
        styles.card,
        { padding },
        resolvedAccent && {
          borderLeftWidth: 4,
          borderLeftColor: resolvedAccent,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    overflow: 'hidden',
    ...theme.shadows.level1,
  },
});

