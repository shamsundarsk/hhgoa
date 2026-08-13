import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import type { BuilderCardState, DisplayElement } from '../types/builder';
import { TEMPLATE_LIBRARY } from './templateLibrary';

async function getAssetAsBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Error reading asset as Base64:', e);
    return '';
  }
}

export async function exportBadgeAsPng(elementId: string, _fileName: string): Promise<string> {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  const dataUrl = await toPng(container, {
    quality: 0.98,
    pixelRatio: 3,
    cacheBust: true,
    filter: (node) => {
      if (node instanceof HTMLElement && node.dataset?.excludeExport === 'true') {
        return false;
      }
      return true;
    }
  });

  return dataUrl;
}

export function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.download = `${fileName.replace(/\s+/g, '_')}_HHGoa2026.png`;
  link.href = dataUrl;
  link.click();

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#E5F552', '#FF5E97', '#163824', '#ffffff']
  });
}

// 4-PAGE COMPLETE PDF EXPORTER (PAGE 1: PROFILE, PAGE 2: PROJECTS, PAGE 3: CONNECT, PAGE 4: BACK CARD)
export async function export4PagePdf(
  cardState: BuilderCardState,
  onButtonClick?: (bKey: 'button1' | 'button2' | 'button3') => void,
  onToggleFlip?: (flipped: boolean) => void
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [101.6, 152.4] // 4" x 6" physical ID card dimensions
  });

  const container = document.getElementById('hh-badge-canvas-container');
  if (!container) throw new Error('Badge canvas container not found');

  // Ensure card is on front view
  if (onToggleFlip) {
    onToggleFlip(false);
    await new Promise((r) => setTimeout(r, 400));
  }

  const buttonKeys: Array<'button1' | 'button2' | 'button3'> = ['button1', 'button2', 'button3'];

  // Render Page 1 (Button 1 Profile), Page 2 (Button 2 Projects), Page 3 (Button 3 Connect)
  for (let i = 0; i < buttonKeys.length; i++) {
    if (i > 0) doc.addPage([101.6, 152.4], 'portrait');
    
    if (onButtonClick) {
      onButtonClick(buttonKeys[i]);
      await new Promise((r) => setTimeout(r, 600)); // wait for React state re-render
    }

    const imgData = await toPng(container, { quality: 0.95, pixelRatio: 2.5 });
    doc.addImage(imgData, 'PNG', 0, 0, 101.6, 152.4);
  }

  // Page 4: Official Card Back View (Flip Card Live)
  doc.addPage([101.6, 152.4], 'portrait');
  if (onToggleFlip) {
    onToggleFlip(true);
    await new Promise((r) => setTimeout(r, 600)); // wait for React flip view render
  }

  const backContainer = document.getElementById('hh-badge-canvas-container');
  if (backContainer) {
    const backImgData = await toPng(backContainer, { quality: 0.95, pixelRatio: 2.5 });
    doc.addImage(backImgData, 'PNG', 0, 0, 101.6, 152.4);
  }

  // Reset view back to front view & button 1
  if (onToggleFlip) onToggleFlip(false);
  if (onButtonClick) onButtonClick('button1');

  const safeName = (cardState.profile.name || 'Builder').replace(/\s+/g, '_');
  doc.save(`${safeName}_HHGoa2026_CompleteBadge.pdf`);

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#E5F552', '#FF5E97', '#163824']
  });
}

