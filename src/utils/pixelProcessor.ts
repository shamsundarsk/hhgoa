// HIGH-FIDELITY RETRO 8-BIT PIXEL DITHERING PROCESSOR
// Uses Atkinson Error-Diffusion, Bayer Matrix Dithering & Customizable 4-Color Palettes!

export type DitherMode = 'ATKINSON_BW' | 'GAMEBOY_4COLOR' | 'ORDERED_BAYER' | 'NEON_CYBER';
export type PaletteThemeId = 'GAMEBOY_CLASSIC' | 'GOA_SUNSET' | 'CYBER_MATRIX' | 'VAPORWAVE' | 'MONO_CREAM';

export interface PaletteTheme {
  id: PaletteThemeId;
  name: string;
  colors: [number, number, number][]; // 4 RGB colors from lightest to darkest
  hexColors: string[];
}

export const PALETTE_THEMES: Record<PaletteThemeId, PaletteTheme> = {
  GAMEBOY_CLASSIC: {
    id: 'GAMEBOY_CLASSIC',
    name: 'Classic GameBoy Lime',
    colors: [
      [216, 223, 198], // Cream #D8DFC6
      [139, 149, 109], // Light Olive #8B956D
      [76, 88, 62],    // Dark Olive #4C583E
      [18, 25, 19]     // Deep Charcoal #121913
    ],
    hexColors: ['#D8DFC6', '#8B956D', '#4C583E', '#121913']
  },
  GOA_SUNSET: {
    id: 'GOA_SUNSET',
    name: 'Goa Neon Sunset',
    colors: [
      [255, 94, 151],  // Hot Pink #FF5E97
      [229, 245, 82],  // Neon Yellow #E5F552
      [22, 56, 36],    // Dark Palm #163824
      [10, 29, 19]     // Deep Obsidian #0A1D13
    ],
    hexColors: ['#FF5E97', '#E5F552', '#163824', '#0A1D13']
  },
  CYBER_MATRIX: {
    id: 'CYBER_MATRIX',
    name: 'Cyber Matrix Green',
    colors: [
      [163, 230, 53],  // Neon Green #A3E635
      [21, 128, 61],   // Emerald #15803D
      [5, 46, 22],     // Deep Forest #052E16
      [0, 0, 0]        // Pitch Black #000000
    ],
    hexColors: ['#A3E635', '#15803D', '#052E16', '#000000']
  },
  VAPORWAVE: {
    id: 'VAPORWAVE',
    name: 'Arcade Vaporwave',
    colors: [
      [56, 189, 248],  // Electric Cyan #38BDF8
      [244, 63, 94],   // Hot Magenta #F43F5E
      [49, 46, 129],   // Deep Indigo #312E81
      [15, 23, 42]     // Midnight Slate #0F172A
    ],
    hexColors: ['#38BDF8', '#F43F5E', '#312E81', '#0F172A']
  },
  MONO_CREAM: {
    id: 'MONO_CREAM',
    name: 'Mono Cream & Charcoal',
    colors: [
      [243, 240, 230], // Warm Cream #F3F0E6
      [168, 162, 158], // Stone Gray #A8A29E
      [68, 64, 60],    // Charcoal #44403C
      [28, 25, 23]     // Jet Black #1C1917
    ],
    hexColors: ['#F3F0E6', '#A8A29E', '#44403C', '#1C1917']
  }
};

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
      if (!ctx) {
        resolve(imageSrc);
        return;
      }

      // 1. Downscale to pixel grid
      const targetWidth = Math.max(48, Math.floor(img.width / pixelScale));
      const targetHeight = Math.max(48, Math.floor(img.height / pixelScale));

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imgData.data;
      const w = targetWidth;
      const h = targetHeight;

      const activePalette = (PALETTE_THEMES[paletteId] || PALETTE_THEMES.GAMEBOY_CLASSIC).colors;

      if (mode === 'GAMEBOY_4COLOR') {
        // Apply Selected 4-Color Palette Matrix
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Map luminance to 4 palette steps
            const palIdx = lum > 190 ? 0 : lum > 120 ? 1 : lum > 60 ? 2 : 3;
            const color = activePalette[palIdx];

            data[idx] = color[0];
            data[idx + 1] = color[1];
            data[idx + 2] = color[2];
          }
        }
      } else if (mode === 'ORDERED_BAYER') {
        // 4x4 Bayer Matrix Dithering with Active Palette
        const bayerMatrix = [
          [ 0,  8,  2, 10],
          [12,  4, 14,  6],
          [ 3, 11,  1,  9],
          [15,  7, 13,  5]
        ];

        const lightColor = activePalette[0];
        const darkColor = activePalette[3];

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            const threshold = (bayerMatrix[y % 4][x % 4] / 16) * 255;
            const color = lum > threshold ? lightColor : darkColor;

            data[idx] = color[0];
            data[idx + 1] = color[1];
            data[idx + 2] = color[2];
          }
        }
      } else {
        // ATKINSON ERROR DIFFUSION DITHERING with Selected Palette Light/Dark
        const lumBuffer = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];
          lumBuffer[i] = 0.299 * r + 0.587 * g + 0.114 * b;
        }

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const oldVal = lumBuffer[idx];
            const newVal = oldVal > 120 ? 255 : 0;
            lumBuffer[idx] = newVal;
            const err = (oldVal - newVal) / 8;

            const neighbors = [
              [x + 1, y],
              [x + 2, y],
              [x - 1, y + 1],
              [x, y + 1],
              [x + 1, y + 1],
              [x, y + 2]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                lumBuffer[ny * w + nx] += err;
              }
            }
          }
        }

        const lightColor = activePalette[0];
        const darkColor = activePalette[3];

        for (let i = 0; i < w * h; i++) {
          const color = lumBuffer[i] > 120 ? lightColor : darkColor;
          data[i * 4] = color[0];
          data[i * 4 + 1] = color[1];
          data[i * 4 + 2] = color[2];
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Upscale crisp
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = img.width || 400;
      exportCanvas.height = img.height || 400;
      const exportCtx = exportCanvas.getContext('2d');

      if (exportCtx) {
        exportCtx.imageSmoothingEnabled = false;
        exportCtx.drawImage(canvas, 0, 0, exportCanvas.width, exportCanvas.height);
        resolve(exportCanvas.toDataURL('image/png'));
      } else {
        resolve(canvas.toDataURL('image/png'));
      }
    };

    img.onerror = () => {
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
}
