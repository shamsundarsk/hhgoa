import React, { useState, useEffect } from 'react';
import type { BuilderCardState } from '../types/builder';
import { convertToPixelBW, PALETTE_THEMES, type DitherMode, type PaletteThemeId } from '../utils/pixelProcessor';
import { downloadDataUrl, exportBadgeAsPng } from '../utils/exportBadge';
import { PixelCatSprite } from './PixelCatSprite';
import { CropperModal } from './CropperModal';
import { Download, Send, Camera, Sparkles, Sliders, Palmtree, Crop, Palette } from 'lucide-react';

interface PfpFrameStudioProps {
  cardState: BuilderCardState;
  onUpdateState: (updater: (prev: BuilderCardState) => BuilderCardState) => void;
}

export type PfpFrameStyle = 'GOA_PALM' | 'CYBER_MONO' | 'HOT_PINK' | 'RETRO_8BIT';

export const PfpFrameStudio: React.FC<PfpFrameStudioProps> = ({
  cardState,
  onUpdateState
}) => {
  const [frameStyle, setFrameStyle] = useState<PfpFrameStyle>('GOA_PALM');
  const [ditherMode, setDitherMode] = useState<DitherMode | 'COLOR'>('ATKINSON_BW');
  const [paletteId, setPaletteId] = useState<PaletteThemeId>('GOA_SUNSET');
  const [pixelScale, setPixelScale] = useState<number>(3);
  const [pixelatedPhotoUrl, setPixelatedPhotoUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Photo Cropper State
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);

  const { profile, builderTitle, metadata } = cardState;
  const rawPhoto = profile.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

  // Process photo with selected dither algorithm & palette whenever mode, scale or palette changes
  useEffect(() => {
    let isCurrent = true;
    if (ditherMode === 'COLOR') {
      setPixelatedPhotoUrl(null);
    } else {
      convertToPixelBW(rawPhoto, pixelScale, ditherMode as DitherMode, paletteId).then((processed) => {
        if (isCurrent) setPixelatedPhotoUrl(processed);
      });
    }
    return () => { isCurrent = false; };
  }, [rawPhoto, ditherMode, pixelScale, paletteId]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCropperImageSrc(result);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCropperForCurrent = () => {
    setCropperImageSrc(rawPhoto);
    setIsCropperOpen(true);
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    onUpdateState((prev) => ({
      ...prev,
      profile: { ...prev.profile, photoUrl: croppedDataUrl }
    }));
  };

  const handleDownloadPfp = async () => {
    try {
      setIsExporting(true);
      const dataUrl = await exportBadgeAsPng('hh-pfp-frame-container', `${profile.name || 'Builder'}_PFP`);
      downloadDataUrl(dataUrl, `${(profile.name || 'Builder').replace(/\s+/g, '_')}_HHGoa_PFP`);
    } catch (e) {
      console.error('Error generating PFP:', e);
      alert('Unable to generate PFP image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const currentPhoto = ditherMode === 'COLOR' ? rawPhoto : (pixelatedPhotoUrl || rawPhoto);

  const tweetText = `Built in Goa. Less noise. More signal.\n\nMy official X PFP for Hacker House Goa 2026 🌴\n\n#FrameInGoa`;
  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Photo Cropper Modal */}
      {isCropperOpen && cropperImageSrc && (
        <CropperModal
          imageSrc={cropperImageSrc}
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* Left Customizer Controls Column */}
      <div className="lg:col-span-6 bg-[#0D2818]/90 border-2 border-[#163824] rounded-3xl p-6 shadow-2xl space-y-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#163824] border border-[#E5F552]/30 text-xs font-terminal text-[#E5F552] uppercase font-bold tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-current text-[#FF5E97]" /> FORMAT A: 𝕏 PROFILE FRAME
          </span>
          <h3 className="font-display font-black text-2xl text-[#F3F0E6] uppercase tracking-wide">
            DESIGN YOUR 𝕏 PFP OVERLAY
          </h3>
          <p className="font-terminal text-xs text-stone-400 mt-1 uppercase tracking-wider">
            Transform your photo into a ready-to-use X Profile Picture wrapped in HH Goa 2026 branding!
          </p>
        </div>

        {/* Upload & Crop Photo Controls */}
        <div className="p-4 bg-[#0A1D13] border border-[#1B422B] rounded-2xl space-y-3">
          <label className="font-terminal text-xs text-[#E5F552] font-bold block uppercase tracking-wider">
            1. UPLOAD, CROP & ROTATE PHOTO:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <label className="flex-1 w-full py-2.5 px-4 rounded-xl bg-[#163824] border border-[#E5F552]/40 text-[#E5F552] font-terminal text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1B422B] cursor-pointer transition-all shadow-md uppercase">
              <Camera className="w-4 h-4" /> UPLOAD NEW PHOTO
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            <button
              onClick={handleOpenCropperForCurrent}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#0D2818] border border-[#E5F552]/40 text-stone-200 font-terminal text-xs font-bold flex items-center justify-center gap-2 hover:text-[#E5F552] transition-colors uppercase"
            >
              <Crop className="w-4 h-4 text-[#E5F552]" /> CROP & ROTATE
            </button>
          </div>
        </div>

        {/* Retro 8-Bit Pixel Dithering Algorithm Controls */}
        <div className="p-4 bg-[#0A1D13] border border-[#1B422B] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-terminal text-xs text-[#FF5E97] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> 2. 8-BIT PIXEL DITHERING ALGORITHM:
            </label>
            <span className="px-2 py-0.5 rounded bg-[#163824] font-terminal text-[10px] text-[#E5F552] uppercase font-bold">
              {ditherMode}
            </span>
          </div>

          {/* Dither Mode Selection Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'ATKINSON_BW', label: 'ATKINSON DITHER', desc: 'High Detail Face & Hair' },
              { id: 'GAMEBOY_4COLOR', label: 'GAMEBOY 4-COLOR', desc: '8-Bit Custom Color Palette' },
              { id: 'ORDERED_BAYER', label: 'BAYER MATRIX', desc: 'Retro Arcade Pattern' },
              { id: 'COLOR', label: 'ORIGINAL COLOR', desc: 'Clean Crisp Photo' }
            ].map((dm) => (
              <button
                key={dm.id}
                onClick={() => setDitherMode(dm.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  ditherMode === dm.id
                    ? 'bg-[#FF5E97] text-white border-[#FF5E97] font-bold shadow-md'
                    : 'bg-[#0D2818] text-stone-300 border-[#1B422B] hover:border-[#FF5E97]/60'
                }`}
              >
                <p className="font-terminal font-bold text-[11px] uppercase truncate">{dm.label}</p>
                <p className="font-terminal text-[9px] opacity-80 truncate">{dm.desc}</p>
              </button>
            ))}
          </div>

          {/* Custom 4-Color Palette Theme Selector */}
          {ditherMode !== 'COLOR' && (
            <div className="pt-3 border-t border-[#1B422B] space-y-2.5">
              <div className="flex justify-between items-center text-xs font-terminal">
                <span className="text-[#E5F552] font-bold uppercase flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> CHOOSE 4-COLOR PALETTE THEME:
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.values(PALETTE_THEMES).map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setPaletteId(pal.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                      paletteId === pal.id
                        ? 'bg-[#163824] border-[#E5F552] shadow-md'
                        : 'bg-[#0D2818] border-[#1B422B] hover:border-[#E5F552]/50'
                    }`}
                  >
                    <span className="font-terminal font-bold text-[10px] text-[#F3F0E6] uppercase truncate">
                      {pal.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {pal.hexColors.map((hex, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-md border border-black/30 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pixel Scale Density Selection */}
          {ditherMode !== 'COLOR' && (
            <div className="pt-2 border-t border-[#1B422B] space-y-2">
              <div className="flex justify-between items-center text-xs font-terminal">
                <span className="text-stone-300 font-bold uppercase">PIXEL DENSITY / SCALE:</span>
                <span className="text-[#E5F552] font-bold">
                  {pixelScale === 2 ? 'FINE (2px)' : pixelScale === 3 ? 'MEDIUM (3px)' : 'RETRO ARCADE (5px)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { scale: 2, label: 'FINE (2px)' },
                  { scale: 3, label: 'MEDIUM (3px)' },
                  { scale: 5, label: 'ARCADE (5px)' }
                ].map((sc) => (
                  <button
                    key={sc.scale}
                    onClick={() => setPixelScale(sc.scale)}
                    className={`py-1.5 px-2 rounded-lg font-terminal text-[10px] font-bold uppercase transition-all ${
                      pixelScale === sc.scale
                        ? 'bg-[#E5F552] text-[#0A1D13]'
                        : 'bg-[#0D2818] text-stone-400 border border-[#1B422B]'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Choose PFP Frame Theme Style */}
        <div className="space-y-3">
          <label className="font-terminal text-xs text-[#E5F552] font-bold block uppercase tracking-wider">
            3. SELECT 𝕏 PFP BRANDING FRAME STYLE:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'GOA_PALM', label: 'GOA NEON PALM', sub: 'Tropical Palms & Neon Tag' },
              { id: 'CYBER_MONO', label: 'CYBER MONO ID', sub: 'CLI Terminal & HHG26 Badge' },
              { id: 'HOT_PINK', label: 'HOT PINK SHIPPER', sub: 'Hot Pink Neon Quote Frame' },
              { id: 'RETRO_8BIT', label: 'RETRO 8-BIT CAT', sub: 'Pixel Cat Arcade Frame' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFrameStyle(st.id as PfpFrameStyle)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  frameStyle === st.id
                    ? 'bg-[#E5F552] text-[#0A1D13] border-[#E5F552] shadow-lg scale-[1.02]'
                    : 'bg-[#0A1D13] text-[#F3F0E6] border-[#1B422B] hover:border-[#E5F552]/60'
                }`}
              >
                <p className="font-display font-black text-sm uppercase truncate">{st.label}</p>
                <p className={`font-terminal text-[9px] mt-1 ${frameStyle === st.id ? 'text-[#0A1D13]/80' : 'text-stone-400'}`}>
                  {st.sub}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Live 1:1 PFP Preview & Export Column */}
      <div className="lg:col-span-6 space-y-6">
        <div className="text-center sm:text-left flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-base text-[#F3F0E6] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5F552] animate-ping" />
              LIVE 𝕏 PFP FRAME PREVIEW
            </h3>
            <p className="font-terminal text-xs text-stone-400">
              1:1 Square Ratio Avatar Frame (Ready for X / Twitter)
            </p>
          </div>
        </div>

        {/* 1:1 Square PFP Frame Container */}
        <div className="flex justify-center">
          <div
            id="hh-pfp-frame-container"
            className="relative w-full max-w-[420px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#163824] bg-[#0A1D13] select-none"
          >
            {/* User Uploaded Photo Filling Center Frame */}
            <img
              src={currentPhoto}
              alt="PFP Base"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* FRAME OVERLAY TEMPLATES */}
            {frameStyle === 'GOA_PALM' && (
              <div className="absolute inset-0 border-[16px] border-[#0A1D13]/90 rounded-[2rem] pointer-events-none flex flex-col justify-between p-4 z-10">
                {/* Top Badge Overlay */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#163824] border border-[#E5F552]/40 rounded-full shadow-lg">
                    <Palmtree className="w-3.5 h-3.5 text-[#E5F552]" />
                    <span className="font-terminal font-black text-[10px] text-[#E5F552] uppercase tracking-widest">
                      HH GOA 2026
                    </span>
                  </div>
                  <span className="font-terminal font-bold text-[10px] text-[#FF5E97] bg-[#0A1D13]/90 px-2.5 py-1 rounded-full border border-[#FF5E97]/40 uppercase shadow">
                    #FrameInGoa
                  </span>
                </div>

                {/* Bottom Title & Name Tag Overlay */}
                <div className="mt-auto bg-[#0A1D13]/90 p-3 rounded-2xl border border-[#E5F552]/30 backdrop-blur-md shadow-2xl space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-black text-2xl text-[#E5F552] uppercase leading-none truncate">
                      {profile.name || 'BUILDER'}
                    </h4>
                    <span className="font-terminal text-[9px] font-bold text-[#FF5E97] uppercase">
                      {profile.role || 'BUILDER'}
                    </span>
                  </div>
                  <p className="font-terminal text-[10px] text-stone-300 font-semibold truncate">
                    ⚡ {builderTitle}
                  </p>
                </div>
              </div>
            )}

            {frameStyle === 'CYBER_MONO' && (
              <div className="absolute inset-0 border-[16px] border-[#0A1D13] rounded-[2rem] pointer-events-none flex flex-col justify-between p-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="font-terminal font-bold text-[10px] text-[#E5F552] bg-[#163824] px-2.5 py-1 rounded border border-[#E5F552]/30 uppercase">
                    &gt; VERIFIED BUILDER
                  </span>
                  <span className="font-terminal font-bold text-[10px] text-stone-400 bg-[#0A1D13] px-2 py-1 rounded border border-stone-700 uppercase">
                    {metadata.badgeId}
                  </span>
                </div>

                <div className="mt-auto bg-[#0A1D13]/95 p-3 rounded-xl border border-stone-700 shadow-2xl space-y-1">
                  <h4 className="font-terminal font-bold text-base text-[#F3F0E6] uppercase truncate">
                    {profile.name || 'BUILDER'}
                  </h4>
                  <div className="flex items-center gap-1 font-terminal text-[10px] text-stone-400 uppercase">
                    <span>STACK:</span>
                    <span className="text-[#E5F552] font-bold">{profile.stack?.slice(0, 3).join(' · ') || 'CODE'}</span>
                  </div>
                </div>
              </div>
            )}

            {frameStyle === 'HOT_PINK' && (
              <div className="absolute inset-0 border-[16px] border-[#FF5E97]/90 rounded-[2rem] pointer-events-none flex flex-col justify-between p-4 z-10">
                <div className="flex justify-center">
                  <span className="font-display font-black text-xs text-[#0A1D13] bg-[#E5F552] px-4 py-1 rounded-full uppercase tracking-widest shadow-xl">
                    LESS NOISE &lt; MORE SIGNAL
                  </span>
                </div>

                <div className="mt-auto bg-[#0A1D13]/95 p-3 rounded-2xl border border-[#FF5E97]/40 shadow-2xl text-center space-y-0.5">
                  <h4 className="font-display font-black text-2xl text-[#FF5E97] uppercase leading-none truncate">
                    {profile.name || 'BUILDER'}
                  </h4>
                  <p className="font-terminal text-[10px] text-[#E5F552] uppercase font-bold">
                    HACKER HOUSE GOA 2026
                  </p>
                </div>
              </div>
            )}

            {frameStyle === 'RETRO_8BIT' && (
              <div className="absolute inset-0 border-[16px] border-[#0A1D13] rounded-[2rem] pointer-events-none flex flex-col justify-between p-3 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#121913] rounded border border-[#E5F552]/40">
                    <PixelCatSprite size={22} color="#E5F552" />
                    <span className="font-terminal font-bold text-[9px] text-[#E5F552] uppercase">
                      8-BIT BUILDER
                    </span>
                  </div>
                  <span className="font-terminal font-bold text-[9px] text-[#FF5E97] bg-[#121913] px-2 py-1 rounded border border-[#FF5E97]/40 uppercase">
                    HH26 ARCADE
                  </span>
                </div>

                <div className="mt-auto bg-[#121913]/95 p-2.5 rounded-xl border border-[#E5F552]/40 shadow-2xl text-center space-y-1">
                  <h4 className="font-pixel text-xs text-[#E5F552] uppercase truncate">
                    {profile.name || 'BUILDER'}
                  </h4>
                  <p className="font-terminal text-[9px] text-[#FF5E97] uppercase font-bold">
                    #FrameInGoa · 2026
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleDownloadPfp}
            disabled={isExporting}
            className="py-3.5 px-4 rounded-2xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-sm flex items-center justify-center gap-2 hover:bg-[#F1FB46] active:scale-95 transition-all shadow-xl uppercase"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'EXPORTING PFP...' : 'DOWNLOAD 𝕏 PFP (HIGH-DPI PNG)'}
          </button>

          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 rounded-2xl bg-[#1DA1F2] text-white font-display font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1a91da] active:scale-95 transition-all shadow-xl uppercase"
          >
            <Send className="w-4 h-4" /> 𝕏 SHARE PFP TO X
          </a>
        </div>
      </div>
    </div>
  );
};
