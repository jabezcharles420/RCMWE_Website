import { motion } from 'framer-motion';
import VideoBg from '../lib/VideoBg';

const EXPERIENCE = [
  {
    role: 'Lead Product Designer',
    org: 'RCMWE Studio',
    period: '2021 — Present',
    desc: 'Systems thinking across branded product lines; owns the interaction language end to end.',
  },
  {
    role: 'Senior Creative Developer',
    org: 'Independent',
    period: '2018 — 2021',
    desc: 'Shipped motion-heavy marketing sites and interactive campaigns for early-stage startups.',
  },
  {
    role: 'Design Engineer',
    org: 'Studio North',
    period: '2015 — 2018',
    desc: 'Bridged design and engineering, building internal tooling for the design team.',
  },
];

const SKILLS = [
  'TypeScript',
  'React',
  'GSAP',
  'Framer Motion',
  'HLS / video',
  'Tailwind CSS',
  'Figma',
  'Brand systems',
  'Motion design',
];

export default function Resume() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg">
      <VideoBg overlayClassName="bg-black/70" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Resume</p>
          <h1 className="font-display text-5xl italic leading-[1] text-text-primary md:text-7xl">
            RCMWE
          </h1>
          <p className="mt-4 text-sm text-muted md:text-base">
            Creative developer in Chicago, working at the intersection of design and engineering.
          </p>

          <h2 className="mt-16 mb-6 font-display text-3xl italic text-text-primary">Experience</h2>
          <div className="flex flex-col gap-6">
            {EXPERIENCE.map((job) => (
              <div key={job.role} className="rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl italic text-text-primary">{job.role}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{job.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 mb-6 font-display text-3xl italic text-text-primary">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-muted transition-colors hover:text-text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
