import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { SiteContent, EventItem, SpecialAward } from '../types';

const CONTENT_DOC = 'siteContent/main';

const defaultEvents: EventItem[] = [
  { id: 'tech-01', code: 'TECH-01', title: 'PAPER PRESENTATION', category: 'technical', description: 'Present your innovative research ideas and technical solutions to the council.', fee: 30, feeText: 'FEE: ₹30', iconName: 'FileText', teamSize: '1 - 3 Members', rules: ['Slide deck length must be 8-10 slides max.', '10 minutes presentation + 3 minutes Q&A.', 'Topics include AI, Robotics, Embedded Systems, IoT, and Cyber-physical systems.', 'Plagiarism above 15% will lead to immediate disqualification.'], timing: 'Jan 15, 02:00 PM', venue: 'Seminar Hall A' },
  { id: 'tech-02', code: 'TECH-02', title: 'LINE FOLLOWER', category: 'technical', description: 'Build autonomous robots that can navigate predefined paths with precision.', fee: 50, feeText: 'FEE: ₹50', iconName: 'Cpu', teamSize: '1 - 4 Members', rules: ['Maximum robot dimension: 25cm x 25cm x 25cm.', 'Robot weight must not exceed 2.5 kg.', 'Line width is 30mm black line on a white arena.', 'Fastest accurate completion wins.'], timing: 'Jan 15, 03:30 PM', venue: 'Robotics Arena 1' },
  { id: 'tech-03', code: 'TECH-03', title: 'CAD DESIGNING', category: 'technical', description: 'Create innovative 3D models and engineering designs for the future.', fee: 40, feeText: 'FEE: ₹40', iconName: 'Box', teamSize: 'Individual', rules: ['Software allowed: SolidWorks, Fusion 360, AutoCAD, CATIA.', 'Problem statement provided on spot.', 'Time duration: 1.5 Hours.', 'Judged on precision, stress distribution, and aesthetic functionality.'], timing: 'Jan 15, 04:00 PM', venue: 'CAD Lab 204' },
  { id: 'tech-04', code: 'TECH-04', title: 'DRAG RACE', category: 'technical', description: 'Design and race high-speed remote-controlled vehicles on the strip.', fee: 60, feeText: 'FEE: ₹60', iconName: 'Zap', teamSize: '2 - 4 Members', rules: ['Electric power source only (Max 24V).', 'Both wired and wireless RC controllers allowed.', 'Single drag strip length: 30 meters straight.', 'Best time of 2 attempts qualifies for final knockout.'], timing: 'Jan 16, 11:00 AM', venue: 'Outdoor Track Bay' },
  { id: 'tech-05', code: 'TECH-05', title: 'ROBO SOCCER', category: 'technical', description: 'Program robots to compete in an exciting and lethal soccer tournament.', fee: 70, feeText: 'FEE: ₹70', iconName: 'Trophy', teamSize: '2 - 4 Members', rules: ['2 robots per team on field (1 Striker, 1 Defender/Goalie).', 'Match duration: 3 mins per half.', 'No physical destruction of opponent robots permitted.', 'Standard tennis ball used as football.'], timing: 'Jan 16, 01:00 PM', venue: 'Robotics Arena 2' },
  { id: 'tech-06', code: 'TECH-06', title: 'TECHNICAL QUIZ', category: 'technical', description: 'Test your deep-core knowledge in various technical domains.', fee: 25, feeText: 'FEE: ₹25', iconName: 'HelpCircle', teamSize: '2 Members', rules: ['Round 1: Rapid Fire MCQ Screening.', 'Round 2: Audio-Visual Engineering Identification.', 'Round 3: High-stakes Buzzer Round.', 'No gadgets or internet access permitted.'], timing: 'Jan 15, 05:00 PM', venue: 'Main Auditorium' },
  { id: 'tech-07', code: 'TECH-07', title: 'CTF (CAPTURE THE FLAG)', category: 'technical', description: 'Brutal cybersecurity challenges, reverse engineering, and cryptographic puzzles.', fee: 45, feeText: 'FEE: ₹45', iconName: 'Shield', teamSize: '1 - 3 Members', rules: ['Categories: Web Exploitation, Reverse Engineering, Cryptography, Forensics.', 'Jeopardy-style scoring grid.', 'Attacking the platform infrastructure results in instant DQ.', 'Dynamic scoring enabled for top flags.'], timing: 'Jan 15, 08:00 PM - Jan 16 04:00 AM', venue: 'Cyber Lab 101' },
  { id: 'tech-08', code: 'TECH-08', title: 'PIT STOP', category: 'technical', description: 'Fast-paced engineering challenges and soldering/circuit fixes under heavy time pressure.', fee: 55, feeText: 'FEE: ₹55', iconName: 'Wrench', teamSize: '2 Members', rules: ['Assemble hardware components on PCB from given schematic.', 'Debug intentional wiring errors within 20 minutes.', 'Judged on speed, clean soldering joints, and output accuracy.'], timing: 'Jan 16, 10:00 AM', venue: 'Hardware Workshop Bay' },
  { id: 'civilian-01', code: 'NON-01', title: 'FREE FIRE', category: 'civilian', description: 'Battle royale gaming tournament with pulse-pounding action and squad tactics.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Flame', teamSize: '4 Squad Members', rules: ['Map: Bermuda & Purgatory.', 'Emulators strictly prohibited (Mobile phones only).', 'Custom room code shared 10 mins prior.', 'Point system based on placement + kills.'], timing: 'Jan 15, 06:30 PM', venue: 'Esports Arena Hall B' },
  { id: 'civilian-02', code: 'NON-02', title: 'ANIME QUIZ', category: 'civilian', description: 'The ultimate test for seasoned anime enthusiasts, manga readers, and Otaku.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Sparkles', teamSize: '1 - 2 Members', rules: ['Covers Shonen, Seinen, Classic & Modern Anime Series.', 'Name the OST sound clip round included.', 'No smartwatches or phone usage allowed during rounds.'], timing: 'Jan 15, 07:30 PM', venue: 'Open Amphitheatre' },
  { id: 'civilian-03', code: 'NON-03', title: 'MEME QUIZ', category: 'civilian', description: 'Prove your dominance in the arena of internet culture, viral trends, and lore.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Smile', teamSize: '2 Members', rules: ['Identify the meme template and origin.', 'Recreate iconic viral meme formats on the spot.', 'Judged on humor, speed, and accuracy.'], timing: 'Jan 15, 09:00 PM', venue: 'Open Amphitheatre' },
  { id: 'civilian-04', code: 'NON-04', title: 'JUST A MIN (JAM)', category: 'civilian', description: 'Rapid-fire wit, spontaneous impromptu speaking, and lightning-fast speech challenges.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Mic', teamSize: 'Individual', rules: ['Speak for 60 seconds without hesitation, repetition, or deviation.', 'Challenged by opponents for grammatical or structural slips.', 'Topic assigned 30 seconds prior.'], timing: 'Jan 16, 09:30 AM', venue: 'Conference Room C' },
  { id: 'civilian-05', code: 'NON-05', title: '7TH SENSE', category: 'civilian', description: 'Intuition, spatial perception, and logic-based mind puzzles that defy reality.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Eye', teamSize: '2 Members', rules: ['Blindfolded tactile obstacle navigation.', 'Acoustic signal pattern recognition.', 'Decipher visual illusion matrixes.'], timing: 'Jan 16, 11:30 AM', venue: 'Activity Room 102' },
  { id: 'civilian-06', code: 'NON-06', title: 'PAPER PYRAMID', category: 'civilian', description: 'Creative structural engineering challenge using minimal paper sheets and tape.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Layers', teamSize: '2 - 3 Members', rules: ['Materials provided: 20 A4 sheets, 1 meter masking tape.', 'Structure must support a standard weight load.', 'Tallest stable pyramid within 30 minutes wins.'], timing: 'Jan 16, 12:30 PM', venue: 'Design Studio B' },
  { id: 'civilian-07', code: 'NON-07', title: 'SILENT MUSIC', category: 'civilian', description: 'Rhythm-based fun where silence is golden and headphone beats rule the floor.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Headphones', teamSize: '2 Members', rules: ['One team member listens to loud headphones and lip-reads the song name.', 'No hand gesture spelling allowed.', 'Most correct song guesses in 2 minutes wins.'], timing: 'Jan 16, 01:30 PM', venue: 'Student Activity Hub' },
  { id: 'civilian-08', code: 'NON-08', title: 'FIVE LEGS', category: 'civilian', description: 'Extreme physical team coordination, balancing, and problem-solving trials.', fee: 0, feeText: 'VERIFIED FEE: FREE', iconName: 'Users', teamSize: '4 Members', rules: ['4 team members must cross the finish line touching the ground with ONLY 5 legs combined.', 'Failure to maintain rule during race incurs time penalty.', 'Laughter guaranteed!'], timing: 'Jan 16, 02:30 PM', venue: 'Campus Lawn Area' },
];

