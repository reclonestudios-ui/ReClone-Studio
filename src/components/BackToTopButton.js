import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Get the Lenis instance from window
    const checkLenis = () => {
      const lenis = window.lenis;
      if (lenis) {
        lenisRef.current = lenis;
        
        // Update visibility based on scroll position
        const handleScroll = () => {
          const scrollY = lenis.scroll || window.pageYOffset;
          setIsVisible(scrollY > 300);
        };
        
        // Initial check
        handleScroll();
        
        // Listen to Lenis scroll events
        lenis.on('scroll', handleScroll);
        
        return () => {
          lenis.off('scroll', handleScroll);
        };
      } else {
        // Fallback to window scroll if Lenis isn't available
        const handleWindowScroll = () => {
          setIsVisible(window.pageYOffset > 300);
        };
        
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
      }
    };
    
    // Check for Lenis after a short delay to ensure it's initialized
    const timeoutId = setTimeout(checkLenis, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      // Use Lenis for smooth scrolling if available
      lenisRef.current.scrollTo('top', { immediate: false });
    } else {
      // Fallback to native smooth scrolling
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50 shadow-lg hover:bg-red-700 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Go to top"
        >
          &uarr;
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
