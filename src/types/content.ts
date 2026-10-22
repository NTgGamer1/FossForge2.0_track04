/** Content types inferred from awsar.json and eduanchors.json */

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

export interface ImpactStat {
  icon: string;
  value: string;
  text: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

export interface GuideItem {
  hi: string;
  en: string;
  meaning: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface ProgrammeImpact {
  value: string;
  label: string;
}

export interface PortfolioItem {
  tag: string;
  title: string;
  text: string;
  meta: string;
}

export interface Programme {
  id: string;
  icon: string;
  tint: string;
  en: string;
  hi: string;
  summary: string;
  intro?: string;
  impact: ProgrammeImpact[];
  services?: string[];
  portfolio?: PortfolioItem[];
  interventions?: string[];
  showHelpline?: boolean;
  image?: string | null;
}

export interface GalleryItem {
  img: string;
  caption: string;
}

export interface VideoItem {
  img: string;
  label: string;
  title: string;
  url: string;
}

export interface ReportItem {
  title: string;
  sub: string;
  action: string;
}

export interface CredentialItem {
  icon: string;
  title: string;
  sub: string;
}

export interface NewsItem {
  img: string;
  tag: string;
  date: string;
  title: string;
  text: string;
}

export interface SocialItem {
  name: string;
  url: string;
}

export interface DonateTier {
  title: string;
  sub: string;
  amount: string;
}

export interface WayItem {
  icon: string;
  title: string;
  text: string;
}

export interface VolunteerArea {
  title: string;
  text: string;
}

export interface VolunteerFact {
  v: string;
  l: string;
}

export interface Office {
  name: string;
  address: string;
  email: string;
  note?: string;
  hours?: string;
}

export interface EduanchorItem {
  id: string;
  type: 'scholarship' | 'mentorship' | 'internship' | 'job';
  title: string;
  org: string;
  badge: string;
  highlight: string;
  highlightIcon: string;
  detail: string;
  detailIcon: string;
  text?: string;
  tag?: string;
  deadline: string | null;
}

export interface ProcessStep {
  n: number;
  title: string;
  text: string;
}

export interface AwsarOrg {
  name: string;
  full: string;
  founded: number;
  tagline: string;
  awsarMeaning: string;
  est: string;
  heroTitle: string;
  heroText: string;
  about: string;
  aboutHeading: string;
  vision: string;
  mission: string;
  pillarsQuote: string;
  founderQuote: { text: string; by: string };
  trust: string[];
  pageQuote: string;
  footerLine: string;
}

export interface AwsarData {
  _source: string;
  org: AwsarOrg;
  stats: {
    home: StatItem[];
    impact: ImpactStat[];
    impactQuote: string;
  };
  values: ValueItem[];
  guides: GuideItem[];
  timeline: TimelineItem[];
  programmes: Programme[];
  partners: {
    types: string[];
    supporters: string[];
    note: string;
  };
  media: {
    photoNote: string;
    gallery: GalleryItem[];
    videos: VideoItem[];
    reports: ReportItem[];
    reportsEmail: string;
    credentials: CredentialItem[];
    news: NewsItem[];
    social: SocialItem[];
  };
  involve: {
    donateIntro: string;
    donateTiers: DonateTier[];
    donateNote: string;
    donateUrl: string;
    ways: WayItem[];
    volunteer: {
      title: string;
      intro: string;
      facts: VolunteerFact[];
      commitment: string;
      areas: VolunteerArea[];
      formFields: string[];
      respond: string;
    };
    contactForm: { fields: string[]; respond: string };
    partnerForm: { fields: string[] };
  };
  contact: {
    email: string;
    infoEmail: string;
    phone: string;
    phoneDisplay: string;
    offices: Office[];
  };
}

export interface EduanchorsData {
  applyBase: string;
  applyEmail: string;
  process: ProcessStep[];
  perks: string[];
  items: EduanchorItem[];
}
