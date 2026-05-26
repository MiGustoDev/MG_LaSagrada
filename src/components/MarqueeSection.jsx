export default function MarqueeSection() {
  const marqueeItems = Array(3)
    .fill(null)
    .flatMap(() => [
      { id: 'text', content: 'UN GUSTO HECHO RITUAL' },
      { id: 'star', content: '★' }
    ]);

  return (
    <div className="bg-surface-container-lowest py-6 border-y border-outline-variant/20 marquee-container overflow-hidden">
      <div className="marquee-content flex gap-stack-lg items-center">
        {marqueeItems.map((item, index) => (
          item.id === 'text' ? (
            <span
              key={index}
              className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tighter shrink-0"
            >
              {item.content}
            </span>
          ) : (
            <span
              key={index}
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          )
        ))}
      </div>
    </div>
  );
}
