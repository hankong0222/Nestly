import type {
  Appointment,
  CallProgressStep,
  CallSummaryResult,
  Ingredient,
} from "./types";

export const currentUser = {
  firstName: "Maya",
  week: 18,
  trimesterLabel: "Second trimester",
};

export const scannedIngredients: string[] = [
  "Retinol",
  "Glycerin",
  "Niacinamide",
  "Fragrance",
  "Hyaluronic Acid",
  "Aqua",
  "Cetearyl Alcohol",
  "Panthenol",
  "Squalane",
  "Tocopherol",
  "Xanthan Gum",
  "Phenoxyethanol",
  "Sodium Hyaluronate",
  "Citric Acid",
];

export const analyzedIngredients: Ingredient[] = [
  {
    id: "retinol",
    name: "Retinol",
    level: "flagged",
    status: "Professional guidance recommended",
    explanation:
      "Retinol belongs to the retinoid family. Pregnancy guidance generally recommends avoiding retinoid-containing skincare products.",
    sources: [
      {
        id: "src-1",
        title: "Topical retinoids in pregnancy: a review",
        publisher: "American College of Obstetricians and Gynecologists",
        note: "Advises avoiding topical retinoids as a precaution during pregnancy.",
      },
      {
        id: "src-2",
        title: "Safety of skincare ingredients during pregnancy",
        publisher: "MotherToBaby",
        note: "Lists retinoids among ingredients to discuss with a provider before use.",
      },
    ],
  },
  {
    id: "fragrance",
    name: "Fragrance",
    level: "limited",
    status: "Limited evidence available",
    explanation:
      "\"Fragrance\" can represent a blend of undisclosed compounds. Most are considered low risk, but the exact mixture isn't public, so evidence is limited.",
    sources: [
      {
        id: "src-3",
        title: "Fragrance ingredient transparency in cosmetics",
        publisher: "Environmental Working Group",
        note: "Explains why blended fragrance compounds aren't individually assessed.",
      },
    ],
  },
  {
    id: "phenoxyethanol",
    name: "Phenoxyethanol",
    level: "limited",
    status: "Limited evidence available",
    explanation:
      "A common preservative. Research during pregnancy is limited, though current cosmetic-level use is not associated with known concerns.",
    sources: [
      {
        id: "src-4",
        title: "Preservatives in cosmetic formulations",
        publisher: "Cosmetic Ingredient Review",
        note: "Evaluates typical use concentrations in leave-on and rinse-off products.",
      },
    ],
  },
  {
    id: "glycerin",
    name: "Glycerin",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A widely used humectant with an established safety record during pregnancy.",
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A form of vitamin B3 commonly used in skincare, generally considered well tolerated during pregnancy.",
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic Acid",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A naturally occurring humectant that helps retain moisture. No known pregnancy-related concerns.",
  },
  {
    id: "aqua",
    name: "Aqua",
    level: "clear",
    status: "No identified concern",
    explanation: "Water, used as a base solvent in the formulation.",
  },
  {
    id: "cetearyl-alcohol",
    name: "Cetearyl Alcohol",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A fatty alcohol used as an emulsifier and thickener. Not related to drying alcohols.",
  },
  {
    id: "panthenol",
    name: "Panthenol",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A form of vitamin B5 known for soothing and moisturizing skin, considered safe in skincare.",
  },
  {
    id: "squalane",
    name: "Squalane",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A lightweight, plant-derived emollient with an established safety profile.",
  },
  {
    id: "tocopherol",
    name: "Tocopherol",
    level: "clear",
    status: "No identified concern",
    explanation: "A form of vitamin E used as an antioxidant in formulations.",
  },
  {
    id: "xanthan-gum",
    name: "Xanthan Gum",
    level: "clear",
    status: "No identified concern",
    explanation:
      "A plant-derived thickening agent with no known pregnancy-related concerns.",
  },
  {
    id: "sodium-hyaluronate",
    name: "Sodium Hyaluronate",
    level: "clear",
    status: "No identified concern",
    explanation:
      "The salt form of hyaluronic acid, used for hydration. No known concerns.",
  },
  {
    id: "citric-acid",
    name: "Citric Acid",
    level: "clear",
    status: "No identified concern",
    explanation:
      "Used to balance the pH of a formulation. Considered safe at cosmetic concentrations.",
  },
];

export const scannedProductName = "Example Retinol Cream";

export const appointments: Appointment[] = [
  {
    id: "apt-1",
    title: "Routine checkup",
    provider: "Dr. Elena Ruiz",
    date: "Thu, Jul 24",
    time: "10:30 AM",
    location: "Riverside OB-GYN",
    kind: "checkup",
  },
  {
    id: "apt-2",
    title: "Anatomy ultrasound",
    provider: "Dr. Elena Ruiz",
    date: "Mon, Aug 4",
    time: "2:00 PM",
    location: "Riverside Imaging Center",
    kind: "scan",
  },
  {
    id: "apt-3",
    title: "Glucose screening",
    provider: "Lab Services",
    date: "Wed, Aug 13",
    time: "9:00 AM",
    location: "QuestCare Labs",
    kind: "lab",
  },
  {
    id: "apt-4",
    title: "Prenatal yoga class",
    provider: "Bloom Community",
    date: "Sat, Aug 16",
    time: "9:30 AM",
    location: "Willow Studio",
    kind: "class",
  },
];

export const callProgressSteps: CallProgressStep[] = [
  { id: "intro", label: "Introducing the request" },
  { id: "pharmacist", label: "Speaking with a pharmacist" },
  { id: "confirm", label: "Confirming the product name" },
  { id: "summary", label: "Summarizing the answer" },
];

export const callSummaryResult: CallSummaryResult = {
  headline: "Pharmacy confirmed an alternative is available",
  productName: "CeraHydrate Daily Cream",
  price: "$24.99",
  availability: "In stock today",
  note: "Pharmacist recommended confirming use with a healthcare provider.",
};

export const analysisProgressSteps = [
  "Reading the label",
  "Matching ingredient names",
  "Checking trusted references",
  "Preparing a clear explanation",
];
