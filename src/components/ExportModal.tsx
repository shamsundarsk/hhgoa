import React, { useState } from 'react';
import { Download, Copy, Check, X, Sparkles, Send, FileText, Code } from 'lucide-react';
import { downloadDataUrl, exportStandaloneHtmlBadge, export4PagePdf } from '../utils/exportBadge';
import type { BuilderCardState } from '../types/builder';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pngDataUrl: string | null;
  builderName: string;
  builderTitle: string;
  cardState: BuilderCardState;
  onButtonClick?: (buttonKey: 'button1' | 'button2' | 'button3') => void;
  onToggleFlip?: (flipped: boolean) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  pngDataUrl,
  builderName,
  builderTitle,
  cardState,
  onButtonClick,
  onToggleFlip
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  if (!isOpen || !pngDataUrl) return null;

  const tweetText = `Built in Goa. Less noise. More signal.\n\nI'm ${builderTitle || 'a Builder'} at Hacker House Goa 2026.\n\n#FrameInGoa`;
  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const handleCopy = async () => {
    try {
      const response = await fetch(pngDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Clipboard copy failed:', e);
      navigator.clipboard.writeText(tweetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadPng = () => {
    downloadDataUrl(pngDataUrl, `HH_Goa_Card_${builderName || 'Builder'}`);
  };

  const handleDownloadHtml = () => {
    exportStandaloneHtmlBadge(cardState);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      await export4PagePdf(cardState, onButtonClick, onToggleFlip);
    } catch (e) {
      console.error('Error generating PDF:', e);
      alert('Unable to generate PDF export. Please try again.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0D2818] border-2 border-[#E5F552]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B422B] bg-[#0A1D13]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E5F552]" />
            <h3 className="font-display font-black text-lg text-[#F3F0E6] uppercase tracking-wide">
              YOUR HH GOA BUILDER ID IS LIVE ⚡
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-[#163824] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-center">
          {/* Card Preview Container */}
          <div className="relative mx-auto max-w-[260px] rounded-2xl overflow-hidden shadow-2xl border border-[#E5F552]/30 group">
            <img
              src={pngDataUrl}
              alt="HH Goa Builder Card"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="space-y-1">
            <p className="font-display font-bold text-base text-[#F3F0E6]">
              Choose Your Export Format & Share to X!
            </p>
            <p className="font-terminal text-xs text-stone-400">
              Download as High-DPI PNG, 4-Page Complete PDF Document, or Interactive HTML Badge!
            </p>
          </div>

          {/* Export Format Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Download PNG */}
            <button
              onClick={handleDownloadPng}
              className="py-3 px-3.5 rounded-xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#F1FB46] active:scale-95 transition-all shadow-lg uppercase"
            >
              <Download className="w-4 h-4" /> 1. DOWNLOAD PNG
            </button>

            {/* Share to X */}
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3.5 rounded-xl bg-[#1DA1F2] text-white font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1a91da] active:scale-95 transition-all shadow-lg uppercase"
            >
              <Send className="w-4 h-4" /> 𝕏 SHARE TO X
            </a>

            {/* 4-Page PDF Document Exporter */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="py-3 px-3.5 rounded-xl bg-[#FF5E97] text-white font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#ff4788] active:scale-95 transition-all shadow-lg uppercase"
            >
              <FileText className="w-4 h-4" /> {isExportingPdf ? 'GENERATING PDF...' : '2. 4-PAGE PDF DOCUMENT'}
            </button>

            {/* Interactive HTML Exporter */}
            <button
              onClick={handleDownloadHtml}
              className="py-3 px-3.5 rounded-xl bg-[#0A1D13] border-2 border-[#E5F552] text-[#E5F552] font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#E5F552] hover:text-[#0A1D13] active:scale-95 transition-all shadow-lg uppercase"
            >
              <Code className="w-4 h-4" /> 3. WORKING HTML BADGE
            </button>
          </div>

          {/* Copy Image / Caption */}
          <div className="pt-1">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0A1D13] border border-[#1B422B] text-stone-300 font-terminal text-xs flex items-center justify-center gap-2 hover:border-[#E5F552]/40 hover:text-white transition-colors uppercase"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#E5F552]" /> COPIED TO CLIPBOARD!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-400" /> COPY CARD IMAGE & CAPTION
                </>
              )}
            </button>
          </div>

          {/* Pre-filled Caption Box */}
          <div className="p-3 bg-[#0A1D13] border border-[#1B422B] rounded-xl text-left font-terminal text-[11px] text-stone-400 space-y-1">
            <span className="text-[9px] text-[#E5F552] font-bold uppercase block">
              PRE-FILLED TWEET CAPTION
            </span>
            <p className="whitespace-pre-line text-stone-300">
              {tweetText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
