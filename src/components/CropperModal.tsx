import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Point, Area } from 'react-easy-crop';
import { ZoomIn, ZoomOut, RotateCw, Check, X, Crop } from 'lucide-react';
import { getCroppedImg } from '../utils/cropImage';

interface CropperModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export const CropperModal: React.FC<CropperModalProps> = ({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onCropChange = (newCrop: Point) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      console.error('Error cropping image:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0D2818] border-2 border-[#E5F552]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B422B] bg-[#0A1D13]">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-[#E5F552]" />
            <h3 className="font-display font-bold text-lg text-[#F3F0E6]">ADJUST YOUR PHOTO</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-[#163824] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Container */}
        <div className="relative w-full h-80 bg-black/60">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="rect"
            showGrid={true}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4 bg-[#0D2818]">
          <div className="flex items-center gap-4">
            <ZoomOut className="w-4 h-4 text-[#E5F552]" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[#E5F552] bg-[#163824] h-2 rounded-lg cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-[#E5F552]" />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-terminal text-[#E5F552] border border-[#E5F552]/30 hover:bg-[#163824] transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              ROTATE ({rotation}°)
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-terminal text-stone-300 hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={isProcessing}
                className="flex items-center gap-2 px-5 py-2 rounded-xl font-display font-bold text-sm bg-[#E5F552] text-[#0A1D13] hover:bg-[#F1FB46] active:scale-95 transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                {isProcessing ? 'CROPPING...' : 'APPLY PHOTO'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
