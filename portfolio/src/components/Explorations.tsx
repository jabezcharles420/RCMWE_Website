import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { img: 'https://picsum.photos/seed/explore1/600/600', rot: '-rotate-3' },
  { img: 'https://picsum.photos/seed/explore2/600/600', rot: 'rotate-2' },
  { img: 'https://picsum.photos/seed/explore3/600/600', rot: '-rotate-2' },
  { img: 'https://picsum.photos/seed/explore4/600/600', rot: 'rotate-3' },
  { img: 'https://picsum.photos/seed/explore5/600/600', rot: '-rotate-3' },
  { img: 'https://picsum.photos/seed/explore6/600/600', rot: 'rotate-2' },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !contentRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.utils.toArray<HTMLElement>('.explore-item-a').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 120, rotate: 0 },
          {
            y: -120,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.explore-item-b').forEach((el) => {
        gsap.fromTo(
          el,
          { y: -120, rotate: 0 },
          {
            y: 120,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const colA = ITEMS.slice(0, 3);
  const colB = ITEMS.slice(3, 6);

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg">
      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 z-10 flex h-screen flex-col items-center justify-center text-center"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="font-display text-4xl italic text-text-primary md:text-6xl">
          Visual <em className="not-italic">playground</em>
        </h2>
        <p className="mt-4 max-w-sm px-6 text-sm text-muted md:text-base">
          Side experiments, studies and things that didn&apos;t make the cut — but earned their
          place here.
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group relative mt-8 rounded-full"
          aria-label="Follow on Dribbble"
        >
          <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary transition-colors group-hover:border-transparent">
            Dribbble <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-16">
        <div className="flex flex-col gap-12 pt-[10vh] md:gap-24">
          {colA.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i)}
              className={`explore-item-a pointer-events-auto group relative w-full max-w-[320px] ${item.rot}`}
              aria-label={`Open exploration ${i + 1}`}
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e44f21] to-[#8e2e1f] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
              <img
                src={item.img}
                alt={`Exploration ${i + 1}`}
                loading="lazy"
                className="relative aspect-square w-full cursor-zoom-in rounded-2xl border border-stroke object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-12 pt-[42vh] md:gap-24">
          {colB.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(i + 3)}
              className={`explore-item-b pointer-events-auto group relative w-full max-w-[320px] ${item.rot}`}
              aria-label={`Open exploration ${i + 4}`}
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e44f21] to-[#8e2e1f] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
              <img
                src={item.img}
                alt={`Exploration ${i + 4}`}
                loading="lazy"
                className="relative aspect-square w-full cursor-zoom-in rounded-2xl border border-stroke object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Exploration preview"
        >
          <motion.img
            src={ITEMS[lightbox].img}
            alt={`Exploration ${lightbox + 1}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-h-[85vh] max-w-full rounded-2xl border border-white/10 object-contain"
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface text-sm text-text-primary transition-colors hover:bg-stroke/50"
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