const defaultContent: SiteContent = {
  hero: {
    badge: 'MISSION CRITICAL: JANUARY 15-16, 2026 • COIMBATORE',
    title: 'ROBOTRON 2027',
    subtitle: '24 HOURS. INFINITE POSSIBILITIES. ASSEMBLE YOUR SQUAD AND EXECUTE THE PLAN.',
    date: 'JANUARY 15-16, 2026',
    venue: 'PARK COLLEGE OF ENGINEERING, COIMBATORE',
  },
  about: {
    heading: 'ABOUT ROBOTRON',
    cards: [
      { title: 'INNOVATION HUB', description: 'Join the most exciting hackathon in South India where brilliant minds come together to solve real-world problems through technology and creativity.' },
      { title: 'COMPETE & WIN', description: 'Compete for amazing prizes worth ₹50,000 while showcasing your technical skills in various categories from AI/ML to cybersecurity.' },
      { title: 'NETWORK & LEARN', description: 'Connect with industry experts, developers, mentors. Participate in workshops, tech talks, and gain valuable insights.' },
    ],
  },
  stats: {
    hours: '24',
    prizePool: '₹50K',
    events: '16',
  },
  schedule: {
    day1: [
      { time: '09:00 AM', title: 'REGISTRATION & CHECK-IN', description: 'Get your badges and welcome kit. Verify your team status at the main gate.' },
      { time: '10:00 AM', title: 'OPENING CEREMONY', description: 'Welcome address, event overview, and unveiling of the main problem statements.' },
      { time: '12:00 PM', title: 'HACKING BEGINS!', description: 'DEPLOY ALL SYSTEMS. CLOCK IS RUNNING.', isHighlight: true },
      { time: '03:00 PM', title: 'MENTOR SESSIONS', description: 'Get guidance from industry experts. Slots allocated per team.' },
      { time: '10:00 PM', title: 'LATE NIGHT CODING', description: 'Midnight fuel, energy drinks, and continuous coding. Stay alert. Keep pushing.' },
    ],
    day2: [
      { time: '08:00 AM', title: 'BREAKFAST & REFRESHMENTS', description: 'Recharge with hot South Indian breakfast and freshly brewed coffee.' },
      { time: '12:00 PM', title: 'SUBMISSION DEADLINE', description: 'Final code freeze, repository commit lock, and project submission.', isHighlight: true },
      { time: '02:00 PM', title: 'PROJECT PRESENTATIONS', description: 'Showcase your functional prototypes and live demos to the judging council.' },
      { time: '05:00 PM', title: 'AWARDS CEREMONY', description: 'Announcing winners, trophy distribution, cash prizes, and closing valedictory.' },
    ],
  },
  events: {
    technical: defaultEvents.filter(e => e.category === 'technical'),
    civilian: defaultEvents.filter(e => e.category === 'civilian'),
  },
  prizes: {
    pool: '₹50,000',
    first: { title: 'ROBOTRON KING', amount: '₹25,000', perks: ['STARTUP INCUBATION SUPPORT', 'INDUSTRY MENTORSHIP', 'PRIME SHOWCASE SLOT'] },
    second: { title: 'RUNNER UP', amount: '₹15,000', perks: ['Tech Workshop Access', 'Exclusive Networking', 'Official Certificate'] },
    third: { title: 'BRONZE ELITE', amount: '₹10,000', perks: ['Sponsor Goodie Bag', 'Merit Certificate', 'Development Tools Access'] },
    special: [
      { title: 'MOST INNOVATIVE', reward: '₹5,000 + TROPHY', description: "For the team that pushes the boundaries of what's possible with a unique solution.", iconBg: 'bg-[#fddc00]', iconName: 'Lightbulb' },
      { title: 'TEAM SYNERGY', reward: '₹3,000 + CERTIFICATES', description: 'Recognizing outstanding collaboration, distributed workload, and cohesive execution.', iconBg: 'bg-[#3467ff]', iconName: 'Users' },
      { title: 'BEST UI/UX', reward: '₹2,000 + TOOLS', description: 'For excellence in interface aesthetics, user journey flow, and accessibility.', iconBg: 'bg-[#ff6584]', iconName: 'Palette' },
    ],
  },
  contact: {
    emails: ['hello@Robotron2027.com', 'support@Robotron2027.com'],
    phones: ['+91 98765 43210', '+91 87654 32109'],
    address: 'Park College of Engineering and Technology, Kaniyur, Coimbatore - 641659, Tamil Nadu, India',
  },
  footer: {
    brand: 'ROBOTRON 2027',
    tagline: '24 HOURS. INFINITE POSSIBILITIES.',
    copyright: '© 2027 ROBOTRON HACKATHON. ASSEMBLE YOUR TEAM.',
  },
};

