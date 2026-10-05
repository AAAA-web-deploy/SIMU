const base = import.meta.env.BASE_URL;

function asset(file: string): string {
  return `${base}assets/${file}`;
}

export const assets = {
  logo: asset('siintern-logo-circular-transparent.png'),
  bannerWide: asset('siintern-banner-3x1.png'),
  bannerSocial: asset('siintern-banner-1100x520.png'),
  hero: asset('siintern-hero-character-transparent.png'),
  origin: asset('siintern-origin-story.png'),
  firstDay: asset('siintern-first-day.png'),
  taskList: asset('siintern-task-list.png'),
  missionGrid: asset('siintern-mission-grid.png'),
  aiLab: asset('siintern-ai-lab.png'),
  robotaxi: asset('siintern-robotaxi-mission.png'),
  rocket: asset('siintern-rocket-mission.png'),
  ethereum: asset('siintern-ethereum-mission.png'),
  army: asset('siintern-intern-army.png'),
  future: asset('siintern-to-the-future.png'),
  memeWall: asset('siintern-office-meme-wall.png'),
} as const;

export const assetSize = {
  logo: { width: 960, height: 960 },
  bannerWide: { width: 1024, height: 341 },
  bannerSocial: { width: 1024, height: 483 },
  hero: { width: 662, height: 1024 },
  origin: { width: 1024, height: 485 },
  firstDay: { width: 1024, height: 341 },
  taskList: { width: 792, height: 995 },
  missionGrid: { width: 1024, height: 682 },
  aiLab: { width: 1024, height: 498 },
  robotaxi: { width: 1024, height: 539 },
  rocket: { width: 1024, height: 341 },
  ethereum: { width: 1024, height: 341 },
  army: { width: 1024, height: 341 },
  future: { width: 1024, height: 341 },
  memeWall: { width: 1024, height: 341 },
} as const;
