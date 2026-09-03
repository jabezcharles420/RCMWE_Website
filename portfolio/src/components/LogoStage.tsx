import { useEffect, useRef, useState } from 'react';
import { processLogo, type LogoArt } from '../lib/logoArt';

const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 70;
const TRAIL_NOISE_AMP = 44;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;

interface TrailPoint {
  x: number;
  y: number;
  r: number;
  alpha: number;
  seed: number;
}

interface TrailLayer {
  el: HTMLDivElement;
  invert: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export default function LogoStage({
  stageRef,
}: {
  stageRef: React.RefObject<HTMLElement | null>;
}) {
  const bgRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<LogoArt | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}logo.svg`;
    img.onload = () => setArt(processLogo(img));
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const bg = bgRef.current;
    const top = topRef.current;
    if (!art || !stage || !bg || !top) return;

    const stageEl: HTMLElement = stage;
    const bgEl: HTMLDivElement = bg;
    const topEl: HTMLDivElement = top;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let points: TrailPoint[] = [];
    let hovering = false;
    let headRadius = 0;
    let time = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let raf = 0;

    function resize(layer: TrailLayer) {
      const rect = layer.el.getBoundingClientRect();
      layer.canvas.width = Math.max(1, Math.round(rect.width * dpr));
      layer.canvas.height = Math.max(1, Math.round(rect.height * dpr));
      layer.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeLayer(el: HTMLDivElement, invert: boolean): TrailLayer {
      const canvas = document.createElement('canvas');
      canvas.style.display = 'none';
      document.body.appendChild(canvas);
      const layer: TrailLayer = {
        el,
        invert,
        canvas,
        ctx: canvas.getContext('2d')!,
      };
      resize(layer);
      return layer;
    }

    function drawMorphBlob(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      t: number,
      seed: number
    ) {
      if (r < 2) return;
      const pts: Array<[number, number]> = [];
      for (let i = 0; i <= TRAIL_BLOB_PTS; i++) {
        const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
        const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
        const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
        const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
        const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
        const rr = r + noise;
        pts.push([cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr]);
      }
      ctx.beginPath();
      ctx.moveTo((pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2);
      for (let i = 1; i < pts.length - 1; i++) {
        ctx.quadraticCurveTo(
          pts[i][0],
          pts[i][1],
          (pts[i][0] + pts[i + 1][0]) / 2,
          (pts[i][1] + pts[i + 1][1]) / 2
        );
      }
      ctx.quadraticCurveTo(
        pts[pts.length - 1][0],
        pts[pts.length - 1][1],
        (pts[pts.length - 1][0] + pts[0][0]) / 2,
        (pts[pts.length - 1][1] + pts[0][1]) / 2
      );
      ctx.closePath();
      ctx.fill();
    }

    function paint(layer: TrailLayer, rect: DOMRect) {
      const ctx = layer.ctx;
      if (layer.invert) {
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.globalCompositeOperation = 'destination-out';
      }
      for (const p of points) {
        ctx.globalAlpha = p.alpha;
        drawMorphBlob(ctx, p.x, p.y, p.r, time, p.seed);
      }
      ctx.globalAlpha = 1;
      const url = `url(${layer.canvas.toDataURL()})`;
      layer.el.style.webkitMaskImage = url;
      layer.el.style.maskImage = url;
      layer.el.style.webkitMaskSize = '100% 100%';
      layer.el.style.maskSize = '100% 100%';
      layer.el.style.webkitMaskRepeat = 'no-repeat';
      layer.el.style.maskRepeat = 'no-repeat';
    }

    const layerBg = makeLayer(bgEl, false);
    const layerTop = makeLayer(topEl, true);

    function onMove(e: MouseEvent) {
      const rect = bgEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hovering = true;
      if (headRadius > 5) {
        const dist = lastX === null ? Infinity : Math.hypot(x - lastX, y - (lastY ?? 0));
        if (dist > TRAIL_SAMPLE_DIST) {
          if (points.length >= TRAIL_MAX_POINTS) points.shift();
          points.push({ x, y, r: headRadius, alpha: 1, seed: Math.random() * 100 });
          lastX = x;
          lastY = y;
        }
      } else {
        lastX = x;
        lastY = y;
      }
    }

    function onLeave() {
      hovering = false;
    }

    function onResize() {
      resize(layerBg);
      resize(layerTop);
    }

    stageEl.addEventListener('mousemove', onMove);
    stageEl.addEventListener('mouseenter', onMove);
    stageEl.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    function frame() {
      const targetR = hovering ? TRAIL_HEAD_R : 0;
      headRadius += (targetR - headRadius) * (hovering ? 0.14 : 0.04);
      for (const p of points) {
        p.alpha *= TRAIL_FADE_SPEED;
        p.r *= 0.995;
      }
      points = points.filter((p) => p.alpha >= 0.01);
      const rect = bgEl.getBoundingClientRect();
      paint(layerBg, rect);
      paint(layerTop, rect);
      time += 0.016;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      stageEl.removeEventListener('mousemove', onMove);
      stageEl.removeEventListener('mouseenter', onMove);
      stageEl.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      layerBg.canvas.remove();
      layerTop.canvas.remove();
    };
  }, [art, stageRef]);

  return (
    <div className="flower orb-subject">
      <div ref={bgRef} className="flower__layer flower__layer--bg">
        {art && <img src={art.clean} alt="RCMWE logo" />}
      </div>
      <div ref={topRef} className="flower__layer flower__layer--top" aria-hidden="true">
        {art && <img className="flower__logo-pixel" src={art.pixel} alt="" />}
      </div>
    </div>
  );
}
