export default function Header() {
  return (
    <header className="bg-surface-container-lowest/80 backdrop-blur-xl docked full-width top-0 sticky z-50 border-b border-outline-variant/30">
      <div className="flex justify-center items-center w-full px-margin-mobile py-4 max-w-container-max mx-auto">
        <img 
          src="/Logo Mi Gusto 2025.png" 
          alt="Mi Gusto Logo" 
          className="h-12 object-contain"
        />
      </div>
    </header>
  );
}
