import { useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { fontFamilies, theme } from '../theme';
import { Text } from './Text';

export interface AppHeaderProps extends Partial<BottomTabHeaderProps> {
  title?: string;
}

export function AppHeader({ options, route, title }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const [, setLang] = useState<'EN' | 'HI'>('EN');

  const screenName =
    title ??
    options?.title ??
    (route?.name === 'GetInvolved' ? 'Get Involved' : route?.name) ??
    'Home';

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'EN' ? 'HI' : 'EN'));
  };

  const callHelpline = () => {
    Linking.openURL('tel:1098');
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <View style={styles.titleColumn}>
            <Text variant="titleSm" color="primary" style={styles.appTitle}>
              AWSAR INDIA
            </Text>
            <Text style={styles.screenName}>{screenName}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={toggleLanguage}
            activeOpacity={0.7}
            style={styles.langPill}
            accessibilityRole="button"
            accessibilityLabel="Language toggle"
          >
            <Text style={styles.langText}>EN | हिं</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={callHelpline}
            activeOpacity={0.8}
            style={styles.helplinePill}
            accessibilityRole="button"
            accessibilityLabel="Call helpline 1098"
          >
            <Ionicons name="call" size={13} color="#FFFFFF" />
            <Text style={styles.helplineText}>1098</Text>
          </TouchableOpacity>

          <View style={styles.profileCircle}>
            <Ionicons name="person" size={20} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: fontFamilies.interBold,
    fontSize: 18,
    lineHeight: 22,
  },
  titleColumn: {
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: fontFamilies.interBold,
  },
  screenName: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  langText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.textPrimary,
  },
  helplinePill: {
    backgroundColor: theme.colors.urgentHelpline,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helplineText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interBold,
    color: '#FFFFFF',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

