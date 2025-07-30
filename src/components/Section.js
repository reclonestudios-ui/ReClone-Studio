import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = forwardRef(({ children, className }, ref) => {
  const [innerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={node => {
        // Forward the ref to the parent component
        if (ref) ref.current = node;
        // Also set the inner ref for the intersection observer
        if (typeof innerRef === 'function') {
          innerRef(node);
        } else {
          innerRef.current = node;
        }
      }}
      className={`py-20 px-4 ${className}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
});

Section.displayName = 'Section';

export default Section;
