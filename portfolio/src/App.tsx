import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}
