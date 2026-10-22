import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fontFamilies, theme } from '../theme';
import { Text } from './Text';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBgColor?: string;
  rightText?: string;
  style?: StyleProp<ViewStyle>;
}

export function SectionHeader({
  eyebrow,
  title,
  icon,
  iconColor = theme.colors.primary,
  iconBgColor = theme.colors.iconNavy,
  rightText,
  style,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <View style={[styles.iconSquare, { backgroundColor: iconBgColor }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.titleColumn}>
          <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>
          <Text variant="headlineMd" color="textPrimary" style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
      {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconSquare: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleColumn: {
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.secondary,
  },
  title: {
    marginTop: 1,
  },
  rightText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textMuted,
  },
});

