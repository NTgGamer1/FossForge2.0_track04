import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import awsarData from '../data/awsar.json';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import type {
  MainTabParamList,
  ProgrammesStackParamList,
} from '../navigation/types';
import { fontFamilies, theme, type ColorToken } from '../theme';
import type { Programme } from '../types/programme';
import { getName } from '../utils/lang';

type DetailRouteProp = RouteProp<ProgrammesStackParamList, 'ProgrammeDetail'>;
type DetailNavProp = NativeStackNavigationProp<
  ProgrammesStackParamList,
  'ProgrammeDetail'
>;

export function ProgrammeDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<DetailNavProp>();
  const parentNavigation =
    navigation.getParent<BottomTabNavigationProp<MainTabParamList>>();

  const programme = (awsarData.programmes as Programme[]).find(
    (p) => p.id === route.params?.id
  );

  if (!programme) {
    return (
      <View style={styles.notFoundContainer}>
        <Text variant="headlineMd" color="primary">
          Programme Not Found
        </Text>
        <Text variant="bodyMd" color="textSecondary" style={styles.notFoundText}>
          The requested programme could not be located.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back to programmes"
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back to Programmes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const tintColor =
    programme.tint in theme.colors
      ? theme.colors[programme.tint as ColorToken]
      : theme.colors.iconNavy;

  const statIconColors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.eduanchorsTeal,
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button Row */}
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backTouchTarget}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Back to programmes"
          >
            <Ionicons name="arrow-back" size={22} color={theme.colors.primary} />
            <Text style={styles.backRowText}>All Programmes</Text>
          </TouchableOpacity>
        </View>

        {/* Header Hero Area */}
        <View style={[styles.heroBlock, { backgroundColor: tintColor }]}>
          <View style={styles.heroContent}>
            <View style={styles.heroPill}>
              <Ionicons
                name={programme.icon as keyof typeof Ionicons.glyphMap}
                size={14}
                color="#FFFFFF"
              />
              <Text style={styles.heroPillText}>
                {getName(programme).toUpperCase()}
              </Text>
            </View>

            <Text variant="headlineLg" style={styles.heroTitle}>
              {getName(programme)}
            </Text>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-sharp"
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.locationText}>Delhi NCR & Partner Districts</Text>
            </View>
          </View>
        </View>

        {/* Impact Section */}
        <View style={styles.impactSection}>
          <View style={styles.statsRow}>
            {programme.impact.map((stat, idx) => (
              <View key={stat.label} style={styles.statCard}>
                <View
                  style={[
                    styles.statIconCircle,
                    {
                      backgroundColor:
                        idx === 1
                          ? theme.colors.iconMagenta
                          : idx === 2
                          ? theme.colors.iconTeal
                          : theme.colors.iconNavy,
                    },
                  ]}
                >
                  <Ionicons
                    name="sparkles"
                    size={14}
                    color={statIconColors[idx % statIconColors.length]}
                  />
                </View>
                <Text
                  style={[
                    styles.statNumber,
                    { color: statIconColors[idx % statIconColors.length] },
                  ]}
                >
                  {stat.value}
                </Text>
                <Text style={styles.statLabel} numberOfLines={2}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Rapid Response Banner */}
        <View style={styles.pulseCard}>
          <View style={styles.pulseLeft}>
            <View style={styles.pulseDot} />
            <View style={styles.pulseTexts}>
              <Text style={styles.pulseEyebrow}>ACTIVE RAPID RESPONSE</Text>
              <Text style={styles.pulseSub}>
                Field teams and community nodes mobilized across target clusters
              </Text>
            </View>
          </View>
        </View>

        {/* About the Initiative */}
        <Card>
          <SectionHeader
            eyebrow="OVERVIEW"
            title="About the Initiative"
            icon="information-circle"
            iconColor={theme.colors.secondary}
            iconBgColor={theme.colors.iconMagenta}
          />
          <Text variant="bodyMd" color="textSecondary" style={styles.bodyText}>
            {programme.description}
          </Text>
        </Card>

        {/* Key Pillars & Action */}
        <Card>
          <SectionHeader
            eyebrow="ACTION"
            title="Key Interventions"
            icon="shield-checkmark"
            iconColor={theme.colors.primary}
            iconBgColor={theme.colors.iconNavy}
            rightText="Core Strategy"
          />
          <View style={styles.interventionsList}>
            <View style={styles.interventionItem}>
              <View style={[styles.interventionIconCircle, { backgroundColor: theme.colors.iconNavy }]}>
                <Ionicons name="navigate" size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.interventionTexts}>
                <Text style={styles.interventionTitle}>Grassroots Delivery</Text>
                <Text style={styles.interventionDesc}>
                  Direct field outreach ensuring essential support reaches the last mile without administrative friction.
                </Text>
              </View>
            </View>

            <View style={styles.interventionItem}>
              <View style={[styles.interventionIconCircle, { backgroundColor: theme.colors.iconTeal }]}>
                <Ionicons name="people" size={16} color={theme.colors.eduanchorsTeal} />
              </View>
              <View style={styles.interventionTexts}>
                <Text style={styles.interventionTitle}>Community Safe Hubs</Text>
                <Text style={styles.interventionDesc}>
                  Locally anchored centers providing developmental guidance, counseling, and peer learning networks.
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Institutional Synergy */}
        <View style={styles.synergyCard}>
          <View style={styles.synergyHeader}>
            <Ionicons name="business" size={18} color={theme.colors.primary} />
            <Text style={styles.synergyTitle}>Institutional Synergy</Text>
          </View>
          <Text style={styles.synergyText}>
            AWSAR India coordinates with statutory child welfare bodies, local administration, and verified NGO partners to ensure transparent governance and lasting impact.
          </Text>
          <View style={styles.synergyChips}>
            <Chip label="Statutory Accredited" icon="checkmark-circle" iconColor={theme.colors.eduanchorsTeal} />
            <Chip label="Field Verified" icon="checkmark-circle" iconColor={theme.colors.eduanchorsTeal} />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.volunteerButton}
          activeOpacity={0.8}
          onPress={() => parentNavigation?.navigate('GetInvolved')}
          accessibilityRole="button"
          accessibilityLabel="Volunteer for programme"
        >
          <Ionicons
            name="people-outline"
            size={18}
            color={theme.colors.textPrimary}
          />
          <Text style={styles.volunteerText}>Volunteer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportButton}
          activeOpacity={0.85}
          onPress={() => parentNavigation?.navigate('GetInvolved')}
          accessibilityRole="button"
          accessibilityLabel="Support this programme"
        >
          <Ionicons name="heart" size={18} color="#FFFFFF" />
          <Text style={styles.supportText}>Support Programme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    paddingBottom: 90,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  notFoundText: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    minHeight: 48,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fontFamilies.interSemiBold,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTouchTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    gap: 6,
    paddingRight: 12,
  },
  backRowText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.primary,
  },
  heroBlock: {
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    overflow: 'hidden',
  },
  heroContent: {
    gap: 8,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heroPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interBold,
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: theme.colors.primary,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textSecondary,
  },
  impactSection: {
    width: '100%',
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
    minHeight: 106,
    ...theme.shadows.level1,
  },
  statIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fontFamilies.interBold,
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  pulseCard: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.radius.md,
    padding: 14,
  },
  pulseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondary,
  },
  pulseTexts: {
    flex: 1,
  },
  pulseEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interBold,
    letterSpacing: 0.6,
    color: theme.colors.primaryFixedDim,
  },
  pulseSub: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.interMedium,
    color: '#FFFFFF',
    marginTop: 2,
  },
  bodyText: {
    marginTop: 12,
    lineHeight: 22,
  },
  interventionsList: {
    gap: 12,
    marginTop: 14,
  },
  interventionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  interventionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  interventionTexts: {
    flex: 1,
  },
  interventionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
  },
  interventionDesc: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  synergyCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: 16,
    gap: 10,
  },
  synergyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  synergyTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
  },
  synergyText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textSecondary,
  },
  synergyChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...theme.shadows.level2,
  },
  volunteerButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  volunteerText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.textPrimary,
  },
  supportButton: {
    flex: 1.4,
    minHeight: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  supportText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fontFamilies.interSemiBold,
    color: '#FFFFFF',
  },
});
