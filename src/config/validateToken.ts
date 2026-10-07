import {
  EVOLUTION_TRANSITIONS,
  type EvolutionStage,
  type EvolutionTransition,
  type HowToBuyStep,
  type MarketLink,
  type MemeStat,
  type OnChainProof,
  type ProofStatus,
  type SiteAssets,
  type TaxDisplay,
  type TokenConfig,
  type TokenStrings,
  type TokenTheme,
} from '../types/token.ts';

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const HTTPS_URL = /^https:\/\//i;

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value as Record<string, unknown>;
}

function requiredString(record: Record<string, unknown>, key: string, label: string): string {
  const value = record[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function nullableString(record: Record<string, unknown>, key: string, label: string): string | null {
  const value = record[key];
  if (value === null) return null;
  if (typeof value !== 'string') {
    throw new Error(`${label} must be a string or null`);
  }
  const trimmed = value.trim();
  return trimmed === '' ? null : value;
}

function optionalHttps(value: string | null, label: string): string | null {
  if (value === null) return null;
  if (!HTTPS_URL.test(value)) {
    throw new Error(`${label} must be an https URL or null`);
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname === '') {
      throw new Error(`${label} must be an https URL or null`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes(label)) throw error;
    throw new Error(`${label} must be an https URL or null`);
  }
  return value;
}

function isTransition(value: string): value is EvolutionTransition {
  return (EVOLUTION_TRANSITIONS as readonly string[]).includes(value);
}

function readTheme(value: unknown): TokenTheme {
  const theme = asRecord(value, 'theme');
  const colors = {
    background: requiredString(theme, 'background', 'theme.background'),
    accent: requiredString(theme, 'accent', 'theme.accent'),
    secondary: requiredString(theme, 'secondary', 'theme.secondary'),
    text: requiredString(theme, 'text', 'theme.text'),
    muted: requiredString(theme, 'muted', 'theme.muted'),
  };
  for (const [key, color] of Object.entries(colors)) {
    if (!HEX_COLOR.test(color)) {
      throw new Error(`theme.${key} must be a #rrggbb color`);
    }
  }
  return colors;
}

function readStage(value: unknown, index: number): EvolutionStage {
  const stage = asRecord(value, `evolution[${index}]`);
  const transitionValue = stage.transition;
  let transition: EvolutionTransition | null | undefined;
  if (transitionValue === null || transitionValue === undefined) {
    transition = null;
  } else if (typeof transitionValue === 'string' && isTransition(transitionValue)) {
    transition = transitionValue;
  } else {
    throw new Error(`evolution[${index}].transition is not a known effect`);
  }

  const era = stage.era;
  if (era !== undefined && (typeof era !== 'string' || era.trim() === '')) {
    throw new Error(`evolution[${index}].era must be a non-empty string when set`);
  }
  const transitionLabel = stage.transitionLabel;
  if (
    transitionLabel !== undefined &&
    transitionLabel !== '' &&
    typeof transitionLabel !== 'string'
  ) {
    throw new Error(`evolution[${index}].transitionLabel must be a string when set`);
  }

  return {
    stage: requiredString(stage, 'stage', `evolution[${index}].stage`),
    image: requiredString(stage, 'image', `evolution[${index}].image`),
    caption: requiredString(stage, 'caption', `evolution[${index}].caption`),
    addition: requiredString(stage, 'addition', `evolution[${index}].addition`),
    growthDescription: requiredString(
      stage,
      'growthDescription',
      `evolution[${index}].growthDescription`,
    ),
    era: typeof era === 'string' ? era : undefined,
    transitionLabel:
      typeof transitionLabel === 'string' && transitionLabel.trim() !== ''
        ? transitionLabel
        : undefined,
    transition,
  };
}

function readStatusLines(value: unknown): { value: string; label: string }[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('statusLines must contain at least one line');
  }
  return value.map((line, index) => {
    const record = asRecord(line, `statusLines[${index}]`);
    return {
      value: requiredString(record, 'value', `statusLines[${index}].value`),
      label: requiredString(record, 'label', `statusLines[${index}].label`),
    };
  });
}

function readHowToBuy(value: unknown): HowToBuyStep[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('howToBuy must contain at least one step');
  }
  return value.map((step, index) => {
    const record = asRecord(step, `howToBuy[${index}]`);
    return {
      title: requiredString(record, 'title', `howToBuy[${index}].title`),
      body: requiredString(record, 'body', `howToBuy[${index}].body`),
    };
  });
}

