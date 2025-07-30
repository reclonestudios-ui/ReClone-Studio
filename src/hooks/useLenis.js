import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export function useLenis() {
  const lenis = useRef(null);

  useEffect(() => {
    // Only initialize Lenis once
    if (!lenis.current) {
      // Initialize Lenis
      lenis.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Make Lenis instance globally available
      window.lenis = lenis.current;

      function raf(time) {
        lenis.current.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);

      // Add data-lenis-prevent to elements that should prevent scrolling
      const handleWheel = (e) => {
        if (e.target.closest('[data-lenis-prevent]')) {
          lenis.current.stop();
        } else {
          lenis.current.start();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('wheel', handleWheel);
        if (lenis.current) {
          lenis.current.destroy();
          delete window.lenis;
        }
      };
    }
  }, []);

  return lenis.current;
}
