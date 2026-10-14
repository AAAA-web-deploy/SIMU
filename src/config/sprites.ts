import { art } from '../assets';

export type Sprite = {
  id: string;
  label: string;
  src: string;
  alt: string;
  line?: string;
  group: 'character' | 'reaction';
  x?: string;
  y?: string;
};

export const SPRITES: Sprite[] = [
  {
    id: 'original',
    label: 'Original MIWO',
    src: art.original,
    alt: 'MIWO, a small round black creature with cream eyes, a curly tuft, and a lavender tie, waving',
    group: 'character',
  },
  {
    id: 'costume',
    label: 'Whale costume',
    src: art.costume,
    alt: 'MIWO wearing a blue whale costume, lavender tie still visible',
    group: 'character',
  },
  {
    id: 'calm_confidence',
    label: 'Calm confidence',
    src: art.calm,
    alt: 'MIWO looking calmly confident',
    line: 'I have a plan. Please don\u2019t ask about it.',
    group: 'reaction',
    x: '8%',
    y: '4%',
  },
  {
    id: 'temptation',
    label: 'Temptation',
    src: art.temptation,
    alt: 'MIWO looking tempted, one hand reaching',
    line: 'Just one little buy. What could happen?',
    group: 'reaction',
    x: '58%',
    y: '0%',
  },
  {
    id: 'suspicion',
    label: 'Suspicion',
    src: art.suspicion,
    alt: 'MIWO squinting with suspicion, hand on chin',
    line: 'The whale bought. Why am I nervous?',
    group: 'reaction',
    x: '30%',
    y: '24%',
  },
  {
    id: 'embarrassment',
    label: 'Embarrassment',
    src: art.embarrassment,
    alt: 'MIWO blushing and looking away',
    line: 'I called the bottom. Again.',
    group: 'reaction',
    x: '70%',
    y: '28%',
  },
  {
    id: 'relief',
    label: 'Relief',
    src: art.relief,
    alt: 'MIWO with eyes closed, exhaling in relief',
    line: 'Sold for peace. Still checking.',
    group: 'reaction',
    x: '6%',
    y: '50%',
  },
  {
    id: 'delight',
    label: 'Delight',
    src: art.delight,
    alt: 'MIWO grinning with both hands up',
    line: 'Up forty cents. Practically institutional.',
    group: 'reaction',
    x: '46%',
    y: '52%',
  },
  {
    id: 'patience',
    label: 'Patience',
    src: art.patience,
    alt: 'MIWO waiting with a small patient smile',
    line: 'No position. Infinite opinions.',
    group: 'reaction',
    x: '24%',
    y: '76%',
  },
  {
    id: 'exaggerated_focus',
    label: 'Exaggerated focus',
    src: art.focus,
    alt: 'MIWO staring hard, tiny candle shapes in the pupils',
    line: 'Micro bag. Full-screen emotions.',
    group: 'reaction',
    x: '64%',
    y: '74%',
  },
];

export const REACTIONS = SPRITES.filter((sprite) => sprite.group === 'reaction');

export function spriteById(id: string): Sprite {
  return SPRITES.find((sprite) => sprite.id === id) ?? SPRITES[1];
}
