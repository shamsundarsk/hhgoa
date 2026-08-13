# 🌴 Hacker House Goa 2026 — Builder Identity Studio (Task 1)

> **Official Event Submission for [hhgoa.com](https://hhgoa.com)**  
> **Task 1 Challenge**: Builder Identity & Interactive Event Badge Studio  
> **Inspiration**: Inspired by the official **GitHub Event ID Card** & interactive event badge aesthetic.

---

## ⚡ Overview

The **HH GOA 2026 Builder Identity Studio** allows developers, hackers, and creators attending **Hacker House Goa 2026** to craft their official event identity in two distinct formats:

1. **Format A — 𝕏 Profile Picture (PFP) Frame / Overlay**: A 1:1 square ratio X avatar frame wrapping user photos in tropical HH Goa branding, `#FrameInGoa` hashtags, neon badges, and 8-bit retro dither filters.
2. **Format B — Official Builder ID Card**: A physical 4" x 6" ID badge featuring an interactive E-Paper display with customizable action buttons (`(A) PROFILE`, `(B) PROJECTS`, `(C) CONNECT`), 4-page PDF flip export, and standalone single-file HTML exports.

---

## 📽️ Video Walkthrough & Workflow Guide

*(Video tutorial showing the complete creation workflow will be added here)*

```markdown
<!-- WORKFLOW VIDEO PLACEHOLDER -->
[![Hacker House Goa 2026 Workflow Guide](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
```

---

## ✨ Key Features

- **🚀 Two Creation Formats**:
  - **Format A (𝕏 PFP Frame)**: 4 branding themes (`GOA NEON PALM`, `CYBER MONO ID`, `HOT PINK SHIPPER`, `RETRO 8-BIT CAT`) with 1-click High-DPI PNG export & 𝕏 sharing.
  - **Format B (Official Builder ID Card)**: Physical ID badge with tropical Goa line-art, green lanyard, metallic swivel clip, and e-paper dot-matrix display.
- **👾 8-Bit Retro Pixel Photo Dithering**:
  - **Atkinson Error-Diffusion Dithering**: Preserves 100% of facial features, eyes, hair texture, and skin highlights without blown-out black blobs.
  - **Custom 4-Color Palettes**: 5 retro themes (`GOA NEON SUNSET`, `CLASSIC GAMEBOY LIME`, `CYBER MATRIX GREEN`, `ARCADE VAPORWAVE`, `MONO CREAM & CHARCOAL`).
- **🎛️ Independent Button UI Streams**:
  - Physical buttons (`(A) PROFILE`, `(B) PROJECTS`, `(C) CONNECT`) maintain isolated `DisplayElement[]` streams. Assigning a design to Profile never overwrites Projects or Connect.
- **📄 4-Page Live-Flip PDF Exporter**:
  - Programmatically flips the visible badge container live to capture Page 1 (Profile), Page 2 (Projects), Page 3 (Connect), and Page 4 (Official Card Back View).
- **🌐 Standalone Interactive HTML Exporter**:
  - Exports a self-contained, single-file HTML badge with working JavaScript button switching, 100% pixel-perfect matching the live preview.

---

## 💻 Code Snippets & Architecture

### 1. Atkinson Error-Diffusion & Palette Dithering Processor

```typescript
// src/utils/pixelProcessor.ts
export function convertToPixelBW(
  imageSrc: string,
  pixelScale: number = 3,
  mode: DitherMode = 'ATKINSON_BW',
  paletteId: PaletteThemeId = 'GAMEBOY_CLASSIC'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageSrc);

      const targetWidth = Math.max(48, Math.floor(img.width / pixelScale));
      const targetHeight = Math.max(48, Math.floor(img.height / pixelScale));

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imgData.data;
      const w = targetWidth;
      const h = targetHeight;

      if (mode === 'ATKINSON_BW') {
        // Atkinson Error Diffusion: Distributes 1/8 quantization error to 6 neighboring pixels
        const lumBuffer = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) {
          lumBuffer[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
        }

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const oldVal = lumBuffer[idx];
            const newVal = oldVal > 120 ? 255 : 0;
            lumBuffer[idx] = newVal;
            const err = (oldVal - newVal) / 8;

            const neighbors = [
              [x + 1, y], [x + 2, y],
              [x - 1, y + 1], [x, y + 1], [x + 1, y + 1],
              [x, y + 2]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                lumBuffer[ny * w + nx] += err;
              }
            }
          }
        }
      }

      // Upscale with imageSmoothingEnabled = false for ultra-crisp 8-bit retro edges
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = img.width || 400;
      exportCanvas.height = img.height || 400;
      const exportCtx = exportCanvas.getContext('2d');
      if (exportCtx) {
        exportCtx.imageSmoothingEnabled = false;
        exportCtx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
        resolve(exportCanvas.toDataURL('image/png'));
      }
    };
    img.src = imageSrc;
  });
}
```

---

### 2. 4-Page Live-Flip PDF Exporter

```typescript
// src/utils/exportBadge.ts
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
  if (!container) return;

  const buttonKeys: Array<'button1' | 'button2' | 'button3'> = ['button1', 'button2', 'button3'];

  // Pages 1-3: Capture front screens (Profile, Projects, Connect)
  for (let i = 0; i < buttonKeys.length; i++) {
    if (i > 0) doc.addPage([101.6, 152.4], 'portrait');
    if (onButtonClick) {
      onButtonClick(buttonKeys[i]);
      await new Promise((r) => setTimeout(r, 600));
    }
    const imgData = await toPng(container, { quality: 0.95, pixelRatio: 2.5 });
    doc.addImage(imgData, 'PNG', 0, 0, 101.6, 152.4);
  }

  // Page 4: Capture Official Card Back View (Flip Card Live)
  doc.addPage([101.6, 152.4], 'portrait');
  if (onToggleFlip) {
    onToggleFlip(true);
    await new Promise((r) => setTimeout(r, 600));
  }

  const backImgData = await toPng(container, { quality: 0.95, pixelRatio: 2.5 });
  doc.addImage(backImgData, 'PNG', 0, 0, 101.6, 152.4);

  // Reset view back to front profile
  if (onToggleFlip) onToggleFlip(false);
  if (onButtonClick) onButtonClick('button1');

  doc.save(`${cardState.profile.name}_HHGoa2026_CompleteBadge.pdf`);
}
```

---

### 3. Independent Button State Interface

```typescript
// src/types/builder.ts
export interface ButtonConfig {
  id: 'button1' | 'button2' | 'button3';
  label: string;
  icon: 'user' | 'code' | 'link' | 'terminal' | 'sparkles' | 'flame' | 'qr';
  assignedTemplate: TemplatePresetId;
  elements?: DisplayElement[]; // Independent display element stream for each physical button!
}
```

---

## 🛠️ Local Setup & Running

```bash
# 1. Clone repository
git clone https://github.com/shamsundarsk/hhgoa.git
cd hhgoa

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 🌴 About Hacker House Goa 2026

**Hacker House Goa** is a premier builder gathering bringing together top AI developers, Web3 engineers, and open-source shippers to build in Goa, India.

Visit **[hhgoa.com](https://hhgoa.com)** for official event schedules and builder updates.

---

*Built with ❤️ for Hacker House Goa 2026.*
