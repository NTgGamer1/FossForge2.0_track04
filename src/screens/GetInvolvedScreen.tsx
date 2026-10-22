import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useContent } from '../hooks/useContent';
import { useTranslation } from '../i18n/t';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { Text } from '../components/Text';
import { fontFamilies, theme } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import type { AuthStackParamList } from '../navigation/types';

type Section = 'donate' | 'volunteer' | 'partner' | 'contact';

function useForm(isHi: boolean) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setValue(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate(requiredFields: string[]): boolean {
    const newErrors: Record<string, string> = {};
    for (const f of requiredFields) {
      if (!values[f] || values[f].trim() === '') {
        newErrors[f] = isHi ? 'यह फ़ील्ड आवश्यक है' : 'This field is required';
      }
    }
    const emailField = Object.keys(values).find((field) => field === 'Email' || field === 'ईमेल');
    const email = emailField ? values[emailField]?.trim() : '';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors[emailField!] = isHi ? 'कृपया एक मान्य ईमेल पता दर्ज करें' : 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return { values, errors, setValue, validate };
}

function FormField({
  label,
  required,
  multiline,
  values,
  errors,
  setValue,
}: {
  label: string;
  required?: boolean;
  multiline?: boolean;
  values: Record<string, string>;
  errors: Record<string, string>;
  setValue: (field: string, value: string) => void;
}) {
  const cleanLabel = label.replace('*', '').trim();
  const isRequired = required ?? label.includes('*');
  const hasError = !!errors[cleanLabel];
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>
        {cleanLabel}
        {isRequired && <Text style={styles.fieldRequired}> *</Text>}
      </Text>
      <TextInput
        style={[styles.fieldInput, multiline && styles.fieldInputMulti, hasError && styles.fieldInputError]}
        value={values[cleanLabel] ?? ''}
        onChangeText={(v) => setValue(cleanLabel, v)}
        placeholder={cleanLabel}
        placeholderTextColor={theme.colors.textMuted}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        accessibilityLabel={cleanLabel}
        returnKeyType={multiline ? 'default' : 'next'}
      />
      {hasError && <Text style={styles.fieldError}>{errors[cleanLabel]}</Text>}
    </View>
  );
}

