import { motion } from 'framer-motion';
import { LILY_FRONT } from '../lib/VideoBg';

const ENTRIES = [
  {
    title: 'Designing for calm interfaces',
    img: 'https://picsum.photos/seed/calm/240/240',
    read: '4 min read',
    date: 'Aug 12, 2026',
  },
  {
    title: 'The case for slower software',
    img: 'https://picsum.photos/seed/slower/240/240',
    read: '6 min read',
    date: 'Jul 28, 2026',
  },
  {
    title: 'Pixel art as interface language',
    img: LILY_FRONT,
    read: '5 min read',
    date: 'Jul 09, 2026',
  },
  {
    title: 'Systems that feel human',
    img: 'https://picsum.photos/seed/feel/240/240',
    read: '3 min read',
    date: 'Jun 21, 2026',
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
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
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Journal</span>
            </div>
            <h2 className="font-display text-4xl italic text-text-primary md:text-6xl">
              Recent <em className="not-italic">thoughts</em>
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted md:text-base">
              Notes on design, engineering and the space between.
            </p>
          </div>

          <a
            href="#journal"
            className="group relative hidden rounded-full md:inline-flex"
            aria-label="View all journal entries"
          >
            <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary transition-colors group-hover:border-transparent">
              View all <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ENTRIES.map((e, i) => (
            <motion.a
              key={e.title}
              href="#journal"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
              className="flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full"
            >
              <img
                src={e.img}
                alt=""
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-lg italic text-text-primary md:text-xl">
                  {e.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {e.read} · {e.date}
                </p>
              </div>
              <span className="mr-2 hidden text-muted transition-transform duration-300 group-hover:translate-x-1 md:block">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
