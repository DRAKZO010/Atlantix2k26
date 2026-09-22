import { ScheduleItem } from '../types';

export const SCHEDULE_DAY_1: ScheduleItem[] = [
  {
    day: 1,
    time: '09:00',
    period: 'AM',
    title: 'REGISTRATION & CHECK-IN',
    description: 'Get your badges and welcome kit. Verify your team status at the main gate.',
    badges: ['MANDATORY', 'MAIN HALL'],
    iconName: 'QrCode'
  },
  {
    day: 1,
    time: '10:00',
    period: 'AM',
    title: 'OPENING CEREMONY',
    description: 'Welcome address, event overview, and unveiling of the main problem statements.',
    badges: ['MAIN AUDITORIUM'],
    iconName: 'Megaphone'
  },
  {
    day: 1,
    time: '12:00',
    period: 'PM',
    title: 'HACKING BEGINS!',
    description: 'DEPLOY ALL SYSTEMS. CLOCK IS RUNNING.',
    isHighlight: true,
    highlightText: 'DEPLOY ALL SYSTEMS. CLOCK IS RUNNING.',
    badges: ['ALL BAYS', '24 HOUR TIMER ON'],
    iconName: 'Zap'
  },
  {
    day: 1,
    time: '03:00',
    period: 'PM',
    title: 'MENTOR SESSIONS',
    description: 'Get guidance from industry experts. Slots allocated per team.',
    badges: ['MENTOR LOUNGE'],
    iconName: 'Target'
  },
  {
    day: 1,
    time: '10:00',
    period: 'PM',
    title: 'LATE NIGHT CODING',
    description: 'Midnight fuel, energy drinks, and continuous coding. Stay alert. Keep pushing.',
    badges: ['24/7 CAFETERIA OPEN'],
    iconName: 'Moon'
  }
];

export const SCHEDULE_DAY_2: ScheduleItem[] = [
  {
    day: 2,
    time: '08:00',
    period: 'AM',
    title: 'BREAKFAST & REFRESHMENTS',
    description: 'Recharge with hot South Indian breakfast and freshly brewed coffee.',
    badges: ['DINING HALL'],
    iconName: 'Coffee'
  },
  {
    day: 2,
    time: '12:00',
    period: 'PM',
    title: 'SUBMISSION DEADLINE',
    description: 'Final code freeze, repository commit lock, and project submission.',
    isHighlight: true,
    highlightText: 'CODE FREEZE! LOCK ALL REPOSITORIES.',
    badges: ['CRITICAL DEADLINE'],
    iconName: 'AlertTriangle'
  },
  {
    day: 2,
    time: '02:00',
    period: 'PM',
    title: 'PROJECT PRESENTATIONS',
    description: 'Showcase your functional prototypes and live demos to the judging council.',
    badges: ['DEMO BAYS 1-5'],
    iconName: 'Presentation'
  },
  {
    day: 2,
    time: '05:00',
    period: 'PM',
    title: 'AWARDS CEREMONY',
    description: 'Announcing winners, trophy distribution, cash prizes, and closing valedictory.',
    badges: ['MAIN STAGE'],
    iconName: 'Award'
  }
];
