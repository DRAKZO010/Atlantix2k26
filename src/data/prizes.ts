import { PrizeItem, SpecialAward } from '../types';

export const PODIUM_PRIZES: PrizeItem[] = [
  {
    rank: '2nd',
    title: 'RUNNER UP',
    amount: '₹15,000',
    subtitle: '2ND PLACE CHAMPION',
    perks: [
      'Tech Workshop Access',
      'Exclusive Networking',
      'Official Certificate'
    ]
  },
  {
    rank: '1st',
    title: 'ROBOTRON KING',
    amount: '₹25,000',
    subtitle: 'OVERALL CHAMPION',
    badge: 'CHAMPION BADGE',
    isChampion: true,
    perks: [
      'STARTUP INCUBATION SUPPORT',
      'INDUSTRY MENTORSHIP',
      'PRIME SHOWCASE SLOT'
    ]
  },
  {
    rank: '3rd',
    title: 'BRONZE ELITE',
    amount: '₹10,000',
    subtitle: '3RD PLACE CHAMPION',
    perks: [
      'Sponsor Goodie Bag',
      'Merit Certificate',
      'Development Tools Access'
    ]
  }
];

export const SPECIAL_AWARDS: SpecialAward[] = [
  {
    title: 'MOST INNOVATIVE',
    reward: '₹5,000 + TROPHY',
    description: "For the team that pushes the boundaries of what's possible with a unique solution.",
    iconBg: 'bg-[#fddc00]',
    iconName: 'Lightbulb'
  },
  {
    title: 'TEAM SYNERGY',
    reward: '₹3,000 + CERTIFICATES',
    description: 'Recognizing outstanding collaboration, distributed workload, and cohesive execution.',
    iconBg: 'bg-[#3467ff]',
    iconName: 'Users'
  },
  {
    title: 'BEST UI/UX',
    reward: '₹2,000 + TOOLS',
    description: 'For excellence in interface aesthetics, user journey flow, and accessibility.',
    iconBg: 'bg-[#ff6584]',
    iconName: 'Palette'
  }
];
