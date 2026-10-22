import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useContent } from '../hooks/useContent';
import { useTranslation } from '../i18n/t';
import { getName } from '../utils/lang';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { ProgrammesStackParamList } from '../navigation/types';
import type { Programme } from '../types/content';

type NavProp = NativeStackNavigationProp<ProgrammesStackParamList, 'ProgrammesList'>;

const tintMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: theme.colors.iconBlue, icon: theme.colors.primary },
  red: { bg: theme.colors.iconRed, icon: theme.colors.urgentHelpline },
  green: { bg: theme.colors.iconTeal, icon: theme.colors.eduanchorsTeal },
  pink: { bg: theme.colors.iconMagenta, icon: theme.colors.secondary },
  amber: { bg: theme.colors.iconAmber, icon: '#D97706' },
  purple: { bg: theme.colors.iconPurple, icon: '#7C3AED' },
};

function getTint(tint: string) {
  return tintMap[tint] ?? tintMap.blue;
}

function ProgrammeCard({ item, lang }: { item: Programme; lang: 'en' | 'hi' }) {
  const navigation = useNavigation<NavProp>();
  const { bg, icon } = getTint(item.tint);
  const displayName = getName(item, lang);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => navigation.navigate('ProgrammeDetail', { id: item.id })}
      accessibilityRole="button"
      accessibilityLabel={displayName}
    >
      <Card style={styles.card}>
        <View style={styles.cardRow}>
          <View style={[styles.iconSquare, { backgroundColor: bg }]}>
            <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={22} color={icon} />
          </View>
          <View style={styles.cardText}>
            <Text variant="titleSm" color="textPrimary" numberOfLines={2}>
              {displayName}
            </Text>
            <Text variant="bodySm" color="textSecondary" numberOfLines={2} style={styles.summary}>
              {item.summary}
            </Text>
            {item.impact.length > 0 && (
              <Text style={styles.impactPill}>
                {item.impact[0].value} {item.impact[0].label}
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function ListHeader({ count, impactQuote, lang }: { count: number; impactQuote: string; lang: 'en' | 'hi' }) {
  const { awsar } = useContent();
  const { t } = useTranslation();
  const isHi = lang === 'hi';

  const introText = isHi
    ? `अवसर ${count} कार्यक्रम क्षेत्रों में कार्य करता है — अनुसंधान और शिक्षा से लेकर बाल संरक्षण, स्वास्थ्य और महिला सशक्तिकरण तक।`
    : `AWSAR works across ${count} programme areas — from research and education to child protection, health, and women's empowerment.`;

  return (
    <View style={styles.listHeader}>
      <SectionHeader
        eyebrow={t('programmes.eyebrow')}
        title={t('programmes.title')}
        icon="grid"
        iconColor={theme.colors.primary}
        iconBgColor={theme.colors.iconNavy}
      />
      <Text variant="bodyMd" color="textSecondary" style={styles.intro}>
        {introText}
      </Text>

      {/* Impact row */}
      <View style={styles.impactSection}>
        <SectionHeader
          eyebrow={t('home.impactEyebrow')}
          title={t('home.impactTitle')}
          icon="stats-chart"
          iconColor={theme.colors.secondary}
          iconBgColor={theme.colors.iconMagenta}
        />
        <View style={styles.impactGrid}>
          {awsar.stats.impact.map((stat, i) => (
            <View key={i} style={styles.impactItem}>
              <Ionicons name={stat.icon as keyof typeof Ionicons.glyphMap} size={16} color={theme.colors.primary} />
              <Text style={styles.impactValue}>{stat.value}</Text>
              <Text style={styles.impactText} numberOfLines={3}>{stat.text}</Text>
            </View>
          ))}
        </View>
        <Text variant="bodySm" color="textSecondary" style={styles.impactQuote}>
          {impactQuote}
        </Text>
      </View>
    </View>
  );
}

export function ProgrammesScreen() {
  const { awsar, lang } = useContent();
  const programmes = awsar.programmes;

  return (
    <FlatList
      data={programmes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProgrammeCard item={item} lang={lang} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <ListHeader count={programmes.length} impactQuote={awsar.stats.impactQuote} lang={lang} />
      }
      contentContainerStyle={styles.content}
      style={styles.screen}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 0,
  },
  listHeader: {
    marginBottom: 12,
    gap: 12,
  },
  intro: {
    marginTop: 4,
  },
  card: {
    padding: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconSquare: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  summary: {
    marginTop: 2,
  },
  impactPill: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.eduanchorsTeal,
  },
  separator: {
    height: 12,
  },
  impactSection: {
    gap: 12,
    marginTop: 8,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  impactItem: {
    width: '47.5%',
    backgroundColor: theme.colors.surfaceCard,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    padding: 10,
    gap: 4,
    ...theme.shadows.level1,
  },
  impactValue: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.primary,
  },
  impactText: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textSecondary,
  },
  impactQuote: {
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
