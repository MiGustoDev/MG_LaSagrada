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

export default function CountdownSection() {
  const [cloudLeftOffset, setCloudLeftOffset] = useState(-200);
  const [cloudRightOffset, setCloudRightOffset] = useState(200);
  const [sunOffset, setSunOffset] = useState(200);
  const [countdownOpacity, setCountdownOpacity] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      // Check if section is in view
      const inView = sectionTop < windowHeight && sectionTop + sectionHeight > 0;
      setSectionInView(inView);

      if (inView) {
        // Calculate progress (0 to 1) as section comes into view
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        
        // Cloud left animates from left to right (start at -200, end at 0)
        const cloudLeftProgress = Math.max(0, (progress - 0.1) / 0.5);
        setCloudLeftOffset(-200 + cloudLeftProgress * 200);
        
        // Cloud right animates from right to left (start at 200, end at 0)
        const cloudRightProgress = Math.max(0, (progress - 0.1) / 0.5);
        setCloudRightOffset(200 - cloudRightProgress * 200);
        
        // Sun animates from bottom (starts at 200, ends at 0)
        const sunProgress = Math.max(0, (progress - 0.2) / 0.5); // Starts a bit later
        setSunOffset(200 - sunProgress * 200);
        
        // Countdown animates in with fade
        const countdownProgress = Math.max(0, (progress - 0.3) / 0.4);
        setCountdownOpacity(countdownProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom, #75AADB 0%, #4A90E2 30%, #1D3F72 60%, #12121d 100%)'
      }}
    >
      {/* Decorative Clouds with Images - Animated */}
      <div 
        className="absolute left-0 top-20 opacity-75 hidden md:block pointer-events-none"
        style={{ transform: `translateX(${cloudLeftOffset}px)` }}
      >
        <img 
          src="/nube.png" 
          alt="Nube izquierda" 
          className="h-32 object-contain"
        />
      </div>
      <div 
        className="absolute right-0 bottom-1/3 opacity-80 hidden md:block pointer-events-none"
        style={{ transform: `translateX(${-cloudRightOffset}px)` }}
      >
        <img 
          src="/nube.png" 
          alt="Nube derecha" 
          className="h-40 object-contain"
        />
      </div>

      {/* Additional dispersed clouds - Static */}
      <div className="absolute left-[5%] top-[15%] opacity-65 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 1" 
          className="h-20 object-contain"
        />
      </div>

      <div className="absolute right-[8%] top-[20%] opacity-60 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 2" 
          className="h-24 object-contain"
        />
      </div>

      <div className="absolute left-[12%] bottom-[20%] opacity-70 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 3" 
          className="h-28 object-contain"
        />
      </div>

      <div className="absolute right-[15%] bottom-[25%] opacity-55 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 4" 
          className="h-20 object-contain"
        />
      </div>

      <div className="absolute left-[70%] top-[30%] opacity-60 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 5" 
          className="h-24 object-contain"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-margin-mobile">
        <div className="relative mb-16 flex flex-col items-center" style={{ transform: `translateY(${sunOffset}px)` }}>
          {/* Three World Cup Stars (Triangular formation) */}
          <div className="flex justify-center items-end gap-1.5 md:gap-3 mb-2 opacity-95 drop-shadow-[0_0_12px_rgba(255,225,109,0.6)]">
            <GoldenStar className="h-6 w-6 md:h-8 md:w-8 animate-[bounce_3s_infinite_100ms] -rotate-12" />
            <GoldenStar className="h-8 w-8 md:h-10 md:w-10 animate-[bounce_3s_infinite_500ms] translate-y-[-4px]" />
            <GoldenStar className="h-6 w-6 md:h-8 md:w-8 animate-[bounce_3s_infinite_300ms] rotate-12" />
          </div>

          <div className="sun-glow opacity-60 md:opacity-85">
            <img 
              src="/sol.png" 
              alt="Sol" 
              className="h-44 w-44 md:h-56 md:w-56 object-contain drop-shadow-2xl animate-[spin_120s_linear_infinite]"
            />
          </div>
        </div>

        <div className="flex items-center gap-stack-sm md:gap-gutter" style={{ opacity: countdownOpacity, transition: 'opacity 0.5s ease-out' }}>
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-white/80 border border-[#d6cfc4] p-4 md:p-8 flex gap-2 shadow-md">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">0</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">4</span>
            </div>
            <span className="font-label-sm text-surface-dim/60 mt-2 uppercase">Días</span>
          </div>

          <span className="font-headline-xl text-on-secondary-container">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white/80 border border-[#d6cfc4] p-4 md:p-8 flex gap-2 shadow-md">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">1</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">2</span>
            </div>
            <span className="font-label-sm text-surface-dim/60 mt-2 uppercase">Horas</span>
          </div>

          <span className="font-headline-xl text-on-secondary-container">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white/80 border border-[#d6cfc4] p-4 md:p-8 flex gap-2 shadow-md">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">3</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">5</span>
            </div>
            <span className="font-label-sm text-surface-dim/60 mt-2 uppercase">Mins</span>
          </div>

          <span className="font-headline-xl text-on-secondary-container">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white/80 border border-[#d6cfc4] p-4 md:p-8 flex gap-2 shadow-md">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">4</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-surface-dim">8</span>
            </div>
            <span className="font-label-sm text-surface-dim/60 mt-2 uppercase">Segs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
