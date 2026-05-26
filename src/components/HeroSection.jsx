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
        <img
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          alt="A macro cinematic shot of a golden-brown flamin hot empanada with a vibrant purple atmospheric background. The lighting is dramatic and theatrical, highlighting the flaky texture of the pastry and the spicy red dusting. Wisps of steam rise from the product, creating an elevated and indulgent food photography style consistent with a luxury brand aesthetic."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcytLRp_RGwWmYix5gaNInOW7nKMz-51qn2c1Qy1GrF-tcB6_alq7Wm1jjvsZ2Jfl5yjlQ1Cec6AR52SYy5WH5dc1JpLF8LM573MAuYquNJ-VU1P17p2Aa8fNz5evfsVSOUElTREz4P1iJS7SwtzSQ-waRmLlstYAZwCevJ5ZitLCd4F4_4j31JKuV70WFu9xKmVus_gpLMNwyTfV8sweDI27DHF4tFDCVq1xQiJfVDLKVHrRSEGiWpVKx7xh_j379hkdD8KJT2MU"
        />
      </div>
      <div className="relative z-10 text-center flex flex-col items-center gap-6 md:gap-8 max-w-lg px-4">
        <img 
          src="/Logo Mi Gusto 2025.png" 
          alt="Mi Gusto Logo" 
          className="h-20 sm:h-28 md:h-36 w-auto object-contain drop-shadow-2xl mb-2"
        />
        <button className="bg-secondary-container text-on-secondary-container border-2 border-secondary-container font-headline-lg text-sm sm:text-base md:text-lg px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full uppercase tracking-widest hover:bg-transparent hover:text-secondary-fixed hover:border-secondary-fixed transition-all duration-300 hover:shadow-lg hover:shadow-secondary-container/20 hover:-translate-y-0.5 active:translate-y-0 shadow-md">
          QUIERO PROBARLA
        </button>
      </div>
    </section>
  );
}
