import React from 'react';
import type { DisplayMode, DisplayElement, FontFamilyOption, ColorOption } from '../types/builder';
import { Terminal, BarChart2, Gamepad2, Quote, Award, Sparkles, QrCode, Cpu, Layers } from 'lucide-react';

interface ThemePresetsProps {
  currentMode: DisplayMode;
  onSelectPreset: (mode: DisplayMode, elements: DisplayElement[], font: FontFamilyOption, color: ColorOption) => void;
}

export const PRESET_CONFIGS: Array<{
  mode: DisplayMode;
  label: string;
  icon: React.ReactNode;
  font: FontFamilyOption;
  color: ColorOption;
  description: string;
  elements: DisplayElement[];
}> = [
  {
    mode: 'PROFILE',
    label: 'PROFILE MODE',
    icon: <Layers className="w-4 h-4" />,
    font: 'HH DISPLAY',
    color: 'HH GREEN',
    description: 'Clean balanced overview with photo, stack, and title.',
    elements: [
      { id: 'p-1', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 'p-2', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } },
      { id: 'p-3', type: 'stack', style: { font: 'HH MONO', color: 'HH YELLOW' } },
      { id: 'p-4', type: 'status', style: { font: 'HH TERMINAL', color: 'MONO DARK' } }
    ]
  },
  {
    mode: 'TERMINAL',
    label: 'TERMINAL MODE',
    icon: <Terminal className="w-4 h-4" />,
    font: 'HH TERMINAL',
    color: 'HH GREEN',
    description: 'Cyber matrix terminal layout with system stats & diagnostics.',
    elements: [
      { id: 't-1', type: 'profile', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 't-2', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } },
      { id: 't-3', type: 'status', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 't-4', type: 'stack', style: { font: 'HH MONO', color: 'MONO DARK' } }
    ]
  },
  {
    mode: 'STAT',
    label: 'STAT MODE',
    icon: <BarChart2 className="w-4 h-4" />,
    font: 'HH TERMINAL',
    color: 'HH YELLOW',
    description: 'Data-dense grid with hackathon, streak & project metrics.',
    elements: [
      { id: 's-1', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 's-2', type: 'stats', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 's-3', type: 'stack', style: { font: 'HH MONO', color: 'HH YELLOW' } },
      { id: 's-4', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } }
    ]
  },
  {
    mode: 'PIXEL',
    label: 'PIXEL ART MODE',
    icon: <Gamepad2 className="w-4 h-4" />,
    font: 'HH PIXEL',
    color: 'HH PINK',
    description: 'Retro 8-bit aesthetic with pixelated text & badges.',
    elements: [
      { id: 'px-1', type: 'title', style: { font: 'HH PIXEL', color: 'HH PINK' } },
      { id: 'px-2', type: 'profile', style: { font: 'HH PIXEL', color: 'MONO DARK' } },
      { id: 'px-3', type: 'stack', style: { font: 'HH PIXEL', color: 'MONO DARK' } },
      { id: 'px-4', type: 'status', style: { font: 'HH PIXEL', color: 'MONO DARK' } }
    ]
  },
  {
    mode: 'QUOTE',
    label: 'QUOTE MODE',
    icon: <Quote className="w-4 h-4" />,
    font: 'HH ZINE',
    color: 'MONO DARK',
    description: 'Minimal editorial layout focusing on hacker manifesto.',
    elements: [
      { id: 'q-1', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 'q-2', type: 'quote', style: { font: 'HH ZINE', color: 'MONO DARK' } },
      { id: 'q-3', type: 'title', style: { font: 'HH TERMINAL', color: 'HH GREEN' } }
    ]
  },
  {
    mode: 'BADGE',
    label: 'BADGE MODE',
    icon: <Award className="w-4 h-4" />,
    font: 'HH MONO',
    color: 'HH YELLOW',
    description: 'Showcase unlocked hacker badges & achievements.',
    elements: [
      { id: 'b-1', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 'b-2', type: 'custom', label: 'UNLOCKED ACHIEVEMENTS', content: '🏆 Winner - Hack the North 2024\n⚡ Finalist - ETHIndia 2025\n⭐ Open Source Contributor', style: { font: 'HH MONO', color: 'MONO DARK' } },
      { id: 'b-3', type: 'stack', style: { font: 'HH MONO', color: 'HH YELLOW' } }
    ]
  },
  {
    mode: 'CONNECT',
    label: "LET'S CONNECT",
    icon: <QrCode className="w-4 h-4" />,
    font: 'HH TERMINAL',
    color: 'HH GREEN',
    description: 'High visibility QR code & social channels.',
    elements: [
      { id: 'c-1', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 'c-2', type: 'qr', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 'c-3', type: 'stack', style: { font: 'HH MONO', color: 'MONO DARK' } }
    ]
  },
  {
    mode: 'CHAOS',
    label: 'CHAOS DIAGNOSTIC',
    icon: <Cpu className="w-4 h-4" />,
    font: 'HH TERMINAL',
    color: 'HH PINK',
    description: 'Experimental composite with 3AM status & custom notes.',
    elements: [
      { id: 'ch-1', type: 'title', style: { font: 'HH TERMINAL', color: 'HH PINK' } },
      { id: 'ch-2', type: 'custom', label: '3AM BUILD STATUS', content: '███████████░░ 89%\nstill debugging. still shipping.', style: { font: 'HH TERMINAL', color: 'MONO DARK' } },
      { id: 'ch-3', type: 'profile', style: { font: 'HH DISPLAY', color: 'MONO DARK' } },
      { id: 'ch-4', type: 'quote', style: { font: 'HH ZINE', color: 'MONO DARK' } }
    ]
  }
];

export const ThemePresets: React.FC<ThemePresetsProps> = ({
  currentMode,
  onSelectPreset
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-bold text-sm text-[#F3F0E6] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E5F552]" /> DISPLAY PRESETS
        </h4>
        <span className="font-terminal text-xs text-stone-400">1-CLICK LAYOUTS</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESET_CONFIGS.map((preset) => {
          const isSelected = currentMode === preset.mode;
          return (
            <button
              key={preset.mode}
              onClick={() => onSelectPreset(preset.mode, preset.elements, preset.font, preset.color)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#163824] border-[#E5F552] text-[#E5F552] shadow-md scale-[1.02]'
                  : 'bg-[#0A1D13] border-[#1B422B] text-stone-300 hover:border-[#E5F552]/40 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-[#E5F552] text-[#0A1D13]' : 'bg-[#163824] text-[#E5F552]'}`}>
                {preset.icon}
              </div>
              <div className="min-w-0">
                <p className="font-terminal font-bold text-xs leading-tight truncate">
                  {preset.label}
                </p>
                <p className="font-terminal text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
