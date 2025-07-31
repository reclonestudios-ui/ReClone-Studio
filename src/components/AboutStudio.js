import React, { useState, useRef } from 'react';
import Section from './Section';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { FaDiscord, FaYoutube, FaGamepad, FaCode, FaPaintBrush } from 'react-icons/fa';

const AboutStudio = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    { 
      icon: <FaGamepad className="text-3xl  mb-4 text-blood-red" />, 
      title: "Immersive Games",
      description: "Crafting unforgettable gaming experiences"
    },
    { 
      icon: <FaCode className="text-3xl mb-4 text-blood-red" />, 
      title: "Cutting-Edge Tech",
      description: "Leveraging the latest technologies"
    },
    { 
      icon: <FaPaintBrush className="text-3xl mb-4 text-blood-red" />, 
      title: "Stunning Art",
      description: "Beautiful visuals that bring worlds to life"
    }
  ];

  return (
    <div ref={sectionRef} className="relative bg-gradient-to-b from-black/80 to-black">
      <Section className="py-20 overflow-hidden relative">
        <div className="texture-pattern"></div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 pointer-events-none"
          style={{ opacity }}
        />
        <motion.div 
          className="max-w-6xl mx-auto px-4 relative z-10"
          style={{ y }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Reclone Studios
          </motion.h2>
          
          <div className="flex justify-center space-x-4 mb-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('about')}
              className={`px-8 py-3 rounded-xl font-medium font-sans transition-all duration-300 ${
                activeTab === 'about' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700 backdrop-blur-sm'
              }`}
            >
              Our Story
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('mission')}
              className={`px-8 py-3 rounded-xl font-medium font-sans transition-all duration-300 ${
                activeTab === 'mission' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700 backdrop-blur-sm'
              }`}
            >
              Our Mission
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'about' ? (
                <p className="text-lg text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
                  Reclone Studios is a passionate team of developers and artists dedicated to creating immersive, high-quality gaming experiences. We believe in the power of storytelling and cutting-edge technology to transport players to new worlds.
                </p>
              ) : (
                <p className="text-lg text-gray-300 font-sans max-w-3xl mx-auto leading-relaxed">
                  Our mission is to push the boundaries of interactive entertainment, creating games that resonate with players on a deep emotional level while delivering unparalleled gameplay experiences.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 font-sans gap-8 mb-12"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-800/60 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-4">
                  {React.cloneElement(feature.icon, { className: "text-2xl text-blue-400" })}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          variants={fadeIn}
        >
          <motion.div 
            className="relative"
            whileHover="hover" 
            initial="initial"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* <motion.a 
              href="https://discord.gg/example" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center px-8 py-4 bg-gradient-to-r from-[#5865F2] to-[#4752c4] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#5865F2]/30"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDiscord className="mr-3 text-xl" />
              <span className="font-medium">Join Our Discord</span>
            </motion.a>
            {isHovered && (
              <motion.div 
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-gray-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-gray-800 transform -translate-x-1/2 rotate-45 border-r border-b border-gray-700/50"></div>
                Join our growing community!
              </motion.div>
            )} */}
          </motion.div>
          
          {/* <motion.a 
            href="https://youtube.com/example" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/30"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaYoutube className="mr-3 text-xl" />
            <span className="font-medium">Watch on YouTube</span>
          </motion.a> */}
        </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};

export default AboutStudio;
