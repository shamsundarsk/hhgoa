import React, { useState } from 'react';
import type { BuilderCardState, TemplatePresetId } from '../types/builder';
import { TEMPLATE_LIBRARY } from '../utils/templateLibrary';
import { Layout, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ButtonTemplateEditorProps {
  cardState: BuilderCardState;
  onUpdateState: (updater: (prev: BuilderCardState) => BuilderCardState) => void;
  onProceedToShip?: () => void;
}

export const ButtonTemplateEditor: React.FC<ButtonTemplateEditorProps> = ({
  cardState,
  onUpdateState,
  onProceedToShip
}) => {
  const [selectedButtonKey, setSelectedButtonKey] = useState<'button1' | 'button2' | 'button3'>('button1');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Profile' | 'Stats' | 'Connect'>('Profile');

  const { buttons } = cardState.display;
  const currentButtonConfig = buttons ? buttons[selectedButtonKey] : {
    id: selectedButtonKey,
    label: selectedButtonKey === 'button1' ? '(A) PROFILE' : selectedButtonKey === 'button2' ? '(B) PROJECTS' : '(C) CONNECT',
    icon: selectedButtonKey === 'button1' ? 'user' : selectedButtonKey === 'button2' ? 'code' : 'link',
    assignedTemplate: selectedButtonKey === 'button1' ? 'PROFILE_CLASSIC' : selectedButtonKey === 'button2' ? 'STATS_GRID' : 'CONNECT_QR'
  };

  const handleSwitchStep = (bKey: 'button1' | 'button2' | 'button3') => {
    setSelectedButtonKey(bKey);
    // Lock category filter to relevant tab for that button step
    if (bKey === 'button1') setCategoryFilter('Profile');
    else if (bKey === 'button2') setCategoryFilter('Stats');
    else if (bKey === 'button3') setCategoryFilter('Connect');

    // Make sure live badge preview switches to the active button's elements
    onUpdateState((prev) => {
      const currentButtons = prev.display.buttons;
      const targetBtn = currentButtons[bKey];
      const targetElements = targetBtn.elements || TEMPLATE_LIBRARY[targetBtn.assignedTemplate]?.elements || [];

      return {
        ...prev,
        display: {
          ...prev.display,
          elements: targetElements,
          buttons: {
            ...currentButtons,
            activeButtonId: bKey
          }
        }
      };
    });
  };

  const handleSelectTemplateForButton = (templateId: TemplatePresetId) => {
    const templateDef = TEMPLATE_LIBRARY[templateId];
    if (!templateDef) return;

    onUpdateState((prev) => {
      const currentButtons = prev.display.buttons;

      // Update ONLY the selected button's config and elements!
      const updatedButtonConfig = {
        ...currentButtons[selectedButtonKey],
        assignedTemplate: templateId,
        elements: templateDef.elements // Save independent element stream!
      };

      const updatedButtons = {
        ...currentButtons,
        [selectedButtonKey]: updatedButtonConfig,
        activeButtonId: selectedButtonKey
      };

      return {
        ...prev,
        display: {
          ...prev.display,
          elements: templateDef.elements, // Live display screen updates
          buttons: updatedButtons
        }
      };
    });
  };

  const handleUpdateLabel = (newLabel: string) => {
    onUpdateState((prev) => {
      const currentButtons = prev.display.buttons;

      return {
        ...prev,
        display: {
          ...prev.display,
          buttons: {
            ...currentButtons,
            [selectedButtonKey]: {
              ...currentButtons[selectedButtonKey],
              label: newLabel.toUpperCase()
            }
          }
        }
      };
    });
  };

  const filteredTemplates = Object.values(TEMPLATE_LIBRARY).filter(
    (t) => categoryFilter === 'All' || t.category === categoryFilter
  );

  return (
    <div className="space-y-6">
      {/* Guided 3-Step Wizard Progress Bar */}
      <div className="p-3.5 bg-[#0A1D13] border border-[#1B422B] rounded-2xl">
        <div className="flex items-center justify-between text-xs font-terminal mb-2 font-bold uppercase tracking-wider text-stone-400">
          <span>DESIGN SCREEN UI STEP BY STEP:</span>
          <span className="text-[#E5F552]">
            {selectedButtonKey === 'button1' ? 'STEP 1 OF 3' : selectedButtonKey === 'button2' ? 'STEP 2 OF 3' : 'STEP 3 OF 3'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['button1', 'button2', 'button3'] as const).map((bKey, idx) => {
            const btn = buttons ? buttons[bKey] : null;
            const isSelected = selectedButtonKey === bKey;
            const label = btn ? btn.label : idx === 0 ? '(A) PROFILE' : idx === 1 ? '(B) PROJECTS' : '(C) CONNECT';
            const stepTitle = idx === 0 ? '1. PROFILE UI' : idx === 1 ? '2. PROJECTS UI' : '3. CONNECT UI';

            return (
              <button
                key={bKey}
                onClick={() => handleSwitchStep(bKey)}
                className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E5F552] text-[#0A1D13] border-[#E5F552] shadow-lg scale-[1.02]'
                    : 'bg-[#0D2818] text-[#F3F0E6] border-[#1B422B] hover:border-[#E5F552]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-terminal font-black text-[10px] uppercase tracking-wider">
                    {stepTitle}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0A1D13]" />}
                </div>
                <div className="mt-1">
                  <p className="font-display font-black text-xs uppercase truncate">{label}</p>
                  <p className={`font-terminal text-[9px] truncate ${isSelected ? 'text-[#0A1D13]/80' : 'text-stone-400'}`}>
                    {TEMPLATE_LIBRARY[btn?.assignedTemplate || 'PROFILE_CLASSIC']?.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Button Custom Label Input */}
      <div className="p-3.5 bg-[#0A1D13] border border-[#1B422B] rounded-2xl space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="font-terminal text-xs text-[#E5F552] block uppercase tracking-wider font-bold">
            BUTTON {selectedButtonKey === 'button1' ? '1' : selectedButtonKey === 'button2' ? '2' : '3'} DISPLAY LABEL:
          </label>
          <span className="font-terminal text-[10px] text-stone-400 uppercase">
            APPEARS ON PHYSICAL BUTTON
          </span>
        </div>
        <input
          type="text"
          value={currentButtonConfig.label}
          onChange={(e) => handleUpdateLabel(e.target.value)}
          placeholder="e.g. (A) MY BIO"
          className="w-full bg-[#0D2818] border border-[#1B422B] rounded-xl px-3 py-2 font-terminal text-sm text-[#E5F552] focus:outline-none focus:border-[#E5F552] uppercase"
        />
      </div>

      {/* Choose Template Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-terminal font-bold text-xs text-[#E5F552] uppercase tracking-wider flex items-center gap-1.5">
            <Layout className="w-4 h-4" /> CHOOSE DESIGN TEMPLATE FOR {selectedButtonKey === 'button1' ? 'PROFILE' : selectedButtonKey === 'button2' ? 'PROJECTS' : 'CONNECT'}:
          </label>

          {/* Category Filter Tabs */}
          <div className="flex gap-1 bg-[#0A1D13] p-1 rounded-xl border border-[#1B422B]">
            {(['Profile', 'Stats', 'Connect', 'All'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg font-terminal text-[10px] uppercase transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#E5F552] text-[#0A1D13] font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {cat === 'Stats' ? 'Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredTemplates.map((t) => {
            const isAssigned = currentButtonConfig.assignedTemplate === t.id;

            return (
              <div
                key={t.id}
                onClick={() => handleSelectTemplateForButton(t.id)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isAssigned
                    ? 'bg-[#163824] border-[#E5F552] shadow-xl'
                    : 'bg-[#0A1D13] border-[#1B422B] hover:border-[#E5F552]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-base text-[#F3F0E6] uppercase tracking-wide">
                      {t.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0D2818] border border-[#1B422B] font-terminal text-[9px] text-[#FF5E97] uppercase">
                      {t.category === 'Stats' ? 'Projects' : t.category}
                    </span>
                  </div>
                  <p className="font-terminal text-xs text-stone-400 mt-1 line-clamp-2">
                    {t.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1B422B]/60">
                  <span className="font-terminal text-[10px] text-stone-500 uppercase">
                    {t.elements.length} UI BLOCKS
                  </span>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-lg font-terminal text-xs transition-all uppercase font-bold ${
                      isAssigned
                        ? 'bg-[#E5F552] text-[#0A1D13]'
                        : 'bg-[#0D2818] text-[#E5F552] border border-[#E5F552]/30 hover:bg-[#E5F552] hover:text-[#0A1D13]'
                    }`}
                  >
                    {isAssigned ? 'ASSIGNED ✓' : 'SELECT TEMPLATE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next/Back Wizard Navigation Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1B422B]">
        {selectedButtonKey === 'button1' ? (
          <div className="text-xs font-terminal text-stone-400">
            Step 1 of 3: Profile Screen
          </div>
        ) : (
          <button
            onClick={() => handleSwitchStep(selectedButtonKey === 'button3' ? 'button2' : 'button1')}
            className="px-4 py-2 rounded-xl bg-[#0A1D13] border border-[#1B422B] text-stone-300 font-terminal text-xs hover:text-white transition-colors uppercase"
          >
            ← BACK TO {selectedButtonKey === 'button3' ? 'PROJECTS' : 'PROFILE'}
          </button>
        )}

        {selectedButtonKey !== 'button3' ? (
          <button
            onClick={() => handleSwitchStep(selectedButtonKey === 'button1' ? 'button2' : 'button3')}
            className="px-5 py-2.5 rounded-xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-xs sm:text-sm flex items-center gap-2 hover:bg-[#F1FB46] active:scale-95 transition-all shadow-md uppercase"
          >
            NEXT: DESIGN {selectedButtonKey === 'button1' ? 'PROJECTS' : 'CONNECT'} SCREEN <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          onProceedToShip && (
            <button
              onClick={onProceedToShip}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E5F552] to-[#FF5E97] text-[#0A1D13] font-display font-black text-xs sm:text-sm flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-xl uppercase"
            >
              <Sparkles className="w-4 h-4 fill-current" /> FINISH & SHIP BADGE ⚡
            </button>
          )
        )}
      </div>
    </div>
  );
};