function readMemeStats(value: unknown, stageCount: number): MemeStat[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('memeStats must contain at least one stat');
  }
  return value.map((stat, index) => {
    const record = asRecord(stat, `memeStats[${index}]`);
    const label = requiredString(record, 'label', `memeStats[${index}].label`);
    const source = record.source;
    const deriveFrom = record.deriveFrom;
    if (source !== undefined && source !== 'stageCount') {
      throw new Error(`memeStats[${index}].source must be "stageCount" when set`);
    }
    if (deriveFrom !== undefined && deriveFrom !== 'evolution.length') {
      throw new Error(`memeStats[${index}].deriveFrom must be "evolution.length" when set`);
    }
    const rawValue = record.value;
    if (rawValue !== undefined && (typeof rawValue !== 'string' || rawValue.trim() === '')) {
      throw new Error(`memeStats[${index}].value must be a non-empty string when set`);
    }
    const derived = source === 'stageCount' || deriveFrom === 'evolution.length';
    if (derived) {
      if (typeof rawValue === 'string' && rawValue !== String(stageCount)) {
        throw new Error(
          `memeStats "${label}" says ${rawValue}, but evolution.length is ${stageCount}. The stage-count stat is derived from the stage list.`,
        );
      }
      return {
        label,
        value: rawValue,
        source: source === 'stageCount' ? ('stageCount' as const) : undefined,
        deriveFrom: deriveFrom === 'evolution.length' ? ('evolution.length' as const) : undefined,
      };
    }
    if (typeof rawValue !== 'string') {
      throw new Error(`memeStats[${index}].value is required`);
    }
    return { label, value: rawValue };
  });
}

function assetPath(record: Record<string, unknown>, key: string): string {
  const value = requiredString(record, key, `assets.${key}`);
  if (!value.startsWith('/assets/')) {
    throw new Error(`assets.${key} must be a root-relative /assets path`);
  }
  return value;
}

function readAssets(value: unknown): SiteAssets {
  const assets = asRecord(value, 'assets');
  return {
    home: assetPath(assets, 'home'),
    story: assetPath(assets, 'story'),
    tokenBackground: assetPath(assets, 'tokenBackground'),
    club: assetPath(assets, 'club'),
    portrait: assetPath(assets, 'portrait'),
    banner: assetPath(assets, 'banner'),
  };
}

function readProof(value: unknown, label: string): OnChainProof {
  const record = asRecord(value, label);
  const status = requiredString(record, 'status', `${label}.status`);
  if (status !== 'pending' && status !== 'verified') {
    throw new Error(`${label}.status must be "pending" or "verified"`);
  }
  return {
    label: requiredString(record, 'label', `${label}.label`),
    status: status as ProofStatus,
    url: optionalHttps(nullableString(record, 'url', `${label}.url`), `${label}.url`),
  };
}

function readTax(value: unknown, label: string): TaxDisplay {
  const record = asRecord(value, label);
  return {
    label: requiredString(record, 'label', `${label}.label`),
    value: requiredString(record, 'value', `${label}.value`),
    note: requiredString(record, 'note', `${label}.note`),
  };
}

function readContractAddress(record: Record<string, unknown>, label: string): string | null {
  const value = nullableString(record, 'contractAddress', label);
  if (value === null) return null;
  const address = value.trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    throw new Error(`${label} must be null or a 0x address with 40 hex characters`);
  }
  return address;
}

function readOptionalUrl(record: Record<string, unknown>, key: string, label: string): string | null {
  if (!(key in record) || record[key] === null) return null;
  return optionalHttps(nullableString(record, key, label), label);
}

function readMarkets(value: unknown): MarketLink[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('markets must contain at least one link');
  }
  return value.map((item, index) => {
    const record = asRecord(item, `markets[${index}]`);
    return {
      name: requiredString(record, 'name', `markets[${index}].name`),
      url: readOptionalUrl(record, 'url', `markets[${index}].url`),
    };
  });
}

