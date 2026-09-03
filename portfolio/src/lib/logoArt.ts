/**
 * Runtime logo processing — the source SVG is never edited.
 *
 * The SVG is a square-format scene (tree / figure / birds / orange sun)
 * on a solid #8e2e1f background square. We:
 *  1. key out the flat red background (it exists only as the square),
 *  2. composite the art over a soft sunset glow disc  → `clean`
 *  3. downscale to a coarse grid + remap to a multicolor ramp → `pixel`
 */

const RAMP: Array<[number, [number, number, number]]> = [
  [0, [20, 5, 31]], // deep violet — tree / birds
  [40, [61, 17, 96]], // purple
  [80, [109, 31, 138]], // violet-magenta
  [120, [161, 59, 127]], // magenta
  [160, [224, 95, 168]], // pink
  [200, [253, 134, 219]], // hot pink
  [230, [255, 201, 214]], // blush
  [255, [255, 243, 214]], // cream-gold — sun core
];

const PINK: [number, number, number] = [253, 134, 219];
const KEY: [number, number, number] = [142, 46, 31]; // #8e2e1f
const KEY_TOL = 28;
const HALO: [number, number, number] = [90, 27, 107];

function clamp255(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function hueRotate(rgb: [number, number, number], deg: number): [number, number, number] {
  const rad = (deg * Math.PI) / 180;
  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const [r, g, b] = rgb;
  const a00 = 0.213 + 0.787 * c - 0.213 * s;
  const a01 = 0.715 - 0.715 * c - 0.715 * s;
  const a02 = 0.072 - 0.072 * c + 0.928 * s;
  const a10 = 0.213 - 0.213 * c + 0.143 * s;
  const a11 = 0.715 + 0.285 * c + 0.14 * s;
  const a12 = 0.072 - 0.072 * c - 0.283 * s;
  const a20 = 0.213 - 0.213 * c - 0.787 * s;
  const a21 = 0.715 - 0.715 * c + 0.715 * s;
  const a22 = 0.072 + 0.928 * c;
  return [
    clamp255(Math.round(r * a00 + g * a01 + b * a02)),
    clamp255(Math.round(r * a10 + g * a11 + b * a12)),
    clamp255(Math.round(r * a20 + g * a21 + b * a22)),
  ];
}

function sampleRamp(v: number): [number, number, number] {
  for (let i = 1; i < RAMP.length; i++) {
    if (v <= RAMP[i][0]) {
      const [v0, c0] = RAMP[i - 1];
      const [v1, c1] = RAMP[i];
      const t = (v - v0) / (v1 - v0);
      return [
        Math.round(c0[0] + (c1[0] - c0[0]) * t),
        Math.round(c0[1] + (c1[1] - c0[1]) * t),
        Math.round(c0[2] + (c1[2] - c0[2]) * t),
      ];
    }
  }
  return RAMP[RAMP.length - 1][1];
}

export interface LogoArt {
  clean: string;
  pixel: string;
}

export function processLogo(img: HTMLImageElement, grid = 128): LogoArt {
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  /* 1 — key out the background square */
  const src = document.createElement('canvas');
  src.width = w;
  src.height = h;
  const sx = src.getContext('2d')!;
  sx.drawImage(img, 0, 0);
  const sd = sx.getImageData(0, 0, w, h);
  const sp = sd.data;
  for (let i = 0; i < sp.length; i += 4) {
    if (
      Math.abs(sp[i] - KEY[0]) <= KEY_TOL &&
      Math.abs(sp[i + 1] - KEY[1]) <= KEY_TOL &&
      Math.abs(sp[i + 2] - KEY[2]) <= KEY_TOL
    ) {
      sp[i + 3] = 0;
    }
  }
  sx.putImageData(sd, 0, 0);

  /* 2 — clean: sunset glow disc + keyed art (no square) */
  const clean = document.createElement('canvas');
  clean.width = w;
  clean.height = h;
  const cx = clean.getContext('2d')!;
  const disc = cx.createRadialGradient(w / 2, h * 0.44, 0, w / 2, h * 0.44, w * 0.52);
  disc.addColorStop(0, 'rgba(228, 79, 33, 0.95)');
  disc.addColorStop(0.55, 'rgba(228, 79, 33, 0.3)');
  disc.addColorStop(0.82, 'rgba(228, 79, 33, 0)');
  cx.fillStyle = disc;
  cx.fillRect(0, 0, w, h);
  cx.drawImage(src, 0, 0);

  /* 3 — pixel: fine grid, multicolor ramp, halftone dots, violet halo
        dots are drawn on a 3x canvas so small dot radii actually rasterize */
  const SCALE = 3;
  const size = grid * SCALE;
  const pixel = document.createElement('canvas');
  pixel.width = size;
  pixel.height = size;
  const px = pixel.getContext('2d')!;
  px.drawImage(src, 0, 0, size, size);
  const pd = px.getImageData(0, 0, size, size);
  const pp = pd.data;
  const half = grid / 2;
  const dotR = 1.4;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const cx = x * SCALE + 1;
      const cy = y * SCALE + 1;
      const i = (cy * size + cx) * 4;
      let cr: number;
      let cg: number;
      let cb: number;
      let ca: number;
      if (pp[i + 3] > 24) {
        const v = Math.max(pp[i], pp[i + 1], pp[i + 2]);
        let col = sampleRamp(v);
        if (v > 100) {
          /* sun runs gold (top) → pink (bottom) */
          const t = y / grid;
          const GOLD: [number, number, number] = [255, 218, 140];
          col[0] = Math.round(col[0] + (GOLD[0] - col[0]) * (1 - t) * 0.65);
          col[1] = Math.round(col[1] + (GOLD[1] - col[1]) * (1 - t) * 0.65);
          col[2] = Math.round(col[2] + (GOLD[2] - col[2]) * (1 - t) * 0.65);
          col[0] = Math.round(col[0] + (PINK[0] - col[0]) * t * 0.55);
          col[1] = Math.round(col[1] + (PINK[1] - col[1]) * t * 0.55);
          col[2] = Math.round(col[2] + (PINK[2] - col[2]) * t * 0.55);
        }
        /* deterministic per-cell hue jitter for texture variety */
        const shift = (((x * 73856093) ^ (y * 19349663)) % 21) - 10;
        col = hueRotate(col, shift);
        cr = col[0];
        cg = col[1];
        cb = col[2];
        ca = pp[i + 3];
      } else {
        const d = Math.hypot(x - half + 0.5, y - half * 0.88 + 0.5) / half;
        const glow = Math.max(0, 1 - d * 1.05);
        cr = HALO[0];
        cg = HALO[1];
        cb = HALO[2];
        ca = Math.round(glow * glow * 140);
      }
      px.fillStyle = `rgba(${cr},${cg},${cb},${(ca / 255).toFixed(3)})`;
      px.beginPath();
      px.arc(x * SCALE + 1.5, y * SCALE + 1.5, dotR, 0, Math.PI * 2);
      px.fill();
    }
  }

  return { clean: clean.toDataURL('image/png'), pixel: pixel.toDataURL('image/png') };
}
