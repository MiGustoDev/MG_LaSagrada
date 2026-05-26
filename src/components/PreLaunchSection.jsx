import { useState, useEffect } from 'react';

export default function PreLaunchSection() {
  const [countdown, setCountdown] = useState({ days: 57, hours: 11, mins: 52, secs: 10 });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollOffset, setScrollOffset] = useState(0);

  // Countdown timer
  useEffect(() => {
    const now = new Date();
    const target = new Date(
      now.getTime() + 
      (57 * 24 * 60 * 60 * 1000) + 
      (11 * 60 * 60 * 1000) + 
      (52 * 60 * 1000)
    );

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

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.pageYOffset * 0.1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>

      {/* Main Content */}
      <main className="relative min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center pt-stack-lg pb-stack-lg px-margin-mobile">
        <div className="max-w-container-max w-full flex flex-col items-center gap-stack-lg">
          {/* Central Card */}
          <div className="w-full max-w-4xl bg-transparent p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center justify-between border border-black shadow-2xl">
            {/* Left Side: Coming Soon & Email */}
            <div className="flex flex-col gap-8 w-full md:w-1/2 order-2 md:order-1">
              <div className="font-headline-xl text-headline-lg-mobile md:text-6xl tracking-widest opacity-20 leading-none uppercase text-black">
                COMING<br />SOON
              </div>

              {submitted ? (
                <div className="font-headline-lg text-black animate-pulse">
                  ¡GRACIAS POR UNIRTE AL RITUAL!
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                  <p className="font-body-md text-black text-sm uppercase tracking-wider font-semibold">
                    Únete al ritual. Recibe el aviso.
                  </p>
                  <div className="relative group">
                    <input
                      className="w-full bg-transparent border-0 border-b-2 border-black py-4 px-0 font-headline-lg text-lg focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black transition-all placeholder:text-gray-500 text-black uppercase tracking-widest outline-none shadow-none"
                      placeholder="Ingresa tu Mail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="absolute right-0 bottom-4 text-black hover:scale-110 transition-transform"
                      type="submit"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Side: Countdown */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end gap-6 order-1 md:order-2">
              {/* Days/Hours/Mins Group */}
              <div className="flex gap-4 items-end">
                <div className="flex flex-col items-center">
                  <span className="font-headline-lg text-2xl md:text-3xl text-black font-bold">
                    {countdown.days}
                  </span>
                  <span className="font-label-sm text-[10px] text-black/60 uppercase font-semibold">Días</span>
                </div>
                <span className="font-headline-lg text-black/30">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-headline-lg text-2xl md:text-3xl text-black font-bold">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[10px] text-black/60 uppercase font-semibold">Hrs</span>
                </div>
                <span className="font-headline-lg text-black/30">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-headline-lg text-2xl md:text-3xl text-black font-bold">
                    {String(countdown.mins).padStart(2, '0')}
                  </span>
                  <span className="font-label-sm text-[10px] text-black/60 uppercase font-semibold">Min</span>
                </div>
              </div>

              {/* Flip Seconds */}
              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="flex gap-2">
                  {/* Tens Digit */}
                  <div className="relative bg-[#18181b] border border-black/20 rounded-md w-14 h-20 md:w-18 md:h-26 flex items-center justify-center shadow-md overflow-hidden">
                    {/* Top Half Shade */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                    {/* Digit */}
                    <span className="relative z-10 font-headline-xl text-5xl md:text-7xl text-white block leading-none font-bold select-none">
                      {String(countdown.secs).padStart(2, '0')[0]}
                    </span>
                  </div>

                  {/* Units Digit */}
                  <div className="relative bg-[#18181b] border border-black/20 rounded-md w-14 h-20 md:w-18 md:h-26 flex items-center justify-center shadow-md overflow-hidden">
                    {/* Top Half Shade */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-black/15 border-b border-black/30 z-20"></div>
                    {/* Digit */}
                    <span className="relative z-10 font-headline-xl text-5xl md:text-7xl text-white block leading-none font-bold select-none">
                      {String(countdown.secs).padStart(2, '0')[1]}
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-xs tracking-[0.4em] text-black/40 mr-2 font-semibold">
                  SECONDS
                </span>
              </div>
            </div>

            {/* Decorative Leader Lines */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-black/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-black/10 pointer-events-none"></div>
          </div>

          {/* Branding Slogan */}
          <p className="font-display-serif text-display-serif text-center text-on-secondary-container italic max-w-2xl px-4">
            "Un gusto hecho ritual, elevado al infinito."
          </p>
        </div>
      </main>
    </>
  );
}