function deepMergeWithHealing(target: SiteContent, source: Partial<SiteContent>): SiteContent {
  const result = { ...target, ...source } as SiteContent;

  // Heal empty events arrays
  if (!result.events?.technical?.length && target.events?.technical?.length) {
    result.events = { ...result.events, technical: target.events.technical };
  }
  if (!result.events?.civilian?.length && target.events?.civilian?.length) {
    result.events = { ...result.events, civilian: target.events.civilian };
  }

  // Heal empty schedule arrays
  if (!result.schedule?.day1?.length && target.schedule?.day1?.length) {
    result.schedule = { ...result.schedule, day1: target.schedule.day1, day2: target.schedule.day2 };
  }

  // Heal empty prize perks
  (['first', 'second', 'third'] as const).forEach(r => {
    if (!result.prizes?.[r]?.perks?.length && target.prizes?.[r]?.perks?.length) {
      result.prizes = { ...result.prizes, [r]: { ...result.prizes![r], perks: target.prizes[r].perks } };
    }
  });
  if (!result.prizes?.special?.length && target.prizes?.special?.length) {
    result.prizes = { ...result.prizes, special: target.prizes.special };
  }

  return result;
}

export async function loadContent(): Promise<SiteContent> {
  try {
    const docRef = doc(db, CONTENT_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return deepMergeWithHealing(defaultContent, docSnap.data() as Partial<SiteContent>);
    }
    return defaultContent;
  } catch (err) {
    console.warn('Could not load content from Firestore, using defaults:', err);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const docRef = doc(db, CONTENT_DOC);
  await setDoc(docRef, content);
}

export { defaultContent };
