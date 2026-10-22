import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useContent } from '../hooks/useContent';
import { useTranslation } from '../i18n/t';
import { getName } from '../utils/lang';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { MainTabParamList, ProgrammesStackParamList } from '../navigation/types';
import type { Programme } from '../types/content';

type RouteT = RouteProp<ProgrammesStackParamList, 'ProgrammeDetail'>;
type TabNav = BottomTabNavigationProp<MainTabParamList>;

const tintMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: theme.colors.iconBlue, icon: theme.colors.primary },
  red: { bg: theme.colors.iconRed, icon: theme.colors.urgentHelpline },
  green: { bg: theme.colors.iconTeal, icon: theme.colors.eduanchorsTeal },
  pink: { bg: theme.colors.iconMagenta, icon: theme.colors.secondary },
  amber: { bg: theme.colors.iconAmber, icon: '#D97706' },
  purple: { bg: theme.colors.iconPurple, icon: '#7C3AED' },
};

export function ProgrammeDetailScreen() {
  const route = useRoute<RouteT>();
  const navigation = useNavigation();
  const tabNav = useNavigation<TabNav>();
  const { awsar, lang } = useContent();
  const { t } = useTranslation();
  const isHi = lang === 'hi';

  const programme: Programme | undefined = awsar.programmes.find(
    (p) => p.id === route.params.id,
  );

  if (!programme) {
    return (
      <View style={styles.center}>
        <Text variant="bodyMd" color="textMuted">
          {isHi ? 'कार्यक्रम नहीं मिला।' : 'Programme not found.'}
        </Text>
      </View>
    );
  }

  const { bg, icon: iconColor } = tintMap[programme.tint] ?? tintMap.blue;
  const displayName = getName(programme, lang);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel={t('common.back')}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="arrow-back" size={20} color={theme.colors.primary} />
        <Text style={styles.backText}>{t('programmes.title')}</Text>
      </TouchableOpacity>

      {/* Hero block */}
      <View style={[styles.heroBlock, { backgroundColor: bg }]}>
        <View style={[styles.heroIconCircle, { backgroundColor: iconColor + '22' }]}>
          <Ionicons
            name={programme.icon as keyof typeof Ionicons.glyphMap}
            size={40}
            color={iconColor}
          />
        </View>
        <Text variant="headlineLg" style={[styles.heroTitle, { color: theme.colors.textPrimary }]}>
          {displayName}
        </Text>
        <Text variant="bodyMd" style={[styles.heroHi, { color: theme.colors.textMuted }]}>
          {programme.hi}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={13} color={theme.colors.textMuted} />
          <Text style={styles.metaText}>{isHi ? 'दिल्ली एनसीआर एवं भारत' : 'Delhi NCR & India'}</Text>
        </View>
      </View>

      {/* Impact stat cards */}
      {programme.impact.length > 0 && (
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('programmes.impact')}</Text>
          <View style={styles.impactRow}>
            {programme.impact.map((stat, i) => (
              <View key={i} style={styles.impactItem}>
                <Text style={styles.impactValue}>{stat.value}</Text>
                <Text style={styles.impactLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>
      )}

      {/* Intro / About */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{isHi ? 'के बारे में' : 'About'}</Text>
        <Text variant="bodyMd" color="textSecondary">
          {programme.intro ?? programme.summary}
        </Text>
      </Card>

      {/* Services (research) */}
      {programme.services && programme.services.length > 0 && (
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('programmes.services')}</Text>
          <View style={styles.chipsWrap}>
            {programme.services.map((s) => (
              <Chip key={s} label={s} backgroundColor={theme.colors.surfaceSubtle} />
            ))}
          </View>
        </Card>
      )}

      {/* Portfolio (research) */}
      {programme.portfolio && programme.portfolio.length > 0 && (
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('programmes.portfolio')}</Text>
          {programme.portfolio.map((p, i) => (
            <View key={i} style={[styles.portfolioItem, i > 0 && styles.portfolioItemBorder]}>
              <View style={styles.portfolioTag}>
                <Text style={styles.portfolioTagText}>{p.tag}</Text>
              </View>
              <Text style={styles.portfolioTitle}>{p.title}</Text>
              <Text variant="bodySm" color="textSecondary">{p.text}</Text>
              <Text style={styles.portfolioMeta}>{p.meta}</Text>
            </View>
          ))}
        </Card>
      )}

      {/* Interventions (child-protection) */}
      {programme.interventions && programme.interventions.length > 0 && (
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('programmes.interventions')}</Text>
          {programme.interventions.map((intervention, i) => (
            <View key={i} style={styles.interventionRow}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.eduanchorsTeal} />
              <Text variant="bodyMd" color="textSecondary" style={styles.interventionText}>
                {intervention}
              </Text>
            </View>
          ))}
        </Card>
      )}

      {/* Child Protection Helpline card */}
      {programme.showHelpline && (
        <Card leftAccentColor={theme.colors.urgentHelpline} style={styles.sectionCard}>
          <View style={styles.helplineRow}>
            <Ionicons name="call" size={18} color={theme.colors.urgentHelpline} />
            <View style={styles.helplineText}>
              <Text style={styles.helplineTitle}>
                {isHi
                  ? 'संकट में बच्चा? राष्ट्रीय बाल हेल्पलाइन पर कॉल करें'
                  : 'Child in danger? Call the national Child Helpline'}
              </Text>
              <Text style={styles.helplineNum}>1098</Text>
              <Text style={styles.helplineSub}>
                {isHi ? '24 घंटे, टोल-फ्री | आपातकाल: 112' : '24 hrs, toll-free | Emergency: 112'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.dialBtn}
            onPress={() => Linking.openURL('tel:1098')}
            accessibilityRole="button"
            accessibilityLabel={t('common.dialNow')}
          >
            <Text style={styles.dialBtnText}>{t('common.dialNow')}</Text>
          </TouchableOpacity>
        </Card>
      )}

      {/* Get Involved CTA */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={styles.ctaVolunteer}
          onPress={() => (tabNav as any).navigate('GetInvolved')}
          accessibilityRole="button"
          accessibilityLabel={t('common.volunteer')}
        >
          <Ionicons name="hand-left-outline" size={16} color={theme.colors.primary} />
          <Text style={styles.ctaVolunteerText}>{t('common.volunteer')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ctaDonate}
          onPress={() => (tabNav as any).navigate('GetInvolved')}
          accessibilityRole="button"
          accessibilityLabel={t('common.donate')}
        >
          <Ionicons name="heart-outline" size={16} color="#FFFFFF" />
          <Text style={styles.ctaDonateText}>{t('common.donate')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    minHeight: 40,
  },
  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.primary,
  },
  heroBlock: {
    borderRadius: theme.radius.lg,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  heroIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroTitle: {
    textAlign: 'center',
  },
  heroHi: {
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textMuted,
  },
  sectionCard: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  impactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  impactItem: {
    flex: 1,
    minWidth: 100,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.md,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  impactValue: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.primary,
  },
  impactLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  portfolioItem: {
    paddingTop: 10,
    gap: 4,
  },
  portfolioItemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
  },
  portfolioTag: {
    backgroundColor: theme.colors.iconNavy,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  portfolioTagText: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  portfolioTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.textPrimary,
  },
  portfolioMeta: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textMuted,
  },
  interventionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  interventionText: {
    flex: 1,
  },
  helplineRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  helplineText: {
    flex: 1,
    gap: 2,
  },
  helplineTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.textPrimary,
  },
  helplineNum: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.urgentHelpline,
  },
  helplineSub: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textMuted,
  },
  dialBtn: {
    backgroundColor: theme.colors.urgentHelpline,
    borderRadius: theme.radius.sm,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  ctaVolunteer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: theme.radius.sm,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceCard,
  },
  ctaVolunteerText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.primary,
  },
  ctaDonate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.secondary,
  },
  ctaDonateText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
    color: '#FFFFFF',
  },
});
