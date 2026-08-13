import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Palmtree, UserCheck, CreditCard, Flame, Award, Heart } from 'lucide-react';

interface LandingPageProps {
  onStartIdCard: () => void;
  onStartPfpFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartIdCard, onStartPfpFrame }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between text-center overflow-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION (ALL DETAILS + GOA BEACH SUNSET BACKGROUND BANNER) */}
      {/* ========================================================================= */}
      <section className="relative px-4 py-12 flex flex-col items-center justify-center min-h-[85vh]">
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E5F552]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF5E97]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

        {/* Hero Details Content */}
        <div className="relative z-10 max-w-5xl space-y-10">
          {/* Top Event Tagline & 2:47PM Studio Logo Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <img
              src="/assets/247_studio_logo.png"
              alt="2:47PM Studio"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(229,245,82,0.4)]"
            />

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#163824]/90 border border-[#E5F552]/40 text-xs sm:text-sm font-terminal text-[#E5F552] shadow-[0_0_30px_rgba(229,245,82,0.2)] uppercase tracking-widest animate-float backdrop-blur-md">
              <Palmtree className="w-4 h-4 text-[#E5F552]" />
              <span>HACKER HOUSE GOA 2026 OFFICIAL STUDIO</span>
              <Sparkles className="w-4 h-4 fill-current text-[#FF5E97]" />
            </div>
          </div>

          {/* Main Header Typography — Bebas Neue + Official Hot-Pink "गोवा" Logo Image */}
          <div className="space-y-4 flex flex-col items-center">
            <h1 className="font-display font-black text-6xl sm:text-9xl tracking-tight text-[#E5F552] leading-[0.88] uppercase drop-shadow-[0_10px_30px_rgba(229,245,82,0.3)] flex items-center justify-center gap-3">
              HACKER HOUSE
            </h1>

            {/* Official Hot-Pink "गोवा" Script Image Asset */}
            <div className="relative my-2 flex items-center justify-center">
              <img
                src="/assets/media__1786506921751.png"
                alt="गोवा"
                className="h-28 sm:h-40 w-auto object-contain drop-shadow-[0_0_40px_rgba(255,94,151,0.95)] animate-pulse"
              />
            </div>

            <div className="pt-2">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#F3F0E6] uppercase tracking-wider flex items-center justify-center gap-2">
                CHOOSE CREATION FORMAT
              </h2>
            </div>
          </div>

          {/* Subtitle Lines — IBM Plex Mono */}
          <div className="space-y-1 font-terminal text-base sm:text-lg text-stone-300 uppercase tracking-wide">
            <p>YOUR PHOTO. YOUR STACK. YOUR STORY.</p>
            <p>BUILT FOR <span className="text-[#E5F552] font-bold">HACKER HOUSE GOA 2026</span></p>
          </div>

          {/* 2 FORMAT CHOICES GRID (FORMAT A: 𝕏 PFP FRAME vs FORMAT B: BUILDER ID CARD) */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* FORMAT B: OFFICIAL BUILDER ID CARD */}
            <div
              onClick={onStartIdCard}
              className="group relative p-7 bg-[#0D2818]/90 border-2 border-[#E5F552]/40 rounded-3xl space-y-5 hover:border-[#E5F552] hover:scale-[1.02] cursor-pointer transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#E5F552]/5 rounded-full blur-2xl group-hover:bg-[#E5F552]/15 transition-all"></div>

              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#163824] border border-[#E5F552]/50 flex items-center justify-center text-[#E5F552] group-hover:bg-[#E5F552] group-hover:text-[#0A1D13] transition-all shadow-lg">
                  <CreditCard className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#163824] border border-[#E5F552]/40 font-terminal text-xs text-[#E5F552] font-bold uppercase tracking-wider">
                  FORMAT B
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-3xl text-[#F3F0E6] uppercase group-hover:text-[#E5F552] transition-colors">
                  OFFICIAL BUILDER ID CARD
                </h3>
                <p className="font-terminal text-xs text-stone-300 mt-2 leading-relaxed">
                  Complete 4" x 6" physical ID badge featuring an interactive E-Paper display studio, customizable action buttons, 8-bit roaming pet, and 4-page PDF flip export.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#1B422B]">
                <span className="font-terminal text-[10px] text-stone-400 uppercase font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#E5F552]" /> 4-PAGE PDF + INTERACTIVE HTML
                </span>
                <span className="font-display font-black text-sm text-[#E5F552] uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  BUILD ID CARD <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* FORMAT A: 𝕏 PFP FRAME / OVERLAY */}
            <div
              onClick={onStartPfpFrame}
              className="group relative p-7 bg-[#0D2818]/90 border-2 border-[#FF5E97]/40 rounded-3xl space-y-5 hover:border-[#FF5E97] hover:scale-[1.02] cursor-pointer transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#FF5E97]/5 rounded-full blur-2xl group-hover:bg-[#FF5E97]/15 transition-all"></div>

              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#163824] border border-[#FF5E97]/50 flex items-center justify-center text-[#FF5E97] group-hover:bg-[#FF5E97] group-hover:text-white transition-all shadow-lg">
                  <UserCheck className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#163824] border border-[#FF5E97]/40 font-terminal text-xs text-[#FF5E97] font-bold uppercase tracking-wider">
                  FORMAT A
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-3xl text-[#F3F0E6] uppercase group-hover:text-[#FF5E97] transition-colors">
                  𝕏 PFP FRAME / OVERLAY
                </h3>
                <p className="font-terminal text-xs text-stone-300 mt-2 leading-relaxed">
                  1:1 Square ratio profile picture wrapped in HH Goa 2026 tropical branding, `#FrameInGoa` hashtags, crop/rotate controls, and 8-bit B&W Atkinson dithering filter.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#1B422B]">
                <span className="font-terminal text-[10px] text-stone-400 uppercase font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#FF5E97]" /> 4 THEMES + 8-BIT DITHER
                </span>
                <span className="font-display font-black text-sm text-[#FF5E97] uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  CREATE 𝕏 PFP <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          <p className="font-terminal text-xs text-stone-400 flex items-center justify-center gap-1.5 uppercase tracking-wider pt-2">
            <ShieldCheck className="w-4 h-4 text-[#E5F552]" /> NO SIGNUP OR LOGIN REQUIRED.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FOOTER SECTION (GOA COCONUT TREES BACKGROUND + TEAM PORYGON)   */}
      {/* ========================================================================= */}
      <footer className="relative border-t-2 border-[#163824] overflow-hidden text-center mt-12">
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
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#E5F552] uppercase tracking-wider flex items-center gap-2">
              MADE WITH <Heart className="w-6 h-6 text-[#FF5E97] fill-current inline-block animate-bounce" /> BY TEAM PORYGON
            </span>
          </div>

          <p className="font-terminal text-xs text-stone-400 uppercase tracking-widest">
            HACKER HOUSE GOA 2026 OFFICIAL EVENT SUBMISSION · TASK 1
          </p>

          <div className="pt-2 flex justify-center items-center gap-4 text-xs font-terminal text-[#E5F552]">
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
