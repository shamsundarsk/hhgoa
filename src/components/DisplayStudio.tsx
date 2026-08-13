import React, { useState } from 'react';
import type { BuilderCardState, DisplayMode, PetOption } from '../types/builder';
import { BlockEditor } from './BlockEditor';
import { ButtonTemplateEditor } from './ButtonTemplateEditor';
import { getRandomBuilderTitle } from '../utils/titleGenerator';
import { Sliders, Layers, Sparkles } from 'lucide-react';

interface DisplayStudioProps {
  cardState: BuilderCardState;
  onUpdateState: (updater: (prev: BuilderCardState) => BuilderCardState) => void;
  onProceedToShip?: () => void;
}

export const DisplayStudio: React.FC<DisplayStudioProps> = ({
  cardState,
  onUpdateState,
  onProceedToShip
}) => {
  const [activeTab, setActiveTab] = useState<'buttons' | 'blocks'>('buttons');

  const handleSurpriseMe = () => {
    const randomTitle = getRandomBuilderTitle(cardState.builderTitle);
    const modes: DisplayMode[] = ['PROFILE', 'TERMINAL', 'STAT', 'PIXEL', 'QUOTE', 'BADGE', 'CHAOS'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];

    // Shuffle active elements
    const currentElems = [...cardState.display.elements];
    for (let i = currentElems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentElems[i], currentElems[j]] = [currentElems[j], currentElems[i]];
    }

    onUpdateState((prev) => ({
      ...prev,
      builderTitle: randomTitle,
      display: {
        ...prev.display,
        mode: randomMode,
        elements: currentElems
      }
    }));
  };

  return (
    <div className="w-full bg-[#0D2818]/90 border-2 border-[#163824] rounded-3xl p-5 shadow-2xl flex flex-col gap-5">
      {/* Studio Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#1B422B] pb-4 gap-3">
        <div>
          <h3 className="font-display font-black text-2xl tracking-wide text-[#F3F0E6] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#E5F552]" /> DISPLAY STUDIO (STEP-BY-STEP DESIGNER)
          </h3>
          <p className="font-terminal text-xs text-stone-400 mt-0.5 uppercase tracking-wider">
            Design UI for Profile (A), Projects (B), and Connect (C) buttons one by one!
          </p>
        </div>

        <div className="flex bg-[#0A1D13] p-1 rounded-xl border border-[#1B422B]">
          <button
            onClick={() => setActiveTab('buttons')}
            className={`px-3 py-1.5 rounded-lg font-terminal text-xs transition-all flex items-center gap-1.5 uppercase ${
              activeTab === 'buttons'
                ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 1. BUTTON UI WIZARD
          </button>
          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3 py-1.5 rounded-lg font-terminal text-xs transition-all flex items-center gap-1.5 uppercase ${
              activeTab === 'blocks'
                ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> 2. DIY BLOCK CANVAS
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'buttons' ? (
        <ButtonTemplateEditor
          cardState={cardState}
          onUpdateState={onUpdateState}
          onProceedToShip={onProceedToShip}
        />
      ) : (
        <BlockEditor
          elements={cardState.display.elements}
          font={cardState.display.font}
          accentColor={cardState.display.accentColor}
          activePet={cardState.display.activePet || 'none'}
          onUpdateElements={(newElems) => {
            onUpdateState((prev) => {
              const currentButtons = prev.display.buttons;
              const activeBtnKey = currentButtons.activeButtonId;

              // Save updated DIY elements to active button config!
              const updatedButtonConfig = {
                ...currentButtons[activeBtnKey],
                elements: newElems
              };

              return {
                ...prev,
                display: {
                  ...prev.display,
                  elements: newElems,
                  buttons: {
                    ...currentButtons,
                    [activeBtnKey]: updatedButtonConfig
                  }
                }
              };
            });
          }}
          onUpdateFont={(font) => {
            onUpdateState((prev) => ({
              ...prev,
              display: { ...prev.display, font }
            }));
          }}
          onUpdateColor={(accentColor) => {
            onUpdateState((prev) => ({
              ...prev,
              display: { ...prev.display, accentColor }
            }));
          }}
          onUpdatePet={(pet: PetOption) => {
            onUpdateState((prev) => ({
              ...prev,
              display: { ...prev.display, activePet: pet }
            }));
          }}
          onSurpriseMe={handleSurpriseMe}
        />
      )}
    </div>
  );
};