function readStrings(value: unknown): TokenStrings {
  const record = asRecord(value, 'strings');
  const keys: (keyof TokenStrings)[] = [
    'reset',
    'copied',
    'copyFailed',
    'unavailable',
    'imageLoading',
    'copy',
    'contractHeading',
    'contractPending',
    'buy',
    'chart',
    'comingSoon',
    'evolutionLevel',
    'funNote',
    'statsHeading',
    'statsNote',
    'howToBuyHeading',
    'evolveAction',
    'finalAction',
    'logoAlt',
    'socialX',
    'socialTelegram',
    'addedChip',
  ];
  const strings = {} as TokenStrings;
  for (const key of keys) {
    strings[key] = requiredString(record, key, `strings.${key}`);
  }
  return strings;
}

export function validateTokenConfig(input: unknown): TokenConfig {
  const record = asRecord(input, 'token config');
  const evolution = record.evolution;
  if (!Array.isArray(evolution) || evolution.length === 0) {
    throw new Error('evolution must contain at least one stage');
  }
  const stages = evolution.map((stage, index) => readStage(stage, index));
  const names = new Set<string>();
  for (const stage of stages) {
    if (names.has(stage.stage)) {
      throw new Error(`evolution stage "${stage.stage}" is duplicated`);
    }
    names.add(stage.stage);
    if (!stage.image.startsWith('/assets/')) {
      throw new Error(`evolution image "${stage.image}" must be a root-relative /assets path`);
    }
  }

  const siteUrl = optionalHttps(nullableString(record, 'siteUrl', 'siteUrl'), 'siteUrl');

  const chartUrl = optionalHttps(nullableString(record, 'chartUrl', 'chartUrl'), 'chartUrl');
  const dextoolsUrl = readOptionalUrl(record, 'dextoolsUrl', 'dextoolsUrl');
  const etherscanUrl = readOptionalUrl(record, 'etherscanUrl', 'etherscanUrl');
  const markets = readMarkets(record.markets).map((market) => {
    if (market.name === 'DEXScreener') return { ...market, url: chartUrl };
    if (market.name === 'DEXTools') return { ...market, url: dextoolsUrl };
    if (market.name === 'Etherscan') return { ...market, url: etherscanUrl };
    return market;
  });

  return {
    name: requiredString(record, 'name', 'name'),
    ticker: requiredString(record, 'ticker', 'ticker'),
    tagline: requiredString(record, 'tagline', 'tagline'),
    description: requiredString(record, 'description', 'description'),
    interactionLabel: requiredString(record, 'interactionLabel', 'interactionLabel'),
    finalLabel: requiredString(record, 'finalLabel', 'finalLabel'),
    theme: readTheme(record.theme),
    contractAddress: readContractAddress(record, 'contractAddress'),
    buyUrl: nullableString(record, 'buyUrl', 'buyUrl'),
    chartUrl,
    dextoolsUrl,
    etherscanUrl,
    xUrl: optionalHttps(nullableString(record, 'xUrl', 'xUrl'), 'xUrl'),
    telegramUrl: optionalHttps(nullableString(record, 'telegramUrl', 'telegramUrl'), 'telegramUrl'),
    evolution: stages,
    logo: requiredString(record, 'logo', 'logo'),
    favicon: requiredString(record, 'favicon', 'favicon'),
    socialPreview: requiredString(record, 'socialPreview', 'socialPreview'),
    chainName: requiredString(record, 'chainName', 'chainName'),
    nativeSymbol: requiredString(record, 'nativeSymbol', 'nativeSymbol'),
    pageTitle: requiredString(record, 'pageTitle', 'pageTitle'),
    metadataDescription: requiredString(record, 'metadataDescription', 'metadataDescription'),
    siteUrl,
    assets: readAssets(record.assets),
    lpBurn: readProof(record.lpBurn, 'lpBurn'),
    ownership: readProof(record.ownership, 'ownership'),
    buyTax: readTax(record.buyTax, 'buyTax'),
    sellTax: readTax(record.sellTax, 'sellTax'),
    markets,
    proofNote: requiredString(record, 'proofNote', 'proofNote'),
    howToBuy: readHowToBuy(record.howToBuy),
    memeStats: readMemeStats(record.memeStats, stages.length),
    statusLines: readStatusLines(record.statusLines),
    footerNote: requiredString(record, 'footerNote', 'footerNote'),
    strings: readStrings(record.strings),
  };
}

export function memeStatValue(stat: MemeStat, stageCount: number): string {
  if (stat.deriveFrom === 'evolution.length' || stat.source === 'stageCount') return String(stageCount);
  return stat.value ?? '';
}
