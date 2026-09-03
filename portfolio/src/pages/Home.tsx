import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import SelectedWorks from '../components/SelectedWorks';
import Journal from '../components/Journal';
import Explorations from '../components/Explorations';
import Stats from '../components/Stats';
import Contact from '../components/Contact';

interface LocationState {
  scrollTo?: string;
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.scrollTo) {
      document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <main>
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <Contact />
    </main>
  );
}
