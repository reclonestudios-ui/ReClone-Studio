import React from 'react';

const ParallaxSection = ({ image, children }) => {
  return (
    <div
      className="relative py-24 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
