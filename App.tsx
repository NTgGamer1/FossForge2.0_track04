import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NotoSansDevanagari_400Regular, NotoSansDevanagari_600SemiBold, NotoSansDevanagari_700Bold } from '@expo-google-fonts/noto-sans-devanagari';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from './src/components/Text';
import { theme, type ColorToken, type TypographyVariant } from './src/theme';

const previewColors: ColorToken[] = ['primary', 'secondary', 'eduanchorsTeal', 'background', 'textPrimary', 'textSecondary', 'urgentHelpline', 'iconNavy', 'iconMagenta', 'iconTeal'];
const previewVariants: TypographyVariant[] = ['displayLg', 'displayMd', 'headlineLg', 'headlineMd', 'titleSm', 'bodyLg', 'bodyMd', 'bodySm', 'labelLg', 'labelMd', 'labelSm', 'devanagariBody', 'devanagariLabel'];

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, NotoSansDevanagari_400Regular, NotoSansDevanagari_600SemiBold, NotoSansDevanagari_700Bold });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="displayMd">AWSAR India</Text>
        <Text color="textSecondary" style={styles.intro}>Theme foundation preview</Text>
        <Text variant="labelMd" color="textMuted" style={styles.sectionLabel}>COLOUR SWATCHES</Text>
        <View style={styles.swatchGrid}>
          {previewColors.map((color) => <View key={color} style={styles.swatch}>
            <View style={[styles.swatchColor, { backgroundColor: theme.colors[color] }]} />
            <Text variant="labelSm" numberOfLines={1}>{color}</Text>
            <Text variant="bodySm" color="textMuted">{theme.colors[color]}</Text>
          </View>)}
        </View>
        <Text variant="labelMd" color="textMuted" style={styles.sectionLabel}>TYPE SCALE</Text>
        <View style={styles.typeCard}>
          {previewVariants.map((variant) => <View key={variant} style={styles.typeRow}>
            <Text variant="labelSm" color="textMuted" style={styles.variantName}>{variant}</Text>
            <Text variant={variant}>{variant.startsWith('devanagari') ? 'अवसर सबके लिए' : 'Creating opportunities'}</Text>
          </View>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.lg, paddingBottom: theme.spacing.xxxl },
  intro: { marginTop: theme.spacing.xs },
  sectionLabel: { marginTop: theme.spacing.xxl, marginBottom: theme.spacing.sm },
  swatchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
  swatch: { width: '30.8%', minHeight: 92, padding: theme.spacing.sm, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.surfaceCard, ...theme.shadows.level1 },
  swatchColor: { height: 28, borderRadius: theme.radius.sm, marginBottom: theme.spacing.sm },
  typeCard: { padding: theme.spacing.lg, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.surfaceCard, ...theme.shadows.level1 },
  typeRow: { paddingVertical: theme.spacing.sm, borderBottomWidth: 1, borderBottomColor: theme.colors.surfaceSubtle },
  variantName: { marginBottom: theme.spacing.xs },
});
