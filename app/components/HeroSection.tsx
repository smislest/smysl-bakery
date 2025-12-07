import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary via-primary-light to-primary flex items-center justify-center pt-24">
      {/* Радиальный градиент на фоне */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "1200px",
          height: "1200px",
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)",
        }}
      />

      {/* Мобильная версия: картинка сверху, текст снизу */}
      <div className="md:hidden container mx-auto px-4 flex flex-col relative z-10 pt-4">
        {/* Картинка с радиальным градиентом */}
        <div className="w-full max-w-md mb-4 relative">
          {/* Радиальный градиент под картинкой */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%)",
            }}
          />
          <div className="aspect-square relative z-10">
            <Image
              src="/img/heart.png"
              alt="Хлеб в форме сердца"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Текст */}
        <div className="text-white text-left space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Безглютеновая <br />
            пекарня <br />
            в Москве
          </h1>
        </div>
      </div>

      {/* Десктопная версия */}
      <div className="hidden md:grid container mx-auto px-4 py-8 grid-cols-2 gap-12 items-center relative z-10">
        {/* Левая колонка - текст */}
        <div className="text-white space-y-6 self-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Безглютеновая <br />
            пекарня <br />
            в Москве
          </h1>
          <div>
            <Link
              href="#products"
              className="inline-block px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all text-lg font-medium"
            >
              Каталог продукции
            </Link>
          </div>
        </div>

        {/* Правая колонка - изображение хлеба в форме сердца */}
        <div className="relative flex items-center justify-center">
          {/* Радиальный градиент под картинкой */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{
              width: "900px",
              height: "900px",
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 70%)",
            }}
          />
          <div className="aspect-square relative z-10" style={{ width: '130%', height: '130%' }}>
            <Image
              src="/img/heart.png"
              alt="Хлеб в форме сердца"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

    </section>
  );
}
