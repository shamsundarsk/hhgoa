import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Crop, Sparkles, Image as ImageIcon, Sliders, Palette } from 'lucide-react';
import heic2any from 'heic2any';
import { CropperModal } from './CropperModal';
import { convertToPixelBW, PALETTE_THEMES, type DitherMode, type PaletteThemeId } from '../utils/pixelProcessor';

interface PhotoUploaderProps {
  currentPhotoUrl: string | null;
  onPhotoSelected: (dataUrl: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  currentPhotoUrl,
  onPhotoSelected
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Dithering & Palette State for ID Card Photo
  const [ditherMode, setDitherMode] = useState<DitherMode | 'COLOR'>('COLOR');
  const [paletteId, setPaletteId] = useState<PaletteThemeId>('GOA_SUNSET');
  const [pixelScale, setPixelScale] = useState<number>(3);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store initial currentPhotoUrl as original un-dithered photo if not set yet
  useEffect(() => {
    if (currentPhotoUrl && !originalPhoto) {
      setOriginalPhoto(currentPhotoUrl);
    }
  }, [currentPhotoUrl]);

  const processFile = async (file: File) => {
    try {
      setIsConverting(true);
      let fileToRead = file;

      // Handle HEIC / HEIF format conversion
      if (file.name.toLowerCase().endsWith('.heic') || file.type.includes('heic') || file.type.includes('heif')) {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9
        });
        const blobResult = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        fileToRead = new File([blobResult], 'photo.jpg', { type: 'image/jpeg' });
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedFileUrl(reader.result);
          setOriginalPhoto(reader.result);
          setIsCropperOpen(true);
        }
      };
      reader.readAsDataURL(fileToRead);
    } catch (err) {
      console.error('Error handling photo file:', err);
      alert('Unable to load image. Please try a standard JPG or PNG file.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleCropComplete = async (croppedData: string) => {
    setOriginalPhoto(croppedData); // Save un-dithered cropped photo!
    if (ditherMode === 'COLOR') {
      onPhotoSelected(croppedData);
    } else {
      const processed = await convertToPixelBW(croppedData, pixelScale, ditherMode as DitherMode, paletteId);
      onPhotoSelected(processed);
    }
  };

  const handleApplyDitherToCurrent = async (newMode: DitherMode | 'COLOR', newPalette: PaletteThemeId = paletteId, newScale: number = pixelScale) => {
    setDitherMode(newMode);
    setPaletteId(newPalette);
    setPixelScale(newScale);

    const basePhoto = originalPhoto || selectedFileUrl || currentPhotoUrl;
    if (!basePhoto) return;

    if (newMode === 'COLOR') {
      onPhotoSelected(basePhoto); // Restores original clean un-dithered full-color photo!
    } else {
      const processed = await convertToPixelBW(basePhoto, newScale, newMode as DitherMode, newPalette);
      onPhotoSelected(processed);
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, .heic"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 ${
          isDragging
            ? 'border-[#E5F552] bg-[#E5F552]/10 scale-[1.01]'
            : 'border-[#1B422B] hover:border-[#E5F552]/50 bg-[#0A1D13]/60 hover:bg-[#163824]/40'
        }`}
      >
        {currentPhotoUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#E5F552] shadow-lg group-hover:scale-105 transition-transform">
              <img
                src={currentPhotoUrl}
                alt="Builder Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Crop className="w-6 h-6 text-[#E5F552]" />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-sm text-[#F3F0E6] flex items-center justify-center gap-1.5 uppercase">
                <Camera className="w-4 h-4 text-[#E5F552]" /> CHANGE PHOTO
              </p>
              <p className="font-terminal text-xs text-stone-400 mt-1">
                Click to replace or adjust crop
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-[#163824] border border-[#E5F552]/30 flex items-center justify-center text-[#E5F552] mb-3 group-hover:scale-110 group-hover:bg-[#E5F552] group-hover:text-[#0A1D13] transition-all shadow-md">
              {isConverting ? (
                <Sparkles className="w-7 h-7 animate-spin" />
              ) : (
                <Upload className="w-7 h-7" />
              )}
            </div>
            <h4 className="font-display font-bold text-base text-[#F3F0E6]">
              {isConverting ? 'CONVERTING PHOTO...' : 'DROP YOUR PHOTO'}
            </h4>
            <p className="font-terminal text-xs text-stone-400 mt-1">
              Supports JPG · PNG · HEIC
            </p>
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-[#163824] text-[10px] font-terminal text-[#E5F552] border border-[#E5F552]/20">
              <ImageIcon className="w-3 h-3" />
              BUILT-IN PHOTO CROPPER
            </div>
          </div>
        )}
      </div>

      {/* ID Card 8-Bit Pixel Dithering & Color Palette Controls */}
      {currentPhotoUrl && (
        <div className="p-4 bg-[#0A1D13] border border-[#1B422B] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-terminal text-xs text-[#FF5E97] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> 8-BIT RETRO PHOTO PIXEL DITHERING:
            </label>
            <span className="px-2 py-0.5 rounded bg-[#163824] font-terminal text-[10px] text-[#E5F552] uppercase font-bold">
              {ditherMode}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'COLOR', label: 'FULL COLOR PHOTO', desc: 'Original Clean Photo' },
              { id: 'ATKINSON_BW', label: 'ATKINSON DITHER', desc: 'High Detail B&W Dither' },
              { id: 'GAMEBOY_4COLOR', label: 'GAMEBOY 4-COLOR', desc: 'Custom 4-Color Palette' },
              { id: 'ORDERED_BAYER', label: 'BAYER MATRIX', desc: 'Arcade Dither Pattern' }
            ].map((dm) => (
              <button
                type="button"
                key={dm.id}
                onClick={() => handleApplyDitherToCurrent(dm.id as any)}
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

          {/* 4-Color Palette Theme Selector for ID Card */}
          {ditherMode !== 'COLOR' && (
            <div className="pt-3 border-t border-[#1B422B] space-y-2">
              <label className="font-terminal text-[10px] text-[#E5F552] font-bold uppercase tracking-wider flex items-center gap-1">
                <Palette className="w-3.5 h-3.5" /> SELECT 4-COLOR PALETTE:
              </label>

              <div className="grid grid-cols-2 gap-2">
                {Object.values(PALETTE_THEMES).map((pal) => (
                  <button
                    type="button"
                    key={pal.id}
                    onClick={() => handleApplyDitherToCurrent(ditherMode, pal.id)}
                    className={`p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                      paletteId === pal.id
                        ? 'bg-[#163824] border-[#E5F552] shadow-md'
                        : 'bg-[#0D2818] border-[#1B422B] hover:border-[#E5F552]/50'
                    }`}
                  >
                    <span className="font-terminal font-bold text-[9px] text-[#F3F0E6] uppercase truncate">
                      {pal.name.split(' ')[0]}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {pal.hexColors.map((hex, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-3.5 rounded-sm border border-black/30"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Photo Cropper Modal */}
      {selectedFileUrl && (
        <CropperModal
          imageSrc={selectedFileUrl}
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};
