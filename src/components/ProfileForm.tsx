import React, { useState, useEffect } from 'react';
import type { BuilderCardState } from '../types/builder';
import { PhotoUploader } from './PhotoUploader';
import { deriveTitleFromStack, getRandomBuilderTitle } from '../utils/titleGenerator';
import { User, Sparkles, Code } from 'lucide-react';

interface ProfileFormProps {
  cardState: BuilderCardState;
  onUpdateState: (updater: (prev: BuilderCardState) => BuilderCardState) => void;
  onProceedToStudio: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  cardState,
  onUpdateState,
  onProceedToStudio
}) => {
  const { profile, builderTitle } = cardState;
  const [stackInputText, setStackInputText] = useState<string>(profile.stack.join(', '));

  useEffect(() => {
    // Synchronize if profile.stack changes externally
    setStackInputText(profile.stack.join(', '));
  }, [profile.stack.length]);

  const handleProfileField = (field: string, value: any) => {
    onUpdateState((prev) => {
      const updatedProfile = { ...prev.profile, [field]: value };
      let newTitle = prev.builderTitle;
      
      // Auto derive title if stack or role changes
      if (field === 'stack' || field === 'role') {
        newTitle = deriveTitleFromStack(
          field === 'stack' ? value : updatedProfile.stack,
          field === 'role' ? value : updatedProfile.role
        );
      }

      return {
        ...prev,
        profile: updatedProfile,
        builderTitle: newTitle
      };
    });
  };

  const handleStackInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawText = e.target.value;
    setStackInputText(rawText);
    const parsedStack = rawText.split(/[,·]/).map((s) => s.trim()).filter(Boolean);
    handleProfileField('stack', parsedStack);
  };

  const handleGenerateTitle = () => {
    const random = getRandomBuilderTitle(builderTitle);
    onUpdateState((prev) => ({ ...prev, builderTitle: random }));
  };

  return (
    <div className="w-full max-w-2xl bg-[#0D2818]/90 border-2 border-[#163824] rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="border-b border-[#1B422B] pb-4">
        <h2 className="font-display font-black text-2xl tracking-wide text-[#F3F0E6] flex items-center gap-2">
          <User className="w-5 h-5 text-[#E5F552]" /> BUILD YOUR PROFILE
        </h2>
        <p className="font-terminal text-xs text-stone-400 mt-1 uppercase tracking-wider">
          Tell us about yourself and your tech stack. No signup required.
        </p>
      </div>

      {/* Photo Upload Section */}
      <div>
        <label className="font-display font-bold text-sm text-[#F3F0E6] block mb-2 uppercase tracking-wider">
          1. YOUR PHOTO <span className="text-[#FF5E97]">*</span>
        </label>
        <PhotoUploader
          currentPhotoUrl={profile.photoUrl}
          onPhotoSelected={(url) => handleProfileField('photoUrl', url)}
        />
      </div>

      {/* Mandatory Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-display font-bold text-xs text-[#F3F0E6] block mb-1 uppercase tracking-wider">
            FULL NAME <span className="text-[#FF5E97]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sham Sundar"
            value={profile.name}
            onChange={(e) => handleProfileField('name', e.target.value)}
            className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3.5 py-2.5 font-terminal text-sm text-[#F3F0E6] focus:outline-none focus:border-[#E5F552]"
          />
        </div>

        <div>
          <label className="font-display font-bold text-xs text-[#F3F0E6] block mb-1 uppercase tracking-wider">
            ROLE / PRIMARY FOCUS <span className="text-[#FF5E97]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. AI Developer & Shipper"
            value={profile.role}
            onChange={(e) => handleProfileField('role', e.target.value)}
            className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3.5 py-2.5 font-terminal text-sm text-[#F3F0E6] focus:outline-none focus:border-[#E5F552]"
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="font-display font-bold text-xs text-[#F3F0E6] block mb-1 uppercase tracking-wider">
          TECH STACK (COMMA SEPARATED) <span className="text-[#FF5E97]">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Python, React, AI, Three.js, Rust, MongoDB..."
            value={stackInputText}
            onChange={handleStackInputChange}
            className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3.5 py-2.5 font-terminal text-sm text-[#E5F552] focus:outline-none focus:border-[#E5F552]"
          />
          <Code className="absolute right-3.5 top-3 w-4 h-4 text-stone-500 pointer-events-none" />
        </div>
        <p className="font-terminal text-[10px] text-stone-400 mt-1">
          Separate technologies with commas (e.g. <span className="text-[#E5F552]">Python, React, AI, MongoDB</span>)
        </p>
      </div>

      {/* BUILDER TITLE GENERATOR BANNER */}
      <div className="p-4 bg-[#163824] border border-[#E5F552]/30 rounded-2xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-terminal font-bold text-xs text-[#E5F552] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> GENERATED BUILDER TITLE
          </span>
          <button
            type="button"
            onClick={handleGenerateTitle}
            className="px-2.5 py-1 rounded-lg bg-[#0A1D13] border border-[#E5F552]/40 text-xs font-terminal text-[#E5F552] hover:bg-[#E5F552] hover:text-[#0A1D13] transition-colors uppercase"
          >
            ⚡ TRY ANOTHER TITLE
          </button>
        </div>
        <input
          type="text"
          value={builderTitle}
          onChange={(e) => onUpdateState((prev) => ({ ...prev, builderTitle: e.target.value.toUpperCase() }))}
          className="w-full bg-[#0A1D13] border border-[#E5F552]/40 rounded-xl px-3 py-2 font-display font-black text-2xl text-[#FF5E97] uppercase tracking-wide focus:outline-none focus:border-[#FF5E97]"
        />
        <p className="font-terminal text-[10px] text-stone-400">
          Auto-generated based on your stack. You can edit this directly or generate variations!
        </p>
      </div>

      {/* Optional Details Grid */}
      <div className="space-y-4 pt-2 border-t border-[#1B422B]">
        <h3 className="font-display font-bold text-sm text-stone-300 uppercase tracking-wider">
          OPTIONAL HACKER DETAILS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-terminal text-xs text-stone-400 block mb-1 uppercase tracking-wider">
              HANDLE (@NAME)
            </label>
            <input
              type="text"
              placeholder="@sham-sundar"
              value={profile.handle}
              onChange={(e) => handleProfileField('handle', e.target.value)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-terminal text-xs text-stone-400 block mb-1 uppercase tracking-wider">
              CURRENTLY BUILDING
            </label>
            <input
              type="text"
              placeholder="AI Copilot for developers"
              value={profile.building}
              onChange={(e) => handleProfileField('building', e.target.value)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-terminal text-xs text-stone-400 block mb-1 uppercase tracking-wider">
              LOCATION
            </label>
            <input
              type="text"
              placeholder="Coimbatore, India"
              value={profile.location}
              onChange={(e) => handleProfileField('location', e.target.value)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-terminal text-xs text-stone-400 block mb-1 uppercase tracking-wider">
              GITHUB URL
            </label>
            <input
              type="text"
              placeholder="github.com/sham-sundar"
              value={profile.github}
              onChange={(e) => handleProfileField('github', e.target.value)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-terminal text-xs text-stone-400 block mb-1 uppercase tracking-wider">
            SIGNATURE QUOTE
          </label>
          <input
            type="text"
            placeholder='"Ship first. Explain later."'
            value={profile.quote}
            onChange={(e) => handleProfileField('quote', e.target.value)}
            className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onProceedToStudio}
        className="w-full py-3.5 rounded-2xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-xl flex items-center justify-center gap-2 hover:bg-[#F1FB46] active:scale-98 transition-all shadow-xl uppercase tracking-wider"
      >
        DESIGN YOUR DISPLAY STUDIO →
      </button>
    </div>
  );
};
