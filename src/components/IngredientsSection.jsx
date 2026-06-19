import { useState, useEffect, useRef } from 'react';
import { getCountdownParts } from '../constants/launch';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      className="relative bg-gradient-to-b from-[#1c1c30] to-[#0f0f1c] border border-[#ffe16d]/30 rounded-lg w-11 h-16 max-md:w-10 max-md:h-[3.875rem] md:w-14 md:h-20 md:max-lg:w-16 md:max-lg:h-[4.75rem] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.05)] overflow-hidden shrink-0"
      style={{ perspective: '600px' }}
    >
      {/* Top half shine */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/[0.03] border-b border-white/[0.05] z-20" />
      
      {/* Horizontal cut line */}
      <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#09090f] z-30" />
      
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,225,109,0.08)_0%,transparent_70%)] z-10 pointer-events-none" />

      <span className="relative z-10 font-headline-xl text-3xl max-md:text-[2.15rem] md:text-5xl md:max-lg:text-[3.35rem] text-[#ffe16d] leading-none font-extrabold select-none drop-shadow-[0_0_8px_rgba(255,225,109,0.65)]">
        {digit}
      </span>
    </div>
  );
}

export default function IngredientsSection() {
  const [countdown, setCountdown] = useState(getCountdownParts);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [dynamicClouds, setDynamicClouds] = useState([]);

  useEffect(() => {
    const slots = [
      { leftSide: true, baseLeft: 4, baseTop: 8, size: 'w-40 md:w-68' },
      { leftSide: false, baseLeft: 78, baseTop: 6, size: 'w-44 md:w-72' },
      { leftSide: true, baseLeft: 3, baseTop: 34, size: 'w-48 md:w-80' },
      { leftSide: false, baseLeft: 82, baseTop: 42, size: 'w-44 md:w-72' },
      { leftSide: true, baseLeft: 2, baseTop: 68, size: 'w-40 md:w-64' }
    ];

    const cloudImages = ['nube.png', 'nube 2.png', 'nube 3.png'];

    const generated = slots.map((slot, index) => {
      const id = index + 1;
      
      const leftJitter = Math.floor(Math.random() * 5) - 2;
      const topJitter = Math.floor(Math.random() * 5) - 2;
      
      const leftVal = Math.max(1, Math.min(90, slot.baseLeft + leftJitter));
      const topVal = Math.max(1, Math.min(95, slot.baseTop + topJitter));
      
      const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
      
      // Inward direction: left moves right (1), right moves left (-1)
      const dir = slot.leftSide ? 1 : -1;
      
      // Start offsets to place them off-screen initially
      const start = slot.leftSide 
        ? -(Math.floor(Math.random() * 20) + 50)  // -50px to -70px
        : (Math.floor(Math.random() * 20) + 50);  // 50px to 70px

      // Distance to travel so they float in but stop in safe margins
      const distance = Math.floor(Math.random() * 20) + 65; // 65px to 85px

      return {
        id,
        image,
        left: `${leftVal}%`,
        top: `${topVal}%`,
        size: `${slot.size} h-auto`,
        dir,
        start,
        distance
      };
    });

    setDynamicClouds(generated);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');

    const updateMatches = () => {
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);
    };

    updateMatches();
    mobileQuery.addEventListener('change', updateMatches);
    tabletQuery.addEventListener('change', updateMatches);

    return () => {
      mobileQuery.removeEventListener('change', updateMatches);
      tabletQuery.removeEventListener('change', updateMatches);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onToggle: (self) => {
          if (self.isActive) {
            setRevealed(true);
          } else if (self.direction === -1) {
            setRevealed(false);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tick = () => setCountdown(getCountdownParts());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-x-clip overflow-y-visible flex flex-col justify-between pt-12 pb-4 max-md:pt-8 max-md:pb-3 md:pt-16 md:pb-6 z-30"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          className="h-full w-full object-cover"
          src={`${import.meta.env.BASE_URL}fondo horizontal-8.png`}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300/15 via-blue-900/20 to-[#12121d]/55" />
        <div className="absolute top-0 left-0 w-full h-48 md:h-64 bg-gradient-to-b from-[#12121d] via-[#12121d]/80 to-transparent z-10" />
        {/* División con brillo dorado y sombra suave */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffe16d]/40 to-transparent shadow-[0_0_15px_rgba(255,225,109,0.6)] z-20" />
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/50 to-transparent z-15" />
      </div>

      {dynamicClouds.map((cloud) => {
        const style = {};
        if (cloud.left) style.left = cloud.left;
        if (cloud.right) style.right = cloud.right;
        style.top = cloud.top;
        style.transform = revealed
          ? `translateX(${cloud.start + cloud.distance * cloud.dir}px)`
          : `translateX(${cloud.start}px)`;
        style.opacity = revealed ? 1 : 0;

        return (
          <div
            key={cloud.id}
            className="absolute pointer-events-none z-0 transition-all duration-[2000ms] ease-out"
            style={style}
          >
            <img src={`${import.meta.env.BASE_URL}${cloud.image || 'nube.png'}`} alt="Nube" className={`${cloud.size} opacity-85 object-contain`} />
          </div>
        );
      })}

      <div className="relative w-full flex flex-col items-center justify-start gap-2 max-md:gap-1 z-40 min-h-[30vh] max-md:min-h-[24vh] md:min-h-[35vh] md:max-lg:min-h-[22vh] pt-3 max-md:pt-0 md:max-lg:pt-1 -mt-16 max-md:-mt-12">
        <div className="relative z-30 flex items-center gap-2.5 max-md:gap-1.5 md:gap-4 md:max-lg:gap-3 mb-2 md:mb-4 max-md:scale-[0.85] md:max-lg:scale-[1.14] max-md:origin-top mt-2">
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.days).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.days).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-[#ffe16d]/90 mt-2 uppercase font-semibold tracking-wider">Días</span>
          </div>

          <span className="font-headline-xl text-2xl text-[#ffe16d]/60 mb-6 drop-shadow-[0_0_4px_rgba(255,225,109,0.3)]">:</span>

          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.hours).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.hours).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-[#ffe16d]/90 mt-2 uppercase font-semibold tracking-wider">Horas</span>
          </div>

          <span className="font-headline-xl text-2xl text-[#ffe16d]/60 mb-6 drop-shadow-[0_0_4px_rgba(255,225,109,0.3)]">:</span>

          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              <FlipDigit digit={String(countdown.mins).padStart(2, '0')[0]} />
              <FlipDigit digit={String(countdown.mins).padStart(2, '0')[1]} />
            </div>
            <span className="font-label-sm text-[10px] text-[#ffe16d]/90 mt-2 uppercase font-semibold tracking-wider">Mins</span>
          </div>
        </div>

        <div className="relative z-30 flex flex-col items-center text-center mt-2.5 select-none w-full max-w-full px-4">
          <span className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-[0.25em]">
            Próximo partido
          </span>
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 mt-2.5 w-full">
            <img
              src={`${import.meta.env.BASE_URL}flags/ar.png`}
              alt="Argentina"
              className="object-cover rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.25)] border border-white/20 shrink-0"
              style={{
                width: 'clamp(1.75rem, 4.5vw, 3rem)',
                height: 'clamp(1.1rem, 2.8vw, 1.75rem)',
              }}
            />
            <span
              className="font-extrabold text-[#ffe16d] uppercase tracking-wide drop-shadow-lg text-center"
              style={{
                fontSize: 'clamp(1.1rem, 4.5vw, 2.25rem)',
              }}
            >
              Argentina vs Austria
            </span>
            <img
              src={`${import.meta.env.BASE_URL}flags/at.png`}
              alt="Austria"
              className="object-cover rounded-sm shadow-[0_0_12px_rgba(255,255,255,0.25)] border border-white/20 shrink-0"
              style={{
                width: 'clamp(1.75rem, 4.5vw, 3rem)',
                height: 'clamp(1.1rem, 2.8vw, 1.75rem)',
              }}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 pointer-events-none transition-all duration-[1500ms] ease-out z-10"
          style={{
            top: isMobile ? '42px' : '56px',
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? 'translate(-50%, -50%) scale(1.35) rotate(180deg)'
              : 'translate(-50%, 40px) scale(0.7) rotate(0deg)'
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

      <div className="relative w-full flex items-center justify-center z-10 max-w-container-max mx-auto px-6 max-md:px-4 md:px-12 -mt-10 max-md:-mt-6 md:-mt-24 md:max-lg:-mt-40 lg:-mt-32 min-h-[45vh] max-md:min-h-[38vh] md:max-lg:min-h-[0]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-md:gap-4 md:gap-16 lg:gap-24 md:max-lg:grid-cols-1 md:max-lg:gap-1 md:max-lg:items-center md:max-lg:justify-items-center items-center justify-items-center w-full">
          <div
            className="relative w-full max-w-[620px] max-md:max-w-[350px] md:max-w-[850px] md:max-lg:max-w-[680px] lg:max-w-[1050px] flex items-center justify-center transition-all duration-[1200ms] ease-out will-change-transform will-change-opacity -mt-8 max-md:-mt-6 md:-mt-16 md:max-lg:-mt-2 lg:-mt-24"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? 'translateX(0px) scale(1) rotate(0deg)'
                : 'translateX(-100px) scale(0.8) rotate(-8deg)'
            }}
          >
            <img
              className="w-[135%] max-md:w-[112%] sm:w-[145%] md:w-[165%] md:max-lg:w-[168%] lg:w-[175%] max-w-none h-auto object-contain z-20"
              alt="La Sagrada Empanada"
              src={`${import.meta.env.BASE_URL}Ingredientes.png`}
            />
          </div>

          <div
            className="flex flex-col items-center text-center gap-4 max-md:gap-2 md:max-lg:gap-3 w-full max-w-[500px] md:max-lg:max-w-[620px] transition-all duration-[1200ms] ease-out will-change-transform will-change-opacity -mt-28 max-md:-mt-24 md:-mt-52 md:max-lg:-mt-48 lg:-mt-76"
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
                className="w-full max-w-[280px] max-md:max-w-[320px] sm:max-w-[380px] md:max-w-[450px] md:max-lg:max-w-[530px] lg:max-w-none h-auto object-contain drop-shadow-2xl"
              />
            </div>

            <div className="space-y-3 text-white/90 font-body-md text-xs md:text-sm md:max-lg:text-base leading-relaxed text-center -mt-3 md:-mt-5">
              <p>
                Hay países donde el fútbol se mira. Y después estamos los argentinos, donde el fútbol se vive con pasión. Acá el Mundial es cábala, grito antes del gol, nervios compartidos y discusión por quién baja a abrirle al delivery en medio del partido.
              </p>
              <p>
                Por eso, junto a <span className="font-semibold">Locos x el Asado</span>, creamos el gusto que celebra el orgullo de ser argentino y el ritual más importante de todos: <span className="font-semibold">La previa.</span>
              </p>
              <p>
                Un gusto lleno de argentinidad, con chorizo suave, provoleta y una salsa especialmente creada para celebrar lo que somos: <span className="font-semibold whitespace-nowrap">hinchas de nuestras costumbres.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
