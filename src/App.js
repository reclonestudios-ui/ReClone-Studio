import React, { useEffect } from 'react';
import Hero from './components/Hero';
import AboutGame from './components/AboutGame';
import Characters from './components/Characters';
import GameplayLore from './components/GameplayLore';
import Gallery from './components/Gallery';
import AboutStudio from './components/AboutStudio';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import AncientTexture from './components/AncientTexture';
import { useLenis } from './hooks/useLenis';

function App() {
  const lenis = useLenis();

  // Optional: Log scroll position for debugging
  useEffect(() => {
    if (lenis) {
      const onScroll = ({ scroll, limit, velocity, direction, progress }) => {
        // You can use these values for animations or other effects
        // console.log({ scroll, limit, velocity, direction, progress });
      };
      lenis.on('scroll', onScroll);
      return () => {
        lenis.off('scroll', onScroll);
      };
    }
  }, [lenis]);
  return (
    <div className="bg-black">
      <Hero />
      <div className="relative">
        <AncientTexture />
        <AboutGame />
        {/* <Characters /> */}
        <GameplayLore />
        <Gallery />
        <AboutStudio />
        {/* <Newsletter /> */}
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
}

export default App;
