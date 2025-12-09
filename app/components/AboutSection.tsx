
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutSection() {
  const waveSvgRef = useRef<SVGElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in-scroll').forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (waveSvgRef.current) {
        const rect = waveSvgRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = Math.sin(scrollProgress * Math.PI * 2) * 20;
        waveSvgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="w-full py-16 bg-primary relative overflow-visible">
      {/* Полупрозрачный слой узоров */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-90">
        <Image
          src="/svg/uzr_bg.svg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full"
          style={{ objectFit: 'fill' }}
          draggable={false}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок с анимацией */}
        <style jsx>{`
          .fade-up {
            opacity: 0;
            transform: translateY(60px);
            animation: fadeUp 1.2s cubic-bezier(.4,0,.2,1) forwards;
          }
          .fade-up.delay {
            animation-delay: 0.5s;
          }
          @keyframes fadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-scroll {
            opacity: 0;
            transform: translateY(30px);
          }
          .fade-in-scroll.visible {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
        `}</style>
        <div className="text-center mb-8 relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-4 fade-up">
            СМЫСЛ
            <br />
            <span className="great-vibes italic text-5xl md:text-8xl fade-up delay">есть</span>
          </h2>
        </div>

        {/* Сложная сетка с фото и текстом */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Мобильная версия */}
          <div className="md:hidden space-y-4">
            {/* Вектор "Мы..." */}
            <div className="flex justify-center mb-2">
              <Image src="/svg/we_are.svg" alt="Мы" width={150} height={105} />
            </div>

            {/* Фото девушки - одинаковая ширина со всеми */}
            <div className="relative rounded-3xl overflow-hidden w-full mx-auto max-w-full aspect-[3/4]">
              <Image src="/img/staf1.png" alt="Сотрудник" fill className="object-contain" />
            </div>

            {/* Текстовый блок "гордимся своим делом" */}
            <div className="bg-beige rounded-3xl p-5">
              <h3 className="text-4xl md:text-6xl font-bold text-white italic great-vibes mb-4">гордимся своим делом</h3>
              <p className="text-white text-lg leading-tight">Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом</p>
            </div>

            {/* Фото staf2 */}
            <div className="relative rounded-3xl overflow-hidden w-full mx-auto max-w-full h-[300px]">
              <Image src="/img/staf2.png" alt="Сотрудник" fill className="object-contain" />
            </div>

            {/* Текстовый блок "гордимся" */}
            <div className="bg-beige rounded-3xl p-5">
              <p className="text-4xl md:text-6xl font-bold text-white italic great-vibes mb-2">гордимся</p>
              <p className="text-white text-lg leading-tight">Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе</p>
            </div>

            {/* Фото staf3 - одинаковая ширина со всеми */}
            <div className="relative rounded-3xl overflow-hidden w-full mx-auto max-w-full aspect-[3/4]">
              <Image src="/img/staf3.png" alt="Сотрудник" fill className="object-contain" />
            </div>

            {/* Текстовый блок "наша миссия" */}
            <div className="bg-beige rounded-3xl p-5">
              <p className="text-4xl md:text-6xl font-bold text-white italic great-vibes mb-2">наша миссия</p>
              <p className="text-white text-lg leading-tight">Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным - без компромиссов между вкусом и пользой</p>
            </div>

            {/* Фото staf5 - одинаковая ширина со всеми */}
            <div className="relative rounded-3xl overflow-hidden w-full mx-auto max-w-full h-[250px]">
              <Image src="/img/staf5.png" alt="Сотрудник" fill className="object-contain" />
            </div>
          </div>

          {/* Десктопная версия - как в макете */}
          <div className="hidden md:flex gap-4 items-end">
            {/* Левая колонка - staf2 и staf4 */}
            <div className="w-1/3 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden fade-in-scroll w-full aspect-[3/4]">
                <Image src="/img/staf2.png" alt="Сотрудник" fill className="object-contain" />
              </div>
              <div className="relative rounded-3xl overflow-hidden fade-in-scroll w-full aspect-[3/4]">
                <Image src="/img/staf4.png" alt="Сотрудник" fill className="object-contain" />
              </div>
            </div>

            {/* Центральная колонка - staf1, текстовый блок и staf5 */}
            <div className="w-1/3 flex flex-col gap-0">
              <div className="relative rounded-3xl overflow-hidden fade-in-scroll w-full aspect-[3/4]">
                <Image src="/img/staf1.png" alt="Сотрудник" fill className="object-contain object-top" />
              </div>
              <div className="bg-beige rounded-3xl p-4 pb-3 flex flex-col justify-center fade-in-scroll">
                <p className="font-bold text-white italic great-vibes text-4xl mb-1">гордимся</p>
                <p className="text-white text-lg leading-tight">Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе</p>
              </div>
              <div className="relative rounded-3xl overflow-hidden fade-in-scroll w-full aspect-[3/4]">
                <Image src="/img/staf5.png" alt="Сотрудник" fill className="object-contain" />
              </div>
            </div>

            {/* Правая колонка - текстовые блоки */}
            <div className="w-1/3 flex flex-col gap-0">
              <div className="bg-beige rounded-3xl pt-6 px-6 pb-4 flex flex-col justify-start relative overflow-visible fade-in-scroll">
                <div className="absolute top-4 left-6 z-20">
                  <Image src="/svg/we_are.svg" alt="Мы" width={180} height={120} />
                </div>
                <div className="mt-16">
                  <h3 className="text-6xl font-bold text-white italic great-vibes mb-4">гордимся своим делом</h3>
                  <p className="text-white text-lg leading-tight">Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden fade-in-scroll w-full aspect-[3/4]">
                <Image src="/img/staf3.png" alt="Сотрудник" fill className="object-contain object-top" />
              </div>
              <div className="bg-beige rounded-3xl p-4 flex flex-col justify-center fade-in-scroll">
                <p className="text-4xl md:text-6xl font-bold text-white italic great-vibes mb-2">наша миссия</p>
                <p className="text-white text-lg leading-tight">Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным - без компромиссов между вкусом и пользой</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
