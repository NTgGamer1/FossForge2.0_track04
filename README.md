# AWSAR India & EduAnchors Android Application

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK_57-black.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB.svg)](https://reactnative.dev/)
[![Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> A unified, production-grade Android mobile application for **AWSAR India** (*Association for Welfare, Social Action and Research India*) and **EduAnchors**, built for the **FossForge 2.0 (Track 04)** hackathon.

---

## 🌟 Executive Summary & Vision

For over 25 years (est. 2001), AWSAR India has spearheaded grassroots development across Delhi NCR and rural communities in education, child protection, maternal healthcare, women's empowerment, and empirical research. **EduAnchors** empowers youth through curated higher education grants, scholarships, mentorships, and social sector careers.

This application brings both entities into a seamless, accessible, mobile-first experience designed to empower beneficiaries, donors, volunteers, students, and institutional partners alike.

---

## 📱 Core Features & Modules

### 1. 🏠 Home & Grassroots Impact
- **Hero & Mission**: Highlighting AWSAR's 25+ years of service (*computed dynamically: `currentYear - 2001`*), tagline, and founding principles.
- **Dynamic Stats Suite**: 5 verified metrics (*12,000+ Children in education, 20,000+ Child protection, 9,000+ Women trained, 50,000+ Health outreach, 100,000+ Research coverage*) with a horizontally scrollable impact gallery.
- **Verified Governance**: Direct trust credentials — FCRA, CSR1, 12A, 80G Tax Exemption, Societies Act Delhi registration, Give.do, NGO Darpan, and GuideStar India directory listings.
- **National Child Helpline (1098)**: Prominent emergency assistance card and helpline banner with one-tap dialing (`tel:1098`) and emergency 112 routing.
- **Our Story & Interactive Timeline**: Archival narrative featuring Tara Chand’s co-founder quote and an expandable milestone timeline from 2001 to present day.
- **EduAnchors Showcase**: Integrated portal card bridging grassroots interventions with educational pathways.

### 2. 📚 Programmes & Research Portfolio
- **9 Core Thematic Areas**: Research & Analysis, Child Protection & Safety, Education & Early Childhood, Health & Mental Well-being, Women's Empowerment, Disaster Relief, Environment & Climate Resilience, Model Villages, and Technical Assistance.
- **Dedicated Programme Details**: Rich hero blocks, pastel theme tint tokens, impact statistics, key interventions, and action-oriented CTAs.
- **Research & Evidence Leadership**: Detailed case studies covering the Manesar Household Survey, HUNGaMA Nutrition Study, CHILDLINE Situational Analysis, and Jhajjar Social Impact Assessment.

### 3. 🎓 EduAnchors Opportunities & Careers
- **Live Search & Filter**: Real-time filtering across Scholarships, Mentorships, Internships, and Full-time Jobs.
- **Real Social Sector Careers**: Verified AWSAR listings for Senior Research Officers, Child Protection Managers, Communications Officers, and Field Coordinators.
- **Application Pathways**: Direct application routing via URL (`eduanchors.com`) and prefilled email intent (`support@awsarindia.org`).
- **Personalized Bookmarks**: On-device bookmarking to track opportunities of interest.
- **Candidate Journey & Perks**: 4-step recruitment process roadmap and direct support hotline (+91 98916 25350).

### 4. 📰 Media, Transparencies & Publications
- **Segmented Control**: Filter seamlessly between **News**, **Photos**, **Videos**, **Reports**, and **Social**.
- **Interactive Photo Gallery**: 2-column masonry grid with full-screen swipeable lightbox modal viewer and child safeguarding consent notices.
- **Video Library**: Curated documentary films and field work outreach videos opening directly to official channels.
- **Institutional Reports & Credentials**: 2×2 credential grid with direct email request triggers for annual audited reports.

### 5. 🤝 Get Involved & Stakeholder Collaboration
- **Donation Portal**: Multi-tier donor options (*Friend of Childhood ₹1,000, Education Champion ₹5,000/mo, Community Partner ₹10,000/mo*) with 80G tax exemption guidance.
- **Volunteer Application Hub**: Comprehensive form with multi-field validation, minimum commitment guides (4 hrs/wk, 8 wks), and direct submission routing.
- **CSR & Institutional Partnerships**: Corporate engagement pathways for research collaborations and foundation funding.
- **Contact & Regional Centers**: Full directory of registered and field offices (Delhi Registered Office, Ashok Nagar Skill Center, Dankaur Rural Development Center) with one-tap Google Maps directions and telephone dialing.

### 6. 🌐 Instant Bilingual Support (English ↔ Hindi)
- **App-Wide Toggle**: Header pill (`EN | हिं` ↔ `हिं | EN`) immediately switches all UI strings, bottom tabs, headers, cards, and data content.
- **Devanagari Typography**: Custom font loading with `@expo-google-fonts/noto-sans-devanagari` paired with `Inter` to ensure visual hierarchy and readability across both languages.
- **Persistent Preference**: Language selection is saved to device storage via `@react-native-async-storage/async-storage`.

### 7. 🔐 Authentication & Offline First State
- **Secure Context**: Local persistent authentication state with session management and user initials in the app header.
- **Guest-Friendly**: Open access to all educational, programme, and emergency helpline resources without mandatory login walls.

---

## 🛠️ Architecture & Tech Stack

```
├── App.tsx                     # App root, font loading, providers (Language, Auth, SafeArea)
├── assets/                     # App icons, splash screens, and image assets
├── src/
│   ├── components/             # Reusable UI (AppHeader, HelplineBanner, Card, Chip, SectionHeader, Text)
│   ├── contexts/               # Global state (LanguageContext, AuthContext)
│   ├── data/                   # Verified data layer (awsar.json, eduanchors.json, and Hindi equivalents)
│   ├── hooks/                  # Custom hooks (useContent for reactive bilingual content)
│   ├── i18n/                   # Translation dictionaries (en.json, hi.json, t.ts)
│   ├── navigation/             # Navigation contracts (RootNavigator bottom tabs, Programmes stack)
│   ├── screens/                # Core screens (Home, Programmes, ProgrammeDetail, Opportunities, Media, GetInvolved)
│   ├── theme/                  # Stitch Design System tokens (colors, typography, spacing, radius, shadows)
│   ├── types/                  # TypeScript interface contracts (content, programmes, eduanchors)
│   └── utils/                  # Utility helpers (language selection, string formatters)
```

- **Framework**: Expo SDK 57 (React Native 0.86, React 19)
- **Navigation**: React Navigation 7 (Native Stack & Bottom Tabs)
- **Styling**: Stitch Design System tokens with custom shadow elevations and Material 3-compatible pastel palettes
- **Typography**: Inter (400, 500, 600, 700) + Noto Sans Devanagari (400, 600, 700)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun
- Expo Go app on your physical Android device, or an Android Studio emulator

### Installation

```bash
# Clone repository
git clone https://github.com/HimanshuSingh32/FossForge2.0_track04.git
cd FossForge2.0_track04

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Metro bundler
npx expo start

# Open on Android emulator or connected device
npx expo start --android
```

Scan the terminal QR code using **Expo Go** on Android.

---

## 📦 Building Standalone APK (EAS)

The project includes an optimized `eas.json` configuration for generating standalone Android preview APKs:

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to your Expo account
eas login

# 3. Trigger cloud build for standalone APK
eas build -p android --profile preview
```

The resulting `.apk` file can be directly sideloaded and installed on any Android phone.

---

## 🧪 Quality Assurance & Verification

The codebase has undergone full static analysis and compilation checks:

```bash
# 1. TypeScript Strict Typecheck
npx tsc --noEmit

# 2. ESLint Validation
npx eslint .

# 3. Metro Production Bundling Test
npx expo export --platform android
```

All commands execute cleanly with **0 errors and 0 warnings**.

---

## 👥 Contributors & Attribution

- Built for **FossForge 2.0 (Track 04): One Android app for AWSAR India and EduAnchors**
- Content verified and aligned with official disclosures from [awsarindia.org](https://awsarindia.org) (Verified Oct 2026).
- Design system inspired by the AWSAR Stitch Mobile Design Specification.

---

\* **Disclaimer:** *This application was built as a hackathon submission and working demonstration. While engineered with high standards, production patterns, strict type-safety, and verified real-world organizational data, it may contain errors, imperfections, or placeholder assets intended for final staging and administrative review.*
