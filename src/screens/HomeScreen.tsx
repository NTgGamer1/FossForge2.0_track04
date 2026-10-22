import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import awsarData from '../data/awsar.json';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { HelplineBanner } from '../components/HelplineBanner';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import type { MainTabParamList } from '../navigation/types';
import { fontFamilies, theme } from '../theme';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const valueIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Community First': 'people',
  'Transparency (80G/FCRA)': 'shield-checkmark',
  'Equity & Inclusion': 'sparkles',
  'Last-Mile Delivery': 'paper-plane',
};

const valueColors: Record<string, string> = {
  'Community First': theme.colors.primary,
  'Transparency (80G/FCRA)': theme.colors.eduanchorsTeal,
  'Equity & Inclusion': theme.colors.secondary,
  'Last-Mile Delivery': theme.colors.primary,
};

const governanceIcons: (keyof typeof Ionicons.glyphMap)[] = [
  'checkmark-circle',
  'business',
  'medal',
  'ribbon',
];

const governanceIconColors: string[] = [
  theme.colors.eduanchorsTeal,
  theme.colors.eduanchorsTeal,
  theme.colors.secondary,
  theme.colors.primary,
];

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { about } = awsarData;
  const yearsCount = `${new Date().getFullYear() - about.foundedYear}+`;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* a. Helpline Banner */}
      <HelplineBanner />

      {/* b. Hero Card */}
      <LinearGradient
        colors={['#0A1F5E', '#081845']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View style={styles.heroTopRow}>
          <View style={styles.missionPill}>
            <View style={styles.magentaDot} />
            <Text style={styles.missionPillText}>NON-PROFIT MISSION</Text>
          </View>
          <Text style={styles.heroHindiText}>अवसर — Opportunities</Text>
        </View>

        <Text variant="displayMd" style={styles.heroTitleText}>
          {about.heroTitle}
        </Text>

        <Text variant="bodyMd" style={styles.heroBodyText}>
          {about.heroText}
        </Text>

        {/* Hero image placeholder view */}
        <View style={styles.heroImagePlaceholder}>
          <View style={styles.heroCaptionOverlay}>
            <Ionicons name="heart" size={14} color="#FFFFFF" />
            <Text style={styles.heroCaptionText}>{about.heroCaption}</Text>
          </View>
        </View>

        <View style={styles.heroButtonRow}>
          <TouchableOpacity
            style={styles.exploreButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Programmes')}
            accessibilityRole="button"
            accessibilityLabel="Explore Our Work"
          >
            <Text style={styles.exploreButtonText}>Explore Our Work →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.donateButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('GetInvolved')}
            accessibilityRole="button"
            accessibilityLabel="Donate"
          >
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* c. Row of 3 Stat Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIconCircle, { backgroundColor: theme.colors.iconNavy }]}>
            <Ionicons name="checkmark-circle" size={16} color={theme.colors.primary} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
            {yearsCount}
          </Text>
          <Text style={styles.statLabel}>Years of Impact</Text>
          <Text style={styles.statSub}>Since {about.foundedYear}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconCircle, { backgroundColor: theme.colors.iconMagenta }]}>
            <Ionicons name="grid" size={16} color={theme.colors.secondary} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>
            {about.programmeCount}
          </Text>
          <Text style={styles.statLabel}>Core Pillars</Text>
          <Text style={styles.statSub}>PAN-India</Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIconCircle, { backgroundColor: theme.colors.iconRed }]}>
            <Ionicons name="call" size={16} color={theme.colors.urgentHelpline} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>
            {about.helpline}
          </Text>
          <Text style={styles.statLabel}>Child Helpline</Text>
          <Text style={styles.statSub}>24x7 Support</Text>
        </View>
      </View>

      {/* d. Vision Card */}
      <Card>
        <SectionHeader
          eyebrow="PURPOSE"
          title="Our Vision"
          icon="eye"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.visionText}>
          {about.vision}
        </Text>
      </Card>

      {/* e. Core Values Card */}
      <Card>
        <SectionHeader
          eyebrow="FOUNDATION"
          title="Core Values"
          icon="heart-half"
          rightText="4 Commitments"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <View style={styles.valuesGrid}>
          {about.values.map((val) => (
            <Chip
              key={val}
              label={val}
              icon={valueIcons[val] ?? 'star'}
              iconColor={valueColors[val] ?? theme.colors.primary}
            />
          ))}
        </View>
      </Card>

      {/* f. EduAnchors Card */}
      <Card leftAccentColor={theme.colors.eduanchorsTeal}>
        <View style={styles.eduanchorsTopRow}>
          <View style={styles.eduanchorsPill}>
            <Ionicons name="school" size={12} color={theme.colors.eduanchorsTeal} />
            <Text style={styles.eduanchorsPillText}>POWERED BY EDUANCHORS</Text>
          </View>
          <Text style={styles.eduanchorsYouthText}>Youth Wing</Text>
        </View>

        <Text variant="headlineMd" color="textPrimary" style={styles.eduanchorsTitle}>
          Find Scholarships & Internships
        </Text>

        <Text variant="bodyMd" color="textSecondary" style={styles.eduanchorsBlurb}>
          {about.eduanchorsBlurb}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsScroll}
        >
          {about.eduanchorsTags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.browseButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Opportunities')}
          accessibilityRole="button"
          accessibilityLabel="Browse Opportunities"
        >
          <Text style={styles.browseButtonText}>Browse Opportunities →</Text>
        </TouchableOpacity>
      </Card>

      {/* g. Governance Card */}
      <View style={styles.governanceCard}>
        <View style={styles.governanceHeader}>
          <Text style={styles.governanceHeaderText}>INSTITUTIONAL GOVERNANCE</Text>
          <View style={styles.verifiedRow}>
            <Ionicons name="shield-checkmark" size={14} color={theme.colors.eduanchorsTeal} />
            <Text style={styles.verifiedText}>Verified Active</Text>
          </View>
        </View>

        <View style={styles.governanceGrid}>
          {about.governance.map((item, idx) => (
            <View key={item.title} style={styles.governanceItem}>
              <Ionicons
                name={governanceIcons[idx] ?? 'checkmark-circle'}
                size={18}
                color={governanceIconColors[idx] ?? theme.colors.eduanchorsTeal}
              />
              <View style={styles.governanceItemTexts}>
                <Text style={styles.governanceItemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.governanceItemSub} numberOfLines={1}>
                  {item.sub}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    paddingBottom: 24,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  missionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  magentaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary,
  },
  missionPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.6,
    fontFamily: fontFamilies.interBold,
  },
  heroHindiText: {
    color: theme.colors.onPrimaryContainer,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fontFamilies.devanagariRegular,
  },
  heroTitleText: {
    color: '#FFFFFF',
  },
  heroBodyText: {
    color: theme.colors.onPrimaryContainer,
    lineHeight: 22,
  },
  heroImagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(10, 31, 94, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroCaptionOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 11, 55, 0.55)',
  },
  heroCaptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interMedium,
  },
  heroButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  exploreButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius.sm,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
  },
  donateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.radius.sm,
    height: 44,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 110,
    ...theme.shadows.level1,
  },
  statIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: fontFamilies.interBold,
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: 4,
  },
  statSub: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 1,
  },
  visionText: {
    marginTop: 12,
    lineHeight: 22,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  eduanchorsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eduanchorsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.iconTeal,
    borderRadius: theme.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eduanchorsPillText: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.eduanchorsTeal,
    letterSpacing: 0.5,
  },
  eduanchorsYouthText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.eduanchorsTeal,
  },
  eduanchorsTitle: {
    marginTop: 10,
  },
  eduanchorsBlurb: {
    marginTop: 6,
    lineHeight: 20,
  },
  tagsScroll: {
    gap: 8,
    paddingVertical: 12,
  },
  browseButton: {
    backgroundColor: theme.colors.eduanchorsTeal,
    borderRadius: theme.radius.sm,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.interSemiBold,
  },
  governanceCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: 14,
    gap: 12,
  },
  governanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  governanceHeaderText: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textMuted,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.eduanchorsTeal,
  },
  governanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  governanceItem: {
    width: '48.6%',
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...theme.shadows.level1,
  },
  governanceItemTexts: {
    flex: 1,
    minWidth: 0,
  },
  governanceItemTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
  },
  governanceItemSub: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textMuted,
    marginTop: 1,
  },
});
