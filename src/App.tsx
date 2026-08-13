import { useState } from 'react';
import type { BuilderCardState } from './types/builder';
import { INITIAL_CARD_STATE } from './utils/defaultData';
import { TEMPLATE_LIBRARY } from './utils/templateLibrary';
import { LandingPage } from './components/LandingPage';
import { ProfileForm } from './components/ProfileForm';
import { DisplayStudio } from './components/DisplayStudio';
import { PfpFrameStudio } from './components/PfpFrameStudio';
import { BadgeCard } from './components/BadgeCard';
import { ExportModal } from './components/ExportModal';
import { exportBadgeAsPng } from './utils/exportBadge';
import { Palmtree, UserCheck, CreditCard } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<'landing' | 'profile' | 'studio' | 'pfp_frame'>('landing');
  const [cardState, setCardState] = useState<BuilderCardState>(INITIAL_CARD_STATE);
  const [exportedPng, setExportedPng] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleUpdateCardState = (updater: (prev: BuilderCardState) => BuilderCardState) => {
    setCardState(updater);
  };

  const handleShipCard = async () => {
    try {
      const dataUrl = await exportBadgeAsPng('hh-badge-canvas-container', cardState.profile.name || 'Builder');
      setExportedPng(dataUrl);
      setIsExportModalOpen(true);
    } catch (e) {
      console.error('Error generating card image:', e);
      alert('Unable to generate image export. Please try again.');
    }
  };

  const handleButtonClick = (buttonKey: 'button1' | 'button2' | 'button3') => {
    setCardState((prev) => {
      const buttons = prev.display.buttons || {
        button1: { id: 'button1', label: '(A) PROFILE', icon: 'user', assignedTemplate: 'PROFILE_CLASSIC' },
        button2: { id: 'button2', label: '(B) PROJECTS', icon: 'code', assignedTemplate: 'STATS_GRID' },
        button3: { id: 'button3', label: '(C) CONNECT', icon: 'link', assignedTemplate: 'CONNECT_QR' },
        activeButtonId: buttonKey
      };

      const btnConfig = buttons[buttonKey];
      const templateDef = TEMPLATE_LIBRARY[btnConfig.assignedTemplate];
      const newElements = btnConfig.elements || (templateDef ? templateDef.elements : prev.display.elements);

      return {
        ...prev,
        display: {
          ...prev.display,
          elements: newElements,
          buttons: {
            ...buttons,
            activeButtonId: buttonKey
          }
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1D13] text-[#F3F0E6] flex flex-col font-body antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0A1D13]/95 backdrop-blur-md border-b border-[#1B422B] px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => setStage('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#163824] border border-[#E5F552]/40 flex items-center justify-center text-[#E5F552] font-display font-black text-sm group-hover:bg-[#E5F552] group-hover:text-[#0A1D13] transition-all shadow-md">
              <Palmtree className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#E5F552] leading-none block whitespace-nowrap">
                HH GOA <span className="text-[#FF5E97]">2026</span>
              </span>
              <span className="font-terminal text-[8px] sm:text-[9px] text-stone-400 uppercase tracking-widest hidden xs:block sm:block mt-0.5 whitespace-nowrap">
                IDENTITY STUDIO
              </span>
            </div>
          </div>

          {/* Mode Navigation Switcher (Responsive for Mobile) */}
          {stage !== 'landing' && (
            <div className="flex items-center gap-1 bg-[#0D2818] p-1 rounded-xl sm:rounded-2xl border border-[#1B422B] shrink-0">
              <button
                onClick={() => setStage('pfp_frame')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-terminal text-[10px] sm:text-xs transition-all flex items-center gap-1 uppercase whitespace-nowrap ${
                  stage === 'pfp_frame'
                    ? 'bg-[#FF5E97] text-white font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>FORMAT A: 𝕏 PFP</span>
              </button>
              <button
                onClick={() => setStage('profile')}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-terminal text-[10px] sm:text-xs transition-all flex items-center gap-1 uppercase whitespace-nowrap ${
                  stage === 'profile' || stage === 'studio'
                    ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>FORMAT B: ID CARD</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content View Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {stage === 'landing' && (
          <LandingPage
            onStartIdCard={() => setStage('profile')}
            onStartPfpFrame={() => setStage('pfp_frame')}
          />
        )}

        {stage === 'pfp_frame' && (
          <PfpFrameStudio
            cardState={cardState}
            onUpdateState={handleUpdateCardState}
          />
        )}

        {stage === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <ProfileForm
                cardState={cardState}
                onUpdateState={handleUpdateCardState}
                onProceedToStudio={() => setStage('studio')}
              />
            </div>
            <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
              <BadgeCard
                cardState={cardState}
                onButtonClick={handleButtonClick}
                isFlipped={isFlipped}
                onToggleFlip={setIsFlipped}
              />
            </div>
          </div>
        )}

        {stage === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <DisplayStudio
                cardState={cardState}
                onUpdateState={handleUpdateCardState}
                onProceedToShip={handleShipCard}
              />
            </div>
            <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
              <BadgeCard
                cardState={cardState}
                onButtonClick={handleButtonClick}
                isFlipped={isFlipped}
                onToggleFlip={setIsFlipped}
              />
            </div>
          </div>
        )}
      </main>

      {/* Export Output Modal */}
      {isExportModalOpen && exportedPng && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          pngDataUrl={exportedPng}
          cardState={cardState}
          builderName={cardState.profile.name || 'Builder'}
          builderTitle={cardState.builderTitle}
          onButtonClick={handleButtonClick}
          onToggleFlip={setIsFlipped}
        />
      )}
    </div>
  );
}
