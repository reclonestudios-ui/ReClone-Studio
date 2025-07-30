import React from 'react';

const AncientTexture = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/20  "
        style={{
          zIndex: 1
        }}
      />
      <div 
        className="w-full h-full opacity-40"
        style={{
          backgroundImage: "url('/HighresScreenshot00034.webp')",
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2
        }}
      />
    </div>
  );
};

export default AncientTexture;
