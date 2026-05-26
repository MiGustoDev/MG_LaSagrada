import { useState, useEffect, useRef } from 'react';

export default function IngredientsSection() {
  const [cloudLeftOffset, setCloudLeftOffset] = useState(-200);
  const [cloudRightOffset, setCloudRightOffset] = useState(200);
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
        
        // Cloud left animates from left to right
        const cloudLeftProgress = Math.max(0, (progress - 0.1) / 0.5);
        setCloudLeftOffset(-150 + cloudLeftProgress * 150);
        
        // Cloud right animates from right to left
        const cloudRightProgress = Math.max(0, (progress - 0.1) / 0.5);
        setCloudRightOffset(150 - cloudRightProgress * 150);
        
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
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#f5f0e8] overflow-hidden flex flex-col justify-between py-12 md:py-16 z-10">
      
      {/* Decorative Sun in background of Top Half */}
      <div 
        className="absolute inset-x-0 top-4 flex justify-center pointer-events-none z-0 opacity-40 md:opacity-50"
        style={{ transform: `translateY(${sunOffset}px)` }}
      >
        <img 
          src="/sol.png" 
          alt="Sol" 
          className="h-36 w-36 md:h-44 md:w-44 object-contain"
        />
      </div>

      {/* Decorative Clouds */}
      <div 
        className="absolute left-[3%] top-20 opacity-55 hidden md:block pointer-events-none z-0"
        style={{ transform: `translateX(${cloudLeftOffset}px)` }}
      >
        <img src="/nube.png" alt="Nube" className="h-20 object-contain" />
      </div>
      <div 
        className="absolute right-[3%] top-1/3 opacity-55 hidden md:block pointer-events-none z-0"
        style={{ transform: `translateX(${-cloudRightOffset}px)` }}
      >
        <img src="/nube.png" alt="Nube" className="h-24 object-contain" />
      </div>

      {/* TOP HALF: Sun, Clouds, and Large Countdown Cards */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center z-10 min-h-[40vh]">
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
            <span className="font-label-sm text-[10px] text-black/60 mt-2 uppercase font-semibold">Días</span>
          </div>

          <span className="font-headline-xl text-xl text-black/30 mb-6">:</span>

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
            <span className="font-label-sm text-[10px] text-black/60 mt-2 uppercase font-semibold">Horas</span>
          </div>

          <span className="font-headline-xl text-xl text-black/30 mb-6">:</span>

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
            <span className="font-label-sm text-[10px] text-black/60 mt-2 uppercase font-semibold">Mins</span>
          </div>

          <span className="font-headline-xl text-xl text-black/30 mb-6">:</span>

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
            <span className="font-label-sm text-[10px] text-black/60 mt-2 uppercase font-semibold">Segs</span>
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
              src="/Ingredientes.png"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col gap-4 w-full max-w-[500px]">
            <div className="space-y-2">
              <h3 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-secondary-fixed tracking-widest leading-none">
                LA SAGRADA
              </h3>
              <p className="font-label-sm text-black/50 tracking-[0.4em] border-y border-black/20 py-1.5 inline-block text-xs">
                UN RITUAL HECHO PARA COMPARTIR
              </p>
            </div>

            <div className="flex items-center gap-4 transition-all">
              <span className="font-headline-lg-mobile italic text-black text-base md:text-lg">Locos X el Asado</span>
              <div className="w-[1px] h-6 bg-black/30"></div>
              <span className="font-headline-lg-mobile font-bold text-black text-base md:text-lg">Mi Gusto</span>
            </div>

            <div className="space-y-3 text-black font-body-md text-xs md:text-sm leading-relaxed">
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
