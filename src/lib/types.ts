export type TrimesterInfo = {
  week: number;
  trimesterLabel: string;
};

export type ConcernLevel = "flagged" | "limited" | "clear";

export type Ingredient = {
  id: string;
  name: string;
  level: ConcernLevel;
  status: string;
  explanation: string;
  sources?: EvidenceSource[];
};

export type EvidenceSource = {
  id: string;
  title: string;
  publisher: string;
  note: string;
};

export type AnalysisSummary = {
  productName: string;
  headline: string;
  subheading: string;
  flaggedCount: number;
  limitedCount: number;
  clearCount: number;
  ingredients: Ingredient[];
};

export type Appointment = {
  id: string;
  title: string;
  provider: string;
  date: string;
  time: string;
  location: string;
  kind: "checkup" | "scan" | "lab" | "class";
};

export type CallRecipientType = "Clinic" | "Pharmacy" | "Store" | "Other";

export type CallProgressStep = {
  id: string;
  label: string;
};

export type CallSummaryResult = {
  headline: string;
  productName: string;
  price: string;
  availability: string;
  note: string;
};
