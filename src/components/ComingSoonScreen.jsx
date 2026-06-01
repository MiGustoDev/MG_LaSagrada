import { useState, useEffect } from 'react';
import { subscribeToWaitlist } from '../services/waitlist';

const LAUNCH_OFFSET_MS =
  57 * 24 * 60 * 60 * 1000 +
  11 * 60 * 60 * 1000 +
  32 * 60 * 1000;

const VIDEO_OPACITY = 0.65;

function FlipDigit({ digit }) {
  return (
    <div className="coming-soon-flip relative bg-white border border-white/10 rounded-md w-14 h-[4.25rem] sm:w-16 sm:h-24 md:w-[7rem] md:h-[9rem] lg:w-[7.75rem] lg:h-[9.75rem] flex items-center justify-center shadow-lg overflow-hidden shrink-0">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-black/[0.02] border-b border-black/[0.05] z-20" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-black/20 z-30" />
      <span className="coming-soon-flip-num relative z-10 font-headline-xl text-[#12121d] leading-none font-bold select-none">
        {digit}
      </span>
    </div>
  );
}

export default function ComingSoonScreen() {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [countdown, setCountdown] = useState({ days: 57, hours: 11, mins: 32, secs: 25 });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (prefersReducedMotion || !isDesktop) return;

    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const target = new Date(Date.now() + LAUNCH_OFFSET_MS);

    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setFormError('');
    setIsSubmitting(true);

    const result = await subscribeToWaitlist(email);

    setIsSubmitting(false);

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const secs = String(countdown.secs).padStart(2, '0');

  return (
    <section className="coming-soon-screen relative w-full flex flex-col">
      <div
        className="fixed inset-0 z-0 md:absolute"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <video
          className="w-full h-full object-cover"
          style={{ opacity: VIDEO_OPACITY }}
          autoPlay
          loop
          muted
          playsInline
          src={`${import.meta.env.BASE_URL}Main-video.mp4`}
        />
      </div>

      <div className="coming-soon-inner relative z-10 w-full">
        <div className="coming-soon-logo-wrap flex justify-center px-4">
          <img
            src={`${import.meta.env.BASE_URL}Logo Mi Gusto 2025.png`}
            alt="Mi Gusto Logo"
            className="coming-soon-logo max-w-[88vw] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="coming-soon-main">
          <div className="coming-soon-zone coming-soon-zone--countdown order-1 md:order-none">
            <div className="flex flex-col items-center md:items-end gap-[clamp(0.75rem,3vh,1.75rem)] md:gap-5 w-full">
              <div className="flex gap-[clamp(0.5rem,2vw,1.5rem)] md:gap-6 lg:gap-8 items-end justify-center md:justify-end">
                <div className="flex flex-col items-center">
                  <span className="coming-soon-unit-num font-headline-lg text-white font-bold drop-shadow-lg tabular-nums">
                    {countdown.days}
                  </span>
                  <span className="font-label-sm text-[#ffe16d] uppercase font-semibold coming-soon-unit-label">
                    Días
                  </span>
                </div>
                <span className="coming-soon-colon font-headline-lg text-white/40">:</span>
                <div className="flex flex-col items-center">
                  <span className="coming-soon-unit-num font-headline-lg text-white font-bold drop-shadow-lg tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[#ffe16d] uppercase font-semibold coming-soon-unit-label">
                    Hrs
                  </span>
                </div>
                <span className="coming-soon-colon font-headline-lg text-white/40">:</span>
                <div className="flex flex-col items-center">
                  <span className="coming-soon-unit-num font-headline-lg text-white font-bold drop-shadow-lg tabular-nums">
                    {String(countdown.mins).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[#ffe16d] uppercase font-semibold coming-soon-unit-label">
                    Min
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-[clamp(0.35rem,1.5vh,0.75rem)] md:gap-2">
                <div className="flex gap-2 sm:gap-3">
                  <FlipDigit digit={secs[0]} />
                  <FlipDigit digit={secs[1]} />
                </div>
                <span className="font-label-sm text-[10px] xs:text-xs tracking-[0.35em] sm:tracking-[0.4em] text-white/60 font-semibold uppercase">
                  Segundos
                </span>
              </div>
            </div>
          </div>

          <div className="coming-soon-zone coming-soon-zone--form order-2 md:order-none">
            <div className="flex flex-col gap-[clamp(0.65rem,2.5vh,1.5rem)] md:gap-6 w-full max-w-sm md:max-w-[22rem]">
              <div
                className="coming-soon-watermark font-headline-xl tracking-widest uppercase text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] text-center md:text-left leading-[0.92]"
                style={{ opacity: 0.4 }}
              >
                COMING
                <br />
                SOON
              </div>

              {submitted ? (
                <p className="font-headline-lg text-[#ffe16d] animate-pulse drop-shadow-md text-center md:text-left text-sm md:text-base">
                  ¡GRACIAS POR UNIRTE AL RITUAL!
                </p>
              ) : (
                <form className="flex flex-col gap-[clamp(0.5rem,2vh,1rem)] md:gap-4 w-full" onSubmit={handleFormSubmit}>
                  <p className="font-body-md text-white uppercase tracking-wider font-semibold drop-shadow-md text-center md:text-left leading-snug coming-soon-cta-text md:text-sm">
                    Unite al ritual.{' '}
                    <span className="text-[#ffe16d]">Recibí el aviso.</span>
                  </p>
                  <div className="relative group w-full">
                    <input
                      className="w-full bg-transparent border-0 border-b-2 border-white/40 py-[clamp(0.65rem,2vh,1rem)] md:py-4 pr-11 font-headline-lg text-base md:text-lg focus:outline-none focus:border-[#ffe16d] transition-all placeholder:text-white/40 text-white uppercase tracking-wide md:tracking-widest drop-shadow-sm disabled:opacity-50 touch-manipulation"
                      placeholder="Ingresa tu Mail"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formError) setFormError('');
                      }}
                    />
                    <button
                      className="absolute right-0 bottom-[clamp(0.5rem,1.5vh,1rem)] md:bottom-4 text-white hover:text-[#ffe16d] active:scale-95 transition-all duration-200 disabled:opacity-40 p-2 -mr-2 touch-manipulation"
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Enviar email"
                    >
                      <span
                        className="material-symbols-outlined drop-shadow-md text-[clamp(1.5rem,5vw,1.75rem)]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_forward
                      </span>
                    </button>
                  </div>
                  {formError && (
                    <p className="text-red-300 text-xs sm:text-sm drop-shadow-md text-center md:text-left" role="alert">
                      {formError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <p
          className="coming-soon-quote text-center font-display-serif text-white/90 italic px-5 leading-snug drop-shadow-md max-w-md mx-auto md:max-w-2xl"
          style={{ opacity: 0.9 }}
        >
          &ldquo;Un gusto hecho ritual&rdquo;
        </p>
      </div>
    </section>
  );
}
