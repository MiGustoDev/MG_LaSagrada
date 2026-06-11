import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsHeroVisible(visible);
      },
      {
        threshold: 0.55,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !isHeroVisible;

    if (isHeroVisible) {
      video.play().catch(() => {
        video.muted = true;
      });
    }
  }, [isHeroVisible]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden hero-gradient flex items-center justify-center group">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60 md:max-lg:opacity-100 md:max-lg:mix-blend-normal md:max-lg:filter-none max-md:object-cover max-md:object-center max-md:scale-[1.18] max-md:opacity-100"
          preload="metadata"
          autoPlay
          loop
          muted={!isHeroVisible}
          playsInline
          src={`${import.meta.env.BASE_URL}Main-video.mov`}
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center justify-center gap-6 md:gap-8 max-w-lg px-4 max-md:absolute max-md:left-1/2 max-md:bottom-[6%] max-md:-translate-x-1/2 max-md:px-0 md:max-lg:absolute md:max-lg:left-1/2 md:max-lg:bottom-[10%] md:max-lg:-translate-x-1/2 md:max-lg:px-0">
        <button className="mt-24 md:mt-28 max-md:mt-0 md:max-lg:mt-0 bg-transparent text-white border-2 border-white font-headline-lg text-sm sm:text-base md:text-lg px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-md uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-all duration-300 shadow-lg shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 md:max-lg:px-7 md:max-lg:py-2.5">
          QUIERO PROBARLA
        </button>
      </div>
    </section>
  );
}
