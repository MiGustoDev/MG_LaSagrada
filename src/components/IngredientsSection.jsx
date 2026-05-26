import { useState } from 'react';

export default function IngredientsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (cardId, isHovering) => {
    setHoveredCard(isHovering ? cardId : null);
  };

  return (
    <section className="w-full min-h-screen bg-transparent px-8 md:px-16 lg:px-24 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-items-center relative z-10">
      {/* Images */}
      <div className="relative order-2 lg:order-1 w-full max-w-[450px] mx-auto">
        <div className="relative z-10 flex flex-col -space-y-24 items-center">
          <img
            className="w-80 h-80 sm:w-96 sm:h-96 object-cover border-4 border-surface-container shadow-2xl z-20 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            alt="A professional studio product shot of two stack empanadas sliced open to reveal a rich, savory beef filling. The scene is lit with high-contrast, moody lighting that emphasizes textures. The background is a clean, dark surface. The style is premium editorial food photography, focusing on the craftsmanship and quality of the ingredients."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLj434ScCBw90Z3dOZ8dr1tBfy-PFxAwxhpDrNOxnZxBvk3YlI9HnUmkFzDv-BoVvX-4qveBBLtSsgAD4RVM3V5ju_1VO63emFcpESGuKTT3gsObfevfvV_MAX0PcuJdVUz_2GrQvGB0prez_aHpuLlFv67sbnqpBHLXRyxQchRLNzIO6z67nzn0V946z7byUlwIxcFda_19DMToUIbB1gE_zigGL4oUGc_AXBMEEgoy4g7LqjvRbvZ2Ly-5xOLJzjzvzK8DZmBMg"
          />
          <img
            className="w-72 h-72 sm:w-80 sm:h-80 object-cover border-4 border-surface-container shadow-2xl z-10 -rotate-6 rounded-xl transition-all duration-300 hover:-rotate-3 hover:scale-[1.02]"
            alt="Close-up detail of spicy red tortilla chip crumbles and creamy white sauce dripping over a golden pastry. The lighting is warm and cinematic, using shadows to create depth. The vibrant red of the spices contrasts sharply with the creamy sauce, evoking a sense of intense flavor and premium food quality in an elegant culinary setting."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMYN5xY2Per9BSrxuZJGbFX1zoudTBrCr1n6_Z7tzwxNBqCAF8Jb7DfPs0aH1mE4M6WpL0jsDytVkdyWZvJwuvDjz0-X7q1I4-SiZZVEn3yHF7aEBObdI_8xzCrADdgfbKyMSoahI-_k-Pc_fD5FDskGA9NMaWkNIHhAVjqTnTUNfAjZV0Sz_8Ljhn_quj2vEsWBbh15rk04aS6ktW6G0sEdTX3QJ9tSfjjFB0Ru5opRr_6W3xHLB6JEz7JE-kXTJhKTkCD6deW4s"
          />
        </div>

        {/* Callouts */}
        <div
          className={`absolute top-4 -left-8 sm:-left-12 glass-card p-4 z-30 max-w-[160px] transition-all duration-300 ${
            hoveredCard === 'topping' ? 'scale-105 -translate-y-1' : ''
          }`}
          onMouseEnter={() => handleCardHover('topping', true)}
          onMouseLeave={() => handleCardHover('topping', false)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="font-label-sm text-primary uppercase">Topping</span>
          </div>
          <p className="text-[14px] text-on-surface font-semibold">Doritos Flaming Hot</p>
        </div>

        <div
          className={`absolute bottom-16 -right-8 sm:-right-12 glass-card p-4 z-30 max-w-[190px] transition-all duration-300 ${
            hoveredCard === 'salsa' ? 'scale-105 -translate-y-1' : ''
          }`}
          onMouseEnter={() => handleCardHover('salsa', true)}
          onMouseLeave={() => handleCardHover('salsa', false)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-[1px] bg-tertiary"></span>
            <span className="font-label-sm text-tertiary uppercase">Salsa</span>
          </div>
          <p className="text-[14px] text-on-surface font-semibold">Crema ácida con Tajín</p>
        </div>
      </div>

      {/* Text Content */}
      <div className="order-1 lg:order-2 flex flex-col gap-6 md:gap-8 text-center lg:text-left w-full max-w-xl">
        <div className="space-y-4">
          <h3 className="font-display-serif text-5xl md:text-headline-xl text-secondary-fixed tracking-widest leading-none">
            LA SAGRADA
          </h3>
          <p className="font-label-sm text-on-surface-variant tracking-[0.4em] border-y border-outline-variant/30 py-2 inline-block">
            UN RITUAL HECHO PARA COMPARTIR
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-gutter opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="font-headline-lg-mobile italic text-on-surface">Locos X el Asado</span>
          <div className="w-[1px] h-10 bg-outline-variant"></div>
          <span className="font-headline-lg-mobile font-bold text-on-surface">Mi Gusto</span>
        </div>

        <div className="space-y-4 md:space-y-6 text-on-surface-variant font-body-md text-base md:text-lg">
          <p className="leading-relaxed">
            Dos mundos colisionan en un ritual de sabor sin precedentes. La maestría del asado se fusiona con la
            innovación de la empanada perfecta para crear una experiencia sensorial que desafía lo convencional.
          </p>
          <p className="leading-relaxed">
            Cada bocado es una coreografía de texturas: el crocante audaz del topping, la suavidad de la masa
            artesanal y el corazón intenso de nuestra receta secreta de asado.
          </p>
        </div>
      </div>
    </section>
  );
}
