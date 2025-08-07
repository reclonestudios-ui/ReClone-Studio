import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all"
          aria-label="Previous image"
        >
          &larr;
        </button>
        
        <AnimatePresence mode="wait">
          <motion.img
            key={image.id}
            src={image.src}
            alt={`Gallery image ${image.id}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all"
          aria-label="Next image"
        >
          &rarr;
        </button>
      </div>
      <button
        className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-all"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>
    </motion.div>
  );
};

export default Lightbox;
