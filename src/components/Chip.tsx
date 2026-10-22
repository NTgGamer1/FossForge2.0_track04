import React from 'react';
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fontFamilies, theme, type ColorToken } from '../theme';
import { Text } from './Text';

export interface ChipProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  textColor?: ColorToken | string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function Chip({
  label,
  icon,
  iconColor = theme.colors.primary,
  textColor = 'textPrimary',
  backgroundColor,
  style,
  onPress,
}: ChipProps) {
  const content = (
    <View
      style={[
        styles.chip,
        backgroundColor ? { backgroundColor } : undefined,
        style,
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={14} color={iconColor} style={styles.icon} />
      ) : null}
      <Text
        style={[
          styles.label,
          textColor in theme.colors
            ? { color: theme.colors[textColor as ColorToken] }
            : { color: textColor },
        ]}
      >
        {label}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interSemiBold,
  },
});

