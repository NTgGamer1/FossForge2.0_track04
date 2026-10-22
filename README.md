# AWSAR India App

Android app for **AWSAR India** and **EduAnchors** — hackathon track "One Android app for AWSAR India and EduAnchors".

## Tech Stack

- **Expo SDK 57** · TypeScript · React Navigation (bottom tabs + native stack)
- Theme tokens in `src/theme/` · Shared components in `src/components/`
- Content driven by `src/data/awsar.json` and `src/data/eduanchors.json`

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npx expo start

# Run on Android device / emulator
npx expo start --android
```

## Replacing Placeholder Images

All images in `assets/images/` are 1×1 grey placeholders. Replace them with real images:

| File | Description |
|------|-------------|
| `logo.png` | AWSAR India logo (square, transparent bg preferred) |
| `hero.jpg` | Hero section background image |
| `gallery-1.jpg` … `gallery-12.jpg` | Photo gallery (see captions in `awsar.json`) |
| `news-1.jpg` … `news-3.jpg` | News article cover images |
| `video-1.jpg`, `video-2.jpg` | Video thumbnail images |

After replacing, update `src/data/images.ts` if you add new image keys.

## Replacing EduAnchors Placeholder Listings

In `src/data/eduanchors.json`, items with `"placeholder": true` are sample listings:

- `sch-1` — Sample Scholarship (replace)
- `sch-2` — Sample Scholarship 2 (replace)
- `men-1` — Sample Mentorship (replace)

Replace these with real data from [eduanchors.com](https://eduanchors.com). The real internship and job listings (`int-1` through `int-6`, `job-1` through `job-4`) are verified AWSAR careers.

## Building a Demo APK (EAS)

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Build APK: `eas build -p android --profile preview`

The `preview` profile in `eas.json` produces a standalone `.apk` file for direct installation.

## TypeScript Check

```bash
npx tsc --noEmit
```

## Lint

```bash
npx expo lint
```

## Content Sources

All user-visible content is sourced from `awsarindia.org` (verified Oct 2026). The `_source` and `_todo` keys in JSON files indicate what needs verification or replacement.

## Key Corrections Applied

- Years of impact = `currentYear - 2001` (shown as `25+`)
- Helpline 1098 is the **national** child helpline; AWSAR ran CHILDLINE 1098 until 2024 but no longer operates it
- Governance badges: FCRA · CSR1 · 12A · 80G Certified; Registered Society, Delhi (2001); Listed on Give.do, NGO Darpan & GuideStar India; Child safeguarding policy: on request
- No invented statistics or quotes

## Screens

| Screen | Status |
|--------|--------|
| Home | ✅ Full content |
| Programmes List | ✅ 9 programme areas |
| Programme Detail | ✅ Per-programme content |
| Opportunities | ✅ Search, filter, bookmarks, apply |
| Media | ✅ News, Photos, Videos, Reports, Social |
| Get Involved | ✅ Donate, Volunteer, Partner, Contact |

Android app for **AWSAR India** and **EduAnchors** — hackathon track "One Android app for AWSAR India and EduAnchors".

## Tech Stack

- **Expo SDK 57** · TypeScript · React Navigation (bottom tabs + native stack)
- Theme tokens in `src/theme/` · Shared components in `src/components/`
- Content driven by `src/data/awsar.json` and `src/data/eduanchors.json`

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npx expo start

# Run on Android device / emulator
npx expo start --android
```

## Replacing Placeholder Images

All images in `assets/images/` are 1×1 grey placeholders. Replace them with real images:

| File | Description |
|------|-------------|
| `logo.png` | AWSAR India logo (square, transparent bg preferred) |
| `hero.jpg` | Hero section background image |
| `gallery-1.jpg` … `gallery-12.jpg` | Photo gallery (see captions in `awsar.json`) |
| `news-1.jpg` … `news-3.jpg` | News article cover images |
| `video-1.jpg`, `video-2.jpg` | Video thumbnail images |

After replacing, update `src/data/images.ts` if you add new image keys.

## Replacing EduAnchors Placeholder Listings

In `src/data/eduanchors.json`, items with `"placeholder": true` are sample listings:

- `sch-1` — Sample Scholarship (replace)
- `sch-2` — Sample Scholarship 2 (replace)
- `men-1` — Sample Mentorship (replace)

Replace these with real data from [eduanchors.com](https://eduanchors.com). The real internship and job listings (`int-1` through `int-6`, `job-1` through `job-4`) are verified AWSAR careers.

## Building a Demo APK (EAS)

1. Install EAS CLI: `npm install -g eas-cli`
2. Login: `eas login`
3. Build APK: `eas build -p android --profile preview`

The `preview` profile in `eas.json` produces a standalone `.apk` file for direct installation.

## TypeScript Check

```bash
npx tsc --noEmit
```

## Lint

```bash
npx expo lint
```

## Content Sources

All user-visible content is sourced from `awsarindia.org` (verified Oct 2026). The `_source` and `_todo` keys in JSON files indicate what needs verification or replacement.

## Key Corrections Applied

- Years of impact = `currentYear - 2001` (shown as `25+`)
- Helpline 1098 is the **national** child helpline; AWSAR ran CHILDLINE 1098 until 2024 but no longer operates it
- Governance badges: FCRA · CSR1 · 12A · 80G Certified; Registered Society, Delhi (2001); Listed on Give.do, NGO Darpan & GuideStar India; Child safeguarding policy: on request
- No invented statistics or quotes

## Screens

| Screen | Status |
|--------|--------|
| Home | ✅ Full content |
| Programmes List | ✅ 9 programme areas |
| Programme Detail | ✅ Per-programme content |
| Opportunities | ✅ Search, filter, bookmarks, apply |
| Media | ✅ News, Photos, Videos, Reports, Social |
| Get Involved | ✅ Donate, Volunteer, Partner, Contact |

