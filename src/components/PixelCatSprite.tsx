import React from 'react';

// PURE TRANSPARENT 8-BIT RETRO PIXEL ART CAT (NO BACKGROUND, NO BOX, PURE SPRITE)
export const PixelCatSprite: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#121913' }) => {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.8)}
      viewBox="0 0 32 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0 image-rendering-pixelated drop-shadow-sm"
    >
      {/* Pointed Pixel Ears */}
      <rect x="4" y="2" width="4" height="4" fill={color} />
      <rect x="6" y="4" width="2" height="2" fill="#FF5E97" />
      <rect x="16" y="2" width="4" height="4" fill={color} />
      <rect x="18" y="4" width="2" height="2" fill="#FF5E97" />

      {/* Head Box */}
      <rect x="2" y="5" width="20" height="8" fill={color} />

      {/* Pixel Eyes (Glowing Yellow LED) */}
      <rect x="6" y="8" width="3" height="3" fill="#E5F552" />
      <rect x="15" y="8" width="3" height="3" fill="#E5F552" />
      <rect x="7" y="9" width="1" height="1" fill="#121913" />
      <rect x="16" y="9" width="1" height="1" fill="#121913" />

      {/* Pink Pixel Nose & Whiskers */}
      <rect x="11" y="10" width="2" height="2" fill="#FF5E97" />
      <rect x="0" y="9" width="3" height="1" fill={color} />
      <rect x="21" y="9" width="3" height="1" fill={color} />
      <rect x="0" y="11" width="3" height="1" fill={color} />
      <rect x="21" y="11" width="3" height="1" fill={color} />

      {/* Cat Body */}
      <rect x="6" y="13" width="18" height="8" fill={color} />

      {/* Curved Wiggling Tail */}
      <rect x="24" y="12" width="3" height="3" fill={color} />
      <rect x="26" y="9" width="3" height="4" fill={color} className="animate-pulse" />
      <rect x="28" y="6" width="3" height="4" fill={color} />

      {/* 8-Bit Walking Legs */}
      <rect x="7" y="21" width="3" height="4" fill={color} className="animate-bounce" />
      <rect x="11" y="21" width="3" height="4" fill={color} />
      <rect x="17" y="21" width="3" height="4" fill={color} className="animate-bounce" />
      <rect x="21" y="21" width="3" height="4" fill={color} />
    </svg>
  );
};
