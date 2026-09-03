import { motion } from 'framer-motion';

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '95+', label: 'Projects Done' },
  { value: '200%', label: 'Satisfied Clients' },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 text-center sm:grid-cols-3 md:px-10 lg:px-16">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="accent-gradient bg-clip-text font-display text-6xl italic text-transparent md:text-7xl">
              {s.value}
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
