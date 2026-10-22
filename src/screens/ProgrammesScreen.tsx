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

import awsarData from '../data/awsar.json';
import { Card } from '../components/Card';
import { Text } from '../components/Text';
import type { ProgrammesStackParamList } from '../navigation/types';
import { fontFamilies, theme, type ColorToken } from '../theme';
import type { Programme } from '../types/programme';
import { getName } from '../utils/lang';

type ProgrammesScreenNavigationProp = NativeStackNavigationProp<
  ProgrammesStackParamList,
  'ProgrammesList'
>;

export function ProgrammesScreen() {
  const navigation = useNavigation<ProgrammesScreenNavigationProp>();
  const programmes = awsarData.programmes as Programme[];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.pill}>
        <View style={styles.magentaDot} />
        <Text style={styles.pillText}>WHAT WE DO</Text>
      </View>
      <Text variant="headlineLg" color="primary" style={styles.title}>
        Our 9 Core Programmes
      </Text>
      <Text variant="bodyMd" color="textSecondary" style={styles.intro}>
        Holistic grassroots interventions driving sustainable community transformation
        across rural and peri-urban India.
      </Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Programme; index: number }) => {
    const tintColor =
      item.tint in theme.colors
        ? theme.colors[item.tint as ColorToken]
        : theme.colors.iconNavy;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProgrammeDetail', { id: item.id })}
        accessibilityRole="button"
        accessibilityLabel={`${getName(item)} details`}
        style={styles.touchable}
      >
        <Card style={styles.card}>
          <View style={styles.cardRow}>
            <View style={[styles.iconSquare, { backgroundColor: tintColor }]}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.metaRow}>
                <Text style={styles.pillarNumber}>{`Pillar 0${index + 1}`}</Text>
                <View style={styles.metaDot} />
                <Text style={styles.metaTag}>Active Focus</Text>
              </View>

              <Text style={styles.cardName} numberOfLines={1}>
                {getName(item)}
              </Text>

              <Text style={styles.cardSummary} numberOfLines={2}>
                {item.summary}
              </Text>
            </View>

            <View style={styles.chevronWrapper}>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.colors.textMuted}
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={programmes}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
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
  listContent: {
    padding: theme.spacing.lg,
    paddingBottom: 28,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  magentaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.secondary,
  },
  pillText: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.primary,
  },
  title: {
    marginTop: 8,
  },
  intro: {
    marginTop: 6,
    lineHeight: 22,
  },
  separator: {
    height: 12,
  },
  touchable: {
    minHeight: 48,
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
  cardDetails: {
    flex: 1,
    minWidth: 0,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  pillarNumber: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interMedium,
    color: theme.colors.textMuted,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: theme.colors.textMuted,
  },
  metaTag: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.interSemiBold,
    color: theme.colors.eduanchorsTeal,
  },
  cardName: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fontFamilies.interBold,
    color: theme.colors.textPrimary,
  },
  cardSummary: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: fontFamilies.interRegular,
    color: theme.colors.textSecondary,
    marginTop: 3,
  },
  chevronWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
