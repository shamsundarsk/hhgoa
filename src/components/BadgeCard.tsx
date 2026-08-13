import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderCardState, DisplayElement, PetOption } from '../types/builder';
import { TEMPLATE_LIBRARY } from '../utils/templateLibrary';
import { BadgeBack } from './BadgeBack';
import { PixelCatSprite } from './PixelCatSprite';
import { RotateCw, MapPin, Coffee, Terminal, User, Code, Link as LinkIcon, Flame, Trophy, Award, QrCode } from 'lucide-react';

interface BadgeCardProps {
  cardState: BuilderCardState;
  onButtonClick?: (buttonKey: 'button1' | 'button2' | 'button3') => void;
  isFlipped?: boolean;
  onToggleFlip?: (flipped: boolean) => void;
  showLanyard?: boolean;
}

// REAL AUTHENTIC 8-BIT RETRO PIXEL PET COMPONENT (PURE TRANSPARENT SPRITE, NO BACKGROUND BOX)
export const RoamingPixelPet: React.FC<{ petType: PetOption }> = ({ petType }) => {
  if (!petType || petType === 'none') return null;

  return (
    <div className="w-full relative h-7 overflow-hidden pointer-events-none flex items-center shrink-0 my-0.5">
      <div className="animate-roam-pet whitespace-nowrap">
        {petType === 'dog' ? (
          <PixelCatSprite size={28} color="#FF5E97" />
        ) : petType === 'crab' ? (
          <PixelCatSprite size={28} color="#A3E635" />
        ) : petType === 'bot' ? (
          <PixelCatSprite size={28} color="#38BDF8" />
        ) : (
          <PixelCatSprite size={28} color="#121913" />
        )}
      </div>
    </div>
  );
};

