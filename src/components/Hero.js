import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './Header';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen w-full flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex items-center justify-center w-full 2xl:py-8 3xl:py-12 4xl:py-16 5xl:py-20">
        {/* Background Video */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-10 w-full h-full bg-black/50"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/banner vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 z-20 bg-black ancient-texture-override"></div>
        
        {/* Content */}
        <motion.div 
          style={{ y: yText, opacity }}
          className="relative z-30 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center"
        >
          <div className="flex flex-col items-center justify-center w-full">
            <motion.div 
              className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 3xl:px-28 4xl:px-32 5xl:px-36"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <img 
                src="/herowhite.png" 
                alt="Bloodline Vengeance" 
                className="w-full max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl 5xl:max-w-6xl mx-auto"
              />
            </motion.div>
            
            <div className="mt-6 sm:mt-8 2xl:mt-10 3xl:mt-12 4xl:mt-14 5xl:mt-16 w-full max-w-md 2xl:max-w-lg 3xl:max-w-xl 4xl:max-w-2xl 5xl:max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                <button className="bg-blue-500 text-white font-medium font-sans text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl py-1.5 sm:py-2 2xl:py-2.5 3xl:py-3 4xl:py-4 5xl:py-5 px-4 sm:px-6 2xl:px-8 3xl:px-10 4xl:px-12 5xl:px-14 rounded hover:bg-blue-700 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 2xl:gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                Gameplay (Coming Soon)
                </button>
                {/* <button className="bg-transparent border border-blood-red text-white font-medium text-sm py-2 px-6 rounded hover:bg-blood-red transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11c0 1.306-.836 2.417-2 2.828V17a2 2 0 01-2 2h-6a2 2 0 01-2-2v-3.172c-1.164-.41-2-1.522-2-2.828 0-1.657 1.343-3 3-3h8c1.657 0 3 1.343 3 3z" />
                  </svg>
                  Join the Battle
                </button> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
