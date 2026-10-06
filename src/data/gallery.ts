export const galleryCategories = [
  'AI Funeral',
  'SI Arrival',
  'SI King',
  'Ethereum SI',
  'SI Reaction Memes',
  'Community Memes',
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export const galleryItems: GalleryItem[] = [
  {
    src: 'sihere-ai-to-si-transition.png',
    title: 'AI to SI',
    category: 'AI Funeral',
    width: 1500,
    height: 719,
    alt: 'A small AI robot points toward the crowned SI king, who holds a glowing SI crystal.',
  },
  {
    src: 'sihere-about-story.png',
    title: 'The arrival',
    category: 'SI Arrival',
    width: 1500,
    height: 793,
    alt: 'The crowned SI mascot looks across a crystal city toward a giant Ethereum diamond.',
  },
  {
    src: 'sihere-hero-banner-alt.png',
    title: 'Kingdom welcome',
    category: 'SI Arrival',
    width: 1500,
    height: 709,
    alt: 'The SI king raises an SI crystal in front of a luminous Ethereum kingdom and a cheering crowd.',
  },
  {
    src: 'sihere-banner-1100x520.png',
    title: 'SI is Here banner',
    category: 'SI Arrival',
    width: 1100,
    height: 520,
    alt: 'Banner artwork with the crowned SI mascot, the words SI is Here, and the $SIHERE ticker.',
  },
  {
    src: 'sihere-hero-character-transparent.png',
    title: 'The SI king',
    category: 'SI King',
    width: 1000,
    height: 914,
    alt: 'The crowned SI king in silver and royal blue offers a glowing crystal marked SI.',
  },
  {
    src: 'sihere-logo-circle-transparent-final.png',
    title: 'Official emblem',
    category: 'SI King',
    width: 960,
    height: 960,
    alt: 'Circular SI is Here emblem showing the crowned mascot holding an SI crystal above the $SIHERE name.',
  },
  {
    src: 'sihere-telegram-pack.png',
    title: 'Crystal portrait',
    category: 'SI Reaction Memes',
    width: 900,
    height: 935,
    alt: 'Portrait of the smiling SI king holding a glowing crystal marked SI.',
  },
  {
    src: 'sihere-x-profile.png',
    title: 'Pointing forward',
    category: 'SI King',
    width: 900,
    height: 922,
    alt: 'Close portrait of the SI king pointing ahead with a bright crystal at his chest.',
  },
  {
    src: 'sihere-how-to-buy.png',
    title: 'Enter the era',
    category: 'SI Reaction Memes',
    width: 1400,
    height: 761,
    alt: 'The SI king stands beside a glowing path of wallet and Ethereum icons under the words How to Buy.',
  },
  {
    src: 'sihere-hero-background.png',
    title: 'Crystal kingdom',
    category: 'Ethereum SI',
    width: 1800,
    height: 698,
    alt: 'A crystal city under a ringed Ethereum diamond, with planets and clouds on either side.',
  },
  {
    src: 'sihere-banner-3to1.png',
    title: 'Wide banner',
    category: 'Ethereum SI',
    width: 1800,
    height: 600,
    alt: 'Wide SI is Here banner with the king, Ethereum banners, and the $SIHERE wordmark.',
  },
  {
    src: 'sihere-tokenomics.png',
    title: 'Ethereum crystal',
    category: 'Ethereum SI',
    width: 1400,
    height: 855,
    alt: 'A faceted Ethereum crystal floats above a silver platform. The artwork is illustrative, not the official token split.',
  },
  {
    src: 'sihere-footer-background.png',
    title: 'Reflected city',
    category: 'Ethereum SI',
    width: 1800,
    height: 690,
    alt: 'A crystal kingdom reflected in still water beneath a glowing Ethereum diamond and passing comets.',
  },
  {
    src: 'sihere-community.png',
    title: 'The crowd',
    category: 'Community Memes',
    width: 1500,
    height: 820,
    alt: 'Astronauts gather around the crowned SI mascot beneath Ethereum flags and a luminous Earth.',
  },
  {
    src: 'sihere-roadmap.png',
    title: 'The timeline',
    category: 'SI Arrival',
    width: 1600,
    height: 716,
    alt: 'A glowing path climbs from phase one toward a crystal castle in the SI era.',
  },
];
