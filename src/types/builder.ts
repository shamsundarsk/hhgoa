export type DisplayMode = 
  | 'PROFILE' 
  | 'TERMINAL' 
  | 'STAT' 
  | 'PIXEL' 
  | 'QUOTE' 
  | 'BADGE' 
  | 'FOCUS' 
  | 'CONNECT' 
  | 'CHAOS';

export type TemplatePresetId = 
  | 'PROFILE_CLASSIC'    // Classic Hacker ID
  | 'PROFILE_TERMINAL'   // CLI Matrix Terminal
  | 'PROFILE_ZINE'       // Minimalist Zine Editorial
  | 'PROFILE_RETRO'      // 8-Bit Pixel Retro
  | 'STATS_GRID'         // Projects & Metric Grid
  | 'STATS_BADGES'       // Hacker Achievement Badges
  | 'STATS_BUILDING'     // Currently Building & Stack Breakdown
  | 'STATS_HEATMAP'      // Commit Streak Heatmap Matrix
  | 'CONNECT_QR'         // High Visibility QR Code
  | 'CONNECT_TREE'       // Social Link Tree & Handles
  | 'CONNECT_VOUCH'      // Let's Build in Goa Contact Card
  | 'CONNECT_CHAOS';     // 3AM Diagnostic Radar

export type FontFamilyOption = 
  | 'HH DISPLAY' 
  | 'HH TERMINAL' 
  | 'HH MONO' 
  | 'HH PIXEL' 
  | 'HH ZINE';

export type ColorOption = 
  | 'HH GREEN'
  | 'HH YELLOW' 
  | 'HH PINK' 
  | 'MONO DARK' 
  | 'CREAM';

export type ElementType = 
  | 'profile' 
  | 'title' 
  | 'stack' 
  | 'text' 
  | 'quote' 
  | 'status' 
  | 'stats' 
  | 'qr' 
  | 'image' 
  | 'custom'
  | 'pet';

export type PetOption = 'none' | 'cat' | 'dog' | 'crab' | 'bot';

export interface ElementStyle {
  font?: FontFamilyOption;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: ColorOption;
  align?: 'left' | 'center' | 'right';
  border?: boolean;
}

export interface DisplayElement {
  id: string;
  type: ElementType;
  label?: string; // For custom blocks
  content?: string;
  petType?: PetOption;
  style: ElementStyle;
}

export interface UserStats {
  projects: number;
  hackathons: number;
  streak: number;
  rank: string;
  commits: number;
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  stack: string[];
  location: string;
  building: string;
  github: string;
  website: string;
  quote: string;
  favoriteTech: string;
  coffeeCount: number;
  statusMessage: string;
  photoUrl: string | null;
  secondaryPhotoUrl?: string | null;
  stats: UserStats;
}

export interface ButtonConfig {
  id: 'button1' | 'button2' | 'button3';
  label: string;
  icon: 'user' | 'code' | 'link' | 'terminal' | 'sparkles' | 'flame' | 'qr';
  assignedTemplate: TemplatePresetId;
  elements?: DisplayElement[]; // INDEPENDENT DISPLAY ELEMENTS FOR THIS BUTTON
}

export interface ButtonAssignmentState {
  button1: ButtonConfig;
  button2: ButtonConfig;
  button3: ButtonConfig;
  activeButtonId: 'button1' | 'button2' | 'button3';
}

export interface BuilderCardState {
  profile: ProfileData;
  builderTitle: string;
  display: {
    mode: DisplayMode;
    font: FontFamilyOption;
    accentColor: ColorOption;
    activePet: PetOption;
    elements: DisplayElement[];
    buttons: ButtonAssignmentState;
  };
  metadata: {
    badgeId: string;
    event: string;
    dates: string;
    location: string;
  };
}
