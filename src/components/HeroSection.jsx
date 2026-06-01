import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden hero-gradient flex items-center justify-center group">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <video
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          autoPlay
          loop
          muted
          playsInline
          src={`${import.meta.env.BASE_URL}Main-video.mp4`}
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center gap-6 md:gap-8 max-w-lg px-4">
        <img 
          src={`${import.meta.env.BASE_URL}Logo Mi Gusto 2025.png`} 
          alt="Mi Gusto Logo" 
          className="h-32 sm:h-48 md:h-60 w-auto object-contain drop-shadow-3xl mb-4"
        />
        <button className="bg-transparent text-white border-2 border-white font-headline-lg text-sm sm:text-base md:text-lg px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-md uppercase tracking-widest hover:bg-white/10 transition-all duration-300 shadow-lg shadow-white/10 hover:-translate-y-0.5 active:translate-y-0">
          QUIERO PROBARLA
        </button>
      </div>
    </section>
  );
}
