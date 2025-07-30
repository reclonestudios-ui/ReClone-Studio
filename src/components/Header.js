import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Navigation links
  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'GAMES', href: '#games' },
    { name: 'ABOUT', href: '#about' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' },
  ];

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 40,
        staggerChildren: 0.1,
        staggerDirection: -1
      } 
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-black/90 py-3 shadow-lg' : 'bg-black/10'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="z-50">
          <a href="#" className="text-2xl font-bold text-white font-axiforma tracking-wider flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 mr-2">
              RECLONE
            </span>
            <span className="text-white">STUDIOS</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-axiforma">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-white hover:text-red-500 transition-all duration-300 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 relative w-10 h-10 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-full h-full">
            <span 
              className={`absolute left-1/2 top-1/2 block w-6 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span 
              className={`absolute left-1/2 top-1/2 block w-6 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`absolute left-1/2 top-1/2 block w-6 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden pt-24"
            >
              <div className="w-full max-w-xs mx-auto px-4">
                <nav className="flex flex-col space-y-8 text-center">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="text-2xl font-medium text-white hover:text-red-500 transition-colors duration-300 relative py-2"
                      variants={itemVariants}
                      onClick={toggleMenu}
                    >
                      {link.name}
                      <motion.span 
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-500 -translate-x-1/2"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      />
                    </motion.a>
                  ))}
                </nav>
                
                <motion.div 
                  className="mt-12 text-gray-400 text-sm"
                  variants={itemVariants}
                >
                  © {new Date().getFullYear()} ReClone Studios. All rights reserved.
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
