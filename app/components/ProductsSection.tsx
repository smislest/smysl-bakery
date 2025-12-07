"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Пшеничный",
    subtitle: "Безглютеновый аналог",
    weight: "400г",
    description:
      "Мягкий, светлый хлеб с нейтральным вкусом — идеален для тостов и бутербродов.",
    ingredients:
      "Рисовая мука, кукурузный крахмал, картофельный крахмал, яйца, растительное масло, соль, дрожжи, ксантановая камедь",
    image: "/img/1.png",
  },
  {
    id: 2,
    name: "Чиабатта",
    subtitle: "Безглютеновый аналог",
    weight: "350г",
    description:
      "Хрустящая корочка и воздушный мякиш — идеальна для сэндвичей",
    ingredients:
      "Рисовая мука, кукурузный крахмал, оливковое масло, дрожжи, соль, ксантановая камедь",
    image: "/img/2.png",
  },
  {
    id: 3,
    name: "Маковый рулет",
    subtitle: "Безглютеновый десерт",
    weight: "300г",
    description: "Нежный рулет с маковой начинкой — отличный выбор к чаю",
    ingredients:
      "Рисовая мука, мак, сахар, яйца, растительное масло, разрыхлитель",
    image: "/img/5.png",
  },
  {
    id: 4,
    name: "Ржаной",
    subtitle: "Безглютеновый аналог",
    weight: "450г",
    description: "Темный хлеб с насыщенным вкусом",
    ingredients:
      "Рисовая мука, кукурузный крахмал, картофельный крахмал, яйца, растительное масло, соль, дрожжи, ксантановая камедь",
    image: "/img/6.png",
  },
  {
    id: 5,
    name: "Багет",
    subtitle: "Безглютеновый аналог",
    weight: "300г",
    description: "Французский хлеб с хрустящей корочкой",
    ingredients:
      "Рисовая мука, кукурузный крахмал, оливковое масло, дрожжи, соль, ксантановая камедь",
    image: "/img/7.png",
  },
];