export const BadgeCard: React.FC<BadgeCardProps> = ({
  cardState,
  onButtonClick,
  isFlipped: controlledIsFlipped,
  onToggleFlip,
  showLanyard = true
}) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState<boolean>(false);
  const isFlipped = controlledIsFlipped !== undefined ? controlledIsFlipped : internalIsFlipped;

  const handleFlipToggle = () => {
    if (onToggleFlip) {
      onToggleFlip(!isFlipped);
    } else {
      setInternalIsFlipped(!internalIsFlipped);
    }
  };

  const { profile, builderTitle, display, metadata } = cardState;

  const buttons = display.buttons || {
    button1: { id: 'button1', label: '(A) PROFILE', icon: 'user', assignedTemplate: 'PROFILE_CLASSIC' },
    button2: { id: 'button2', label: '(B) PROJECTS', icon: 'code', assignedTemplate: 'STATS_GRID' },
    button3: { id: 'button3', label: '(C) CONNECT', icon: 'link', assignedTemplate: 'CONNECT_QR' },
    activeButtonId: 'button1'
  };

  const getFontClass = (fontName: string) => {
    switch (fontName) {
      case 'HH TERMINAL': return 'font-terminal';
      case 'HH MONO': return 'font-terminal';
      case 'HH PIXEL': return 'font-pixel text-xs leading-tight';
      case 'HH ZINE': return 'font-serif italic';
      default: return 'font-display';
    }
  };

  const renderElement = (elem: DisplayElement) => {
    switch (elem.type) {
      case 'profile':
        return (
          <div key={elem.id} className="flex items-center gap-3.5 pb-2 border-b border-[#121913]/15 shrink-0">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-[#121913] shadow-md shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#121913]/10 border-2 border-[#121913] flex items-center justify-center shrink-0">
                <Terminal className="w-7 h-7 text-[#121913]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-3xl font-display font-black leading-none uppercase tracking-tight text-[#121913] truncate">
                {profile.name || 'ANONYMOUS BUILDER'}
              </h3>
              <p className="text-xs font-terminal font-semibold text-[#121913]/70 truncate mt-0.5">
                {profile.handle || '@builder'}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-block px-2 py-0.5 rounded bg-[#121913] text-[#D8DFC6] text-xs font-terminal font-bold uppercase tracking-wider">
                  {profile.role || 'BUILDER'}
                </span>
                {profile.location && (
                  <span className="text-xs font-terminal text-[#121913]/80 flex items-center gap-1 truncate font-medium uppercase">
                    <MapPin className="w-3.5 h-3.5 text-[#121913]/70 shrink-0" /> {profile.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 'title':
        return (
          <div key={elem.id} className="p-2.5 bg-[#121913]/5 border border-[#121913]/25 rounded-xl text-center shadow-inner shrink-0">
            <p className="text-[10px] font-terminal uppercase tracking-widest text-[#121913]/60 font-bold">
              BUILDER TITLE
            </p>
            <h4 className="text-3xl font-display font-black tracking-wide text-[#121913] uppercase leading-none mt-0.5">
              ⚡ {builderTitle}
            </h4>
          </div>
        );

      case 'stack':
        return (
          <div key={elem.id} className="shrink-0">
            <p className="text-[10px] font-terminal font-bold uppercase tracking-wider text-[#121913]/60 mb-1">
              STACK
            </p>
            <div className="flex flex-wrap gap-1.5">
              {profile.stack && profile.stack.length > 0 ? (
                profile.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[#121913]/10 border border-[#121913]/30 rounded-md text-xs font-terminal font-bold text-[#121913] uppercase"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-xs font-terminal text-stone-600">PYTHON · REACT · AI</span>
              )}
            </div>
          </div>
        );

      case 'quote':
        return (
          <div key={elem.id} className="p-2 italic text-center border-l-3 border-[#121913] bg-[#121913]/5 rounded-r shrink-0">
            <p className="text-xs sm:text-sm font-body font-medium text-[#121913] line-clamp-2">
              {profile.quote || '"Ship first. Explain later."'}
            </p>
          </div>
        );

      case 'status':
        return (
          <div key={elem.id} className="p-2 border border-[#121913]/35 rounded-xl bg-[#121913]/5 flex flex-col gap-1.5 shrink-0">
            <div className="flex justify-between items-center text-xs font-terminal font-bold text-[#121913] uppercase">
              <span className="truncate">{profile.statusMessage || 'STATUS: SHIPPING'}</span>
              <span className="flex items-center gap-1 shrink-0"><Coffee className="w-3.5 h-3.5 text-[#121913]" /> {profile.coffeeCount} COFFEES</span>
            </div>
            <div className="w-full bg-[#121913]/20 h-2.5 rounded-full overflow-hidden p-0.5">
              <div className="bg-[#121913] h-full rounded-full w-[82%]" />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div key={elem.id} className="border border-[#121913]/30 rounded-xl bg-[#121913]/5 p-2 grid grid-cols-4 divide-x divide-[#121913]/20 text-center shrink-0">
            <div className="px-1">
              <div className="flex items-center justify-center text-[#121913]">
                <Code className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-terminal font-bold text-[#121913]/70 mt-0.5">PROJECTS</p>
              <p className="text-sm font-bold font-terminal text-[#121913]">{profile.stats.projects}</p>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-center text-[#121913]">
                <Trophy className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-terminal font-bold text-[#121913]/70 mt-0.5">HACKATHONS</p>
              <p className="text-sm font-bold font-terminal text-[#121913]">{profile.stats.hackathons}</p>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-center text-[#121913]">
                <Flame className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-terminal font-bold text-[#121913]/70 mt-0.5">STREAK</p>
              <p className="text-sm font-bold font-terminal text-[#121913]">{profile.stats.streak}D</p>
            </div>
            <div className="px-1">
              <div className="flex items-center justify-center text-[#121913]">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-[9px] font-terminal font-bold text-[#121913]/70 mt-0.5">RANK</p>
              <p className="text-sm font-bold font-terminal text-[#121913]">{profile.stats.rank}</p>
            </div>
          </div>
        );

      case 'qr':
        return (
          <div key={elem.id} className="p-3 bg-[#121913]/10 border border-[#121913]/30 rounded-xl flex items-center justify-between shadow-sm shrink-0">
            <div className="space-y-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 text-[#121913] font-terminal font-bold text-xs uppercase">
                <QrCode className="w-4 h-4" /> SCAN TO CONNECT
              </div>
              <p className="text-xs font-terminal text-[#121913]/80 font-semibold truncate max-w-[180px]">
                {profile.github || profile.website || 'github.com/builder'}
              </p>
              <span className="inline-block text-[10px] font-terminal text-[#121913]/60 uppercase">
                OFFICIAL BUILDER QR
              </span>
            </div>
            <div className="p-1.5 bg-white rounded-lg border border-[#121913] shadow shrink-0">
              <QRCodeSVG value={profile.github || profile.website || 'https://hhgoa.dev'} size={62} />
            </div>
          </div>
        );

      case 'pet':
        return (
          <RoamingPixelPet key={elem.id} petType={display.activePet || 'cat'} />
        );

      case 'image':
        return (
          <div key={elem.id} className="p-1 border border-[#121913]/30 rounded-xl bg-[#121913]/5 flex justify-center shrink-0">
            {elem.content ? (
              <img src={elem.content} alt="Custom Block" className="max-h-24 rounded-lg object-contain border border-[#121913]" />
            ) : (
              <div className="py-4 font-terminal text-xs text-[#121913]/60">Custom Image Block</div>
            )}
          </div>
        );

      case 'text':
      case 'custom':
        return (
          <div key={elem.id} className="p-2 border border-dashed border-[#121913]/40 rounded-lg bg-[#121913]/5 shrink-0">
            {elem.label && (
              <p className="text-[9px] font-terminal font-bold text-[#121913]/60 uppercase mb-0.5">
                {elem.label}
              </p>
            )}
            <p className={`text-xs font-terminal font-medium text-[#121913] ${getFontClass(elem.style.font || display.font)}`}>
              {elem.content || 'Building things nobody asked for.'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const activeTemplateDef = TEMPLATE_LIBRARY[buttons[buttons.activeButtonId]?.assignedTemplate] || TEMPLATE_LIBRARY['PROFILE_CLASSIC'];

  return (
    <div className="relative group flex flex-col items-center select-none w-full">
      {/* Flip Card Toggle Control */}
      <button
        onClick={handleFlipToggle}
        className="mb-4 flex items-center gap-2 px-5 py-2 rounded-full bg-[#163824] border border-[#E5F552]/40 text-xs font-terminal text-[#E5F552] hover:bg-[#1B422B] transition-all shadow-lg active:scale-95 uppercase tracking-wider"
      >
        <RotateCw className="w-3.5 h-3.5" />
        {isFlipped ? 'VIEW FRONT BADGE' : 'FLIP BADGE (BACK VIEW)'}
      </button>

      {/* Lanyard Top Strap & Swivel Clip */}
      {showLanyard && (
        <div className="flex flex-col items-center mb-[-12px] z-20 pointer-events-none">
          <div className="w-14 h-16 bg-gradient-to-b from-[#143d22] to-[#1a4a2b] border-x-2 border-[#E5F552]/30 flex flex-col items-center justify-center overflow-hidden shadow-md">
            <span className="font-terminal text-[9px] font-bold text-[#E5F552] rotate-90 whitespace-nowrap opacity-80 tracking-widest uppercase">
              HACKER HOUSE GOA 2026 🌴
            </span>
          </div>

          <div className="relative w-9 h-9 flex items-center justify-center -mt-2">
            <div className="w-7 h-7 rounded-full border-4 border-stone-300 bg-stone-700 shadow-inner flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-stone-900" />
            </div>
            <div className="absolute top-4 w-3.5 h-5 bg-gradient-to-b from-stone-300 to-stone-500 rounded-sm border border-stone-600 shadow" />
          </div>
        </div>
      )}

      {/* Render Front or Back Badge (PHYSICAL BADGE 101.6mm x 152.4mm / 4" x 6" Ratio 1:1.5) */}
      {isFlipped ? (
        <div id="hh-badge-canvas-container" className="w-full max-w-[540px]">
          <BadgeBack cardState={cardState} />
        </div>
      ) : (
        /* OFFICIAL ID CARD TEMPLATE CONTAINER */
        <div
          id="hh-badge-canvas-container"
          className="relative w-full max-w-[540px] aspect-[1/1.5] rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-[#163824]"
        >
          {/* Clean Card Front Template Background Image */}
          <img
            src="/assets/card_front_template.png"
            alt="HH Goa Card Template"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* LARGE SPACIOUS E-PAPER DISPLAY SCREEN BOX */}
          <div
            className="absolute top-[31.2%] left-[5.5%] w-[89%] h-[52.0%] bg-[#D8DFC6] epaper-texture text-[#121913] rounded-2xl border-4 border-[#0d2216] epaper-screen-shadow p-3.5 flex flex-col justify-between overflow-hidden shadow-2xl z-10"
          >
            {/* Screen Header Bar */}
            <div className="flex justify-between items-center text-xs font-terminal font-bold border-b border-[#121913]/25 pb-1 mb-1 text-[#121913] shrink-0">
              <span className="flex items-center gap-1.5 uppercase truncate max-w-[200px]">
                <span className="w-2 h-2 rounded-full bg-[#121913] animate-pulse" />
                &gt; {activeTemplateDef.name}
              </span>
              <span className="font-terminal font-bold text-[#121913]/70">{metadata.badgeId}</span>
            </div>

            {/* Dynamic Element Stream */}
            <div className="flex-1 space-y-1.5 overflow-hidden flex flex-col justify-between py-1">
              {display.elements && display.elements.length > 0 ? (
                display.elements.slice(0, 5).map(renderElement)
              ) : (
                <div className="text-center py-6 text-xs font-terminal text-[#121913]/60">
                  No display elements added.
                </div>
              )}
            </div>

            {/* Animated Pixel Pet */}
            {display.activePet && display.activePet !== 'none' && (
              <RoamingPixelPet petType={display.activePet} />
            )}

            {/* Screen Footer Bar */}
            <div className="border-t border-[#121913]/20 pt-1 text-[10px] font-terminal flex justify-between text-[#121913]/70 uppercase shrink-0">
              <span>E-PAPER LCD 240x320</span>
              <span>HH26 VERIFIED</span>
            </div>
          </div>

          {/* 3 SMALL ACTION BUTTONS POSITIONED FLUSH ABOVE HOT PINK TAGLINE */}
          <div className="absolute top-[84.6%] left-[5.5%] w-[89%] h-[5.8%] grid grid-cols-3 gap-2.5 z-10">
            {(['button1', 'button2', 'button3'] as const).map((bKey) => {
              const btnConfig = buttons[bKey];
              const isActive = buttons.activeButtonId === bKey;

              return (
                <button
                  key={bKey}
                  onClick={() => onButtonClick?.(bKey)}
                  className={`w-full h-full py-1 rounded-lg font-terminal text-[10px] sm:text-xs font-black border-2 transition-all flex items-center justify-center gap-1 shadow-md uppercase tracking-wider cursor-pointer ${
                    isActive
                      ? 'bg-[#E5F552] text-[#0A1D13] border-[#0A1D13] scale-[1.02]'
                      : 'bg-white text-[#0A1D13] border-[#0A1D13] hover:bg-[#E5F552]'
                  }`}
                >
                  {bKey === 'button1' ? <User className="w-3.5 h-3.5" /> : bKey === 'button2' ? <Code className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                  {btnConfig.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
