import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useContent } from '../hooks/useContent';
import { useTranslation } from '../i18n/t';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { EduanchorItem } from '../types/content';

type FilterType = 'all' | 'scholarship' | 'mentorship' | 'internship' | 'job';

const typePillColor: Record<string, string> = {
  scholarship: '#FFF4DE',
  mentorship: '#E4F7F0',
  internship: '#E8F0FB',
  job: '#FCE8F1',
};

const typePillText: Record<string, string> = {
  scholarship: '#D97706',
  mentorship: theme.colors.eduanchorsTeal,
  internship: theme.colors.primary,
  job: theme.colors.secondary,
};

function OpportunityCard({
  item,
  bookmarks,
  onToggleBookmark,
  applyEmail,
  applyBase,
  applyText,
  sampleText,
}: {
  item: EduanchorItem;
  bookmarks: Set<string>;
  onToggleBookmark: (id: string) => void;
  applyEmail: string;
  applyBase: string;
  applyText: string;
  sampleText: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isBookmarked = bookmarks.has(item.id);

  function handleApply() {
    if (item.type === 'scholarship' || item.type === 'mentorship') {
      Linking.openURL(applyBase);
    } else {
      const subject = encodeURIComponent(`Application: ${item.title}`);
      const body = encodeURIComponent(
        'Name:\nEmail:\nPhone:\nCollege/Experience:\nAvailability:',
      );
      Linking.openURL(`mailto:${applyEmail}?subject=${subject}&body=${body}`);
    }
  }

  return (
    <Card style={styles.oppCard}>
      {/* Header row */}
      <View style={styles.oppHeader}>
        <View style={[styles.typePill, { backgroundColor: typePillColor[item.type] ?? theme.colors.surfaceSubtle }]}>
          <Text style={[styles.typePillText, { color: typePillText[item.type] ?? theme.colors.textPrimary }]}>
            {item.tag ?? item.type.toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onToggleBookmark(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={isBookmarked ? theme.colors.secondary : theme.colors.textMuted}
          />
        </TouchableOpacity>
      </View>

      {item.placeholder && (
        <View style={styles.sampleLabel}>
          <Ionicons name="information-circle-outline" size={12} color={theme.colors.textMuted} />
          <Text style={styles.sampleLabelText}>{sampleText}</Text>
        </View>
      )}

      <Text variant="titleSm" color="textPrimary">{item.title}</Text>
      <Text variant="bodySm" color="textSecondary">{item.org}</Text>

      {/* Highlight row */}
      <View style={styles.metaRow}>
        <Ionicons name={(item.highlightIcon as keyof typeof Ionicons.glyphMap) ?? 'time-outline'} size={14} color={theme.colors.textMuted} />
        <Text style={styles.metaText}>{item.highlight}</Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name={(item.detailIcon as keyof typeof Ionicons.glyphMap) ?? 'school-outline'} size={14} color={theme.colors.textMuted} />
        <Text style={styles.metaText}>{item.detail}</Text>
      </View>

      {/* Expandable description */}
      {item.text && (
        <>
          {expanded && (
            <Text variant="bodyMd" color="textSecondary" style={styles.expandedText}>
              {item.text}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.readMore}>{expanded ? 'Show less ↑' : 'Read more ↓'}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={handleApply}
        accessibilityRole="button"
        accessibilityLabel={applyText}
      >
        <Text style={styles.applyBtnText}>{applyText} →</Text>
      </TouchableOpacity>
    </Card>
  );
}

export function OpportunitiesScreen() {
  const { eduanchors, lang } = useContent();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showProcess, setShowProcess] = useState(false);

  const filters: FilterType[] = ['all', 'scholarship', 'mentorship', 'internship', 'job'];

  const typeLabels: Record<FilterType, string> = {
    all: t('opportunities.all'),
    scholarship: t('opportunities.scholarships'),
    mentorship: t('opportunities.mentorships'),
    internship: t('opportunities.internships'),
    job: t('opportunities.jobs'),
  };

  const counts = useMemo(() => {
    const all = eduanchors.items.length;
    const scholarship = eduanchors.items.filter((i) => i.type === 'scholarship').length;
    const mentorship = eduanchors.items.filter((i) => i.type === 'mentorship').length;
    const internship = eduanchors.items.filter((i) => i.type === 'internship').length;
    const job = eduanchors.items.filter((i) => i.type === 'job').length;
    return { all, scholarship, mentorship, internship, job };
  }, [eduanchors.items]);

  const filtered = useMemo(() => {
    let items = eduanchors.items;
    if (filter !== 'all') items = items.filter((i) => i.type === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.org.toLowerCase().includes(q) ||
          i.detail.toLowerCase().includes(q) ||
          (i.text ?? '').toLowerCase().includes(q),
      );
    }
    return items;
  }, [filter, query, eduanchors.items]);

  function toggleBookmark(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const isHi = lang === 'hi';

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          {/* Header card */}
          <Card leftAccentColor={theme.colors.eduanchorsTeal}>
            <View style={styles.headerTopRow}>
              <View style={styles.tealPill}>
                <Ionicons name="school" size={12} color={theme.colors.eduanchorsTeal} />
                <Text style={styles.tealPillText}>EDUANCHORS</Text>
              </View>
            </View>
            <Text variant="headlineMd" color="textPrimary" style={styles.headerTitle}>
              {t('opportunities.title')}
            </Text>
            <Text variant="bodyMd" color="textSecondary">
              {`${t('opportunities.subtitle')} ${counts.all} ${isHi ? 'अवसर उपलब्ध।' : 'listings.'}`}
            </Text>
          </Card>

          {/* Search bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={theme.colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('opportunities.searchPlaceholder')}
              placeholderTextColor={theme.colors.textMuted}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              accessibilityLabel={t('opportunities.searchPlaceholder')}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close-circle" size={16} color={theme.colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
            {filters.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => {
                  setFilter(f);
                  if (f === 'internship') setShowProcess(true);
                  else setShowProcess(false);
                }}
                style={[styles.filterChip, filter === f && styles.filterChipActive]}
                accessibilityRole="button"
                accessibilityLabel={typeLabels[f]}
              >
                <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>
                  {typeLabels[f]} ({counts[f]})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      }
      renderItem={({ item }) => (
        <OpportunityCard
          item={item}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          applyEmail={eduanchors.applyEmail}
          applyBase={eduanchors.applyBase}
          applyText={t('opportunities.applyNow')}
          sampleText={t('opportunities.sampleLabel')}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="search" size={40} color={theme.colors.textMuted} />
          <Text variant="bodyMd" color="textMuted" style={styles.emptyText}>{t('opportunities.noResults')}</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {/* Process steps (shown when Internships filter active) */}
          {showProcess && (
            <Card style={styles.processCard}>
              <Text style={styles.processTitle}>{t('opportunities.process')}</Text>
              {eduanchors.process.map((step) => (
                <View key={step.n} style={styles.processStep}>
                  <View style={styles.processNum}>
                    <Text style={styles.processNumText}>{step.n}</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processStepTitle}>{step.title}</Text>
                    <Text variant="bodySm" color="textSecondary">{step.text}</Text>
                  </View>
                </View>
              ))}
            </Card>
          )}

          {/* Perks */}
          <Card>
            <Text style={styles.processTitle}>{t('opportunities.perks')}</Text>
            <View style={styles.perksWrap}>
              {eduanchors.perks.map((perk) => (
                <Chip key={perk} label={perk} icon="checkmark-circle-outline" iconColor={theme.colors.eduanchorsTeal} backgroundColor={theme.colors.iconTeal} textColor={theme.colors.eduanchorsTeal} />
              ))}
            </View>
          </Card>

          {/* Help card */}
          <Card leftAccentColor={theme.colors.primary}>
            <Text style={styles.processTitle}>{t('opportunities.help')}</Text>
            <Text variant="bodySm" color="textSecondary" style={styles.helpText}>
              {isHi
                ? 'आवेदन और पात्रता पर मार्गदर्शन के लिए हमारी टीम से संपर्क करें।'
                : 'Reach out to our team for guidance on applications and eligibility.'}
            </Text>
            <View style={styles.helpRow}>
              <TouchableOpacity
                style={styles.helpBtn}
                onPress={() => Linking.openURL('tel:+919891625350')}
                accessibilityRole="button"
                accessibilityLabel={t('opportunities.helpCall')}
              >
                <Ionicons name="call-outline" size={14} color={theme.colors.primary} />
                <Text style={styles.helpBtnText}>+91 98916 25350</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.helpBtn}
                onPress={() => Linking.openURL('mailto:support@awsarindia.org')}
                accessibilityRole="button"
                accessibilityLabel={t('opportunities.helpEmail')}
              >
                <Ionicons name="mail-outline" size={14} color={theme.colors.primary} />
                <Text style={styles.helpBtnText}>support@awsarindia.org</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  listHeader: { gap: 12, marginBottom: 4 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  tealPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.iconTeal, borderRadius: theme.radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  tealPillText: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.eduanchorsTeal, letterSpacing: 0.5 },
  headerTitle: { marginBottom: 4 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, paddingHorizontal: 12, paddingVertical: 10, minHeight: 48 },
  searchInput: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interRegular, color: theme.colors.textPrimary, padding: 0 },
  filtersRow: { gap: 8, paddingBottom: 2 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radius.full, backgroundColor: theme.colors.surfaceSubtle, minHeight: 36, justifyContent: 'center' },
  filterChipActive: { backgroundColor: theme.colors.primary },
  filterChipText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textSecondary },
  filterChipTextActive: { color: '#FFFFFF' },
  oppCard: { gap: 8 },
  oppHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  typePill: { borderRadius: theme.radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  typePillText: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, letterSpacing: 0.4 },
  sampleLabel: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sampleLabelText: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted, fontStyle: 'italic' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary, flex: 1 },
  expandedText: { marginTop: 4 },
  readMore: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.primary },
  applyBtn: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  applyBtnText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },
  separator: { height: 0 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48, gap: 12 },
  emptyText: { textAlign: 'center' },
  footer: { gap: 12, marginTop: 4 },
  processCard: { gap: 12 },
  processTitle: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary, letterSpacing: 0.4, textTransform: 'uppercase' },
  processStep: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  processNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  processNumText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interBold, color: '#FFFFFF' },
  processContent: { flex: 1, gap: 2 },
  processStepTitle: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textPrimary },
  perksWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  helpText: { marginBottom: 8 },
  helpRow: { gap: 8 },
  helpBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.surfaceCard, minHeight: 44 },
  helpBtnText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.primary, flex: 1 },
});
