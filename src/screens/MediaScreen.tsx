import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useContent } from '../hooks/useContent';
import { useTranslation } from '../i18n/t';
import { getImage } from '../data/images';
import { Card } from '../components/Card';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import type { GalleryItem } from '../types/content';

type Segment = 'news' | 'photos' | 'videos' | 'reports' | 'social';
const SEGMENTS: Segment[] = ['news', 'photos', 'videos', 'reports', 'social'];

const SOCIAL_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Facebook: 'logo-facebook',
  YouTube: 'logo-youtube',
  LinkedIn: 'logo-linkedin',
  Instagram: 'logo-instagram',
};

function NewsTab() {
  const { awsar } = useContent();
  return (
    <View style={styles.segContent}>
      {awsar.media.news.map((item, i) => (
        <Card key={i} style={styles.newsCard}>
          <Image
            source={getImage(`${item.img}.jpg`) ?? { uri: 'about:blank' }}
            style={styles.newsImg}
            accessibilityLabel={item.title}
          />
          <View style={styles.newsBody}>
            <View style={styles.newsTagRow}>
              <View style={styles.newsTagPill}>
                <Text style={styles.newsTagText}>{item.tag}</Text>
              </View>
              {item.date ? <Text style={styles.newsDate}>{item.date}</Text> : null}
            </View>
            <Text variant="titleSm" color="textPrimary" style={styles.newsTitle}>{item.title}</Text>
            <Text variant="bodySm" color="textSecondary">{item.text}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

function PhotosTab() {
  const { awsar } = useContent();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { width, height } = useWindowDimensions();
  const gallery = awsar.media.gallery;
  const lightboxImageSize = Math.max(0, Math.min(width - 32, height * 0.62));

  return (
    <View style={styles.segContent}>
      <Text variant="bodySm" color="textMuted" style={styles.photoNote}>
        {awsar.media.photoNote}
      </Text>
      <View style={styles.photoGrid}>
        {gallery.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.photoCell}
            onPress={() => setLightboxIndex(i)}
            accessibilityRole="button"
            accessibilityLabel={item.caption}
          >
            <Image
              source={getImage(`${item.img}.jpg`) ?? { uri: 'about:blank' }}
              style={styles.photoThumb}
              resizeMode="cover"
              accessibilityLabel={item.caption}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Lightbox modal */}
      <Modal
        visible={lightboxIndex !== null}
        animationType="fade"
        onRequestClose={() => setLightboxIndex(null)}
        statusBarTranslucent
      >
        <View style={styles.lightboxBg}>
          <TouchableOpacity
            style={styles.lightboxClose}
            onPress={() => setLightboxIndex(null)}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          {lightboxIndex !== null && (
            <FlatList
              data={gallery}
              horizontal
              pagingEnabled
              initialScrollIndex={lightboxIndex}
              showsHorizontalScrollIndicator={false}
              getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
              keyExtractor={(_, i) => String(i)}
              renderItem={({ item }: { item: GalleryItem }) => (
                <View style={[styles.lightboxSlide, { width }]}>
                  <Image
                    source={getImage(`${item.img}.jpg`) ?? { uri: 'about:blank' }}
                    style={[styles.lightboxImg, { width: lightboxImageSize, height: lightboxImageSize }]}
                    resizeMode="contain"
                    accessibilityLabel={item.caption}
                  />
                  <Text style={styles.lightboxCaption}>{item.caption}</Text>
                </View>
              )}
            />
          )}
          <View style={styles.lightboxNav}>
            <TouchableOpacity
              onPress={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
              style={styles.lightboxNavBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.lightboxCounter}>
              {lightboxIndex !== null ? `${lightboxIndex + 1} / ${gallery.length}` : ''}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < gallery.length - 1 ? prev + 1 : prev,
                )
              }
              style={styles.lightboxNavBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function VideosTab() {
  const { awsar } = useContent();
  return (
    <View style={styles.segContent}>
      {awsar.media.videos.map((v, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => Linking.openURL(v.url)}
          accessibilityRole="button"
          accessibilityLabel={v.title}
        >
          <Card style={styles.videoCard}>
            <View style={styles.videoThumbWrap}>
              <Image
                source={getImage(`${v.img}.jpg`) ?? { uri: 'about:blank' }}
                style={styles.videoThumb}
                accessibilityLabel={v.title}
              />
              <View style={styles.playOverlay}>
                <Ionicons name="play-circle" size={48} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.videoMeta}>
              <View style={styles.videoLabelPill}>
                <Text style={styles.videoLabelText}>{v.label}</Text>
              </View>
              <Text variant="titleSm" color="textPrimary" style={styles.videoTitle}>{v.title}</Text>
              <Text style={styles.videoUrl}>{v.url}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ReportsTab() {
  const { awsar } = useContent();
  return (
    <View style={styles.segContent}>
      {/* Credentials 2x2 */}
      <View style={styles.credGrid}>
        {awsar.media.credentials.map((c, i) => (
          <View key={i} style={styles.credCard}>
            <Ionicons name={c.icon as keyof typeof Ionicons.glyphMap} size={20} color={theme.colors.primary} />
            <Text style={styles.credTitle}>{c.title}</Text>
            <Text style={styles.credSub}>{c.sub}</Text>
          </View>
        ))}
      </View>

      {/* Reports */}
      {awsar.media.reports.map((r, i) => (
        <Card key={i} style={styles.reportRow}>
          <View style={styles.reportInfo}>
            <Ionicons name="document-text-outline" size={20} color={theme.colors.primary} />
            <View style={styles.reportText}>
              <Text variant="titleSm" color="textPrimary">{r.title}</Text>
              <Text variant="bodySm" color="textMuted">{r.sub}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.reportBtn}
            onPress={() => {
              const subject = encodeURIComponent(`Request: ${r.title}`);
              Linking.openURL(`mailto:${awsar.media.reportsEmail}?subject=${subject}`);
            }}
            accessibilityRole="button"
            accessibilityLabel={`Request ${r.title}`}
          >
            <Text style={styles.reportBtnText}>{r.action}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </View>
  );
}

function SocialTab() {
  const { awsar, lang } = useContent();
  const isHi = lang === 'hi';
  return (
    <View style={styles.segContent}>
      <Text variant="bodyMd" color="textSecondary" style={styles.followText}>
        {isHi
          ? 'कार्यक्रमों, आयोजनों और प्रभाव पर अपडेट के लिए अवसर इंडिया को सोशल मीडिया पर फॉलो करें।'
          : 'Follow AWSAR India on social media for updates on programmes, events, and impact.'}
      </Text>
      {awsar.media.social.map((s, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => Linking.openURL(s.url)}
          accessibilityRole="button"
          accessibilityLabel={`Follow on ${s.name}`}
        >
          <Card style={styles.socialCard}>
            <Ionicons
              name={SOCIAL_ICONS[s.name] ?? 'globe-outline'}
              size={24}
              color={theme.colors.primary}
            />
            <Text variant="titleSm" color="textPrimary" style={styles.socialName}>
              {s.name}
            </Text>
            <Ionicons name="open-outline" size={16} color={theme.colors.textMuted} />
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function MediaScreen() {
  const [segment, setSegment] = useState<Segment>('news');
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const segmentLabels: Record<Segment, string> = {
    news: t('media.news'),
    photos: t('media.photos'),
    videos: t('media.videos'),
    reports: t('media.reports'),
    social: t('media.social'),
  };

  const renderSegment = () => {
    switch (segment) {
      case 'news': return <NewsTab />;
      case 'photos': return <PhotosTab />;
      case 'videos': return <VideosTab />;
      case 'reports': return <ReportsTab />;
      case 'social': return <SocialTab />;
    }
  };

  return (
    <View style={[styles.screen]}>
      {/* Segmented control */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.segBar}
        contentContainerStyle={styles.segBarContent}
      >
        {SEGMENTS.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setSegment(s)}
            style={[styles.segBtn, segment === s && styles.segBtnActive]}
            accessibilityRole="tab"
            accessibilityLabel={segmentLabels[s]}
            accessibilityState={{ selected: segment === s }}
          >
            <Text style={[styles.segBtnText, segment === s && styles.segBtnTextActive]}>
              {segmentLabels[s]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {renderSegment()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  segBar: { flexGrow: 0, backgroundColor: theme.colors.surfaceCard, borderBottomWidth: 1, borderBottomColor: theme.colors.borderSubtle },
  segBarContent: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 4 },
  segBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radius.full, minHeight: 36, justifyContent: 'center' },
  segBtnActive: { backgroundColor: theme.colors.primary },
  segBtnText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textSecondary },
  segBtnTextActive: { color: '#FFFFFF' },
  scrollArea: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  segContent: { gap: 12 },
  // News
  newsCard: { gap: 0, padding: 0, overflow: 'hidden' },
  newsImg: { width: '100%', height: 180, backgroundColor: theme.colors.surfaceSubtle },
  newsBody: { padding: 14, gap: 8 },
  newsTagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  newsTagPill: { backgroundColor: theme.colors.iconNavy, borderRadius: theme.radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  newsTagText: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.primary, letterSpacing: 0.5 },
  newsDate: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted },
  newsTitle: { marginBottom: 2 },
  // Photos
  photoNote: { fontStyle: 'italic', marginBottom: 4 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 4 },
  photoCell: { width: '48%', aspectRatio: 1, borderRadius: theme.radius.sm, overflow: 'hidden' },
  photoThumb: { width: '100%', height: '100%', backgroundColor: theme.colors.surfaceSubtle },
  // Lightbox
  lightboxBg: { flex: 1, backgroundColor: '#000000', justifyContent: 'center' },
  lightboxClose: { position: 'absolute', top: 48, right: 16, zIndex: 10, padding: 8, minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  lightboxSlide: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 },
  lightboxImg: { borderRadius: theme.radius.md },
  lightboxCaption: { marginTop: 12, fontSize: 12, lineHeight: 18, fontFamily: fontFamilies.interRegular, color: 'rgba(255,255,255,0.8)', textAlign: 'center', paddingHorizontal: 8 },
  lightboxNav: { position: 'absolute', bottom: 48, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 },
  lightboxNavBtn: { padding: 8, minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  lightboxCounter: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: '#FFFFFF' },
  // Videos
  videoCard: { padding: 0, overflow: 'hidden', gap: 0 },
  videoThumbWrap: { position: 'relative' },
  videoThumb: { width: '100%', height: 180, backgroundColor: theme.colors.surfaceSubtle },
  playOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.25)' },
  videoMeta: { padding: 14, gap: 6 },
  videoLabelPill: { backgroundColor: theme.colors.iconNavy, borderRadius: theme.radius.full, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start' },
  videoLabelText: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interBold, color: theme.colors.primary, letterSpacing: 0.5 },
  videoTitle: { marginBottom: 2 },
  videoUrl: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.eduanchorsTeal },
  // Reports
  credGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  credCard: { width: '48.5%', backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, padding: 12, gap: 4, ...theme.shadows.level1 },
  credTitle: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary },
  credSub: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textMuted },
  reportRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  reportInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  reportText: { flex: 1, gap: 2 },
  reportBtn: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, paddingHorizontal: 12, paddingVertical: 8, minHeight: 40, justifyContent: 'center' },
  reportBtnText: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: '#FFFFFF' },
  // Social
  followText: { marginBottom: 4 },
  socialCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16 },
  socialName: { flex: 1 },
});
