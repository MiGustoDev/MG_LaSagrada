export default function PreLaunchMarquee() {
  const text = "LA SAGRADA  •  UN GUSTO HECHO RITUAL";
  
  // Repeat the text to ensure it covers the screen width comfortably
  const repeatedText = Array(4).fill(text).join("  •  ");

  return (
    <div className="w-full bg-primary py-3 overflow-hidden whitespace-nowrap border-y border-outline-variant/10 marquee-container flex">
      <div className="marquee-content font-headline-lg text-surface-dim text-sm tracking-[0.3em] uppercase flex shrink-0">
        <span className="pr-4">{repeatedText}  •  </span>
        <span className="pr-4">{repeatedText}  •  </span>
      </div>
    </div>
  );
}
