import type { TemplatePresetId, DisplayElement } from '../types/builder';

export interface TemplateDefinition {
  id: TemplatePresetId;
  name: string;
  category: 'Profile' | 'Stats' | 'Connect';
  description: string;
  iconName: string;
  elements: DisplayElement[];
}

export const TEMPLATE_LIBRARY: Record<TemplatePresetId, TemplateDefinition> = {
  PROFILE_CLASSIC: {
    id: 'PROFILE_CLASSIC',
    name: 'Classic Hacker ID',
    category: 'Profile',
    description: 'Clean balanced overview with photo avatar, role, title, and stack tags.',
    iconName: 'User',
    elements: [
      { id: 't-profile', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 't-title', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } },
      { id: 't-stack', type: 'stack', style: { font: 'HH MONO', color: 'HH YELLOW' } },
      { id: 't-status', type: 'status', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 't-quote', type: 'quote', style: { font: 'HH ZINE', color: 'MONO DARK' } }
    ]
  },
  PROFILE_TERMINAL: {
    id: 'PROFILE_TERMINAL',
    name: 'Cyber CLI Terminal',
    category: 'Profile',
    description: 'Terminal syntax layout with > WHOAMI, system status, and CLI metrics.',
    iconName: 'Terminal',
    elements: [
      { id: 't-term-1', type: 'custom', label: '> WHOAMI', content: 'NAME: Sham Sundar | ROLE: AI Developer', style: { font: 'HH MONO' } },
      { id: 't-term-title', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } },
      { id: 't-term-stack', type: 'stack', style: { font: 'HH MONO' } },
      { id: 't-term-status', type: 'status', style: { font: 'HH TERMINAL' } }
    ]
  },
  PROFILE_ZINE: {
    id: 'PROFILE_ZINE',
    name: 'Minimalist Zine',
    category: 'Profile',
    description: 'Editorial typography layout with large quote and minimal hacker credentials.',
    iconName: 'Sparkles',
    elements: [
      { id: 't-zine-prof', type: 'profile', style: { font: 'HH ZINE' } },
      { id: 't-zine-quote', type: 'quote', style: { font: 'HH ZINE', size: 'lg' } },
      { id: 't-zine-title', type: 'title', style: { font: 'HH DISPLAY' } }
    ]
  },
  PROFILE_RETRO: {
    id: 'PROFILE_RETRO',
    name: '8-Bit Pixel Retro',
    category: 'Profile',
    description: 'Retro 8-bit arcade aesthetic with pixelated text and roaming pet.',
    iconName: 'Flame',
    elements: [
      { id: 't-retro-prof', type: 'profile', style: { font: 'HH PIXEL' } },
      { id: 't-retro-pet', type: 'pet', style: { font: 'HH PIXEL' } },
      { id: 't-retro-title', type: 'title', style: { font: 'HH PIXEL' } },
      { id: 't-retro-stack', type: 'stack', style: { font: 'HH PIXEL' } }
    ]
  },
  STATS_GRID: {
    id: 'STATS_GRID',
    name: 'Projects & Metric Grid',
    category: 'Stats',
    description: 'Metrics overview grid with projects, hackathons won, streak, and rank.',
    iconName: 'Code',
    elements: [
      { id: 't-sg-stats', type: 'stats', style: { font: 'HH TERMINAL' } },
      { id: 't-sg-title', type: 'title', style: { font: 'HH DISPLAY' } },
      { id: 't-sg-stack', type: 'stack', style: { font: 'HH MONO' } },
      { id: 't-sg-status', type: 'status', style: { font: 'HH TERMINAL' } }
    ]
  },
  STATS_BADGES: {
    id: 'STATS_BADGES',
    name: 'Hacker Achievement Badges',
    category: 'Stats',
    description: 'Showcase unlocked hacker badges (100x Shipper, AI Alchemist, Goa Pioneer).',
    iconName: 'Trophy',
    elements: [
      { id: 't-sb-header', type: 'custom', label: 'UNLOCKED BADGES', content: '🚀 100x Shipper · ⚡ AI Alchemist · 🌴 Goa Pioneer · ☕ 3AM Coder', style: { font: 'HH TERMINAL' } },
      { id: 't-sb-stats', type: 'stats', style: { font: 'HH TERMINAL' } },
      { id: 't-sb-title', type: 'title', style: { font: 'HH DISPLAY' } }
    ]
  },
  STATS_BUILDING: {
    id: 'STATS_BUILDING',
    name: 'Currently Building',
    category: 'Stats',
    description: 'Deep dive into what you are currently building and primary tech stack.',
    iconName: 'Terminal',
    elements: [
      { id: 't-sbl-build', type: 'custom', label: 'CURRENTLY BUILDING', content: 'AI Developer Copilot for Hackers (Local LLMs + WebGL)', style: { font: 'HH MONO' } },
      { id: 't-sbl-stack', type: 'stack', style: { font: 'HH MONO' } },
      { id: 't-sbl-status', type: 'status', style: { font: 'HH TERMINAL' } }
    ]
  },
  STATS_HEATMAP: {
    id: 'STATS_HEATMAP',
    name: 'Commit Activity Heatmap',
    category: 'Stats',
    description: 'Simulated GitHub contribution heatmap matrix and commit streak analytics.',
    iconName: 'Flame',
    elements: [
      { id: 't-sh-heat', type: 'custom', label: 'COMMIT STREAK HEATMAP', content: '🟩🟩🟩🟩🟨🟩🟩 1,240 COMMITS THIS YEAR · 45 DAY STREAK', style: { font: 'HH TERMINAL' } },
      { id: 't-sh-stats', type: 'stats', style: { font: 'HH TERMINAL' } },
      { id: 't-sh-stack', type: 'stack', style: { font: 'HH MONO' } }
    ]
  },
  CONNECT_QR: {
    id: 'CONNECT_QR',
    name: 'High Visibility QR Code',
    category: 'Connect',
    description: 'Instant scannable QR Code pointing to your GitHub or Portfolio.',
    iconName: 'QrCode',
    elements: [
      { id: 't-cq-prof', type: 'profile', style: { font: 'HH DISPLAY' } },
      { id: 't-cq-qr', type: 'qr', style: { font: 'HH TERMINAL' } },
      { id: 't-cq-stack', type: 'stack', style: { font: 'HH MONO' } }
    ]
  },
  CONNECT_TREE: {
    id: 'CONNECT_TREE',
    name: 'Social Link Tree',
    category: 'Connect',
    description: 'Social handles for GitHub, X / Twitter, Farcaster, and Telegram.',
    iconName: 'Link',
    elements: [
      { id: 't-ct-links', type: 'custom', label: 'BUILDER SOCIAL LINKS', content: '𝕏 @sham-sundar · 🐙 github.com/sham-sundar · ✈️ t.me/sham_dev', style: { font: 'HH MONO' } },
      { id: 't-ct-qr', type: 'qr', style: { font: 'HH TERMINAL' } }
    ]
  },
  CONNECT_VOUCH: {
    id: 'CONNECT_VOUCH',
    name: "Let's Build in Goa",
    category: 'Connect',
    description: 'Networking contact card inviting hackers to collaborate at HH Goa 2026.',
    iconName: 'Sparkles',
    elements: [
      { id: 't-cv-card', type: 'custom', label: "LET'S BUILD IN GOA 🌴", content: 'Meet me at Hacker House Goa! Ping me for AI hacks & WebGL collabs.', style: { font: 'HH DISPLAY' } },
      { id: 't-cv-qr', type: 'qr', style: { font: 'HH TERMINAL' } },
      { id: 't-cv-prof', type: 'profile', style: { font: 'HH TERMINAL' } }
    ]
  },
  CONNECT_CHAOS: {
    id: 'CONNECT_CHAOS',
    name: '3AM Diagnostic Radar',
    category: 'Connect',
    description: 'Experimental 3AM diagnostic radar layout with QR code and coffee counter.',
    iconName: 'Flame',
    elements: [
      { id: 't-cc-diag', type: 'custom', label: '3AM DIAGNOSTIC RADAR', content: 'SYSTEM STATUS: 100% OPERATIONAL · 4 COFFEES CONSUMED', style: { font: 'HH TERMINAL' } },
      { id: 't-cc-qr', type: 'qr', style: { font: 'HH TERMINAL' } },
      { id: 't-cc-stats', type: 'stats', style: { font: 'HH TERMINAL' } }
    ]
  }
};
