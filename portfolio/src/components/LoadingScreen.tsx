import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['Design', 'Create', 'Inspire'];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 2700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg px-8 py-8 md:px-12 md:py-10"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-xs uppercase tracking-[0.3em] text-muted"
      >
        RCMWE
      </motion.p>

      <div className="flex h-24 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex justify-end">
          <span className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
            {String(count).padStart(3, '0')}
          </span>
        </div>
        <div className="h-[3px] w-full bg-stroke/50">
          <div
            className="accent-gradient h-full w-full"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(228, 79, 33, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
