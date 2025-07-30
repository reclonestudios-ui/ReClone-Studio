import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CharacterCard = ({ character }) => {
  const { name, bio, image } = character;

  const cardVariants = {
    rest: {
      scale: 1,
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 20px #B90000',
    },
  };

  return (
    <motion.div
      className="relative bg-gray-900 bg-opacity-75 rounded-lg overflow-hidden border border-gray-700 cursor-pointer"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <LazyLoadImage
        alt={name}
        src={image}
        effect="blur"
        className="w-full h-80 object-cover"
      />
      <div className="p-6">
        <h3 className="font-cinzel text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400">{bio}</p>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
