
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAboutData } from '../../lib/aboutData';
import { typograph } from '../../lib/typograph';
import type { AboutData } from '../../lib/aboutData';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';

function getAssetUrl(file: string | { id: string } | undefined, fallback: string): string {
  if (!file) return fallback;
  if (typeof file === 'string') {
    if (file.startsWith('http') || file.startsWith('/')) return file;
    return `${DIRECTUS_URL}/assets/${file}`;
  }
  return `${DIRECTUS_URL}/assets/${file.id}`;
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    getAboutData().then(setAbout).catch(() => setAbout(null));
  }, []);

  const svgTitle = "/svg/logo_white.svg";
  const fallbackImages = {
    main: '/img/staf1.png',
    topRight: '/img/staf2.png',
    bottomLeft: '/img/staf3.png',
    bottomRight: '/img/staf4.png',
    extra1: '/img/staf5.png',
  };
  const passionTitle = about?.passion_title || 'Мы...';
  const passionText = typograph(about?.passion_text) || typograph('Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом');
  const prideTitle = about?.pride_title || 'гордимся';
  const prideText = typograph(about?.pride_text) || typograph('Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе');
  const missionTitle = about?.mission_title || 'наша миссия';
  const missionText = typograph(about?.mission_text) || typograph('Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным — Без компромисса между пользой и удовольствием');
  
  const images = {
    main: getAssetUrl(about?.image_main, fallbackImages.main),
    topRight: getAssetUrl(about?.image_top_right, fallbackImages.topRight),
    bottomLeft: getAssetUrl(about?.image_bottom_left, fallbackImages.bottomLeft),
    bottomRight: getAssetUrl(about?.image_bottom_right, fallbackImages.bottomRight),
    extra1: getAssetUrl(about?.image_extra1, fallbackImages.extra1),
  };

  return (
    <section id="about" className="w-full relative" style={{ paddingBottom: '100px', zIndex: 10 }}>
      {/* Фоновый узор с градиентом прозрачности (сверху 30%, к низу 90%) */}
      <div 
        className="absolute left-0 w-full pointer-events-none"
        style={{
          top: '-400px',
          bottom: 0,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9))',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9))',
          zIndex: 5,
        }}
      >
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

      {/* Заголовок на зелёном фоне */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <div className="flex-shrink-0">
            <Image src={svgTitle} alt="Смысл есть" width={260} height={65} className="object-contain" />
          </div>
          <div className="flex-1 h-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>

      {/* Бежевый фон с изгибами - абсолютное позиционирование */}
      <div className="absolute left-0 w-full z-0 md:top-[300px] top-[500px]" style={{ backgroundColor: '#F5E6D3', bottom: 0 }}>
        {/* SVG форма для верхнего изгиба - Desktop */}
        <div className="hidden md:block absolute top-0 left-0 w-full" style={{ height: '70px', transform: 'translateY(-69px)' }}>
          <svg viewBox="0 0 1920 70" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C0,20 429.81,70 960,70 C1490.19,70 1920,20 1920,0 L1920,70 L0,70 Z" fill="#F5E6D3" />
          </svg>
        </div>
        
        {/* SVG форма для верхнего изгиба - Mobile (более плавный изгиб) */}
        <div className="md:hidden absolute top-0 left-0 w-full" style={{ height: '35px', transform: 'translateY(-34px)' }}>
          <svg viewBox="0 0 1920 35" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C0,10 429.81,35 960,35 C1490.19,35 1920,10 1920,0 L1920,35 L0,35 Z" fill="#F5E6D3" />
          </svg>
        </div>

        {/* SVG форма для нижнего изгиба - Desktop */}
        <div className="hidden md:block absolute bottom-0 left-0 w-full" style={{ height: '70px', transform: 'translateY(69px)' }}>
          <svg viewBox="0 0 1920 70" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,70 C0,50 429.81,0 960,0 C1490.19,0 1920,50 1920,70 L1920,0 L0,0 Z" fill="#F5E6D3" />
          </svg>
        </div>
        
        {/* SVG форма для нижнего изгиба - Mobile (более плавный изгиб) */}
        <div className="md:hidden absolute bottom-0 left-0 w-full" style={{ height: '35px', transform: 'translateY(34px)' }}>
          <svg viewBox="0 0 1920 35" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,35 C0,25 429.81,0 960,0 C1490.19,0 1920,25 1920,35 L1920,0 L0,0 Z" fill="#F5E6D3" />
          </svg>
        </div>

      </div>

      {/* Контент поверх бежевого фона */}
      <div className="container mx-auto px-4 py-12 relative z-10" style={{ marginTop: '-100px' }}>

        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Left Column - 2 images */}
            <div className="col-span-4 space-y-6">
              {/* Top: horizontal image (старый пекарь) */}
              <div className="rounded-3xl overflow-hidden">
                <Image 
                  src={images.topRight} 
                  alt="Пекарь за работой" 
                  width={500} 
                  height={240} 
                  className="w-full h-auto object-contain" 
                />
              </div>
              
              {/* Bottom: large vertical image */}
              <div className="rounded-3xl overflow-hidden">
                <Image 
                  src={images.bottomRight} 
                  alt="Процесс приготовления" 
                  width={500} 
                  height={480} 
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>

            {/* Center Column - Main image + pride text + lab image */}
            <div className="col-span-4 flex flex-col gap-8">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden">
                <Image 
                  src={images.main} 
                  alt="Главное фото" 
                  width={450} 
                  height={500} 
                  className="w-full h-auto object-contain" 
                />
              </div>
              
              {/* Pride text */}
              <div className="space-y-2">
                <h3 className="great-vibes text-5xl" style={{ color: '#611717' }}>{prideTitle}</h3>
                <p className="text-gray-800 text-base leading-relaxed">{prideText}</p>
              </div>

              {/* Lab image */}
              <div className="rounded-3xl overflow-hidden">
                <Image 
                  src={images.extra1} 
                  alt="Лаборатория" 
                  width={450} 
                  height={180} 
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>

            {/* Right Column - Beige text block + large image + mission text */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Top: Text block without background */}
              <div className="relative pt-0">
                {/* Отдельный слой для SVG - не влияет на контент */}
                <div className="absolute left-0 right-0 top-0 pointer-events-none hidden lg:block">
                  <img src="/svg/we_are.svg" alt="Мы" style={{ width: 'auto', height: '96px', transform: 'translateY(-150px)' }} />
                </div>
                <div className="p-8 pt-0 pb-0">
                  <h4 className="great-vibes text-5xl mb-4" style={{ color: '#611717' }}>Горим своим делом</h4>
                  <p className="text-gray-800 text-base leading-relaxed">{passionText}</p>
                </div>
              </div>

              {/* Large image */}
              <div className="rounded-3xl overflow-hidden">
                <Image 
                  src={images.bottomLeft} 
                  alt="Работа с тестом" 
                  width={450} 
                  height={400} 
                  className="w-full h-auto object-contain" 
                />
              </div>
              
              {/* Mission text */}
              <div className="space-y-2 px-8">
                <h3 className="great-vibes text-5xl" style={{ color: '#611717' }}>{missionTitle}</h3>
                <p className="text-gray-800 text-base leading-relaxed">{missionText}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-8 max-w-xl mx-auto">
          {/* we_are.svg над главным фото */}
          <div className="relative">
            <div className="mb-4">
              <img src="/svg/we_are.svg" alt="Мы" style={{ width: '200px', height: 'auto' }} className="mx-auto" />
            </div>
            <div className="rounded-3xl overflow-hidden">
              <Image src={images.main} alt="Главное фото" width={600} height={600} className="w-full object-cover" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="great-vibes text-5xl" style={{ color: '#611717' }}>Горим своим делом</h3>
            <p className="text-gray-800 text-base leading-relaxed">{passionText}</p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.topRight} alt="Процесс приготовления" width={600} height={400} className="block w-full object-cover" />
          </div>

          <div className="space-y-3">
            <h3 className="great-vibes text-5xl" style={{ color: '#611717' }}>{prideTitle}</h3>
            <p className="text-gray-800 text-base leading-relaxed">{prideText}</p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.bottomLeft} alt="Работа с тестом" width={600} height={600} className="block w-full object-cover" />
          </div>

          <div className="space-y-3">
            <h3 className="great-vibes text-5xl" style={{ color: '#611717' }}>{missionTitle}</h3>
            <p className="text-gray-800 text-base leading-relaxed">{missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
