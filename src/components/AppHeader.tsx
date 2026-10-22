import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { fontFamilies, theme } from '../theme';
import { Text } from './Text';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export interface AppHeaderProps extends Partial<BottomTabHeaderProps> {
  title?: string;
}

const screenNameMap: Record<string, { en: string; hi: string }> = {
  Home: { en: 'Home', hi: 'होम' },
  Programmes: { en: 'Programmes', hi: 'कार्यक्रम' },
  Opportunities: { en: 'Opportunities', hi: 'अवसर' },
  Media: { en: 'Media', hi: 'मीडिया' },
  GetInvolved: { en: 'Get Involved', hi: 'जुड़ें' },
};

export function AppHeader({ options, route, title }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { lang, toggleLang } = useLanguage();
  const { user } = useAuth();

  const rawRouteName = route?.name ?? 'Home';
  const localizedTitle =
    screenNameMap[rawRouteName]?.[lang] ??
    title ??
    options?.title ??
    rawRouteName;

  const callHelpline = () => {
    Linking.openURL('tel:1098');
  };

  const userInitials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : null;

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
            <Text style={styles.screenName}>{localizedTitle}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            onPress={toggleLang}
            activeOpacity={0.7}
            style={[styles.langPill, lang === 'hi' && styles.langPillActive]}
            accessibilityRole="button"
            accessibilityLabel={`Language toggle, current is ${lang.toUpperCase()}`}
          >
            <Text style={[styles.langText, lang === 'hi' && styles.langTextActive]}>
              {lang === 'en' ? 'EN | हिं' : 'हिं | EN'}
            </Text>
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
            {userInitials ? (
              <Text style={styles.initialsText}>{userInitials}</Text>
            ) : (
              <Ionicons name="person" size={20} color="#FFFFFF" />
            )}
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langPillActive: {
    backgroundColor: theme.colors.iconNavy,
    borderColor: theme.colors.primary,
  },
  langText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.textPrimary,
  },
  langTextActive: {
    color: theme.colors.primary,
    fontFamily: fontFamilies.interBold,
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
  initialsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.interBold,
    lineHeight: 18,
  },
});
