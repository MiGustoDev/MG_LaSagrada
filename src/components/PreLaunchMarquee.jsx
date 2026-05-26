export default function PreLaunchMarquee() {
  const marqueeText = "MI GUSTO x LA SAGRADA  •  UN GUSTO HECHO RITUAL  •  PRÓXIMAMENTE  • ";

  return (
    <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap border-y border-outline-variant/10">
      <div className="inline-block animate-[marquee_30s_linear_infinite] font-headline-lg text-surface-dim text-sm tracking-[0.3em] uppercase">
        {marqueeText}
        {marqueeText}
      </div>
      <div className="inline-block animate-[marquee_30s_linear_infinite] font-headline-lg text-surface-dim text-sm tracking-[0.3em] uppercase">
        {marqueeText}
        {marqueeText}
      </div>
    </div>
  );
}
