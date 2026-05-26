import { useState, useEffect, useRef } from 'react';

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
    <section ref={sectionRef} className="relative h-screen bg-surface-container-lowest overflow-hidden flex items-center justify-center">
      {/* Decorative Clouds with Images - Animated */}
      <div 
        className="absolute left-0 top-20 opacity-60 hidden md:block pointer-events-none"
        style={{ transform: `translateX(${cloudLeftOffset}px)` }}
      >
        <img 
          src="/nube.png" 
          alt="Nube izquierda" 
          className="h-32 object-contain"
        />
      </div>
      <div 
        className="absolute right-0 bottom-1/3 opacity-70 hidden md:block pointer-events-none"
        style={{ transform: `translateX(${-cloudRightOffset}px)` }}
      >
        <img 
          src="/nube.png" 
          alt="Nube derecha" 
          className="h-40 object-contain"
        />
      </div>

      {/* Additional dispersed clouds - Static */}
      <div className="absolute left-[5%] top-[15%] opacity-50 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 1" 
          className="h-20 object-contain"
        />
      </div>

      <div className="absolute right-[8%] top-[20%] opacity-45 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 2" 
          className="h-24 object-contain"
        />
      </div>

      <div className="absolute left-[12%] bottom-[20%] opacity-55 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 3" 
          className="h-28 object-contain"
        />
      </div>

      <div className="absolute right-[15%] bottom-[25%] opacity-40 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 4" 
          className="h-20 object-contain"
        />
      </div>

      <div className="absolute left-[70%] top-[30%] opacity-45 hidden md:block pointer-events-none">
        <img 
          src="/nube.png" 
          alt="Nube decorativa 5" 
          className="h-24 object-contain"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-margin-mobile">
        <div className="relative mb-16" style={{ transform: `translateY(${sunOffset}px)` }}>
          <div className="sun-glow">
            <img 
              src="/sol.png" 
              alt="Sol" 
              className="h-56 w-56 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-stack-sm md:gap-gutter" style={{ opacity: countdownOpacity, transition: 'opacity 0.5s ease-out' }}>
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-surface-container-high border border-outline-variant p-4 md:p-8 flex gap-2">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">0</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">4</span>
            </div>
            <span className="font-label-sm text-on-surface-variant mt-2 uppercase">Días</span>
          </div>

          <span className="font-headline-xl text-primary">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-surface-container-high border border-outline-variant p-4 md:p-8 flex gap-2">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">1</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">2</span>
            </div>
            <span className="font-label-sm text-on-surface-variant mt-2 uppercase">Horas</span>
          </div>

          <span className="font-headline-xl text-primary">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-surface-container-high border border-outline-variant p-4 md:p-8 flex gap-2">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">3</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">5</span>
            </div>
            <span className="font-label-sm text-on-surface-variant mt-2 uppercase">Mins</span>
          </div>

          <span className="font-headline-xl text-primary">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-surface-container-high border border-outline-variant p-4 md:p-8 flex gap-2">
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">4</span>
              <span className="font-headline-xl text-headline-lg md:text-headline-xl text-white">8</span>
            </div>
            <span className="font-label-sm text-on-surface-variant mt-2 uppercase">Segs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
