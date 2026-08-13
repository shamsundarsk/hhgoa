import React from 'react';
import type { DisplayElement, ElementType, FontFamilyOption, ColorOption, PetOption } from '../types/builder';
import { Plus, Trash2, ArrowUp, ArrowDown, Type, User, Code, Sparkles, MessageSquareQuote, BarChart, QrCode, Sliders, Image as ImageIcon, Smile } from 'lucide-react';

interface BlockEditorProps {
  elements: DisplayElement[];
  font: FontFamilyOption;
  accentColor: ColorOption;
  activePet: PetOption;
  onUpdateElements: (elements: DisplayElement[]) => void;
  onUpdateFont: (font: FontFamilyOption) => void;
  onUpdateColor: (color: ColorOption) => void;
  onUpdatePet: (pet: PetOption) => void;
  onSurpriseMe: () => void;
}

const BLOCK_TYPES: Array<{
  type: ElementType;
  label: string;
  icon: React.ReactNode;
}> = [
  { type: 'profile', label: 'PROFILE', icon: <User className="w-3.5 h-3.5" /> },
  { type: 'title', label: 'BUILDER TITLE', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { type: 'stack', label: 'STACK', icon: <Code className="w-3.5 h-3.5" /> },
  { type: 'status', label: 'STATUS BAR', icon: <Sliders className="w-3.5 h-3.5" /> },
  { type: 'quote', label: 'QUOTE', icon: <MessageSquareQuote className="w-3.5 h-3.5" /> },
  { type: 'stats', label: 'STATS GRID', icon: <BarChart className="w-3.5 h-3.5" /> },
  { type: 'qr', label: 'QR / LINK', icon: <QrCode className="w-3.5 h-3.5" /> },
  { type: 'pet', label: 'ANIMATED PET', icon: <Smile className="w-3.5 h-3.5" /> },
  { type: 'text', label: 'TEXT BOX', icon: <Type className="w-3.5 h-3.5" /> },
  { type: 'image', label: 'IMAGE BOX', icon: <ImageIcon className="w-3.5 h-3.5" /> }
];

export const BlockEditor: React.FC<BlockEditorProps> = ({
  elements,
  font,
  accentColor,
  activePet,
  onUpdateElements,
  onUpdateFont,
  onUpdateColor,
  onUpdatePet,
  onSurpriseMe
}) => {
  const addBlock = (type: ElementType) => {
    if (type === 'pet') {
      onUpdatePet('cat');
      return;
    }

    const newElement: DisplayElement = {
      id: `elem-${Date.now()}`,
      type,
      label: type === 'text' || type === 'custom' ? 'CUSTOM HEADING' : type === 'image' ? 'STICKER / BADGE' : undefined,
      content: type === 'text' || type === 'custom'
        ? 'Building things nobody asked for.'
        : type === 'image'
        ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80'
        : undefined,
      style: {
        font: font,
        color: accentColor
      }
    };
    onUpdateElements([...elements, newElement]);
  };

  const removeBlock = (id: string) => {
    onUpdateElements(elements.filter(e => e.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= elements.length) return;
    const newElements = [...elements];
    const [moved] = newElements.splice(index, 1);
    newElements.splice(targetIndex, 0, moved);
    onUpdateElements(newElements);
  };

  const handleCustomContentChange = (id: string, newLabel: string, newContent: string) => {
    onUpdateElements(elements.map(e => {
      if (e.id === id) {
        return { ...e, label: newLabel, content: newContent };
      }
      return e;
    }));
  };

  return (
    <div className="space-y-6">
      {/* ⚡ SURPRISE ME & GLOBAL STYLE TOOLBAR */}
      <div className="p-4 bg-[#163824]/60 border border-[#E5F552]/20 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onSurpriseMe}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E5F552] to-[#FF5E97] text-[#0A1D13] font-display font-black text-lg tracking-wide flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-lg uppercase"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            ⚡ SURPRISE ME (RANDOMIZE DISPLAY)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 border-t border-[#1B422B]">
          {/* FONT SELECTOR */}
          <div>
            <label className="font-terminal text-[10px] text-stone-400 font-bold block mb-1 uppercase tracking-wider">
              TYPOGRAPHY
            </label>
            <select
              value={font}
              onChange={(e) => onUpdateFont(e.target.value as FontFamilyOption)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-lg px-2.5 py-1.5 font-terminal text-xs text-[#E5F552] focus:outline-none focus:border-[#E5F552]"
            >
              <option value="HH DISPLAY">BEBAS NEUE (DISPLAY)</option>
              <option value="HH TERMINAL">IBM PLEX MONO (TERMINAL)</option>
              <option value="HH PIXEL">PRESS START 2P (PIXEL)</option>
            </select>
          </div>

          {/* ACCENT COLOR SELECTOR */}
          <div>
            <label className="font-terminal text-[10px] text-stone-400 font-bold block mb-1 uppercase tracking-wider">
              ACCENT COLOR
            </label>
            <select
              value={accentColor}
              onChange={(e) => onUpdateColor(e.target.value as ColorOption)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-lg px-2.5 py-1.5 font-terminal text-xs text-[#FF5E97] focus:outline-none focus:border-[#FF5E97]"
            >
              <option value="HH YELLOW">HH YELLOW</option>
              <option value="HH PINK">HOT PINK</option>
              <option value="MONO DARK">DARK MONO</option>
              <option value="CREAM">CREAM</option>
            </select>
          </div>

          {/* ANIMATED PIXEL PET SELECTOR */}
          <div>
            <label className="font-terminal text-[10px] text-stone-400 font-bold block mb-1 uppercase tracking-wider">
              ROAMING PIXEL PET
            </label>
            <select
              value={activePet}
              onChange={(e) => onUpdatePet(e.target.value as PetOption)}
              className="w-full bg-[#0A1D13] border border-[#1B422B] rounded-lg px-2.5 py-1.5 font-terminal text-xs text-amber-300 focus:outline-none focus:border-amber-300"
            >
              <option value="none">NONE</option>
              <option value="cat">🐱 ROAMING CAT (8-BIT)</option>
              <option value="dog">🐶 ROAMING DOG (8-BIT)</option>
              <option value="crab">🦀 RUSTACEAN CRAB</option>
              <option value="bot">🤖 AI COPILOT</option>
            </select>
          </div>
        </div>
      </div>

      {/* ADD BLOCKS TOOLBAR (CANVA-LITE DIY) */}
      <div>
        <h4 className="font-display font-black text-sm text-[#F3F0E6] mb-2 uppercase tracking-wider">
          ADD DISPLAY BLOCKS (CANVA-LITE DIY)
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {BLOCK_TYPES.map((btn) => (
            <button
              key={btn.type}
              onClick={() => addBlock(btn.type)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A1D13] border border-[#1B422B] text-xs font-terminal text-stone-300 hover:border-[#E5F552]/50 hover:text-[#E5F552] transition-colors"
            >
              <Plus className="w-3 h-3 text-[#E5F552]" />
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE BLOCKS REORDERABLE LIST */}
      <div>
        <h4 className="font-display font-black text-sm text-[#F3F0E6] mb-2 uppercase tracking-wider">
          ACTIVE BLOCKS ({elements.length})
        </h4>

        <div className="space-y-2">
          {elements.map((elem, index) => (
            <div
              key={elem.id}
              className="p-3 bg-[#0A1D13] border border-[#1B422B] rounded-xl flex flex-col gap-2 group hover:border-[#E5F552]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-terminal font-bold text-xs text-[#E5F552] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5F552]" />
                  {elem.type} BLOCK
                </span>

                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveBlock(index, 'up')}
                    className="p-1 rounded text-stone-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === elements.length - 1}
                    onClick={() => moveBlock(index, 'down')}
                    className="p-1 rounded text-stone-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeBlock(elem.id)}
                    className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Editable Fields for Text / Custom / Image Block */}
              {(elem.type === 'custom' || elem.type === 'text' || elem.type === 'image') && (
                <div className="space-y-2 mt-1 pt-2 border-t border-[#1B422B]">
                  <input
                    type="text"
                    placeholder="Block Title / Label"
                    value={elem.label || ''}
                    onChange={(e) => handleCustomContentChange(elem.id, e.target.value, elem.content || '')}
                    className="w-full bg-[#163824] border border-[#1B422B] rounded px-2 py-1 font-terminal text-xs text-[#E5F552] focus:outline-none"
                  />
                  {elem.type === 'image' ? (
                    <input
                      type="text"
                      placeholder="Image URL (e.g. https://...)"
                      value={elem.content || ''}
                      onChange={(e) => handleCustomContentChange(elem.id, elem.label || '', e.target.value)}
                      className="w-full bg-[#163824] border border-[#1B422B] rounded px-2 py-1 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
                    />
                  ) : (
                    <textarea
                      rows={2}
                      placeholder="Custom Text Content..."
                      value={elem.content || ''}
                      onChange={(e) => handleCustomContentChange(elem.id, elem.label || '', e.target.value)}
                      className="w-full bg-[#163824] border border-[#1B422B] rounded px-2 py-1 font-terminal text-xs text-[#F3F0E6] focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
