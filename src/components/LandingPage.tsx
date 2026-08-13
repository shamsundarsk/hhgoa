import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Crop, Sliders, Download, Palmtree, UserCheck, CreditCard, Flame, Award } from 'lucide-react';

interface LandingPageProps {
  onStartIdCard: () => void;
  onStartPfpFrame: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartIdCard, onStartPfpFrame }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      {/* Background Animated Blinking Particle Dot Grid */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#E5F552_2px,transparent_2px)] [background-size:32px_32px] animate-pulse"></div>

      {/* Subtle Neon Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E5F552]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#FF5E97]/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Content Box */}
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
              onError={(e) => {
                // Fallback to text if asset fails
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

        {/* Value Props Bar — IBM Plex Mono with SVG Icons */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#1B422B]">
          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#E5F552]">
              <Crop className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">NO CROPPING FRICTION</p>
            </div>
            <p className="font-body text-xs text-stone-400">HEIC, PNG, JPG browser cropper with 360° rotation</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#FF5E97]">
              <Sliders className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">CANVA-LITE DIY STUDIO</p>
            </div>
            <p className="font-body text-xs text-stone-400">Atkinson B&W Dithering & 5 GameBoy Palettes</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D2818]/80 border border-[#1B422B] text-left shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-[#E5F552]">
              <Download className="w-5 h-5" />
              <p className="font-terminal font-bold text-xs uppercase tracking-wider">HIGH-DPI PNG & 𝕏</p>
            </div>
            <p className="font-body text-xs text-stone-400">Instant PNG export & #FrameInGoa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
