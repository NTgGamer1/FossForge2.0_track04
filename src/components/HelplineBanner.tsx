import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fontFamilies, theme } from '../theme';
import { Text } from './Text';
import { useLanguage } from '../contexts/LanguageContext';

export function HelplineBanner() {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';

  const dialHelpline = () => {
    Linking.openURL('tel:1098');
  };

  const bannerText = isHi
    ? 'संकट में बच्चा? राष्ट्रीय बाल हेल्पलाइन 1098 पर कॉल करें (24 घंटे) | आपातकाल: 112'
    : 'Child in danger? Call the national Child Helpline 1098 (24 hrs, toll-free) | Emergency: 112';

  const dialText = isHi ? 'डायल' : 'Dial';

  return (
    <View style={styles.container}>
      <View style={styles.contentLeft}>
        <Ionicons name="alert-circle" size={20} color={theme.colors.urgentHelpline} />
        <Text style={styles.text} numberOfLines={2}>
          {bannerText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={dialHelpline}
        activeOpacity={0.8}
        style={styles.dialButton}
        accessibilityRole="button"
        accessibilityLabel="Dial 1098"
      >
        <Text style={styles.dialText}>{dialText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDE8E8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  text: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textPrimary,
    flexShrink: 1,
  },
  dialButton: {
    backgroundColor: theme.colors.urgentHelpline,
    borderRadius: theme.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interBold,
    color: '#FFFFFF',
  },
});
