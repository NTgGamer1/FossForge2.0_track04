export interface ProgrammeImpact {
  value: string;
  label: string;
}

export interface Programme {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  tint: string;
  summary: string;
  description: string;
  impact: ProgrammeImpact[];
  image: string | null;
}

