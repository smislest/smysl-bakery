export default function HeartSection() {
  return (
    <section className="py-20 bg-brown relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Левая колонка - текст */}
          <div className="text-beige space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif italic leading-tight">
              В ритме <br />
              миллионов сердец
            </h2>
            <p className="text-lg leading-relaxed">
              Наша выпечка — это любимый вкус, который объединяет миллионы
              сердец, живущих по всей стране. Миллионы завтраков, пропитанных
              заботой и миллионы чаепитий, которые делают нас чуточку ближе.
              Встречайте!
            </p>
          </div>

          {/* Правая колонка - изображение в форме сердца */}
          <div className="relative">
            <div className="aspect-square relative">
              {/* Рамка в форме сердца */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* SVG сердце как маска */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <clipPath id="heartClip">
                        <path d="M50,90 C50,90 10,65 10,40 C10,25 20,15 30,15 C40,15 45,20 50,30 C55,20 60,15 70,15 C80,15 90,25 90,40 C90,65 50,90 50,90 Z" />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  {/* Изображение пшеницы */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-9xl"
                    style={{ clipPath: "url(#heartClip)" }}
                  >
                    🌾
                  </div>
                  
                  {/* Декоративные круги по краям */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-beige/30" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-beige/20" />
                  <div className="absolute top-1/4 -right-8 w-12 h-12 rounded-full bg-beige/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные элементы фона */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-beige/5" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-beige/5" />
    </section>
  );
}
