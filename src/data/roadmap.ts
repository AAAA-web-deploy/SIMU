export type RoadmapPhase = {
  phase: string;
  title: string;
  items: string[];
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: '01',
    title: 'SI ARRIVES',
    items: [
      'Website launch',
      'Ethereum token launch',
      'X launch',
      'Telegram community',
      'Initial meme pack',
    ],
  },
  {
    phase: '02',
    title: 'SI SPREADS',
    items: [
      'Community expansion',
      'Meme campaigns',
      'Community contests',
      'DEX visibility',
      'Partnership outreach',
    ],
  },
  {
    phase: '03',
    title: 'THE SI NETWORK',
    items: [
      'Expanded content universe',
      'Community-generated art',
      'Meme tools',
      'Community collaborations',
      'Additional ecosystem experiments',
    ],
  },
  {
    phase: '04',
    title: 'SUPER INTELLIGENCE ERA',
    items: ['Whatever the internet decides comes next.'],
  },
];
