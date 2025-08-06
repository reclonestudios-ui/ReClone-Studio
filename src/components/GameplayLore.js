import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const loreSections = [
  {
    title: "Echoes of Eternity: Ancient Architecture",
    content: "Wander through the breathtaking ruins of a bygone era. Discover colossal structures and intricate designs that whisper tales of forgotten gods and powerful civilizations, each stone steeped in history and ripe for exploration.",
    media: "/temple480.webm",

    mediaAlt: "Ancient ruins with intricate carvings and towering stone structures",
    mediaRight: false
  },
  {
    title: "Worlds Beyond Imagination: Creative Environments",
    content: "Traverse truly unique and visually stunning landscapes. From shimmering crystal caverns and sky-piercing cities to swirling elemental plains, each environment offers a new set of challenges and awe-inspiring vistas.",
    media: "/environment480.webm",

    mediaAlt: "Stunning fantasy landscape with floating islands and magical elements",
    mediaRight: true
  }
];

// Simple video component with autoplay when in view
const Video = React.memo(({ src, className, alt }) => {
  const videoRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: '200px 0px',
  });

  // Handle play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div ref={ref} className={`w-full h-full overflow-hidden rounded-lg ${className}`}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        aria-label={alt}
      >
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

const LoreSection = React.memo(({ title, content, media, mediaAlt, mediaRight }) => {
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
          <div className="w-full md:w-1/2 h-56 md:h-80 lg:h-96">
            <Video 
              src={media}
              alt={mediaAlt || title}
              className="shadow-lg"
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
