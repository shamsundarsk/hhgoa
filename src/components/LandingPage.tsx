import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Crop, Sliders, Download, Palmtree, UserCheck, CreditCard } from 'lucide-react';

interface LandingPageProps {
  onStartIdCard: () => void;
  onStartPfpFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartIdCard, onStartPfpFrame }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      {/* Background Animated Blinking Particle Dot Grid */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#E5F552_2px,transparent_2px)] [background-size:32px_32px] animate-pulse"></div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-4xl space-y-8">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#163824] border border-[#E5F552]/40 text-xs font-terminal text-[#E5F552] shadow-xl uppercase tracking-widest animate-float">
          <Palmtree className="w-4 h-4 text-[#E5F552]" />
          <span>HACKER HOUSE GOA 2026 OFFICIAL STUDIO</span>
          <Sparkles className="w-3.5 h-3.5 fill-current text-[#FF5E97]" />
        </div>

        {/* Main Header Typography — Bebas Neue + Official Goa Text Logo */}
        <div className="space-y-3 flex flex-col items-center">
          <h1 className="font-display font-black text-7xl sm:text-9xl tracking-tight text-[#E5F552] leading-[0.88] uppercase drop-shadow-lg flex items-center justify-center gap-3">
            HACKER HOUSE
          </h1>
          <div className="flex items-center justify-center py-2">
            <img
              src="/assets/goa_text_logo.png"
              alt="गोवा"
              className="h-24 sm:h-32 w-auto object-contain drop-shadow-xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
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
          <p>YOUR PHOTO. YOUR STACK.</p>
          <p>YOUR STORY. <span className="text-[#E5F552] font-bold">YOUR WAY.</span></p>
        </div>

        {/* 2 FORMAT CHOICES GRID (FORMAT A: PFP FRAME vs FORMAT B: BUILDER ID CARD) */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FORMAT B: OFFICIAL BUILDER ID CARD */}
          <div
            onClick={onStartIdCard}
            className="p-6 bg-[#0D2818] border-2 border-[#E5F552]/40 rounded-3xl text-left space-y-4 hover:border-[#E5F552] hover:scale-[1.02] cursor-pointer transition-all shadow-2xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#163824] border border-[#E5F552]/40 flex items-center justify-center text-[#E5F552]">
              <CreditCard className="w-6 h-6" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded bg-[#163824] font-terminal text-[10px] text-[#E5F552] font-bold uppercase">
                FORMAT B
              </span>
              <h3 className="font-display font-black text-2xl text-[#F3F0E6] uppercase mt-1">
                OFFICIAL BUILDER ID CARD
              </h3>
              <p className="font-terminal text-xs text-stone-400 mt-1">
                Complete 4" x 6" physical ID badge with interactive E-Paper display studio & 4-page PDF export.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[#E5F552] font-display font-black text-sm uppercase">
              BUILD ID CARD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* FORMAT A: 𝕏 PFP FRAME / OVERLAY */}
          <div
            onClick={onStartPfpFrame}
            className="p-6 bg-[#0D2818] border-2 border-[#FF5E97]/40 rounded-3xl text-left space-y-4 hover:border-[#FF5E97] hover:scale-[1.02] cursor-pointer transition-all shadow-2xl group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#163824] border border-[#FF5E97]/40 flex items-center justify-center text-[#FF5E97]">
              <UserCheck className="w-6 h-6" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded bg-[#163824] font-terminal text-[10px] text-[#FF5E97] font-bold uppercase">
                FORMAT A
              </span>
              <h3 className="font-display font-black text-2xl text-[#F3F0E6] uppercase mt-1">
                𝕏 PFP FRAME / OVERLAY
              </h3>
              <p className="font-terminal text-xs text-stone-400 mt-1">
                1:1 Square ratio profile picture wrapped in HH Goa 2026 tropical branding & 8-bit retro filter.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[#FF5E97] font-display font-black text-sm uppercase">
              CREATE 𝕏 PFP FRAME <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <p className="font-terminal text-xs text-stone-400 flex items-center justify-center gap-1.5 uppercase tracking-wider pt-2">
          <ShieldCheck className="w-4 h-4 text-[#E5F552]" /> NO SIGNUP OR LOGIN REQUIRED.
        </p>

        {/* Value Props Bar — IBM Plex Mono with SVG Icons */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#1B422B]">
          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#E5F552]">
              <Crop className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">NO CROPPING FRICTION</p>
            </div>
            <p className="font-body text-xs text-stone-400">HEIC, PNG, JPG browser cropper</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#FF5E97]">
              <Sliders className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">CANVA-LITE DIY STUDIO</p>
            </div>
            <p className="font-body text-xs text-stone-400">12 Presets & 8-Bit B&W Pixel Dithering</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#E5F552]">
              <Download className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">HIGH-DPI PNG & 𝕏</p>
            </div>
            <p className="font-body text-xs text-stone-400">Instant export & #FrameInGoa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
