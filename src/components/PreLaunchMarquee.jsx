export default function PreLaunchMarquee() {
  const text = "LA SAGRADA  •  UN GUSTO HECHO RITUAL";
  
  // Repeat the text to ensure it covers the screen width comfortably
  const repeatedText = Array(4).fill(text).join("  •  ");

  return (
    <div className="w-full bg-[#f1e7d7] py-6 overflow-hidden whitespace-nowrap border-y border-[#ffffff]/40 marquee-container flex">
      <div className="marquee-content font-headline-lg text-[#8b6f54] text-base md:text-lg tracking-[0.3em] uppercase flex shrink-0">
        <span className="pr-4">{repeatedText}  •  </span>
        <span className="pr-4">{repeatedText}  •  </span>
      </div>
    </div>
  );
}
