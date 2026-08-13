import type { BuilderCardState, DisplayElement, ButtonAssignmentState } from '../types/builder';

export const DEFAULT_PROFILE = {
  name: 'Sham Sundar',
  handle: '@sham-sundar',
  role: 'AI Developer & Shipper',
  stack: ['Python', 'React', 'AI', 'LangChain'],
  location: 'Coimbatore, India',
  building: 'AI Developer Tools for Hackers',
  github: 'github.com/sham-sundar',
  website: 'sham.dev',
  quote: '"Ship first. Explain later."',
  favoriteTech: 'Local LLMs & WebGL',
  coffeeCount: 4,
  statusMessage: 'STATUS :: SHIPPING',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  stats: {
    projects: 12,
    hackathons: 18,
    streak: 45,
    rank: 'TOP 15%',
    commits: 1240
  }
};

export const DEFAULT_BUTTON1_ELEMENTS: DisplayElement[] = [
  { id: 'b1-prof', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
  { id: 'b1-title', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } },
  { id: 'b1-stack', type: 'stack', style: { font: 'HH MONO', color: 'HH YELLOW' } },
  { id: 'b1-status', type: 'status', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
  { id: 'b1-quote', type: 'quote', style: { font: 'HH ZINE', color: 'MONO DARK' } }
];

export const DEFAULT_BUTTON2_ELEMENTS: DisplayElement[] = [
  { id: 'b2-stats', type: 'stats', style: { font: 'HH TERMINAL' } },
  { id: 'b2-title', type: 'title', style: { font: 'HH DISPLAY' } },
  { id: 'b2-stack', type: 'stack', style: { font: 'HH MONO' } },
  { id: 'b2-status', type: 'status', style: { font: 'HH TERMINAL' } }
];

export const DEFAULT_BUTTON3_ELEMENTS: DisplayElement[] = [
  { id: 'b3-prof', type: 'profile', style: { font: 'HH DISPLAY' } },
  { id: 'b3-qr', type: 'qr', style: { font: 'HH TERMINAL' } },
  { id: 'b3-stack', type: 'stack', style: { font: 'HH MONO' } }
];

export const DEFAULT_BUTTONS: ButtonAssignmentState = {
  button1: {
    id: 'button1',
    label: '(A) PROFILE',
    icon: 'user',
    assignedTemplate: 'PROFILE_CLASSIC',
    elements: DEFAULT_BUTTON1_ELEMENTS
  },
  button2: {
    id: 'button2',
    label: '(B) PROJECTS',
    icon: 'code',
    assignedTemplate: 'STATS_GRID',
    elements: DEFAULT_BUTTON2_ELEMENTS
  },
  button3: {
    id: 'button3',
    label: '(C) CONNECT',
    icon: 'link',
    assignedTemplate: 'CONNECT_QR',
    elements: DEFAULT_BUTTON3_ELEMENTS
  },
  activeButtonId: 'button1'
};

export const INITIAL_CARD_STATE: BuilderCardState = {
  profile: DEFAULT_PROFILE,
  builderTitle: 'THE DATA ALCHEMIST',
  display: {
    mode: 'PROFILE',
    font: 'HH DISPLAY',
    accentColor: 'HH GREEN',
    activePet: 'none',
    elements: DEFAULT_BUTTON1_ELEMENTS,
    buttons: DEFAULT_BUTTONS
  },
  metadata: {
    badgeId: 'HHG26-2847',
    event: 'HACKER HOUSE GOA 2026',
    dates: '28 - 31 OCT 2026',
    location: 'GOA, INDIA'
  }
};
