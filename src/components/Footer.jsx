export default function Footer() {
  return (
    <footer className="relative w-full lg:z-40" style={{
      background: 'linear-gradient(to bottom, #f5f0e8 0%, #c8dff0 18%, #a8cce4 40%, #7db3d8 65%, #5a9bc8 100%)'
    }}>
      {/* Soft fade-in blur from the section above */}
      <div
        className="absolute top-0 left-0 w-full h-20 md:h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #f5f0e8 0%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-16 pt-16 md:pt-28 md:max-lg:pt-20 pb-6 md:pb-10 md:max-lg:pb-8">
        {/* Three-column layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-6 md:max-lg:gap-5">

          {/* LEFT — Logo */}
          <div className="flex items-center justify-center md:justify-start md:w-1/4">
            <img
              src={`${import.meta.env.BASE_URL}Logo Mi Gusto 2025.png`}
              alt="Mi Gusto Logo"
              className="h-12 md:h-20 md:max-lg:h-16 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* CENTER — Legal text */}
          <div className="flex flex-col items-center text-center md:w-2/4 gap-2 md:gap-3 md:max-lg:gap-2">
            <p className="font-body-md text-[11px] md:text-sm md:max-lg:text-[12px] text-[#12121d]/85 leading-snug md:leading-relaxed max-w-[22rem] md:max-w-none md:max-lg:max-w-[26rem]">
              <strong>Mi Gusto ®</strong> es una empresa de La Honoria Alimentos SA — Argentina — CUIT: 30-71558654-8
              <span className="mx-1">|</span>
              Todos los derechos reservados.
            </p>
          </div>

          {/* RIGHT — Social Media */}
          <div className="flex flex-col items-center md:items-end md:w-1/4 gap-2 md:gap-4 md:max-lg:gap-3">
            <p className="font-label-sm text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#12121d] font-semibold md:max-lg:text-[11px]">
              Seguinos en Redes
            </p>
            <div className="flex items-center gap-4 md:gap-5 md:max-lg:gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/migustoar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#12121d] hover:text-[#12121d]/70 transition-colors duration-200 hover:scale-110 transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/migustoar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-[#12121d] hover:text-[#12121d]/70 transition-colors duration-200 hover:scale-110 transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@migustoar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#12121d] hover:text-[#12121d]/70 transition-colors duration-200 hover:scale-110 transform"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.75a4.85 4.85 0 01-1.02-.06z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom divider line with perfect contrast */}
        <div className="mt-6 md:mt-10 md:max-lg:mt-8 pt-3 md:pt-4 border-t border-[#12121d]/15 text-center">
          <p className="font-body-md text-[11px] md:text-xs text-[#12121d]/75 leading-snug md:max-lg:text-[12px]">
            Desarrollado por el <strong className="font-bold underline text-[#12121d]">Departamento de sistemas</strong> de Mi Gusto 🥟
          </p>
        </div>
      </div>
    </footer>
  );
}