// UNIVERSAL HTML BLOCK STREAM RENDERER (DYNAMICAL RENDERS ANY DISPLAY ELEMENT STREAM TO HTML WITH SVG ICONS)
function renderElementsToHtml(
  elements: DisplayElement[],
  cardState: BuilderCardState,
  userPhotoUrl: string,
  qrImage: string
): string {
  const { profile, builderTitle } = cardState;

  return elements.slice(0, 5).map((elem) => {
    switch (elem.type) {
      case 'profile':
        return `
          <div class="profile-box">
            <img src="${userPhotoUrl}" class="avatar" alt="Avatar">
            <div>
              <div class="name">${profile.name || 'SHAM SUNDAR'}</div>
              <div class="handle">${profile.handle || '@sham-sundar'}</div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                <span class="role-badge">${profile.role || 'BUILDER'}</span>
                ${profile.location ? `<span style="font-family: 'IBM Plex Mono'; font-size: 9px; opacity: 0.8; text-transform: uppercase; display: inline-flex; align-items: center; gap: 3px;"><svg style="width: 10px; height: 10px; opacity: 0.7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${profile.location}</span>` : ''}
              </div>
            </div>
          </div>
        `;

      case 'title':
        return `
          <div class="title-box">
            <div style="font-size: 8px; font-family: 'IBM Plex Mono'; opacity: 0.6; font-weight: 700; text-transform: uppercase;">BUILDER TITLE</div>
            <div class="title-head"><svg style="width: 18px; height: 18px; fill: #E5F552; display: inline-block; vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> ${builderTitle}</div>
          </div>
        `;

      case 'stack': {
        const pills = (profile.stack && profile.stack.length > 0)
          ? profile.stack.map(s => `<span class="pill">${s}</span>`).join('')
          : '<span class="pill">PYTHON</span><span class="pill">REACT</span><span class="pill">AI</span>';
        return `
          <div>
            <div style="font-size: 8px; font-family: 'IBM Plex Mono'; opacity: 0.6; font-weight: 700; margin-bottom: 2px; text-transform: uppercase;">STACK</div>
            <div class="stack-pills">${pills}</div>
          </div>
        `;
      }

      case 'quote':
        return `
          <div style="padding: 6px; font-style: italic; border-left: 3px solid #121913; background: rgba(18,25,19,0.05); font-size: 11px; color: #121913;">
            "${profile.quote || 'Ship first. Explain later.'}"
          </div>
        `;

      case 'status':
        return `
          <div style="padding: 6px; border: 1px solid rgba(18,25,19,0.25); border-radius: 8px; background: rgba(18,25,19,0.05);">
            <div style="display: flex; justify-between: space-between; font-family: 'IBM Plex Mono'; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">
              <span>${profile.statusMessage || 'STATUS: SHIPPING'}</span>
              <span style="display: flex; align-items: center; gap: 4px;"><svg style="width: 12px; height: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> ${profile.coffeeCount} COFFEES</span>
            </div>
            <div style="width: 100%; background: rgba(18,25,19,0.2); height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: #121913; height: 100%; width: 82%;"></div>
            </div>
          </div>
        `;

      case 'stats':
        return `
          <div class="stats-grid">
            <div><div class="stat-lbl">PROJECTS</div><div class="stat-val">${profile.stats.projects}</div></div>
            <div><div class="stat-lbl">HACKS</div><div class="stat-val">${profile.stats.hackathons}</div></div>
            <div><div class="stat-lbl">STREAK</div><div class="stat-val">${profile.stats.streak}D</div></div>
            <div><div class="stat-lbl">RANK</div><div class="stat-val">${profile.stats.rank}</div></div>
          </div>
        `;

      case 'qr':
        return `
          <div class="qr-box">
            <div>
              <div style="font-family: 'IBM Plex Mono'; font-weight: 700; font-size: 11px; text-transform: uppercase;">SCAN TO CONNECT</div>
              <div style="font-family: 'IBM Plex Mono'; font-size: 10px; opacity: 0.8; margin-top: 2px;">${profile.github || profile.website || 'github.com/builder'}</div>
              <div style="font-family: 'IBM Plex Mono'; font-size: 8px; opacity: 0.6; margin-top: 4px; text-transform: uppercase;">OFFICIAL BUILDER QR</div>
            </div>
            <img src="${qrImage}" class="qr-img" alt="QR Code">
          </div>
        `;

      case 'pet': {
        return `
          <div style="width: 100%; height: 28px; overflow: hidden; position: relative; display: flex; align-items: center; margin: 2px 0;">
            <div class="roam-cat">
              <svg width="28" height="22" viewBox="0 0 32 26" fill="none" style="image-rendering: pixelated; display: block;">
                <rect x="4" y="2" width="4" height="4" fill="#121913"/>
                <rect x="6" y="4" width="2" height="2" fill="#FF5E97"/>
                <rect x="16" y="2" width="4" height="4" fill="#121913"/>
                <rect x="18" y="4" width="2" height="2" fill="#FF5E97"/>
                <rect x="2" y="5" width="20" height="8" fill="#121913"/>
                <rect x="6" y="8" width="3" height="3" fill="#E5F552"/>
                <rect x="15" y="8" width="3" height="3" fill="#E5F552"/>
                <rect x="7" y="9" width="1" height="1" fill="#121913"/>
                <rect x="16" y="9" width="1" height="1" fill="#121913"/>
                <rect x="11" y="10" width="2" height="2" fill="#FF5E97"/>
                <rect x="0" y="9" width="3" height="1" fill="#121913"/>
                <rect x="21" y="9" width="3" height="1" fill="#121913"/>
                <rect x="0" y="11" width="3" height="1" fill="#121913"/>
                <rect x="21" y="11" width="3" height="1" fill="#121913"/>
                <rect x="6" y="13" width="18" height="8" fill="#121913"/>
                <rect x="24" y="12" width="3" height="3" fill="#121913"/>
                <rect x="26" y="9" width="3" height="4" fill="#121913"/>
                <rect x="28" y="6" width="3" height="4" fill="#121913"/>
                <rect x="7" y="21" width="3" height="4" fill="#121913"/>
                <rect x="11" y="21" width="3" height="4" fill="#121913"/>
                <rect x="17" y="21" width="3" height="4" fill="#121913"/>
                <rect x="21" y="21" width="3" height="4" fill="#121913"/>
              </svg>
            </div>
          </div>
        `;
      }

      case 'custom':
      case 'text':
      default:
        return `
          <div style="padding: 6px; border: 1px dashed rgba(18,25,19,0.3); border-radius: 6px; background: rgba(18,25,19,0.04);">
            ${elem.label ? `<div style="font-size: 8px; font-family: 'IBM Plex Mono'; font-weight: 700; opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;">${elem.label}</div>` : ''}
            <div style="font-family: 'IBM Plex Mono'; font-size: 10px; font-weight: 600; color: #121913;">
              ${elem.content || 'Building things nobody asked for.'}
            </div>
          </div>
        `;
    }
  }).join('');
}

// STANDALONE INTERACTIVE HTML BADGE EXPORTER WITH EMBEDDED BASE64 TEMPLATE & WORKING JS
export async function exportStandaloneHtmlBadge(cardState: BuilderCardState): Promise<void> {
  const { profile, display, metadata } = cardState;
  const buttons = display.buttons || {
    button1: { id: 'button1', label: '(A) PROFILE', icon: 'user', assignedTemplate: 'PROFILE_CLASSIC' },
    button2: { id: 'button2', label: '(B) PROJECTS', icon: 'code', assignedTemplate: 'STATS_GRID' },
    button3: { id: 'button3', label: '(C) CONNECT', icon: 'link', assignedTemplate: 'CONNECT_QR' },
    activeButtonId: 'button1'
  };

  const template1Def = TEMPLATE_LIBRARY[buttons.button1.assignedTemplate] || TEMPLATE_LIBRARY['PROFILE_CLASSIC'];
  const template2Def = TEMPLATE_LIBRARY[buttons.button2.assignedTemplate] || TEMPLATE_LIBRARY['STATS_GRID'];
  const template3Def = TEMPLATE_LIBRARY[buttons.button3.assignedTemplate] || TEMPLATE_LIBRARY['CONNECT_QR'];

  const btn1Elements = buttons.button1.elements || template1Def.elements;
  const btn2Elements = buttons.button2.elements || template2Def.elements;
  const btn3Elements = buttons.button3.elements || template3Def.elements;

  // Convert template background image to embedded Base64 Data URI
  const bgBase64 = await getAssetAsBase64('/assets/card_front_template.png');

  // Convert profile photo to embedded Base64 if local or blob
  let userPhotoUrl = profile.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
  if (userPhotoUrl.startsWith('data:') || userPhotoUrl.startsWith('blob:') || userPhotoUrl.startsWith('/')) {
    const photoB64 = await getAssetAsBase64(userPhotoUrl);
    if (photoB64) userPhotoUrl = photoB64;
  }

  const qrUrl = profile.github || profile.website || 'https://hhgoa.dev';
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}`;

  const btn1Html = renderElementsToHtml(btn1Elements, cardState, userPhotoUrl, qrImage);
  const btn2Html = renderElementsToHtml(btn2Elements, cardState, userPhotoUrl, qrImage);
  const btn3Html = renderElementsToHtml(btn3Elements, cardState, userPhotoUrl, qrImage);

  const initialHtml = buttons.activeButtonId === 'button1' ? btn1Html : buttons.activeButtonId === 'button2' ? btn2Html : btn3Html;
  const initialMode = buttons.activeButtonId === 'button1' ? template1Def.name : buttons.activeButtonId === 'button2' ? template2Def.name : template3Def.name;

  const userSvg = `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  const codeSvg = `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  const linkSvg = `<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HH Goa 2026 Interactive Badge — ${profile.name || 'Builder'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600;700;800&family=Press+Start+2P&family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0A1D13;
      color: #F3F0E6;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .header-title {
      font-family: 'Bebas Neue', cursive;
      font-size: 32px;
      color: #E5F552;
      letter-spacing: 1.5px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .header-sub {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      color: #888888;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    /* Outer Wrapper Positioning Top Lanyard Strap ABOVE Card Box */
    .badge-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 500px;
    }

    .lanyard-assembly {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: -12px;
      z-index: 30;
      pointer-events: none;
    }
    .lanyard-strap {
      width: 56px;
      height: 64px;
      background: linear-gradient(to bottom, #143d22, #1a4a2b);
      border-left: 2px solid rgba(229, 245, 82, 0.3);
      border-right: 2px solid rgba(229, 245, 82, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    .lanyard-strap span {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      color: #E5F552;
      transform: rotate(90deg);
      white-space: nowrap;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.85;
    }
    .lanyard-swivel {
      position: relative;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -8px;
    }
    .swivel-ring {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 4px solid #d6d3d1;
      background: #44403c;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .swivel-hole {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #1c1917;
    }
    .swivel-clip {
      position: absolute;
      top: 16px;
      width: 14px;
      height: 20px;
      background: linear-gradient(to bottom, #d6d3d1, #78716c);
      border-radius: 2px;
      border: 1px solid #57534e;
    }

    .badge-card {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1.5;
      border-radius: 2.5rem;
      overflow: hidden;
      border: 4px solid #163824;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
      background-color: #0d2818;
    }
    .badge-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }

    /* E-paper Screen Box with Dot-Matrix Texture */
    .epaper-screen {
      position: absolute;
      top: 31.0%;
      left: 5.5%;
      width: 89%;
      height: 50.5%;
      background-color: #D8DFC6;
      background-image: radial-gradient(rgba(18, 25, 19, 0.18) 1px, transparent 1px);
      background-size: 6px 6px;
      color: #121913;
      border-radius: 1.25rem;
      border: 4px solid #0d2216;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      z-index: 10;
      box-shadow: inset 0 2px 5px rgba(0,0,0,0.3);
    }
    .screen-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      border-bottom: 1px solid rgba(18, 25, 19, 0.25);
      padding-bottom: 4px;
      text-transform: uppercase;
    }
    .pulsing-led {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #121913;
      display: inline-block;
      margin-right: 4px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    .screen-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 4px 0;
      overflow-y: auto;
    }
    .screen-footer {
      border-top: 1px solid rgba(18, 25, 19, 0.2);
      padding-top: 4px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9px;
      display: flex;
      justify-content: space-between;
      opacity: 0.75;
      text-transform: uppercase;
    }
    .buttons-bar {
      position: absolute;
      top: 82.5%;
      left: 5.5%;
      width: 89%;
      height: 5.0%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      z-index: 10;
    }
    .action-btn {
      background: white;
      color: #0A1D13;
      border: 2px solid #0A1D13;
      border-radius: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      transition: all 0.15s ease;
      letter-spacing: 0.5px;
    }
    .btn-icon {
      width: 14px;
      height: 14px;
      stroke-width: 2.5;
    }
    .action-btn:hover { background: #E5F552; }
    .action-btn.active {
      background: #E5F552;
      color: #0A1D13;
      border-color: #0A1D13;
      transform: scale(1.02);
    }
    .profile-box { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(18,25,19,0.15); padding-bottom: 6px; }
    .avatar { width: 56px; height: 56px; border-radius: 12px; border: 2px solid #121913; object-fit: cover; }
    .name { font-family: 'Bebas Neue', cursive; font-size: 28px; line-height: 1; text-transform: uppercase; letter-spacing: 0.5px; color: #121913; }
    .handle { font-family: 'IBM Plex Mono', monospace; font-size: 10px; opacity: 0.7; }
    .role-badge { background: #121913; color: #D8DFC6; font-size: 9px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; text-transform: uppercase; }
    .title-box { background: rgba(18,25,19,0.05); border: 1px solid rgba(18,25,19,0.2); padding: 8px; border-radius: 10px; text-align: center; }
    .title-head { font-family: 'Bebas Neue', cursive; font-size: 26px; line-height: 1; text-transform: uppercase; color: #121913; }
    .stack-pills { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
    .pill { background: rgba(18,25,19,0.1); border: 1px solid rgba(18,25,19,0.3); font-size: 9px; font-family: 'IBM Plex Mono', monospace; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(18,25,19,0.25); background: rgba(18,25,19,0.05); border-radius: 10px; padding: 8px; text-align: center; }
    .stat-val { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13px; color: #121913; }
    .stat-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 7px; opacity: 0.7; font-weight: 700; text-transform: uppercase; }
    .qr-box { display: flex; align-items: center; justify-content: space-between; background: rgba(18,25,19,0.08); border: 1px solid rgba(18,25,19,0.25); padding: 8px; border-radius: 10px; }
    .qr-img { width: 56px; height: 56px; border: 1px solid #121913; border-radius: 6px; background: white; padding: 2px; }

    /* Roaming Pixel Cat Animation */
    .roam-cat {
      animation: roam 12s linear infinite alternate;
    }
    @keyframes roam {
      0% { transform: translateX(0); }
      100% { transform: translateX(380px); }
    }
  </style>
</head>
<body>
  <div style="text-align: center;">
    <h2 class="header-title">HACKER HOUSE GOA 2026 OFFICIAL BADGE</h2>
    <p class="header-sub">STANDALONE INTERACTIVE HTML BADGE</p>
  </div>

  <!-- Outer Lanyard & Card Wrapper -->
  <div class="badge-wrapper">
    <!-- Top Green Lanyard Strap & Swivel Ring Clip (POSITIONED OUTSIDE CARD) -->
    <div class="lanyard-assembly">
      <div class="lanyard-strap">
        <span>HACKER HOUSE GOA 2026 🌴</span>
      </div>
      <div class="lanyard-swivel">
        <div class="swivel-ring">
          <div class="swivel-hole"></div>
        </div>
        <div class="swivel-clip"></div>
      </div>
    </div>

    <!-- Official ID Card Frame -->
    <div class="badge-card" id="badge">
      <img src="${bgBase64}" class="badge-bg" alt="HH Goa Card Template">

      <!-- Spacious E-paper Screen Box -->
      <div class="epaper-screen">
        <div class="screen-header">
          <span id="screen-mode"><span class="pulsing-led"></span>&gt; ${initialMode}</span>
          <span>${metadata.badgeId}</span>
        </div>

        <div class="screen-body" id="screen-content">
          ${initialHtml}
        </div>

        <div class="screen-footer">
          <span>E-PAPER LCD 240x320</span>
          <span>HH26 VERIFIED</span>
        </div>
      </div>

      <!-- 3 Action Buttons -->
      <div class="buttons-bar">
        <button class="action-btn ${buttons.activeButtonId === 'button1' ? 'active' : ''}" id="btn1" onclick="switchView('button1')">${userSvg} ${buttons.button1.label}</button>
        <button class="action-btn ${buttons.activeButtonId === 'button2' ? 'active' : ''}" id="btn2" onclick="switchView('button2')">${codeSvg} ${buttons.button2.label}</button>
        <button class="action-btn ${buttons.activeButtonId === 'button3' ? 'active' : ''}" id="btn3" onclick="switchView('button3')">${linkSvg} ${buttons.button3.label}</button>
      </div>
    </div>
  </div>

  <script>
    const views = {
      button1: { html: \`${btn1Html.replace(/`/g, '\\`')}\`, mode: '${template1Def.name}' },
      button2: { html: \`${btn2Html.replace(/`/g, '\\`')}\`, mode: '${template2Def.name}' },
      button3: { html: \`${btn3Html.replace(/`/g, '\\`')}\`, mode: '${template3Def.name}' }
    };

    function switchView(bKey) {
      document.getElementById('screen-content').innerHTML = views[bKey].html;
      document.getElementById('screen-mode').innerHTML = '<span class="pulsing-led"></span>&gt; ' + views[bKey].mode;
      
      ['btn1', 'btn2', 'btn3'].forEach(id => {
        document.getElementById(id).classList.remove('active');
      });
      const activeId = bKey === 'button1' ? 'btn1' : bKey === 'button2' ? 'btn2' : 'btn3';
      document.getElementById(activeId).classList.add('active');
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(profile.name || 'Builder').replace(/\s+/g, '_')}_HHGoa2026_InteractiveBadge.html`;
  a.click();
  URL.revokeObjectURL(url);

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#E5F552', '#FF5E97', '#163824']
  });
}