function DonateSection() {
  const { awsar, lang } = useContent();
  const { t } = useTranslation();
  const { involve } = awsar;
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const isHi = lang === 'hi';

  return (
    <View style={styles.sectionBody}>
      <Card>
        <SectionHeader
          eyebrow={isHi ? 'सकारात्मक बदलाव लाएं' : 'Make a Difference'}
          title={t('involve.donate')}
          icon="heart"
          iconColor={theme.colors.secondary}
          iconBgColor={theme.colors.iconMagenta}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.intro}>
          {involve.donateIntro}
        </Text>
      </Card>

      {involve.donateTiers.map((tier, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedTier(selectedTier === i ? null : i)}
          accessibilityRole="button"
          accessibilityLabel={tier.title}
        >
          <Card
            style={[styles.tierCard, selectedTier === i && styles.tierCardSelected]}
            leftAccentColor={selectedTier === i ? theme.colors.secondary : undefined}
          >
            <View style={styles.tierRow}>
              <View style={styles.tierLeft}>
                <Text style={styles.tierAmount}>{tier.amount}</Text>
                <Text variant="titleSm" color="textPrimary">{tier.title}</Text>
                <Text variant="bodySm" color="textSecondary">{tier.sub}</Text>
              </View>
              <View style={[styles.tierRadio, selectedTier === i && styles.tierRadioSelected]}>
                {selectedTier === i && <View style={styles.tierRadioInner} />}
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <Card>
        <Text style={styles.donateNote}>{involve.donateNote}</Text>
      </Card>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => Linking.openURL(involve.donateUrl)}
        accessibilityRole="button"
        accessibilityLabel={t('common.donateNow')}
      >
        <Ionicons name="heart" size={16} color="#FFFFFF" />
        <Text style={styles.primaryBtnText}>{t('common.donateNow')}</Text>
      </TouchableOpacity>

      {/* Ways */}
      {involve.ways.map((w, i) => (
        <Card key={i} style={styles.wayCard}>
          <View style={styles.wayRow}>
            <View style={[styles.wayIcon, { backgroundColor: theme.colors.iconNavy }]}>
              <Ionicons name={w.icon as keyof typeof Ionicons.glyphMap} size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.wayText}>
              <Text variant="titleSm" color="textPrimary">{w.title}</Text>
              <Text variant="bodySm" color="textSecondary">{w.text}</Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}

function VolunteerSection() {
  const { awsar, lang } = useContent();
  const { t } = useTranslation();
  const { volunteer } = awsar.involve;
  const isHi = lang === 'hi';
  const form = useForm(isHi);
  const requiredFields = volunteer.formFields
    .filter((field) => field.includes('*'))
    .map((field) => field.replace('*', '').trim());
  const volunteerRequiredFields = isHi
    ? requiredFields
    : ['Full name', 'Email', 'Phone', 'City / Location', 'Area of interest', 'Availability', 'Why do you want to volunteer with AWSAR?'];

  function handleSubmit() {
    if (!form.validate(volunteerRequiredFields)) return;
    const body = volunteer.formFields
      .map((f) => `${f.replace('*', '').trim()}: ${form.values[f.replace('*', '').trim()] ?? ''}`)
      .join('\n');
    Linking.openURL(
      `mailto:support@awsarindia.org?subject=Volunteer Application&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <View style={styles.sectionBody}>
      <Card>
        <SectionHeader
          eyebrow={isHi ? 'अपना समय दें' : 'Give Your Time'}
          title={volunteer.title}
          icon="hand-left"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.intro}>{volunteer.intro}</Text>
      </Card>

      {/* Facts */}
      <View style={styles.factsRow}>
        {volunteer.facts.map((f, i) => (
          <View key={i} style={styles.factCard}>
            <Text style={styles.factValue}>{f.v}</Text>
            <Text style={styles.factLabel}>{f.l}</Text>
          </View>
        ))}
      </View>

      {/* Areas */}
      {volunteer.areas.map((area, i) => (
        <Card key={i} leftAccentColor={theme.colors.eduanchorsTeal} style={styles.areaCard}>
          <Text variant="titleSm" color="textPrimary">{area.title}</Text>
          <Text variant="bodySm" color="textSecondary">{area.text}</Text>
        </Card>
      ))}

      {/* Commitment */}
      <Card>
        <View style={styles.commitRow}>
          <Ionicons name="time-outline" size={18} color={theme.colors.primary} />
          <Text variant="bodySm" color="textSecondary" style={styles.commitText}>{volunteer.commitment}</Text>
        </View>
      </Card>

      {/* Form */}
      <Card>
        <Text style={styles.formTitle}>{isHi ? 'स्वयंसेवा के लिए आवेदन करें' : 'Apply to Volunteer'}</Text>
        {volunteer.formFields.map((field) => (
          <FormField
            key={field}
            label={field}
            multiline={field.includes('Why') || field.includes('क्यों')}
            values={form.values}
            errors={form.errors}
            setValue={form.setValue}
          />
        ))}
        <Text variant="bodySm" color="textMuted" style={styles.respondText}>{volunteer.respond}</Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel={t('common.prepareApplication')}
        >
          <Text style={styles.primaryBtnText}>{t('common.prepareApplication')}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

function PartnerSection() {
  const { awsar, lang } = useContent();
  const { t } = useTranslation();
  const { partnerForm, ways } = awsar.involve;
  const isHi = lang === 'hi';
  const form = useForm(isHi);

  function handleSend() {
    if (!form.validate(isHi ? ['नाम', 'ईमेल'] : ['Name', 'Email'])) return;
    const body = partnerForm.fields
      .map((f) => `${f.replace('*', '').trim()}: ${form.values[f.replace('*', '').trim()] ?? ''}`)
      .join('\n');
    Linking.openURL(
      `mailto:support@awsarindia.org?subject=Partnership Enquiry&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <View style={styles.sectionBody}>
      <Card>
        <SectionHeader
          eyebrow={isHi ? 'हमारे साथ काम करें' : 'Work With Us'}
          title={isHi ? 'अवसर के साथ साझेदारी करें' : 'Partner with AWSAR'}
          icon="business"
          iconColor={theme.colors.primary}
          iconBgColor={theme.colors.iconNavy}
        />
        <Text variant="bodyMd" color="textSecondary" style={styles.intro}>
          {isHi
            ? 'हम सरकारों, फाउंडेशनों, कॉर्पोरेट्स, शैक्षणिक संस्थानों और नागरिक समाज के साथ साझेदारी का स्वागत करते हैं।'
            : 'We welcome partnerships with governments, foundations, corporates, academic institutions, and civil society.'}
        </Text>
      </Card>

      {ways.slice(0, 2).map((w, i) => (
        <Card key={i} style={styles.wayCard}>
          <View style={styles.wayRow}>
            <View style={[styles.wayIcon, { backgroundColor: theme.colors.iconNavy }]}>
              <Ionicons name={w.icon as keyof typeof Ionicons.glyphMap} size={18} color={theme.colors.primary} />
            </View>
            <View style={styles.wayText}>
              <Text variant="titleSm" color="textPrimary">{w.title}</Text>
              <Text variant="bodySm" color="textSecondary">{w.text}</Text>
            </View>
          </View>
        </Card>
      ))}

      <Card>
        <Text style={styles.formTitle}>{isHi ? 'साझेदारी पूछताछ भेजें' : 'Send a Partnership Enquiry'}</Text>
        {partnerForm.fields.map((field) => (
          <FormField
            key={field}
            label={field}
            multiline={field.toLowerCase().includes('message') || field.includes('संदेश')}
            values={form.values}
            errors={form.errors}
            setValue={form.setValue}
          />
        ))}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSend}
          accessibilityRole="button"
          accessibilityLabel={t('common.sendEnquiry')}
        >
          <Text style={styles.primaryBtnText}>{t('common.sendEnquiry')}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

function ContactSection() {
  const { awsar, lang } = useContent();
  const { t } = useTranslation();
  const { contact, involve } = awsar;
  const isHi = lang === 'hi';
  const form = useForm(isHi);

  function handleSend() {
    const requiredFields = isHi
      ? ['पूरा नाम', 'ईमेल', 'पूछताछ का प्रकार', 'संदेश']
      : ['Full name', 'Email', 'Inquiry type', 'Message'];
    if (!form.validate(requiredFields)) return;
    const body = involve.contactForm.fields
      .map((f) => `${f.replace('*', '').trim()}: ${form.values[f.replace('*', '').trim()] ?? ''}`)
      .join('\n');
    Linking.openURL(
      `mailto:${contact.email}?subject=Enquiry from App&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <View style={styles.sectionBody}>
      {contact.offices.map((office, i) => (
        <Card key={i}>
          <Text variant="titleSm" color="textPrimary">{office.name}</Text>
          {office.note && <Text variant="bodySm" color="textMuted">{office.note}</Text>}
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://maps.google.com/?q=${encodeURIComponent(office.address)}`,
              )
            }
            accessibilityRole="button"
            accessibilityLabel={isHi ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}
            style={styles.officeAddressBtn}
          >
            <Ionicons name="location-outline" size={14} color={theme.colors.primary} />
            <Text style={styles.officeAddress}>{office.address}</Text>
          </TouchableOpacity>
          <View style={styles.officeActionsRow}>
            <TouchableOpacity
              style={styles.officeBtn}
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              accessibilityRole="button"
              accessibilityLabel={t('common.call')}
            >
              <Ionicons name="call-outline" size={14} color={theme.colors.primary} />
              <Text style={styles.officeBtnText}>{t('common.call')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.officeBtn}
              onPress={() => Linking.openURL(`mailto:${office.email}`)}
              accessibilityRole="button"
              accessibilityLabel={t('common.email')}
            >
              <Ionicons name="mail-outline" size={14} color={theme.colors.primary} />
              <Text style={styles.officeBtnText}>{office.email}</Text>
            </TouchableOpacity>
          </View>
          {office.hours && (
            <Text variant="bodySm" color="textMuted">{office.hours}</Text>
          )}
        </Card>
      ))}

      <Card>
        <Text style={styles.formTitle}>{isHi ? 'एक संदेश भेजें' : 'Send a Message'}</Text>
        {involve.contactForm.fields.map((field) => (
          <FormField
            key={field}
            label={field}
            multiline={field.toLowerCase().includes('message') || field.includes('संदेश')}
            values={form.values}
            errors={form.errors}
            setValue={form.setValue}
          />
        ))}
        <Text variant="bodySm" color="textMuted" style={styles.respondText}>{involve.contactForm.respond}</Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSend}
          accessibilityRole="button"
          accessibilityLabel={t('common.sendMessage')}
        >
          <Text style={styles.primaryBtnText}>{t('common.sendMessage')}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

export function GetInvolvedScreen() {
  const [section, setSection] = useState<Section>('donate');
  const { lang } = useContent();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const isHi = lang === 'hi';

  const sectionsList: { key: Section; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'donate', label: t('involve.donate'), icon: 'heart' },
    { key: 'volunteer', label: t('involve.volunteer'), icon: 'hand-left' },
    { key: 'partner', label: t('involve.partner'), icon: 'business' },
    { key: 'contact', label: t('involve.contact'), icon: 'mail' },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Section tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {sectionsList.map((s) => (
          <TouchableOpacity
            key={s.key}
            onPress={() => setSection(s.key)}
            style={[styles.tabBtn, section === s.key && styles.tabBtnActive]}
            accessibilityRole="tab"
            accessibilityLabel={s.label}
            accessibilityState={{ selected: section === s.key }}
          >
            <Ionicons
              name={s.icon}
              size={14}
              color={section === s.key ? '#FFFFFF' : theme.colors.textSecondary}
            />
            <Text style={[styles.tabBtnText, section === s.key && styles.tabBtnTextActive]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Account card */}
      {user ? (
        <TouchableOpacity
          style={styles.accountCardPlaceholder}
          onPress={() => navigation.navigate('Profile')}
          accessibilityRole="button"
          accessibilityLabel={t('involve.account')}
        >
          <View style={styles.accountAvatar}>
            <Text style={styles.accountAvatarText}>
              {user.displayName.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text variant="bodySm" color="textPrimary" style={styles.accountText}>
            {isHi ? `${user.displayName} के रूप में लॉग इन` : `Signed in as ${user.displayName}`}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      ) : (
        <View style={styles.accountCardPlaceholder}>
          <Ionicons name="person-circle-outline" size={22} color={theme.colors.textMuted} />
          <Text variant="bodySm" color="textMuted" style={styles.accountText}>
            {isHi
              ? 'बुकमार्क सहेजने और अपने आवेदनों को ट्रैक करने के लिए साइन इन करें'
              : 'Sign in to save bookmarks and track your applications'}
          </Text>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.navigate('SignIn')}
            accessibilityRole="button"
            accessibilityLabel={t('involve.signIn')}
          >
            <Text style={styles.signInBtnText}>{t('involve.signIn')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {section === 'donate' && <DonateSection />}
        {section === 'volunteer' && <VolunteerSection />}
        {section === 'partner' && <PartnerSection />}
        {section === 'contact' && <ContactSection />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  tabBar: { flexGrow: 0, backgroundColor: theme.colors.surfaceCard, borderBottomWidth: 1, borderBottomColor: theme.colors.borderSubtle },
  tabBarContent: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 6 },
  tabBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radius.full, minHeight: 36 },
  tabBtnActive: { backgroundColor: theme.colors.primary },
  tabBtnText: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textSecondary },
  tabBtnTextActive: { color: '#FFFFFF' },
  accountCardPlaceholder: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: theme.colors.surfaceSubtle, borderBottomWidth: 1, borderBottomColor: theme.colors.borderSubtle },
  accountText: { flex: 1 },
  accountAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  accountAvatarText: { color: '#FFFFFF', fontSize: 12, fontFamily: fontFamilies.interBold, lineHeight: 16 },
  signInBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: theme.radius.full, borderWidth: 1, borderColor: theme.colors.primary, minHeight: 36, justifyContent: 'center' },
  signInBtnText: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.primary },
  scrollArea: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionBody: { gap: 12 },
  intro: { marginTop: 10 },
  // Donate
  tierCard: { marginBottom: 0 },
  tierCardSelected: { borderColor: theme.colors.secondary },
  tierRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tierLeft: { gap: 2, flex: 1 },
  tierAmount: { fontSize: 20, lineHeight: 24, fontFamily: fontFamilies.interBold, color: theme.colors.secondary },
  tierRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: theme.colors.borderSubtle, alignItems: 'center', justifyContent: 'center' },
  tierRadioSelected: { borderColor: theme.colors.secondary },
  tierRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.secondary },
  donateNote: { fontSize: 12, lineHeight: 18, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, height: 48, minHeight: 48 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interSemiBold },
  wayCard: { gap: 0 },
  wayRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  wayIcon: { width: 40, height: 40, borderRadius: theme.radius.md, alignItems: 'center', justifyContent: 'center' },
  wayText: { flex: 1, gap: 2 },
  // Volunteer
  factsRow: { flexDirection: 'row', gap: 8 },
  factCard: { flex: 1, backgroundColor: theme.colors.surfaceCard, borderRadius: theme.radius.md, borderWidth: 1, borderColor: theme.colors.borderSubtle, padding: 12, alignItems: 'center', gap: 4, ...theme.shadows.level1 },
  factValue: { fontSize: 18, lineHeight: 22, fontFamily: fontFamilies.interBold, color: theme.colors.primary },
  factLabel: { fontSize: 10, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.textSecondary, textAlign: 'center' },
  areaCard: { gap: 4 },
  commitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  commitText: { flex: 1 },
  formTitle: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interBold, color: theme.colors.textPrimary, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 },
  // Form
  fieldWrapper: { gap: 4, marginBottom: 12 },
  fieldLabel: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.textPrimary },
  fieldRequired: { color: theme.colors.urgentHelpline },
  fieldInput: { borderWidth: 1, borderColor: theme.colors.borderSubtle, borderRadius: theme.radius.sm, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.interRegular, color: theme.colors.textPrimary, backgroundColor: theme.colors.surfaceCard, minHeight: 44 },
  fieldInputMulti: { height: 100, textAlignVertical: 'top' },
  fieldInputError: { borderColor: theme.colors.urgentHelpline },
  fieldError: { fontSize: 11, lineHeight: 14, fontFamily: fontFamilies.interRegular, color: theme.colors.urgentHelpline },
  respondText: { marginBottom: 8, fontStyle: 'italic' },
  // Contact
  officeAddressBtn: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 8, minHeight: 40 },
  officeAddress: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.interRegular, color: theme.colors.primary, flex: 1, textDecorationLine: 'underline' },
  officeActionsRow: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  officeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.borderSubtle, backgroundColor: theme.colors.surfaceCard, minHeight: 40 },
  officeBtnText: { fontSize: 12, lineHeight: 16, fontFamily: fontFamilies.interSemiBold, color: theme.colors.primary },
});
