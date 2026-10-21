---
name: Social Opportunity Mobile
colors:
  surface: '#f7f9fe'
  surface-dim: '#d8dadf'
  surface-bright: '#f7f9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#eceef3'
  surface-container-high: '#e6e8ed'
  surface-container-highest: '#e0e2e7'
  on-surface: '#181c20'
  on-surface-variant: '#454650'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eff1f6'
  outline: '#757681'
  outline-variant: '#c5c5d2'
  surface-tint: '#4a5b9b'
  primary: '#000b37'
  on-primary: '#ffffff'
  primary-container: '#0a1f5e'
  on-primary-container: '#7889cd'
  inverse-primary: '#b7c4ff'
  secondary: '#b41764'
  on-secondary: '#ffffff'
  secondary-container: '#fe579d'
  on-secondary-container: '#610032'
  tertiary: '#00130d'
  on-tertiary: '#ffffff'
  tertiary-container: '#002b21'
  on-tertiary-container: '#389c81'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001552'
  on-primary-fixed-variant: '#324381'
  secondary-fixed: '#ffd9e2'
  secondary-fixed-dim: '#ffb0c9'
  on-secondary-fixed: '#3e001e'
  on-secondary-fixed-variant: '#8e004c'
  tertiary-fixed: '#94f5d6'
  tertiary-fixed-dim: '#78d8ba'
  on-tertiary-fixed: '#002018'
  on-tertiary-fixed-variant: '#005140'
  background: '#f7f9fe'
  on-background: '#181c20'
  surface-variant: '#e0e2e7'
  eduanchors-teal: '#0E9F6E'
  eduanchors-blue: '#1E3C72'
  surface-card: '#FFFFFF'
  surface-subtle: '#F0F4FA'
  text-primary: '#0B1536'
  text-secondary: '#4E5D78'
  text-muted: '#8A97AB'
  border-subtle: '#E2E8F0'
  urgent-helpline: '#E02424'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-lg: 1.25rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
---

## Brand & Style

This design system is crafted for a high-impact Indian social development organization, integrating direct NGO initiatives with educational and career opportunity pathways (EduAnchors). The brand voice balances institutional governance, trustworthiness, and grounded empathy with forward-looking youth empowerment.

The style follows **Minimalist Modern** tailored specifically for mobile touch interfaces:
- **Atmosphere:** Clean, open, purposeful, and breathable with ample whitespace to counter information fatigue.
- **Visual Stance:** Institutional integrity anchored by deep midnight navy, energized by an empathetic vibrant magenta, and contrasted with clean modern opportunity accents.
- **Experience:** High contrast readability, structured card layouts, tactile touch feedback, and seamless bilingual support (English and Hindi script harmony).

## Colors

The color palette establishes immediate clarity across non-profit mission modules and opportunity portals:

- **Primary (`#0A1F5E`):** Deep authoritative navy used for top app bars, primary brand titles, active structural navigation, and foundational identity tokens.
- **Secondary (`#D4357C`):** High-energy magenta used for crucial conversion drivers—primarily donations, active volunteer triggers, highlighted badges, and urgent calls to action.
- **Tertiary & EduAnchors Accent (`#1F8A70` / `#0E9F6E`):** Bright emerald teal signifying growth, scholarships, internships, and skill training opportunities brought via the EduAnchors module.
- **Neutral Canvas (`#F4F6FB`):** A soft, cool gray-tinted slate white that prevents screen glare in high-sunlight mobile environments while ensuring crisp elevation separation.
- **Text & Contrast:** Ultra-deep navy-black (`#0B1536`) ensures WCAG AAA contrast compliance across all text labels on card and page backgrounds.

## Typography

The typography leverages **Inter** for maximum mobile legibility across varying pixel densities and clean Devanagari script compatibility (rendering identically beside Hindi system typefaces like Noto Sans Devanagari).

- **Headlines:** Display and title treatments use tight tracking (`-0.02em`) with medium-to-bold weights to convey organizational authority without feeling heavy or academic.
- **Body:** Standard body copy is optimized at 14px and 16px with generous line height ratios (1.42x - 1.5x) to maintain effortless reading on compact handheld devices.
- **Labels & Micro-copy:** Uppercase or semi-bold micro-labels guide field interactions, metadata chips, deadline indicators, and helpline tags.

## Layout & Spacing

The layout operates on an Android-native **4-column fluid mobile grid** enclosed within a 16px (`1rem`) outer margin, extending to a 375px–430px base viewport width. 

