export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'about', label: 'About' },
  { id: 'how-to-buy', label: 'How to Buy' },
  { id: 'tokenomics', label: 'Tokenomics' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'community', label: 'Community' },
] as const;

export const navIds = navLinks.map((link) => link.id);
