import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-2 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 4xl:px-40 5xl:px-48 font-sans`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-[1800px] 5xl:max-w-[2000px] mx-auto flex items-center justify-between">
        {/* Logo - Always on left */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <a href="#" className="flex items-center group">
            <img 
              src="/white.png" 
              alt="ReClone Studios Logo" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 3xl:h-24 4xl:h-28 5xl:h-32 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
