import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

const loreSections = [
  // {
  //   title: "The Shattered Realms",
  //   content: "Once a unified world of magic and balance, the realms were torn asunder by the Cataclysm, an event that fractured reality itself. Now, scattered fragments float in the void, each holding remnants of the old world and secrets of the new order.",
  //   media: "/realm-fracture.mp4",
  //   mediaRight: false
  // },
  // {
  //   title: "The Ancient Ones",
  //   content: "Before the fall, the Ancient Ones ruled with wisdom and power. Their artifacts and ruins still dot the landscape, containing untold power for those brave enough to seek them.",
  //   media: "/ancient-ruins.mp4",
  //   mediaRight: true
  // },
  // {
  //   title: "The Void Between",
  //   content: "The spaces between realms are not empty. Strange entities drift in the void, watching, waiting. Some say they seek to mend the broken world, while others believe they hunger for what remains of reality.",
  //   media: "/void-between.mp4",
  //   mediaRight: false
  // },
  // {
  //   title: "The Dance of Steel and Shadow: Dynamic Combat",
  //   content: "Engage in visceral, fast-paced combat where every move matters. Master a diverse arsenal of weapons, each with unique abilities, and weave devastating spells to dominate your foes across varied and unpredictable battlegrounds.",
  //   media: "/banner vid.mp4", // Replace with your combat video
  //   mediaRight: true
  // },
  {
    title: "Echoes of Eternity: Ancient Architecture",
    content: "Wander through the breathtaking ruins of a bygone era. Discover colossal structures and intricate designs that whisper tales of forgotten gods and powerful civilizations, each stone steeped in history and ripe for exploration.",
    media: "/temple.mp4", // Replace with your architecture video
    mediaRight: false
  },
  {
    title: "Worlds Beyond Imagination: Creative Environments",
    content: "Traverse truly unique and visually stunning landscapes. From shimmering crystal caverns and sky-piercing cities to swirling elemental plains, each environment offers a new set of challenges and awe-inspiring vistas.",
    media: "/environment.mp4", // Replace with your environment video
    mediaRight: true
  }
];

// Optimized video component with intersection observer
const VideoPlayer = React.memo(({ src, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          console.log('Auto-play prevented:', error);
        });
      }
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {inView && (
        <Suspense fallback={
          <div className="w-full h-full bg-gray-800 animate-pulse rounded-lg"></div>
        }>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-lg"
            preload="metadata"
            style={{
              opacity: isPlaying ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              willChange: 'opacity',
            }}
          >
            <source src={`${src}#t=0.1`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Suspense>
      )}
    </div>
  );
});

const LoreSection = React.memo(({ title, content, media, mediaRight }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`py-12 md:py-20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${mediaRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
              {title}
            </h2>
            <p className="text-gray-100 font-sans  md:text-lg leading-relaxed">
              {content}
            </p>
          </div>
          
          {/* Video */}
          <div className="w-full md:w-1/2 h-56 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <VideoPlayer 
              src={media}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const GameplayLore = () => {
  const [visibleSections, setVisibleSections] = useState(1);
  const containerRef = useRef();
  const observerRef = useRef();

  // Load sections progressively as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.dataset.index, 10);
            if (sectionIndex + 1 > visibleSections) {
              setVisibleSections(prev => Math.max(prev, sectionIndex + 1));
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1,
      }
    );

    const sections = containerRef.current?.querySelectorAll('.lore-section');
    sections?.forEach(section => observer.observe(section));

    return () => {
      sections?.forEach(section => observer.unobserve(section));
    };
  }, [visibleSections]);

  return (
    <section 
      id="lore" 
      className="relative overflow-hidden"
      ref={containerRef}
    >
      <div className="text-center py-12 md:py-16 bg-transparent">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 font-serif">
          The Lore of the Shattered Realms
        </h1>
        <p className="text-lg md:text-xl font-sans text-gray-300 max-w-3xl mx-auto px-4">
          Discover the rich history and mysteries of our world
        </p>
      </div>
      
      <div className="space-y-4 md:space-y-8">
        {loreSections.map((section, index) => (
          <div 
            key={index} 
            className={`lore-section transition-opacity duration-700 ${index < visibleSections ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
            data-index={index}
          >
            <LoreSection {...section} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameplayLore;