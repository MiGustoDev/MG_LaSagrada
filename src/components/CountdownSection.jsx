export default function CountdownSection() {
  return (
    <section className="relative py-stack-lg bg-surface-container-lowest overflow-hidden">
      {/* Decorative Clouds */}
      <div className="absolute left-10 top-10 cloud-float opacity-30 hidden md:block">
        <span className="material-symbols-outlined text-outline text-[120px]">cloud</span>
      </div>
      <div className="absolute right-10 bottom-10 cloud-float opacity-30 hidden md:block" style={{ animationDelay: '-3s' }}>
        <span className="material-symbols-outlined text-outline text-[160px]">cloud</span>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile flex flex-col items-center">
        <div className="relative mb-stack-md">
          <div className="sun-glow">
            <span
              className="material-symbols-outlined text-secondary-fixed text-[200px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              light_mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-stack-sm md:gap-gutter">
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
        </div>
      </div>
    </section>
  );
}
