import React from 'react';

const Particles = ({ count = 50 }) => {
  const particles = [];

  for (let i = 0; i < count; i++) {
    const style = {
      '--x-start': `${Math.random() * 100}vw`,
      '--x-end': `${Math.random() * 100}vw`,
      animationDelay: `-${Math.random() * 25}s`,
      animationDuration: `${15 + Math.random() * 15}s`,
    };
    particles.push(<div className="particle" key={i} style={style}></div>);
  }

  return <div className="particle-container">{particles}</div>;
};

export default Particles;
