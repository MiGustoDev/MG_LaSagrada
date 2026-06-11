import { useState, useEffect, useRef } from 'react';
import { getCountdownParts } from '../constants/launch';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Premium glowing golden star component representing the 3 World Cups (Mundial)
function GoldenStar({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="#ffe16d" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(255, 225, 109, 0.95))' }}
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  );
}

function FlipDigit({ digit }) {
  return (
    <div
      className="relative bg-white border border-white/10 rounded-md w-11 h-16 max-md:w-10 max-md:h-[3.875rem] md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden shrink-0"
      style={{ perspective: '600px' }}
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-black/[0.02] border-b border-black/[0.05] z-20" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-black/20 z-30" />
      <span
        key={digit}
        className="coming-soon-digit-anim relative z-10 font-headline-xl text-3xl max-md:text-[2.15rem] md:text-5xl text-[#12121d] leading-none font-bold select-none"
      >
        {digit}
      </span>
    </div>
  );
}

// Configuración de exactamente 4 nubes grandes y majestuosas distribuidas por todo el cielo (costados y centro)
const cloudsData = [
  { id: 1, left: '8%', top: '6%', size: 'w-48 md:w-80 h-auto', speed: 220, dir: 1, start: -80, opacity: 'opacity-80' },
  { id: 2, left: '55%', top: '12%', size: 'w-56 md:w-96 h-auto', speed: 190, dir: -1, start: 90, opacity: 'opacity-85' },
  { id: 3, left: '5%', top: '20%', size: 'w-44 md:w-72 h-auto', speed: 150, dir: 1, start: -60, opacity: 'opacity-75' },
  { id: 4, left: '76%', top: '5%', size: 'w-48 md:w-80 h-auto', speed: 130, dir: -1, start: 80, opacity: 'opacity-70' }
];

