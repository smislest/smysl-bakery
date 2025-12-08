
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// Удалён импорт Swiper

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
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 400);
  };

  const prevProduct = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 400);
  };

  const currentProduct = products[currentIndex];

  return (
    <section ref={sectionRef} id="products" className="w-full py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Стрелки управления по краям */}
        <button
          onClick={prevProduct}
          className="hidden md:flex absolute left-0 top-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer group"
          style={{
            borderColor: '#fdebc1',
            backgroundColor: '#fdebc1',
            zIndex: 10,
            display: 'flex'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7BA862';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fdebc1';
          }}
          aria-label="Предыдущий продукт"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="none" />
            <path d="M14 6L8 12L14 18" stroke="#7BA862" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#fdebc1]" />
          </svg>
        </button>
        <button
          onClick={nextProduct}
          className="hidden md:flex absolute right-0 top-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer group"
          style={{
            borderColor: '#fdebc1',
            backgroundColor: '#fdebc1',
            zIndex: 10,
            display: 'flex'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7BA862';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fdebc1';
          }}
          aria-label="Следующий продукт"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="none" />
            <path d="M10 6L16 12L10 18" stroke="#7BA862" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#fdebc1]" />
          </svg>
        </button>
        {/* Заголовок по центру */}
        <div className="mb-8 md:mb-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-normal text-white uppercase text-center">
            Наша выпечка <br />и десерты
          </h2>
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
                <div className="bg-[#5C5552] text-white px-3 py-1 rounded-lg text-lg font-medium whitespace-nowrap ml-2">
                  {currentProduct.weight}
                </div>
              </div>
              <p className="text-lg text-brown/70">{currentProduct.subtitle}</p>
              <p className="text-lg leading-tight">{currentProduct.description}</p>
              <div className="space-y-0.5">
                <h4 className="font-bold text-lg mb-0.5">Состав:</h4>
                <p className="text-lg leading-tight text-brown/80">
                  {currentProduct.ingredients}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Десктопная версия - карусель с соседними карточками (кастомная) */}
        <div className="hidden md:flex items-center justify-center gap-4 relative mt-6 overflow-visible">
            {[ -2, -1, 0, 1, 2 ].map((offset) => {
              const index = (currentIndex + offset + products.length) % products.length;
              let scale = 1;
              let opacity = 1;
              if (offset === 0) { scale = 1; opacity = 1; }
              else if (Math.abs(offset) === 1) { scale = 0.85; opacity = 0.5; }
              else { scale = 0.75; opacity = 0.3; }
              if (offset === 0) {
                // Анимация появления активной карточки только при листании влево
                let style = {
                  transform: `scale(1)`,
                  opacity: 1,
                  transition: 'opacity 0.5s, transform 0.5s',
                };
                // При листании влево не применяем анимацию, карточка появляется мгновенно
                return (
                  <div
                    key={index}
                    className={`relative w-[400px] z-10 transition-transform transition-opacity duration-500 ease-in-out`}
                    style={style}
                  >
                    <div className="relative min-h-[560px]">
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                        style={{
                          width: "900px",
                          height: "900px",
                          background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-white/70 rounded-3xl backdrop-blur-md overflow-visible flex flex-col items-center justify-center">
                        <div className="relative w-[432px] h-[336px] mb-4 z-20">
                          <Image
                            src={products[index].image}
                            alt={products[index].name}
                            fill
                            className="object-contain drop-shadow-2xl"
                          />
                        </div>
                        <div className="absolute top-6 right-6 w-16 h-16 z-30">
                          <Image
                            src="/svg/gl_free.svg"
                            alt="Gluten Free"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="space-y-2 text-brown relative z-10 text-left px-8 pb-6 w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">{products[index].name}</h3>
                            <div className="bg-[#5C5552] text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ml-4">
                              {products[index].weight}
                            </div>
                          </div>
                          <p className="text-sm text-brown/70">{products[index].subtitle}</p>
                          <p className="text-xs leading-relaxed">{products[index].description}</p>
                          <div className="pt-2">
                            <h4 className="font-bold mb-1 text-sm">Состав:</h4>
                            <p className="text-xs leading-relaxed text-brown/80">
                              {products[index].ingredients}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Неактивная карточка: Image с width/height и блюром
                let imgWidth, imgHeight;
                if (Math.abs(offset) === 2) {
                  imgWidth = 180;
                  imgHeight = 140;
                } else if (Math.abs(offset) === 1) {
                  imgWidth = 260;
                  imgHeight = 220;
                } else {
                  imgWidth = 220;
                  imgHeight = 180;
                }
                // Для ближних карточек блюр меньше
                const blurValue = Math.abs(offset) === 1 ? '1.25px' : '2.5px';
                // Поднимаем изображения выше
                const marginTop = offset === -1 || offset === 1 ? '40px' : '60px';
                return (
                  <div
                    key={index}
                    className={`relative ${offset === -1 || offset === 1 ? 'w-[280px]' : 'w-[240px]'} z-10 transition-transform transition-opacity duration-500 ease-in-out flex items-center justify-center`}
                    style={{ transform: `scale(${scale})`, opacity, marginTop }}
                  >
                    <Image
                      src={products[index].image}
                      alt={products[index].name}
                      width={imgWidth}
                      height={imgHeight}
                      className="object-contain"
                      style={{ filter: `blur(${blurValue})`, transition: 'filter 0.5s, transform 0.5s' }}
                    />
                  </div>
                );
              }
            })}
        </div>

        {/* Dots индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                index === currentIndex
                  ? "w-8"
                  : "w-2 hover:bg-opacity-70"
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
