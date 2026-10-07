export const EVOLUTION_TRANSITIONS = [
  'none',
  'pixel',
  'scan',
  'cyan-pulse',
  'cosmic-halo',
] as const;

export type EvolutionTransition = (typeof EVOLUTION_TRANSITIONS)[number];

export type EvolutionStage = {
  stage: string;
  image: string;
  caption: string;
  era?: string;
  addition: string;
  growthDescription: string;
  transitionLabel?: string;
  transition?: EvolutionTransition | null;
};

export type HowToBuyStep = {
  title: string;
  body: string;
};

export type MemeStat = {
  label: string;
  value?: string;
  source?: 'stageCount';
  deriveFrom?: 'evolution.length';
};

export type TokenTheme = {
  background: string;
  accent: string;
  secondary: string;
  text: string;
  muted: string;
};

export type TokenStrings = {
  reset: string;
  copied: string;
  copyFailed: string;
  unavailable: string;
  imageLoading: string;
  copy: string;
  contractHeading: string;
  contractPending: string;
  buy: string;
  chart: string;
  comingSoon: string;
  evolutionLevel: string;
  funNote: string;
  statsHeading: string;
  statsNote: string;
  howToBuyHeading: string;
  evolveAction: string;
  finalAction: string;
  logoAlt: string;
  socialX: string;
  socialTelegram: string;
  addedChip: string;
};

export type TokenConfig = {
  name: string;
  ticker: string;
  tagline: string;
  description: string;
  interactionLabel: string;
  finalLabel: string;
  theme: TokenTheme;
  contractAddress: string | null;
  buyUrl: string | null;
  chartUrl: string | null;
  xUrl: string | null;
  telegramUrl: string | null;
  evolution: EvolutionStage[];
  logo: string;
  favicon: string;
  socialPreview: string;
  chainName: string;
  nativeSymbol: string;
  pageTitle: string;
  metadataDescription: string;
  siteUrl: string | null;
  howToBuy: HowToBuyStep[];
  memeStats: MemeStat[];
  footerNote: string;
  strings: TokenStrings;
};
