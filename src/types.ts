export type NavTab = 'home' | 'about' | 'schedule' | 'events' | 'prizes' | 'register';

export interface EventItem {
  id: string;
  code: string; // e.g. 'TECH-01', 'NON-01'
  title: string;
  category: 'technical' | 'civilian';
  description: string;
  fee: number; // in INR
  feeText: string; // e.g. 'FEE: ₹30', 'VERIFIED FEE: FREE'
  iconName: string;
  teamSize?: string;
  rules?: string[];
  timing?: string;
  venue?: string;
}

export interface ScheduleItem {
  time: string;
  period: 'AM' | 'PM';
  title: string;
  description: string;
  isHighlight?: boolean;
  highlightText?: string;
  badges?: string[];
  iconName?: string;
  day: 1 | 2;
}

export interface PrizeItem {
  rank: '1st' | '2nd' | '3rd';
  title: string;
  amount: string;
  subtitle: string;
  badge?: string;
  isChampion?: boolean;
  perks: string[];
}

export interface SpecialAward {
  title: string;
  reward: string;
  description: string;
  iconBg: string;
  iconName: string;
}

export interface TeamMember {
  id: number;
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  branch: string;
  college: string;
}

export interface RegistrationState {
  members: TeamMember[];
  activeMemberIndex: number;
  selectedTechEventId: string;
  selectedNonTechEventId: string;
  baseFee: number;
}
