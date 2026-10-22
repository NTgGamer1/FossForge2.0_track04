import React, { useState } from 'react';
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

import { useContent } from '../hooks/useContent';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { HelplineBanner } from '../components/HelplineBanner';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import type { MainTabParamList } from '../navigation/types';
import { fontFamilies, theme } from '../theme';

type HomeNav = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const governanceBadges = [
  { icon: 'document-text' as const, title: 'FCRA · CSR1 · 12A · 80G Certified', sub: 'Tax Exemption & Foreign Contributions' },
  { icon: 'business' as const, title: 'Registered Society, Delhi (2001)', sub: 'Under the Societies Registration Act' },
  { icon: 'search' as const, title: 'Listed on Give.do, NGO Darpan & GuideStar India', sub: 'Independent NGO directories' },
  { icon: 'shield-checkmark' as const, title: 'Child safeguarding policy: on request', sub: 'Available to donors & partners' },
];

export function HomeScreen() {
  const navigation = useNavigation<HomeNav>();
  const { awsar } = useContent();
  const { org, stats, values, timeline, partners } = awsar;
  const yearsCount = `${new Date().getFullYear() - org.founded}+`;
  const [expandedValue, setExpandedValue] = useState<string | null>(null);
  const [timelineExpanded, setTimelineExpanded] = useState(false);

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
          {org.heroTitle}
        </Text>

        <Text variant="bodyMd" style={styles.heroBodyText}>
          {org.heroText}
        </Text>

        <View style={styles.heroImagePlaceholder}>
          <View style={styles.heroCaptionOverlay}>
            <Ionicons name="heart" size={14} color="#FFFFFF" />
            <Text style={styles.heroCaptionText}>{org.est}</Text>
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
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{yearsCount}</Text>
          <Text style={styles.statLabel}>Years of Impact</Text>
          <Text style={styles.statSub}>Since {org.founded}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconCircle, { backgroundColor: theme.colors.iconMagenta }]}>
            <Ionicons name="grid" size={16} color={theme.colors.secondary} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>9</Text>
          <Text style={styles.statLabel}>Programmes</Text>
          <Text style={styles.statSub}>Active Areas</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIconCircle, { backgroundColor: theme.colors.iconRed }]}>
            <Ionicons name="call" size={16} color={theme.colors.urgentHelpline} />
          </View>
          <Text style={[styles.statNumber, { color: theme.colors.urgentHelpline }]}>1098</Text>
          <Text style={styles.statLabel}>National Child Helpline</Text>
          <Text style={styles.statSub}>Toll-free, 24 hrs</Text>
        </View>
      </View>

      {/* d. Horizontal scrolling stats.home row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.homeStatsScroll}
      >
        {stats.home.map((s, i) => (
          <View key={i} style={styles.homeStatCard}>
            <Text style={styles.homeStatValue}>{s.value}</Text>
            <Text style={styles.homeStatLabel}>{s.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* e. Vision Card */}
      <Card>
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Vision"
          icon="eye"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.visionText}>
          {org.vision}
        </Text>
      </Card>

      {/* f. Mission Card */}
      <Card>
        <SectionHeader
          eyebrow="Purpose"
          title="Our Mission"
          icon="rocket"
          iconColor={theme.colors.secondary}
          iconBgColor={theme.colors.iconMagenta}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.visionText}>
          {org.mission}
        </Text>
      </Card>

      {/* g. Core Values */}
      <Card>
        <SectionHeader
          eyebrow="What We Stand For"
          title="Core Values"
          icon="sparkles"
          iconColor={theme.colors.secondary}
          iconBgColor={theme.colors.iconMagenta}
        />
        <View style={styles.valuesGrid}>
          {values.map((v) => (
            <TouchableOpacity
              key={v.title}
              activeOpacity={0.7}
              onPress={() => setExpandedValue(expandedValue === v.title ? null : v.title)}
              style={styles.valueChipWrapper}
              accessibilityRole="button"
              accessibilityLabel={v.title}
            >
              <View style={styles.valueChip}>
                <Ionicons
                  name={v.icon as keyof typeof Ionicons.glyphMap}
                  size={14}
                  color={theme.colors.primary}
                />
                <Text style={styles.valueChipLabel}>{v.title}</Text>
              </View>
              {expandedValue === v.title && (
                <Text variant="bodySm" color="textSecondary" style={styles.valueExpanded}>
                  {v.text}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* h. Our Story */}
      <Card>
        <SectionHeader
          eyebrow="Since 2001"
          title="Our Story"
          icon="time"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <View style={styles.founderQuote}>
          <Text style={styles.founderQuoteText}>{`"${org.founderQuote.text}"`}</Text>
          <Text style={styles.founderQuoteBy}>— {org.founderQuote.by}</Text>
        </View>
        {timelineExpanded && (
          <View style={styles.timeline}>
            {timeline.map((t, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDotCol}>
                  <View style={styles.timelineDot} />
                  {i < timeline.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineYear}>{t.year}</Text>
                  <Text style={styles.timelineTitle}>{t.title}</Text>
                  <Text variant="bodySm" color="textSecondary">{t.text}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={() => setTimelineExpanded(!timelineExpanded)}
          style={styles.expandBtn}
          accessibilityRole="button"
        >
          <Text style={styles.expandBtnText}>
            {timelineExpanded ? 'Hide timeline ↑' : 'Show our history ↓'}
          </Text>
        </TouchableOpacity>
      </Card>

      {/* i. EduAnchors Card */}
      <Card leftAccentColor={theme.colors.eduanchorsTeal}>
        <View style={styles.eduanchorsTopRow}>
          <View style={styles.eduanchorsPill}>
            <Ionicons name="school" size={12} color={theme.colors.eduanchorsTeal} />
            <Text style={styles.eduanchorsPillText}>POWERED BY EDUANCHORS</Text>
          </View>
          <Text style={styles.eduanchorsYouthText}>For Youth</Text>
        </View>
        <Text variant="titleSm" color="textPrimary" style={styles.eduanchorsTitle}>
          EduAnchors Opportunities
        </Text>
        <Text variant="bodyMd" color="textSecondary" style={styles.eduanchorsBlurb}>
          Access verified scholarships, mentorships, internships and careers for youth across Delhi NCR and beyond.
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsScroll}
        >
          {['Scholarships', 'Mentorships', 'Internships', 'Jobs'].map((tag) => (
            <Chip
              key={tag}
              label={tag}
              icon="school-outline"
              backgroundColor={theme.colors.iconTeal}
              textColor={theme.colors.eduanchorsTeal}
              iconColor={theme.colors.eduanchorsTeal}
            />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('Opportunities')}
          accessibilityRole="button"
          accessibilityLabel="Browse Opportunities"
        >
          <Text style={styles.browseButtonText}>Browse Opportunities →</Text>
        </TouchableOpacity>
      </Card>

      {/* j. Governance Card */}
      <View style={styles.governanceCard}>
        <View style={styles.governanceHeader}>
          <Text style={styles.governanceHeaderText}>GOVERNANCE & TRUST</Text>
          <View style={styles.verifiedRow}>
            <Ionicons name="checkmark-circle" size={12} color={theme.colors.eduanchorsTeal} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
        <View style={styles.governanceGrid}>
          {governanceBadges.map((b, i) => (
            <View key={i} style={styles.governanceItem}>
              <Ionicons name={b.icon} size={18} color={theme.colors.primary} />
              <View style={styles.governanceItemTexts}>
                <Text style={styles.governanceItemTitle}>{b.title}</Text>
                <Text style={styles.governanceItemSub}>{b.sub}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* k. Partners */}
      <Card>
        <SectionHeader
          eyebrow="Who We Work With"
          title="Partners & Supporters"
          icon="people"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <View style={styles.valuesGrid}>
          {partners.supporters.map((s) => (
            <Chip key={s} label={s} backgroundColor={theme.colors.surfaceSubtle} />
          ))}
        </View>
        <Text variant="bodySm" color="textMuted" style={styles.partnersNote}>
          {partners.note}
        </Text>
      </Card>

      {/* l. Footer */}
      <Text style={styles.footerLine}>{org.footerLine}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, gap: 16, paddingBottom: 32 },
  heroCard: { borderRadius: 24, padding: 20, gap: 12 },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  missionPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 9999, paddingHorizontal: 10, paddingVertical: 4 },
  magentaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.secondary },
  missionPillText: { color: '#FFFFFF', fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, letterSpacing: 0.5 },
  heroHindiText: { color: '#B3C6FF', fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold },
  heroTitleText: { color: '#FFFFFF' },
  heroBodyText: { color: '#B3C6FF' },
  heroImagePlaceholder: { backgroundColor: 'rgba(0,11,55,0.4)', height: 140, borderRadius: 16, justifyContent: 'flex-end', padding: 10 },
  heroCaptionOverlay: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,11,55,0.55)', borderRadius: 8, padding: 6 },
  heroCaptionText: { color: '#FFFFFF', fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interMedium, flex: 1 },
  heroButtonRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  exploreButton: { flex: 1, backgroundColor: theme.colors.secondary, borderRadius: theme.radius.sm, height: 44, alignItems: 'center', justifyContent: 'center' },
  exploreButtonText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },
  donateButton: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: theme.radius.sm, height: 44, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
  donateButtonText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.borderSubtle, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'space-between', minHeight: 110, ...theme.shadows.level1 },
  statIconCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  statNumber: { fontSize: 22, lineHeight: 26, fontFamily: fontFamilies.interBold },
  statLabel: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary, textAlign: 'center', marginTop: 4 },
  statSub: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted, textAlign: 'center', marginTop: 1 },
  homeStatsScroll: { gap: 10, paddingBottom: 2 },
  homeStatCard: { backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', minWidth: 120, ...theme.shadows.level1 },
  homeStatValue: { fontSize: 18, lineHeight: 22, fontFamily: fontFamilies.interBold, color: theme.colors.primary },
  homeStatLabel: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary, textAlign: 'center', marginTop: 2 },
  visionText: { marginTop: 12, lineHeight: 22 },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  valueChipWrapper: { gap: 4 },
  valueChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: theme.colors.surfaceSubtle, borderRadius: theme.radius.full, paddingHorizontal: 10, paddingVertical: 6 },
  valueChipLabel: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textPrimary },
  valueExpanded: { paddingHorizontal: 4, paddingBottom: 4, maxWidth: 300 },
  founderQuote: { marginTop: 12, backgroundColor: theme.colors.surfaceSubtle, borderRadius: theme.radius.md, padding: 14, gap: 6 },
  founderQuoteText: { fontSize: 14, lineHeight: 22, fontFamily: fontFamilies.interRegular, color: theme.colors.textPrimary, fontStyle: 'italic' },
  founderQuoteBy: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textMuted },
  timeline: { marginTop: 12, gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 12 },
  timelineDotCol: { alignItems: 'center', width: 14 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary, marginTop: 4 },
  timelineLine: { flex: 1, width: 2, backgroundColor: theme.colors.borderSubtle, marginVertical: 4 },
  timelineContent: { flex: 1, paddingBottom: 16, gap: 2 },
  timelineYear: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.secondary },
  timelineTitle: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textPrimary },
  expandBtn: { marginTop: 10, alignItems: 'center', paddingVertical: 8, minHeight: 40, justifyContent: 'center' },
  expandBtnText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.primary },
  eduanchorsTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eduanchorsPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.iconTeal, borderRadius: theme.radius.full, paddingHorizontal: 8, paddingVertical: 4 },
  eduanchorsPillText: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.eduanchorsTeal, letterSpacing: 0.5 },
  eduanchorsYouthText: { fontSize: 11, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.eduanchorsTeal },
  eduanchorsTitle: { marginTop: 10 },
  eduanchorsBlurb: { marginTop: 6, lineHeight: 20 },
  tagsScroll: { gap: 8, paddingVertical: 12 },
  browseButton: { backgroundColor: theme.colors.eduanchorsTeal, borderRadius: theme.radius.sm, height: 44, alignItems: 'center', justifyContent: 'center' },
  browseButtonText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },
  governanceCard: { backgroundColor: theme.colors.surfaceSubtle, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.borderSubtle, padding: 14, gap: 12 },
  governanceHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  governanceHeaderText: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8, fontFamily: fontFamilies.interBold, color: theme.colors.textMuted },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifiedText: { fontSize: 11, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.eduanchorsTeal },
  governanceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  governanceItem: { width: '100%', backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, padding: 10, flexDirection: 'row', alignItems: 'flex-start', gap: 10, ...theme.shadows.level1 },
  governanceItemTexts: { flex: 1, minWidth: 0 },
  governanceItemTitle: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary },
  governanceItemSub: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted, marginTop: 1 },
  partnersNote: { marginTop: 8, fontStyle: 'italic' },
  footerLine: { textAlign: 'center', fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted, paddingVertical: 8 },
});
