import { useState, useEffect } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="bg-surface-container-lowest/60 backdrop-blur-sm border-b border-outline-variant/20">
        <div className="flex justify-center items-center w-full px-margin-mobile py-2 max-w-container-max mx-auto">
          <img 
            src="/Logo Mi Gusto 2025.png" 
            alt="Mi Gusto Logo" 
            className="h-8 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
