import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from './Section';
import Lightbox from './Lightbox';

// Only import GSAP plugins if in browser
typeof window !== 'undefined' && gsap.registerPlugin(ScrollTrigger);

// Array of images from the public folder with different aspect ratios for the bento grid
const galleryImages = [
  { id: 1, src: '/HighresScreenshot00000.webp', rowSpan: 'md:row-span-2', colSpan: 'md:col-span-2' },
  { id: 2, src: '/HighresScreenshot00034.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 3, src: '/HighresScreenshot00033.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 4, src: '/HighresScreenshot00031.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 5, src: '/HighresScreenshot00028.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 6, src: '/HighresScreenshot00017.webp', rowSpan: 'md:row-span-2', colSpan: 'md:col-span-2' },
  { id: 7, src: '/HighresScreenshot00022.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 8, src: '/HighresScreenshot00040.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 9, src: '/HighresScreenshot00030.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-2' },
  { id: 13, src: '/HighresScreenshot00049.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 14, src: '/HighresScreenshot00044.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-1' },
  { id: 15, src: '/HighresScreenshot00053.webp', rowSpan: 'md:row-span-1', colSpan: 'md:col-span-2' },
];

// Preload images in the background
const preloadImages = (images) => {
  if (typeof window === 'undefined') return;
  
  images.forEach(({ src }) => {
    const img = new Image();
    img.src = src;
  });
};

// Professional gallery styles with dark theme and improved text visibility
const galleryStyles = {
  container: {
    minHeight: '100vh',
    padding: '6rem 2rem',
    backgroundColor: '#0a0a0a',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
      zIndex: 1,
      opacity: 1,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '1.5rem',
    width: '100%',
    maxWidth: 'min(95%, 1800px)',
    margin: '0 auto',
    padding: '2.5em',
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '16/6',
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    opacity: 0,
    scale: 0.98,
    willChange: 'opacity, transform',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.01)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
      zIndex: 2,
      '& $image': {
        transform: 'scale(1.05)',
      },
      '&::after': {
        opacity: 0.6,
      }
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8) 100%)',
      opacity: 0.4,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform',
    filter: 'brightness(0.95) contrast(1.05)',
  },
};

// Optimized Image Component with Intersection Observer
const LazyImage = React.memo(({ src, alt, style, onLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if ('IntersectionObserver' in window) {
      const handleIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
              setIsLoaded(true);
              onLoad?.();
            };
            observerRef.current?.disconnect();
          }
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersect, {
        rootMargin: '200px',
        threshold: 0.01
      });

      observerRef.current.observe(img);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
    }
  }, [src, onLoad]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
});

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const galleryRef = useRef(null);
  const animationRefs = useRef([]);

  // Preload first few images immediately
  useEffect(() => {
    preloadImages(galleryImages.slice(0, 4));
  }, []);

  // Optimized animation setup with useCallback
  const setupAnimations = useCallback(() => {
    if (!galleryRef.current) return;

    // Clear any existing animations
    animationRefs.current.forEach(anim => anim?.kill?.());
    animationRefs.current = [];
    
    // Use GSAP's batch for better performance
    const items = gsap.utils.toArray('.gallery-item');
    
    items.forEach((item, i) => {
      // Set initial styles
      gsap.set(item, {
        opacity: 0,
        y: 20,
        scale: 0.98,
      });

      // Create animation
      const animation = gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        paused: true,
      });

      // Create scroll trigger with proper scoping
      const triggerConfig = {
        trigger: item,
        start: 'top 85%',
        onEnter: (self) => {
          animation.play();
          self.kill();
        },
        once: true,
      };
      
      const trigger = ScrollTrigger.create(triggerConfig);
      animationRefs.current.push(trigger);
    });

    return () => {
      animationRefs.current.forEach(trigger => trigger?.kill?.());
    };
  }, []);

  // Initialize animations after component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      setupAnimations();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      animationRefs.current.forEach(trigger => trigger?.kill?.());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setupAnimations]);

  return (
    <Section id="gallery" style={galleryStyles.container}>
      <div className="text-center mb-20 max-w-4xl mx-auto relative z-10">
        <span className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-4 inline-block">Portfolio</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Our Creative Work</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-gray-300 leading-relaxed">Discover our curated selection of projects that showcase our expertise and commitment to excellence in every detail.</p>
      </div>
      <div 
        ref={galleryRef}
        style={galleryStyles.grid}
      >
        {galleryImages.map((image) => {
          // Calculate grid column span based on colSpan class
          const isWide = image.colSpan.includes('col-span-2');
          const isTall = image.rowSpan.includes('row-span-2');
          
          // Define grid areas based on image aspect ratio
          const gridColumn = isWide ? 'span 6' : 'span 4';
          const gridRow = isTall ? 'span 2' : 'span 1';
          
          return (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="gallery-item"
              style={{
                gridColumn,
                gridRow,
                minHeight: isTall ? '500px' : '250px',
                ...galleryStyles.imageWrapper,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 transition-opacity duration-300">
                <div className="w-12 h-12 border-4 border-white border-opacity-30 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <LazyImage
                src={image.src}
                alt={`Gallery image ${image.id}`}
                style={{
                  ...galleryStyles.image,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0.75rem',
                }}
                onLoad={() => {
                  // Fade in the image when loaded
                  const img = document.querySelector(`[data-src="${image.src}"]`);
                  if (img) {
                    img.style.opacity = 1;
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
            const nextIndex = (currentIndex + 1) % galleryImages.length;
            setSelectedImage(galleryImages[nextIndex]);
          }}
          onPrev={() => {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
            const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            setSelectedImage(galleryImages[prevIndex]);
          }}
        />
      )}
    </Section>
  );
};

export default Gallery;
