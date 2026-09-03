import { motion } from 'framer-motion';
import { LILY_FRONT, LILY_REVEAL } from '../lib/VideoBg';

const PROJECTS = [
  {
    title: 'Automotive Motion',
    img: 'https://picsum.photos/seed/automotive/1200/800',
    span: 'md:col-span-7',
    ratio: 'aspect-[16/10]',
  },
  {
    title: 'Urban Architecture',
    img: 'https://picsum.photos/seed/urban/900/900',
    span: 'md:col-span-5',
    ratio: 'aspect-square',
  },
  {
    title: 'Human Perspective',
    img: LILY_FRONT,
    span: 'md:col-span-5',
    ratio: 'aspect-square',
  },
  {
    title: 'Brand Identity',
    img: LILY_REVEAL,
    span: 'md:col-span-7',
    ratio: 'aspect-[16/10]',
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Selected Work</span>
            </div>
            <h2 className="font-display text-4xl italic text-text-primary md:text-6xl">
              Featured <em className="not-italic">projects</em>
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted md:text-base">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          <a
            href="#work"
            className="group relative hidden rounded-full md:inline-flex"
            aria-label="View all work"
          >
            <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary transition-colors group-hover:border-transparent">
              View all work <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#work"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: (i % 2) * 0.1 }}
              className={`group relative block overflow-hidden rounded-3xl border border-stroke bg-surface ${p.span}`}
            >
              <div className={`relative ${p.ratio}`}>
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
                  <span className="relative rounded-full">
                    <span
                      className="accent-gradient animate-gradient-shift absolute inset-0 rounded-full"
                      style={{ backgroundSize: '200% 200%' }}
                    />
                    <span className="relative m-[2px] flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-bg">
                      View — <em className="font-display italic">{p.title}</em>
                    </span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
