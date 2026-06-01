import { useState, useEffect, useRef } from 'react';

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

// Configuración de exactamente 4 nubes grandes y majestuosas distribuidas por todo el cielo (costados y centro)
const cloudsData = [
  { id: 1, left: '8%', top: '6%', size: 'w-48 md:w-80 h-auto', speed: 220, dir: 1, start: -80, opacity: 'opacity-80' },
  { id: 2, left: '55%', top: '12%', size: 'w-56 md:w-96 h-auto', speed: 190, dir: -1, start: 90, opacity: 'opacity-85' },
  { id: 3, left: '26%', top: '22%', size: 'w-44 md:w-72 h-auto', speed: 150, dir: 1, start: -60, opacity: 'opacity-75' },
  { id: 4, left: '68%', top: '34%', size: 'w-48 md:w-80 h-auto', speed: 130, dir: -1, start: 80, opacity: 'opacity-70' }
];

export default function IngredientsSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sunOffset, setSunOffset] = useState(200);
  const [countdown, setCountdown] = useState({ days: 4, hours: 12, mins: 35, secs: 48 });
  const sectionRef = useRef(null);

  // Parallax scroll effects for clouds and sun
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      // Check if section is in view
      const inView = sectionTop < windowHeight && sectionTop + sectionHeight > 0;

      if (inView) {
        // Calculate progress (0 to 1) as section comes into view
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        setScrollProgress(progress);
        
        // Sun animates from bottom
        const sunProgress = Math.max(0, (progress - 0.1) / 0.5);
        setSunOffset(80 - sunProgress * 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 4);
    target.setHours(target.getHours() + 12);
    target.setMinutes(target.getMinutes() + 35);
    target.setSeconds(target.getSeconds() + 48);

    const interval = setInterval(() => {
      const current = new Date();
      const diff = target - current;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days: d, hours: h, mins: m, secs: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 z-10"
      style={{
        background: 'linear-gradient(to bottom, #75AADB 0%, #4A90E2 30%, #1D3F72 60%, #12121d 100%)'
      }}
    >
      {/* Dynamic Multi-layered Cloud Parallax System */}
      {cloudsData.map((cloud) => {
        const style = {};
        if (cloud.left) style.left = cloud.left;
        if (cloud.right) style.right = cloud.right;
        style.top = cloud.top;
        style.transform = `translateX(${cloud.start + (scrollProgress * cloud.speed * cloud.dir)}px)`;

        return (
          <div
            key={cloud.id}
            className={`absolute ${cloud.opacity} hidden md:block pointer-events-none z-0 transition-transform duration-100 ease-out`}
            style={style}
          >
            <img src={`${import.meta.env.BASE_URL}nube.png`} alt="Nube" className={`${cloud.size} object-contain`} />
          </div>
        );
      })}

      {/* TOP HALF: Sun, Clouds, and Large Countdown Cards */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 z-10 min-h-[45vh] pt-6">
        
        {/* Sun & Stars Container - Placed in flow to never get covered by the cards */}
        <div 
          className="flex flex-col items-center justify-center pointer-events-none transition-transform duration-300"
          style={{ transform: `translateY(${sunOffset * 0.2}px)` }}
        >
          {/* Three World Cup Stars (Triangular formation) */}
          <div className="flex justify-center items-end gap-1.5 md:gap-3 mb-2 opacity-90 drop-shadow-[0_0_12px_rgba(255,225,109,0.5)]">
            <GoldenStar className="h-5 w-5 md:h-7 md:w-7 animate-[bounce_3s_infinite_100ms] -rotate-12" />
            <GoldenStar className="h-7 w-7 md:h-9 md:w-9 animate-[bounce_3s_infinite_500ms] translate-y-[-4px]" />
            <GoldenStar className="h-5 w-5 md:h-7 md:w-7 animate-[bounce_3s_infinite_300ms] rotate-12" />
          </div>

          <div className="sun-glow opacity-60 md:opacity-85">
            <img 
              src={`${import.meta.env.BASE_URL}sol.png`} 
              alt="Sol" 
              className="h-28 w-28 md:h-36 md:w-36 object-contain animate-[spin_100s_linear_infinite]"
            />
          </div>
        </div>

        {/* Countdown Cards */}
        <div className="flex items-center gap-2.5 md:gap-4">
          
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              {/* Tens */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.days).padStart(2, '0')[0]}
                </span>
              </div>
              {/* Units */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.days).padStart(2, '0')[1]}
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Días</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              {/* Tens */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.hours).padStart(2, '0')[0]}
                </span>
              </div>
              {/* Units */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.hours).padStart(2, '0')[1]}
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Horas</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              {/* Tens */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.mins).padStart(2, '0')[0]}
                </span>
              </div>
              {/* Units */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.mins).padStart(2, '0')[1]}
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Mins</span>
          </div>

          <span className="font-headline-xl text-xl text-white/40 mb-6">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1.5">
              {/* Tens */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.secs).padStart(2, '0')[0]}
                </span>
              </div>
              {/* Units */}
              <div className="relative bg-[#18181b] border border-black/25 rounded-md w-11 h-16 md:w-14 md:h-20 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                <span className="relative z-10 font-headline-xl text-3xl md:text-5xl text-white block leading-none font-bold select-none">
                  {String(countdown.secs).padStart(2, '0')[1]}
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[10px] text-white/80 mt-2 uppercase font-semibold">Segs</span>
          </div>
          
        </div>
      </div>

      {/* BOTTOM HALF: Ingredients Image & Text Story (Two columns) */}
      <div className="relative w-full flex-1 flex items-center justify-center z-10 max-w-container-max mx-auto px-6 md:px-12 mt-4 md:mt-8 min-h-[45vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center justify-items-center w-full">
          
          {/* Left Column: Image */}
          <div className="w-full flex items-center justify-center">
            <img
              className="max-h-[35vh] md:max-h-[42vh] w-auto object-contain transition-all duration-300 hover:scale-[1.02]"
              alt="Ingredientes de La Sagrada"
              src={`${import.meta.env.BASE_URL}Ingredientes.png`}
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col gap-4 w-full max-w-[500px]">
            <div className="space-y-2">
              <h3 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-secondary-fixed tracking-widest leading-none">
                LA SAGRADA
              </h3>
              <p className="font-label-sm text-white/60 tracking-[0.4em] border-y border-white/20 py-1.5 inline-block text-xs">
                UN RITUAL HECHO PARA COMPARTIR
              </p>
            </div>

            <div className="flex items-center gap-4 transition-all">
              <span className="font-headline-lg-mobile italic text-white text-base md:text-lg">Locos X el Asado</span>
              <div className="w-[1px] h-6 bg-white/20"></div>
              <span className="font-headline-lg-mobile font-bold text-white text-base md:text-lg">Mi Gusto</span>
            </div>

            <div className="space-y-3 text-white/90 font-body-md text-xs md:text-sm leading-relaxed">
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
