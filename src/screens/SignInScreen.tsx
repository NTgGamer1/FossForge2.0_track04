import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../i18n/t';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: Props) {
  const { signIn, signUp, error, clearError, loading } = useAuth();
  const { t } = useTranslation();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  const displayError = localError ?? error;

  function switchMode() {
    clearError();
    setLocalError(null);
    setMode((m) => (m === 'login' ? 'signup' : 'login'));
  }

  async function handleSubmit() {
    setLocalError(null);
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError('Email and password are required.');
      return;
    }

    let succeeded = false;
    if (mode === 'signup') {
      if (!name.trim()) {
        setLocalError('Name is required.');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError(t('auth.passwordMismatch'));
        return;
      }
      succeeded = await signUp(email.trim(), password, name.trim());
    } else {
      succeeded = await signIn(email.trim(), password);
    }

    if (succeeded) navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / Brand */}
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.brandName}>AWSAR INDIA</Text>
          <Text style={styles.brandSub}>
            {mode === 'login' ? t('auth.login') : t('auth.signup')}
          </Text>
        </View>

        {/* Error banner */}
        {displayError ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={16} color={theme.colors.urgentHelpline} />
            <Text style={styles.errorText}>{displayError}</Text>
          </View>
        ) : null}

        {/* Card */}
        <View style={styles.card}>
          {mode === 'signup' && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('auth.name')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('auth.name')}
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="words"
                returnKeyType="next"
                accessibilityLabel={t('auth.name')}
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>{t('auth.email')}</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              accessibilityLabel={t('auth.email')}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('auth.password')}</Text>
            <View style={styles.passRow}>
              <TextInput
                style={[styles.input, styles.passInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={!showPass}
                returnKeyType={mode === 'signup' ? 'next' : 'done'}
                onSubmitEditing={mode === 'login' ? handleSubmit : undefined}
                accessibilityLabel={t('auth.password')}
              />
              <TouchableOpacity
                onPress={() => setShowPass((v) => !v)}
                style={styles.eyeBtn}
                accessibilityLabel={showPass ? 'Hide password' : 'Show password'}
              >
                <Ionicons
                  name={showPass ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {mode === 'signup' && (
            <View style={styles.field}>
              <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={!showPass}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                accessibilityLabel={t('auth.confirmPassword')}
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel={mode === 'login' ? t('auth.login') : t('auth.signup')}
          >
            <Text style={styles.submitBtnText}>
              {mode === 'login' ? t('auth.login') : t('auth.signup')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={switchMode}
            style={styles.switchBtn}
            accessibilityRole="button"
          >
            <Text style={styles.switchText}>
              {mode === 'login' ? t('auth.switchToSignup') : t('auth.switchToLogin')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },

  brand: { alignItems: 'center', marginBottom: 32, gap: 8 },
  logoCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  },
  logoImage: { width: 64, height: 64 },
  brandName: { fontSize: 20, lineHeight: 24, fontFamily: fontFamilies.interBold, color: theme.colors.primary },
  brandSub: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary },

  errorBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: theme.colors.iconRed,
    borderRadius: 8, padding: 12, marginBottom: 16,
  },
  errorText: { flex: 1, fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interRegular, color: theme.colors.urgentHelpline },

  card: {
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: 16, padding: 24,
    borderWidth: 1, borderColor: theme.colors.borderSubtle,
    gap: 0,
  },
  field: { marginBottom: 16 },
  label: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textPrimary, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: theme.colors.borderSubtle,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, lineHeight: 20, fontFamily: fontFamilies.interRegular,
    color: theme.colors.textPrimary, backgroundColor: theme.colors.background,
    minHeight: 48,
  },
  passRow: { flexDirection: 'row', alignItems: 'center' },
  passInput: { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },
  eyeBtn: {
    width: 48, minHeight: 48, borderWidth: 1, borderColor: theme.colors.borderSubtle,
    borderTopRightRadius: 10, borderBottomRightRadius: 10,
    backgroundColor: theme.colors.background,
    alignItems: 'center', justifyContent: 'center',
  },

  submitBtn: {
    backgroundColor: theme.colors.primary, borderRadius: 10,
    height: 50, alignItems: 'center', justifyContent: 'center',
    marginTop: 4, marginBottom: 16,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitBtnText: { color: '#FFFFFF', fontSize: 15, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },

  switchBtn: { alignItems: 'center', paddingVertical: 4 },
  switchText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interRegular, color: theme.colors.primary },
});