export default function IngredientsSection() {
  const [countdown, setCountdown] = useState(getCountdownParts);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  // GSAP ScrollTrigger: Control reveal animation based on entering viewport
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%', // Reveal triggers when top of section is 70% from viewport top
        onToggle: (self) => {
          if (self.isActive) {
            setRevealed(true);
          } else {
            // Reset state if scrolled back up past the top boundary
            if (self.direction === -1) {
              setRevealed(false);
            }
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Cuenta regresiva hasta el 11/06/2026 (medianoche Argentina)
  useEffect(() => {
    const tick = () => setCountdown(getCountdownParts());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-12 pb-4 max-md:pt-8 max-md:pb-3 md:pt-16 md:pb-6 z-10"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          className="h-full w-full object-cover"
          src={`${import.meta.env.BASE_URL}fondo horizontal-8.png`}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/15 via-blue-900/20 to-[#12121d]/55" />
      </div>

      {/* Dynamic Multi-layered Cloud Parallax System */}
      {cloudsData.map((cloud) => {
        const style = {};
        if (cloud.left) style.left = cloud.left;
        if (cloud.right) style.right = cloud.right;
        style.top = cloud.top;
        style.transform = revealed 
          ? `translateX(${cloud.start + 140 * cloud.dir}px)` 
          : `translateX(${cloud.start}px)`;
        style.opacity = revealed ? 1 : 0;

        return (
          <div
            key={cloud.id}
            className={`absolute pointer-events-none z-0 transition-all duration-[2000ms] ease-out`}
            style={style}
          >
            <img src={`${import.meta.env.BASE_URL}nube.png`} alt="Nube" className={`${cloud.size} object-contain`} />
          </div>
        );
      })}

      {/* TOP HALF: Countdown, Sun, and Stars */}
      <div className="relative w-full flex flex-col items-center justify-start gap-4 max-md:gap-1.5 md:gap-6 z-10 min-h-[30vh] max-md:min-h-[24vh] md:min-h-[35vh] pt-6 max-md:pt-4">

        {/* Countdown Cards */}
        <div className="relative z-30 flex items-center gap-2.5 max-md:gap-1.5 md:gap-4 mb-2 md:mb-4 max-md:scale-[0.9] max-md:origin-top">
          
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.days).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.days).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Días</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.hours).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.hours).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Horas</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.mins).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.mins).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Mins</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.secs).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.secs).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Segs</span>
          </div>
          
        </div>

        {/* Sun Container - Placed absolutely behind the counter */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-[10%] max-md:bottom-[2%] pointer-events-none transition-all duration-[1500ms] ease-out z-10"
          style={{ 
            opacity: revealed ? 1 : 0,
            transform: revealed 
              ? isMobile
                ? `translate3d(-50%, -72px, 0) scale(1.35) rotate(180deg)`
                : `translate3d(-50%, -180px, 0) scale(1.35) rotate(180deg)`
              : isMobile
                ? `translate3d(-50%, 92px, 0) scale(0.7) rotate(0deg)`
                : `translate3d(-50%, 160px, 0) scale(0.7) rotate(0deg)`
          }}
        >
          <div className="sun-glow opacity-90 drop-shadow-[0_0_45px_rgba(255,225,109,0.65)]">
            <img 
              src={`${import.meta.env.BASE_URL}SOL_MI GUSTO.png`} 
              alt="Sol" 
              className="h-44 w-44 md:h-64 md:w-64 object-contain"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM HALF: Ingredients Image & Text Story (Two columns) */}
      <div className="relative w-full flex items-center justify-center z-10 max-w-container-max mx-auto px-6 max-md:px-4 md:px-12 -mt-24 max-md:-mt-18 md:-mt-44 lg:-mt-56 min-h-[45vh] max-md:min-h-[38vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-md:gap-4 md:gap-16 lg:gap-24 items-center justify-items-center w-full">
          
          {/* Left Column: Empanada Graphic */}
          <div
            className="relative w-full max-w-[520px] max-md:max-w-[340px] md:max-w-[720px] lg:max-w-[900px] flex items-center justify-center transition-all duration-[1200ms] ease-out will-change-transform will-change-opacity -mt-8 max-md:-mt-6 md:-mt-16 lg:-mt-24"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed 
                ? 'translateX(0px) scale(1) rotate(0deg)' 
                : 'translateX(-100px) scale(0.8) rotate(-8deg)'
            }}
          >
            {/* The Empanada Image */}
            <img
              className="w-[120%] max-md:w-[115%] sm:w-[130%] md:w-[145%] lg:w-[160%] max-w-none h-auto object-contain z-20"
              alt="La Sagrada Empanada"
              src={`${import.meta.env.BASE_URL}Ingredientes.png`}
            />
          </div>

          {/* Right Column: Text Content */}
          <div
            className="flex flex-col items-center text-center gap-4 max-md:gap-2 w-full max-w-[500px] transition-all duration-[1200ms] ease-out will-change-transform will-change-opacity -mt-28 max-md:-mt-24 md:-mt-52 lg:-mt-76"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed 
                ? 'translateX(0px) translateY(0px)' 
                : 'translateX(100px) translateY(10px)'
            }}
          >
            <div className="space-y-4 flex flex-col items-center w-full">
              <img 
                src={`${import.meta.env.BASE_URL}LOGO LA SAGRADA dorado-8 copia.png`} 
                alt="La Sagrada Logo" 
                className="w-full max-w-[280px] max-md:max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-none h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="space-y-3 text-white/90 font-body-md text-xs md:text-sm leading-relaxed text-center -mt-3 md:-mt-5">
              <p>
                Dos mundos colisionan en un ritual de sabor sin precedentes. La maestría del asado se fusiona con la
                innovación de la empanada perfecta para crear una experiencia sensorial que desafía lo convencional.
              </p>
              <p>
                Cada bocado es una coreografía de texturas: el crocante audaz del topping, la suavidad de la masa
                artesanal y el corazón intenso de nuestra receta secreta de asado.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
