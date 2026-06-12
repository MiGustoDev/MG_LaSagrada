import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Controlar la reproducción según visibilidad y estado de silencio
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHeroVisible) {
      if (!isMuted) {
        // Intentar reproducir desmuteado
        video.play().catch(() => {
          // Si el navegador bloquea el audio, reproducimos muteado y actualizamos estado
          setIsMuted(true);
          video.play().catch(() => { });
        });
      } else {
        // Reproducir de forma segura (muteado)
        video.play().catch(() => { });
      }
    } else {
      video.pause();
    }
  }, [isHeroVisible, isMuted]);

  // Habilitar audio tras la primera interacción del usuario (click o touch)
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      if (isHeroVisible) {
        setIsMuted(false);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isHeroVisible]);

  // Si la sección vuelve a ser visible y el usuario ya interactuó, desmutear
  useEffect(() => {
    if (isHeroVisible && hasInteracted) {
      setIsMuted(false);
    }
  }, [isHeroVisible, hasInteracted]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen max-md:h-[80vh] overflow-hidden bg-[#12121d] flex items-center justify-center group">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60 lg:opacity-100 lg:mix-blend-normal lg:filter-none md:max-lg:opacity-100 md:max-lg:mix-blend-normal md:max-lg:filter-none max-md:absolute max-md:top-0 max-md:left-0 max-md:w-full max-md:h-[80vh] max-md:object-cover max-md:object-center max-md:opacity-100"
          preload="auto"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          src={`${import.meta.env.BASE_URL}Main-video.webm`}
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center justify-center gap-6 md:gap-8 max-w-lg px-4 max-md:absolute max-md:left-1/2 max-md:bottom-[15%] max-md:-translate-x-1/2 max-md:px-0 md:max-lg:absolute md:max-lg:left-1/2 md:max-lg:bottom-[16%] md:max-lg:-translate-x-1/2 md:max-lg:px-0 lg:absolute lg:left-1/2 lg:bottom-[16%] lg:-translate-x-1/2 lg:px-0">
        <a
          href="https://pedir.migusto.com.ar/index.php?_gl=1*1k63vdc*_gcl_au*MzU5MTk3NzIyLjE3Nzk0NjIxNDU.*_ga*MTkxMTIyMzE5MC4xNzc5NDYyMTQ1*_ga_5VWX9KLVCC*czE3ODExOTYyMTgkbzEzJGcwJHQxNzgxMTk2MjE4JGo2MCRsMCRoNzYyODQxMDE."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-24 md:mt-28 max-md:mt-0 md:max-lg:mt-0 lg:mt-0 bg-transparent text-white border-2 border-white font-headline-lg text-sm sm:text-base md:text-lg px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-md uppercase tracking-widest whitespace-nowrap hover:bg-white/10 transition-all duration-300 shadow-lg shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 md:max-lg:px-7 md:max-lg:py-2.5 flex items-center justify-center"
        >
          QUIERO PEDIRLA
        </a>
      </div>
    </section>
  );
}