- **Vertical Rhythm:** Built on an 8pt base grid with 4pt half-step nudges reserved strictly for compact chips and tight micro-indicators.
- **Card Gaps:** Standard feed elements, programmatic pillars, and opportunity listings maintain a continuous 16px (`space-md`) gap.
- **Safe Insets:** The canvas automatically accommodates mobile system bars (notch/camera cutout top padding of 44px–52px, bottom gesture pill padding of 24px–34px).

## Elevation & Depth

Visual hierarchy uses a refined blend of **tonal surface separation** and **ambient low-opacity shadows** to avoid visual clutter while keeping elements tactile.

- **Level 0 (Base Canvas):** Tinted neutral backdrop (`#F4F6FB`) grounding the screen content.
- **Level 1 (Default Content Cards):** Pure white (`#FFFFFF`) surface paired with a soft hairline outline (`1px solid #E2E8F0`) and an ambient, tinted shadow: `box-shadow: 0 2px 8px -2px rgba(10, 31, 94, 0.05), 0 1px 3px 0 rgba(10, 31, 94, 0.03)`.
- **Level 2 (Featured Opportunities & Active Modals):** Elevated interactive state with `box-shadow: 0 10px 24px -4px rgba(10, 31, 94, 0.08), 0 4px 8px -2px rgba(10, 31, 94, 0.04)`.
- **Level 3 (Sticky Bottom CTA & Action Sheets):** Crisp elevated floating layer resting at `box-shadow: 0 -4px 16px rgba(10, 31, 94, 0.06)`.

## Shapes

The shape system is set to **Level 2 (Rounded)**, standardizing on a uniform 12px (`0.75rem` / `rounded-md`) radius for all core cards, bottom sheets, and input fields.

- **Standard Cards & Containers:** 12px continuous radius providing a soft, approachable, modern appearance.
- **Action Buttons & Chips:** 8px to 12px for form buttons, while status chips and quick filter pills take complete capsule shapes (`rounded-full` / 9999px).
- **Icon Containers:** 10px to 12px squircle or rounded squares with subtle tinted pastels (`#0A1F5E` or `#D4357C` at 8% opacity).

## Components

### Buttons
- **Primary CTA (Donate / Urgency):** Solid magenta background (`#D4357C`), white text, 48px minimum touch height, 12px radius, medium bold weight with a subtle active press scale (`scale-98`).
- **Secondary Action (Explore Initiatives / Partner):** Deep navy fill (`#0A1F5E`) or transparent background with a 1.5px navy border and navy label text.
- **Opportunity Action (EduAnchors Apply / Save):** Vibrant emerald teal (`#0E9F6E`) button with high-contrast white text, signaling educational progression and job matching.

### Cards
- **Program & Mission Cards:** Pure white card surface, 12px corner radius, 1px subtle slate border. Displays a 24px clean dual-tone line icon at top-left, bold title, short 2-line description, and chevron action.
- **EduAnchors Opportunity Cards:** Features a distinctive 4px left accent stripe in emerald teal (`#0E9F6E`), accompanied by scholarship/job tag chips, application deadline, and organization/sponsor logo badge.

### Chips & Filter Pills
- **State Selection:** Horizontal scrollable row of pills with 32px height, fully rounded ends (`rounded-full`), 12px horizontal padding.
- **Active State:** Solid deep navy (`#0A1F5E`) with white text.
- **Inactive State:** White background with a 1px soft border (`#E2E8F0`) and muted slate text (`#4E5D78`).

### Input Fields & Controls
- **Form Fields:** 48px height, white background, 12px border radius, 1px border (`#E2E8F0`). On focus, shifts to a 2px stroke in primary navy (`#0A1F5E`) with a soft focus ring (`rgba(10, 31, 94, 0.1)`).
- **Checkboxes & Radios:** 20px controls with a 4px rounded radius (checkbox) or circular format (radio), filling with `#0A1F5E` when selected.

### Bottom Navigation & Emergency Bar
- **Emergency Helpline Bar:** Slim top header in dark navy or red tint (`#E02424`) with quick-dial touch action for Child Helpline 1098.
- **Bottom Navigation Bar:** Surface white, 64px height, 4 icon slots (Home, Programs, Opportunities, Donate), with active states highlighted in vibrant magenta (`#D4357C`) and primary navy (`#0A1F5E`).