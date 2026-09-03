import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../logo';

const EMAIL = 'hello@rcmwe.com';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Works', href: '#work' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

const ID_TO_LABEL: Record<string, string> = {
  home: 'Home',
  work: 'Works',
  journal: 'Journal',
  contact: 'Contact',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const ids = ['home', 'work', 'journal', 'contact'];
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      let current = 'Home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = ID_TO_LABEL[id];
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/', { state: { scrollTo: id } });
      }
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  const linkCls = (label: string) =>
    `rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
      active === label
        ? 'bg-stroke/50 text-text-primary'
        : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
    }`;

  const mobileLinkCls =
    'font-display text-3xl italic text-text-primary transition-opacity hover:opacity-70 md:text-4xl';

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-md shadow-black/10' : ''
          }`}
          aria-label="Primary"
        >
          <button
            type="button"
            aria-label="RCMWE — home"
            onClick={(e) => go(e, '#home')}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
          >
            <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:-scale-x-100" />
            <span className="relative flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full bg-bg">
              <Logo className="h-full w-full" />
            </span>
          </button>

          <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />

          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className={`hidden md:block ${linkCls(link.label)}`}
            >
              {link.label}
            </a>
          ))}

          <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />

          <a
            href={`mailto:${EMAIL}`}
            className="group relative ml-1 hidden rounded-full md:block"
            aria-label="Say hi via email"
          >
            <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
              Say hi <span className="text-[10px]">↗</span>
            </span>
          </a>

          <button
            type="button"
            className="group relative ml-1 flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu" aria-expanded={open}
          >
            <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex flex-col items-center justify-center gap-[5px]">
              <span className={`h-[2px] w-4 rounded bg-text-primary transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-[2px] w-4 rounded bg-text-primary transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-4 rounded bg-text-primary transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-[2px] md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="sheet"
            initial={{ x: '102%' }}
            animate={{ x: 0 }}
            exit={{ x: '102%' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[60] flex w-[min(78vw,380px)] flex-col justify-center gap-5 border-l border-white/10 bg-[rgba(8,8,8,0.86)] px-10 backdrop-blur-xl md:hidden"
            aria-label="Menu"
          >
            <span className="text-xs uppercase tracking-[0.24em] text-[#e44f21]">RCMWE</span>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={mobileLinkCls}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted"
            >
              Say hi <span className="text-[10px]">↗</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
