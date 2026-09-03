import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LogoStage from './LogoStage';

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(['.pill', '.orbit-word__inner', '.flower', '.support-copy__inner'], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }
      const rise = window.innerHeight * 0.034;
      const cornerRise = window.innerHeight * 0.016;
      gsap.set('.orbit-word__inner', { yPercent: 118 });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo(
        '.orb-quiet',
        { opacity: 0 },
        { opacity: 1, duration: 0.62, ease: 'power2.out' },
        0.34
      )
        .fromTo(
          '.orbit-word__inner',
          { yPercent: 118 },
          { yPercent: 0, duration: 1.15 },
          0.3
        )
        .fromTo(
          '.flower',
          { opacity: 0, y: rise },
          { opacity: 1, y: 0, duration: 1.15 },
          0.66
        )
        .fromTo(
          '.support-copy__inner',
          { opacity: 0, y: cornerRise },
          { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out' },
          0.98
        );
    }, stageRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={stageRef} id="home" className="stage relative h-screen overflow-hidden">
      <div className="pill orb-quiet">Secure system</div>

      <h1 className="orbit-word" aria-label="We are RCMWE">
        <span className="orbit-word__mask">
          <span className="orbit-word__inner">
            <span className="orbit-word__lead">WE ARE</span>
            <br />
            <span className="orbit-word__white">
              <span className="orbit-word__o">R</span>CM
            </span>
            <span className="orbit-word__pink">WE</span>
          </span>
        </span>
      </h1>

      <LogoStage stageRef={stageRef} />

      <div className="support-copy support-copy--left">
        <span className="support-copy__inner">
          Every workflow,
          <br />
          intelligently connected.
        </span>
      </div>
      <div className="support-copy support-copy--right">
        <span className="support-copy__inner">
          Less manual work.
          <br />
          More meaningful output.
        </span>
      </div>

      <div className="orb-quiet absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="animate-scroll-down absolute inset-x-0 h-full bg-text-primary" />
        </div>
      </div>
    </section>
  );
}
