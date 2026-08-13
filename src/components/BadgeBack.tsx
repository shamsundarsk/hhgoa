import React from 'react';
import type { BuilderCardState } from '../types/builder';

interface BadgeBackProps {
  cardState: BuilderCardState;
  id?: string;
}

export const BadgeBack: React.FC<BadgeBackProps> = ({ cardState, id = 'hh-badge-back-canvas-container' }) => {
  const { metadata } = cardState;

  return (
    <div
      id={id}
      className="relative w-full max-w-[540px] aspect-[1/1.5] rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-[#163824] select-none bg-[#0A1D13]"
    >
      {/* Back Template Image filling 100% of container */}
      <img
        src="/assets/card_back_template.png"
        alt="HH Goa Back Template"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlaid Metadata badge ID tag */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
        {/* Top Metallic Ring Slot Overlay */}
        <div className="mx-auto w-14 h-3.5 bg-[#0A1D13] rounded-full border border-[#285d3c] flex items-center justify-center opacity-80 mt-1">
          <div className="w-8 h-1 bg-[#163824] rounded-full"></div>
        </div>

        {/* Bottom Badge ID Tag Overlay */}
        <div className="mt-auto text-center pb-4">
          <span className="font-terminal font-bold text-sm text-[#FF5E97] bg-[#0A1D13]/90 px-4 py-1.5 rounded-full border border-[#FF5E97]/40 tracking-widest shadow-xl uppercase">
            {metadata.badgeId}
          </span>
        </div>
      </div>
    </div>
  );
};
