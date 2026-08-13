import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Palmtree, UserCheck, CreditCard, Flame, Award, Heart } from 'lucide-react';

interface LandingPageProps {
  onStartIdCard: () => void;
  onStartPfpFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartIdCard, onStartPfpFrame }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between text-center overflow-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (PERFECT LAYOUT WITH GOA SUNSET BACKGROUND)      */}
      {/* ========================================================================= */}
      <section className="relative px-4 py-8 flex flex-col items-center justify-center flex-1">
        {/* Goa Beach Sunset Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/goa_beach_sunset.jpg"
            alt="Goa Beach Sunset"
            className="w-full h-full object-cover opacity-25 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1D13]/85 via-[#0A1D13]/95 to-[#0A1D13]"></div>
        </div>

        {/* Animated Particle Grid */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#E5F552_2px,transparent_2px)] [background-size:32px_32px] animate-pulse z-0"></div>

        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#E5F552]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FF5E97]/10 blur-[80px] rounded-full pointer-events-none z-0"></div>

        {/* Hero Details Content */}
        <div className="relative z-10 max-w-4xl w-full mx-auto space-y-4">
          {/* Top Event Tagline & 2:47PM Studio Logo Header */}
          <div className="flex flex-row items-center justify-center gap-3">
            <img
              src="/assets/247_studio_logo.png"
              alt="2:47PM Studio"
              className="h-7 sm:h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(229,245,82,0.4)]"
            />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#163824]/90 border border-[#E5F552]/40 text-[10px] sm:text-xs font-terminal text-[#E5F552] shadow-[0_0_20px_rgba(229,245,82,0.2)] uppercase tracking-widest backdrop-blur-md">
              <Palmtree className="w-3.5 h-3.5 text-[#E5F552]" />
              <span>HH GOA 2026 STUDIO</span>
              <Sparkles className="w-3 h-3 fill-current text-[#FF5E97]" />
            </div>
          </div>

          {/* Main Header Typography — Bebas Neue + Official Hot-Pink "गोवा" Logo Image */}
          <div className="space-y-1.5 flex flex-col items-center">
            <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tight text-[#E5F552] leading-none uppercase drop-shadow-[0_8px_20px_rgba(229,245,82,0.3)]">
              HACKER HOUSE
            </h1>

            {/* Official Hot-Pink "गोवा" Script Image Asset */}
            <div className="relative flex items-center justify-center my-0.5">
              <img
                src="/assets/media__1786506921751.png"
                alt="गोवा"
                className="h-20 sm:h-28 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,94,151,0.95)] animate-pulse"
              />
            </div>

            <div>
              <h2 className="font-display font-black text-lg sm:text-2xl text-[#F3F0E6] uppercase tracking-wider">
                CHOOSE CREATION FORMAT
              </h2>
            </div>
          </div>

          {/* Subtitle Line */}
          <p className="font-terminal text-xs sm:text-sm text-stone-300 uppercase tracking-wide">
            YOUR PHOTO. YOUR STACK. YOUR STORY. BUILT FOR <span className="text-[#E5F552] font-bold">HACKER HOUSE GOA 2026</span>
          </p>

          {/* 2 FORMAT CHOICES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-1">
            {/* FORMAT B: OFFICIAL BUILDER ID CARD */}
            <div
              onClick={onStartIdCard}
              className="group relative p-4 sm:p-5 bg-[#0D2818]/90 border-2 border-[#E5F552]/40 rounded-2xl space-y-2.5 hover:border-[#E5F552] hover:scale-[1.01] cursor-pointer transition-all shadow-xl backdrop-blur-md overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#163824] border border-[#E5F552]/50 flex items-center justify-center text-[#E5F552] group-hover:bg-[#E5F552] group-hover:text-[#0A1D13] transition-all">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#163824] border border-[#E5F552]/40 font-terminal text-[10px] text-[#E5F552] font-bold uppercase tracking-wider">
                  FORMAT B
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#F3F0E6] uppercase group-hover:text-[#E5F552] transition-colors leading-tight">
                  OFFICIAL BUILDER ID CARD
                </h3>
                <p className="font-terminal text-[11px] text-stone-300 mt-1 line-clamp-2">
                  Complete 4" x 6" physical ID badge with E-Paper studio, action buttons, 8-bit pet, and 4-page PDF flip export.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#1B422B]">
                <span className="font-terminal text-[9px] text-stone-400 uppercase font-bold flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#E5F552]" /> 4-PAGE PDF + HTML
                </span>
                <span className="font-display font-black text-xs text-[#E5F552] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  BUILD ID CARD <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* FORMAT A: 𝕏 PFP FRAME / OVERLAY */}
            <div
              onClick={onStartPfpFrame}
              className="group relative p-4 sm:p-5 bg-[#0D2818]/90 border-2 border-[#FF5E97]/40 rounded-2xl space-y-2.5 hover:border-[#FF5E97] hover:scale-[1.01] cursor-pointer transition-all shadow-xl backdrop-blur-md overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#163824] border border-[#FF5E97]/50 flex items-center justify-center text-[#FF5E97] group-hover:bg-[#FF5E97] group-hover:text-white transition-all">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#163824] border border-[#FF5E97]/40 font-terminal text-[10px] text-[#FF5E97] font-bold uppercase tracking-wider">
                  FORMAT A
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#F3F0E6] uppercase group-hover:text-[#FF5E97] transition-colors leading-tight">
                  𝕏 PFP FRAME / OVERLAY
                </h3>
                <p className="font-terminal text-[11px] text-stone-300 mt-1 line-clamp-2">
                  1:1 Square ratio profile picture with HH Goa branding, `#FrameInGoa` hashtags, cropper, and 8-bit Atkinson dithering.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#1B422B]">
                <span className="font-terminal text-[9px] text-stone-400 uppercase font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#FF5E97]" /> 4 THEMES + 8-BIT DITHER
                </span>
                <span className="font-display font-black text-xs text-[#FF5E97] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  CREATE 𝕏 PFP <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          <p className="font-terminal text-[10px] text-stone-400 flex items-center justify-center gap-1 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5F552]" /> NO SIGNUP OR LOGIN REQUIRED.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CLEAN FOOTER (ONLY TEAM PORYGON CREDITS + GOA COCONUT TREES)  */}
      {/* ========================================================================= */}
      <footer className="relative border-t-2 border-[#163824] overflow-hidden text-center mt-4 shrink-0">
        {/* Background Image: Goa Coconut Trees Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/goa_coconut_trees.jpg"
            alt="Goa Coconut Trees"
            className="w-full h-full object-cover opacity-25 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D13] via-[#0A1D13]/90 to-transparent"></div>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-5 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-black text-xl sm:text-2xl text-[#E5F552] uppercase tracking-wider flex items-center justify-center gap-2">
              MADE WITH <Heart className="w-5 h-5 text-[#FF5E97] fill-current inline-block animate-bounce" /> BY TEAM PORYGON
            </span>
          </div>

          <p className="font-terminal text-[11px] text-stone-300 uppercase tracking-widest font-bold">
            HACKER HOUSE GOA 2026 OFFICIAL EVENT SUBMISSION · TASK 1
          </p>

          <div className="pt-1 flex items-center justify-center gap-4 text-xs font-terminal text-[#E5F552] font-bold">
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              HHGOA.COM
            </a>
            <span>·</span>
            <a href="https://github.com/shamsundarsk/hhgoa" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GITHUB REPO
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
