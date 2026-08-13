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

  const { profile } = cardState;
  const name = builderName || profile.name || 'Builder';
  const role = profile.role || 'SHIPPER';
  const title = builderTitle || 'THE DATA ALCHEMIST';
  const stackStr = profile.stack && profile.stack.length > 0 ? profile.stack.slice(0, 3).join(' · ') : 'AI · WEB3 · CODE';

  const tweetText = `🌴 OFFICIAL BUILDER IDENTITY VERIFIED 🌴\n\n⚡ ${name} | ${role}\n⚡ Title: "${title}"\n⚡ Stack: ${stackStr}\n\nBuilt in Goa. Less noise. More signal.\nReady to ship at Hacker House Goa 2026 🚀\n\nBuild your official badge at https://hhgoa.com\n#HackerHouseGoa #FrameInGoa #HHGoa2026`;
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
      alert('Unable to generate 4-page PDF export. Please try again.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0A1D13] border-2 border-[#E5F552]/40 rounded-3xl p-6 shadow-2xl space-y-6 text-[#F3F0E6] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#163824] text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#163824] text-xs font-terminal text-[#E5F552] border border-[#E5F552]/30 uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-current text-[#FF5E97]" /> SHIP YOUR IDENTITY
          </span>
          <h3 className="font-display font-black text-3xl text-[#E5F552] uppercase tracking-wide">
            YOUR HH GOA BADGE IS READY!
          </h3>
          <p className="font-terminal text-xs text-stone-300 uppercase">
            {builderName} · {builderTitle}
          </p>
        </div>

        {/* High-Res Badge Image Preview */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#163824] shadow-inner bg-stone-900 flex items-center justify-center p-2">
          <img
            src={pngDataUrl}
            alt="Exported Badge Preview"
            className="max-h-72 w-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Pre-filled Tweet Preview Box */}
        <div className="p-3.5 bg-[#0D2818] border border-[#1B422B] rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-terminal">
            <span className="text-[#FF5E97] font-bold uppercase tracking-wider flex items-center gap-1">
              <Send className="w-3.5 h-3.5" /> PRE-FILLED 𝕏 CAPTION:
            </span>
            <button
              onClick={handleCopy}
              className="text-[#E5F552] hover:underline font-bold flex items-center gap-1 uppercase"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'COPIED!' : 'COPY TEXT'}
            </button>
          </div>
          <p className="font-terminal text-xs text-stone-300 bg-[#0A1D13] p-2.5 rounded-xl border border-stone-800 whitespace-pre-wrap">
            {tweetText}
          </p>
        </div>

        {/* Export Formats Action Grid */}
        <div className="space-y-2.5">
          <label className="font-terminal text-xs text-[#E5F552] font-bold block uppercase tracking-wider">
            CHOOSE EXPORT FORMAT:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadPng}
              className="py-3 px-4 rounded-xl bg-[#E5F552] text-[#0A1D13] font-display font-black text-xs flex items-center justify-center gap-2 hover:bg-[#F1FB46] active:scale-95 transition-all shadow-md uppercase"
            >
              <Download className="w-4 h-4" /> PNG BADGE IMAGE
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="py-3 px-4 rounded-xl bg-[#FF5E97] text-white font-display font-black text-xs flex items-center justify-center gap-2 hover:bg-[#ff4785] active:scale-95 transition-all shadow-md uppercase"
            >
              <FileText className="w-4 h-4" /> {isExportingPdf ? 'GENERATING PDF...' : '4-PAGE FLIP PDF'}
            </button>

            <button
              onClick={handleDownloadHtml}
              className="py-3 px-4 rounded-xl bg-[#163824] border border-[#E5F552]/40 text-[#E5F552] font-display font-black text-xs flex items-center justify-center gap-2 hover:bg-[#1B422B] active:scale-95 transition-all shadow-md uppercase col-span-1 sm:col-span-2"
            >
              <Code className="w-4 h-4" /> INTERACTIVE STANDALONE HTML BADGE
            </button>
          </div>
        </div>

        {/* 𝕏 Share Primary Action Button */}
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl bg-[#1DA1F2] text-white font-display font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1a91da] active:scale-95 transition-all shadow-xl uppercase"
        >
          <Send className="w-4.5 h-4.5" /> SHARE TO 𝕏 (TWITTER)
        </a>
      </div>
    </div>
  );
};
