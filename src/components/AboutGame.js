import React, { useRef, useEffect, useState } from 'react';
import Section from './Section';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaGameConsoleHandheld, FaLaptop, FaPlaystation, FaXbox, FaHammer, FaCode, FaTools } from 'react-icons/fa';

// Split text into words for animation
const SplitText = ({ children, className }) => {
  const words = children.split(' ');
  
  return (
    <div className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="inline-flex overflow-hidden mr-2">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ 
              duration: 0.5, 
              delay: wordIndex * 0.05,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
          >
            {word}
            {wordIndex < words.length - 1 && ' '}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const AboutGame = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <Section ref={sectionRef} className="overflow-x-hidden ">
      <motion.div 
        style={{ 
          y, 
          opacity,
          scale,
          rotateX,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
          paddingLeft: '10rem'
        }}
        className="w-full will-change-transform"
      >
      <motion.h2 
        className="font-sans text-4xl md:text-5xl font-bold mb-8 text-white text-left overflow-hidden" 
        style={{ textShadow: '0 0 10px #B90000' }}
      >
        <SplitText>About the Game</SplitText>
      </motion.h2>
      <div className="max-w-4xl text-lg text-gray-300 space-y-6 text-left font-sans">
        <p className="overflow-hidden">
          <SplitText>
            Bloodline Vengeance is a dark fantasy action RPG that plunges you into a world of betrayal, ancient magic, and relentless combat. As the last of a noble bloodline, you must reclaim your honor and seek vengeance against the shadowy forces that destroyed your family.
          </SplitText>
        </p>
        <motion.div 
          className="grid md:grid-cols-3 gap-8 text-left pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(185, 0, 0, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex space-x-4 text-3xl text-blood-red mb-3">
              <FaLaptop className="hover:scale-110 transition-transform" title="PC" />
              <FaPlaystation className="hover:scale-110 transition-transform" title="PlayStation 5" />
              <FaXbox className="hover:scale-110 transition-transform" title="Xbox Series X" />
            </div>
            <p className="text-sm text-gray-300">Available Platforms</p>
          </motion.div>
          <motion.div 
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(185, 0, 0, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          >
            <FaGamepad className="text-4xl text-blood-red mb-3 hover:scale-110 transition-transform" title="Action RPG" />
            <p className="text-sm text-gray-300">Action RPG</p>
          </motion.div>
          <motion.div 
            className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(185, 0, 0, 0.3)' }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          >
            <div className="relative">
              <FaTools className="text-4xl text-blood-red mb-3 hover:scale-110 transition-transform" title="In Development" />
              <FaCode className="absolute -bottom-1 -right-2 text-xl text-blood-red" />
            </div>
            <p className="text-sm text-gray-300">In Development</p>
          </motion.div>
        </motion.div>
      </div>
      </motion.div>
    </Section>
  );
};

export default AboutGame;
