import React from 'react';
import { motion } from 'framer-motion';

const Lightbox = ({ src, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.img
        src={src}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      />
      <button
        className="absolute top-4 right-4 text-white text-4xl font-bold" 
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  );
};

export default Lightbox;
