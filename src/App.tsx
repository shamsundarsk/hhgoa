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
import { Sparkles, User, Sliders, Palmtree, UserCheck, CreditCard } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<'landing' | 'profile' | 'studio' | 'pfp_frame'>('landing');
  const [cardState, setCardState] = useState<BuilderCardState>(INITIAL_CARD_STATE);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportedPng, setExportedPng] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleUpdateCardState = (updater: (prev: BuilderCardState) => BuilderCardState) => {
    setCardState(updater);
  };

  const handleShipCard = async () => {
    try {
      setIsExporting(true);
      const dataUrl = await exportBadgeAsPng('hh-badge-canvas-container', cardState.profile.name || 'Builder');
      setExportedPng(dataUrl);
      setIsExportModalOpen(true);
    } catch (e) {
      console.error('Error generating card image:', e);
      alert('Unable to generate image export. Please try again.');
    } finally {
      setIsExporting(false);
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
      <header className="sticky top-0 z-40 bg-[#0A1D13]/90 backdrop-blur-md border-b border-[#1B422B] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            onClick={() => setStage('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#163824] border border-[#E5F552]/40 flex items-center justify-center text-[#E5F552] font-display font-black text-sm group-hover:bg-[#E5F552] group-hover:text-[#0A1D13] transition-all shadow-md">
              <Palmtree className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-black text-base tracking-tight text-[#E5F552] leading-none block">
                HH GOA <span className="text-[#FF5E97]">2026</span>
              </span>
              <span className="font-terminal text-[9px] text-stone-400 uppercase tracking-widest block mt-0.5">
                BUILDER IDENTITY STUDIO
              </span>
            </div>
          </div>

          {/* Mode Navigation Switcher */}
          {stage !== 'landing' && (
            <div className="flex items-center gap-1.5 bg-[#0D2818] p-1 rounded-2xl border border-[#1B422B]">
              <button
                onClick={() => setStage('pfp_frame')}
                className={`px-3 py-1.5 rounded-xl font-terminal text-xs transition-all flex items-center gap-1.5 uppercase ${
                  stage === 'pfp_frame'
                    ? 'bg-[#FF5E97] text-white font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> FORMAT A: 𝕏 PFP
              </button>
              <button
                onClick={() => setStage('profile')}
                className={`px-3 py-1.5 rounded-xl font-terminal text-xs transition-all flex items-center gap-1.5 uppercase ${
                  stage === 'profile' || stage === 'studio'
                    ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> FORMAT B: ID CARD
              </button>
            </div>
          )}

          {stage !== 'landing' && stage !== 'pfp_frame' && (
            <button
              onClick={handleShipCard}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#F1FB46] active:scale-95 transition-all shadow-lg uppercase"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              {isExporting ? 'EXPORTING...' : 'SHIP MY CARD ⚡'}
            </button>
          )}
        </div>
      </header>

      {/* Main Body Stage Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {stage === 'landing' ? (
          <LandingPage
            onStartIdCard={() => setStage('profile')}
            onStartPfpFrame={() => setStage('pfp_frame')}
          />
        ) : stage === 'pfp_frame' ? (
          <PfpFrameStudio
            cardState={cardState}
            onUpdateState={handleUpdateCardState}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mobile Stage Switcher */}
              <div className="sm:hidden flex bg-[#0D2818] p-1 rounded-xl border border-[#1B422B] mb-4">
                <button
                  onClick={() => setStage('profile')}
                  className={`flex-1 py-2 text-center font-terminal text-xs rounded-lg ${
                    stage === 'profile' ? 'bg-[#E5F552] text-[#0A1D13] font-bold' : 'text-stone-300'
                  }`}
                >
                  1. PROFILE
                </button>
                <button
                  onClick={() => setStage('studio')}
                  className={`flex-1 py-2 text-center font-terminal text-xs rounded-lg ${
                    stage === 'studio' ? 'bg-[#E5F552] text-[#0A1D13] font-bold' : 'text-stone-300'
                  }`}
                >
                  2. DISPLAY STUDIO
                </button>
              </div>

              {/* Desktop Sub-Stage Tabs for ID Card */}
              <div className="hidden sm:flex items-center gap-2 bg-[#0D2818] p-1 rounded-2xl border border-[#1B422B] w-fit">
                <button
                  onClick={() => setStage('profile')}
                  className={`px-4 py-1.5 rounded-xl font-terminal text-xs transition-all flex items-center gap-1.5 ${
                    stage === 'profile'
                      ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> 1. BUILD PROFILE
                </button>
                <button
                  onClick={() => setStage('studio')}
                  className={`px-4 py-1.5 rounded-xl font-terminal text-xs transition-all flex items-center gap-1.5 ${
                    stage === 'studio'
                      ? 'bg-[#E5F552] text-[#0A1D13] font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" /> 2. DESIGN DISPLAY STUDIO
                </button>
              </div>

              {stage === 'profile' ? (
                <ProfileForm
                  cardState={cardState}
                  onUpdateState={handleUpdateCardState}
                  onProceedToStudio={() => setStage('studio')}
                />
              ) : (
                <DisplayStudio
                  cardState={cardState}
                  onUpdateState={handleUpdateCardState}
                  onProceedToShip={handleShipCard}
                />
              )}
            </div>

            {/* Right Live Preview Column */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="text-center sm:text-left flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-base text-[#F3F0E6] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5F552] animate-ping" />
                    LIVE BADGE CANVAS PREVIEW
                  </h3>
                  <p className="font-terminal text-xs text-stone-400">
                    Interactive Physical Card (Click A, B, C or flip)
                  </p>
                </div>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-3 py-1.5 rounded-xl bg-[#163824] border border-[#E5F552]/40 text-[#E5F552] font-terminal text-xs font-bold hover:bg-[#E5F552] hover:text-[#0A1D13] transition-all shadow-md uppercase"
                >
                  {isFlipped ? 'SEE FRONT ▲' : 'FLIP TO BACK ▼'}
                </button>
              </div>

              <div className="flex justify-center">
                <BadgeCard
                  cardState={cardState}
                  onButtonClick={handleButtonClick}
                  isFlipped={isFlipped}
                  onToggleFlip={setIsFlipped}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Export Modal */}
      {isExportModalOpen && exportedPng && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          pngDataUrl={exportedPng}
          builderName={cardState.profile.name || 'Builder'}
          builderTitle={cardState.builderTitle}
          cardState={cardState}
          onButtonClick={handleButtonClick}
          onToggleFlip={setIsFlipped}
        />
      )}
    </div>
  );
}