export default function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Вычисляем прогресс прокрутки секции (от -1 до 1)
        const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        const offset = (progress - 0.5) * 100; // От -50 до 50
        
        setScrollOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextProduct = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsAnimating(false);
      setDirection(null);
    }, 600);
  };

  const prevProduct = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsAnimating(false);
      setDirection(null);
    }, 600);
  };

  const currentProduct = products[currentIndex];

  return (
    <section ref={sectionRef} id="products" className="py-12 bg-primary">
      <div className="container mx-auto px-6">
        {/* Заголовок и кнопки навигации */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase">
            Наша выпечка <br />и десерты
          </h2>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={prevProduct}
              className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-all flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={nextProduct}
              className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-all flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        {/* Мобильная версия - одна карточка */}
        <div className="md:hidden relative max-w-md mx-auto -mt-6">
          <div className={`bg-white/70 rounded-3xl backdrop-blur-sm overflow-visible transition-all duration-300 ease-out flex flex-col items-center justify-start ${
            isAnimating 
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
          }`}>
            {/* Картинка по центру */}
            <div className={`relative w-72 h-64 z-20`}>
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* SVG иконка */}
            <div className={`absolute top-6 right-6 w-14 h-14 z-30`}>
              <Image
                src="/svg/gl_free.svg"
                alt="Gluten Free"
                fill
                className="object-contain"
              />
            </div>

            {/* Информация о продукте */}
            <div className="space-y-1 text-brown relative z-10 text-left px-5 py-3 pb-6 w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{currentProduct.name}</h3>
                <div className="bg-[#5C5552] text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ml-2">
                  {currentProduct.weight}
                </div>
              </div>
              <p className="text-xs text-brown/70">{currentProduct.subtitle}</p>
              <p className="text-xs leading-tight">{currentProduct.description}</p>
              <div className="pt-0.5">
                <h4 className="font-bold text-xs mb-0.5">Состав:</h4>
                <p className="text-xs leading-tight text-brown/80">
                  {currentProduct.ingredients}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Десктопная версия - карусель с соседними карточками */}
        <div className="hidden md:flex items-center justify-center gap-4 relative mt-6 overflow-visible">
          {/* 2-я карточка слева (очень мелкая) */}
          <div className="relative w-[240px] opacity-30 scale-75">
            <div className="relative h-[300px]">
              <div className={`absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center`}>
                <div className={`relative w-[220px] h-[180px] z-20 mb-2`}>
                  <Image
                    src={products[(currentIndex - 2 + products.length) % products.length].image}
                    alt={products[(currentIndex - 2 + products.length) % products.length].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="space-y-1 text-brown relative z-10 text-left px-4 pb-3 w-full">
                  <h3 className="text-sm font-bold">{products[(currentIndex - 2 + products.length) % products.length].name}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* 1-я карточка слева */}
          <div className="relative w-[280px] opacity-50 scale-85">
            <div className="relative h-[360px]">
              <div className={`absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center`}>
                <div className={`relative w-[260px] h-[220px] z-20 mb-3`}>
                  <Image
                    src={products[(currentIndex - 1 + products.length) % products.length].image}
                    alt={products[(currentIndex - 1 + products.length) % products.length].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="space-y-2 text-brown relative z-10 text-left px-6 pb-4 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{products[(currentIndex - 1 + products.length) % products.length].name}</h3>
                  </div>
                  <p className="text-xs text-brown/70">{products[(currentIndex - 1 + products.length) % products.length].subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Центральная карточка (активная) */}
          <div className={`relative w-[400px] transition-all duration-300 ease-out ${
            isAnimating 
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
          }`}>
            <div className="relative min-h-[560px]">
              {/* Радиальный градиент под карточкой */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{
                  width: "900px",
                  height: "900px",
                  background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)",
                }}
              />
              {/* Активная карточка с изображением по центру */}
              <div className={`absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center`}>
                {/* Картинка в центре */}
                <div className={`relative w-[432px] h-[336px] z-20 mb-4`}>
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* SVG иконка */}
                <div className={`absolute top-6 right-6 w-16 h-16 z-30`}>
                  <Image
                    src="/svg/gl_free.svg"
                    alt="Gluten Free"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Текстовая информация внизу */}
                <div className="space-y-2 text-brown relative z-10 text-left px-8 pb-6 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{currentProduct.name}</h3>
                    <div className="bg-[#5C5552] text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ml-4">
                      {currentProduct.weight}
                    </div>
                  </div>
                  <p className="text-sm text-brown/70">{currentProduct.subtitle}</p>
                  <p className="text-xs leading-relaxed">{currentProduct.description}</p>
                  <div className="pt-2">
                    <h4 className="font-bold mb-1 text-sm">Состав:</h4>
                    <p className="text-xs leading-relaxed text-brown/80">
                      {currentProduct.ingredients}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1-я карточка справа */}
          <div className="relative w-[280px] opacity-50 scale-85">
            <div className="relative h-[360px]">
              <div className={`absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center`}>
                <div className={`relative w-[260px] h-[220px] z-20 mb-3`}>
                  <Image
                    src={products[(currentIndex + 1) % products.length].image}
                    alt={products[(currentIndex + 1) % products.length].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="space-y-2 text-brown relative z-10 text-left px-6 pb-4 w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{products[(currentIndex + 1) % products.length].name}</h3>
                  </div>
                  <p className="text-xs text-brown/70">{products[(currentIndex + 1) % products.length].subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2-я карточка справа (очень мелкая) */}
          <div className="relative w-[240px] opacity-30 scale-75">
            <div className="relative h-[300px]">
              <div className={`absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center`}>
                <div className={`relative w-[220px] h-[180px] z-20 mb-2`}>
                  <Image
                    src={products[(currentIndex + 2) % products.length].image}
                    alt={products[(currentIndex + 2) % products.length].name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="space-y-1 text-brown relative z-10 text-left px-4 pb-3 w-full">
                  <h3 className="text-sm font-bold">{products[(currentIndex + 2) % products.length].name}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 w-8"
                  : "w-2 hover:bg-opacity-70 w-2"
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#ffecc6' : 'rgba(255, 236, 198, 0.5)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
