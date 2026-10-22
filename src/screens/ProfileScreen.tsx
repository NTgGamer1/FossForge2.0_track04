import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../i18n/t';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : '??';

  async function handleSignOut() {
    await signOut();
    navigation.goBack();
  }

  return (
    <View style={styles.root}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.displayName}>{user?.displayName ?? t('auth.guest')}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>

      {/* Info rows */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={18} color={theme.colors.primary} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{t('auth.name')}</Text>
            <Text style={styles.rowValue}>{user?.displayName ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color={theme.colors.primary} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{t('auth.email')}</Text>
            <Text style={styles.rowValue}>{user?.email ?? '—'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Ionicons name="finger-print-outline" size={18} color={theme.colors.primary} />
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>User ID</Text>
            <Text style={[styles.rowValue, styles.uid]} numberOfLines={1}>{user?.uid ?? '—'}</Text>
          </View>
        </View>
      </View>

      {/* Sign out */}
      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={handleSignOut}
        accessibilityRole="button"
        accessibilityLabel={t('involve.signOut')}
      >
        <Ionicons name="log-out-outline" size={18} color={theme.colors.urgentHelpline} />
        <Text style={styles.signOutText}>{t('involve.signOut')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background, padding: 24 },

  avatarSection: { alignItems: 'center', marginBottom: 28, gap: 6 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  avatarText: { color: '#FFFFFF', fontSize: 28, lineHeight: 34, fontFamily: fontFamilies.interBold },
  displayName: { fontSize: 20, lineHeight: 24, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary },
  email: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary },

  card: {
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: theme.colors.borderSubtle,
    marginBottom: 24,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 10 },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  rowValue: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interRegular, color: theme.colors.textPrimary, marginTop: 2 },
  uid: { color: theme.colors.textMuted, fontSize: 12 },
  divider: { height: 1, backgroundColor: theme.colors.borderSubtle, marginVertical: 0 },

  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    borderWidth: 1, borderColor: theme.colors.urgentHelpline,
    borderRadius: 10, height: 50,
  },
  signOutText: { fontSize: 15, lineHeight: 20, fontFamily: fontFamilies.interSemiBold, color: theme.colors.urgentHelpline },
});

