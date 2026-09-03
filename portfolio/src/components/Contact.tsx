import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import VideoBg from '../lib/VideoBg';

const EMAIL = 'hello@rcmwe.com';

const SOCIALS = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeRef.current) return;
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      <VideoBg flipped overlayClassName="bg-black/60" />

      <div className="relative z-10">
        <div className="overflow-hidden border-y border-white/10 py-6">
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl italic text-text-primary/70 md:text-7xl"
              >
                BUILDING THE FUTURE <span className="accent-gradient bg-clip-text text-transparent">•</span>{' '}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-6 pt-16 text-center md:pt-24">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Let&apos;s talk</p>
            <h2 className="font-display text-5xl italic leading-[1.05] text-text-primary md:text-7xl">
              Have a project in mind?
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="group relative mt-4 rounded-full"
              aria-label={`Email ${EMAIL}`}
            >
              <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-3 rounded-full bg-text-primary px-8 py-4 text-sm font-medium text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
                {EMAIL} <span className="text-[12px]">↗</span>
              </span>
            </a>
          </div>

          <footer className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for projects
            </p>
            <div className="flex items-center gap-6">
              <Link to="/resume" className="text-sm text-muted transition-colors hover:text-text-primary">
                Resume
              </Link>
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-muted transition-colors hover:text-text-primary"
                >
                  {s}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted">© {new Date().getFullYear()} RCMWE</p>
          </footer>
        </div>
      </div>
    </section>
  );
}
