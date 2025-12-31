
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAboutData } from '../../lib/aboutData';
import type { AboutData } from '../../lib/aboutData';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';

function getAssetUrl(file?: string | { id: string }): string {
  if (!file) return '/img/staf3.png';
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
  const passionTitle = about?.passion_title || 'Мы...';
  const passionText = about?.passion_text || 'Благодаря нашей страсти к инновациям и строгому контролю качества, мы создаём натуральные продукты, которые наполняют жизнь вкусом';
  const prideTitle = about?.pride_title || 'гордимся';
  const prideText = about?.pride_text || 'Мы с гордостью предлагаем широкий ассортимент вкусной и натуральной выпечки на безглютеновой основе';
  const missionTitle = about?.mission_title || 'наша миссия';
  const missionText = about?.mission_text || 'Мы стремимся к тому, чтобы питание стало ОСОЗНАННЫМ, понятным и по-настоящему вкусным — Вся компромисса между пользой и удовольствием';
  
  const images = {
    main: getAssetUrl(about?.image_main),
    topRight: getAssetUrl(about?.image_top_right),
    bottomLeft: getAssetUrl(about?.image_bottom_left),
    bottomRight: getAssetUrl(about?.image_bottom_right),
    extra1: getAssetUrl(about?.image_extra1),
  };

  return (
    <section id="about" className="w-full relative" style={{ paddingBottom: '100px' }}>
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
      <div className="absolute left-0 w-full z-0 md:top-[400px] top-[500px]" style={{ backgroundColor: '#F5E6D3', bottom: 0 }}>
        {/* SVG форма для верхнего изгиба - Desktop */}
        <div className="hidden md:block absolute top-0 left-0 w-full" style={{ height: '160px', transform: 'translateY(-159px)' }}>
          <svg viewBox="0 0 1920 160" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C0,66.3 429.81,120 960,120 C1490.19,120 1920,66.3 1920,0 L1920,160 L0,160 Z" fill="#F5E6D3" />
          </svg>
        </div>
        
        {/* SVG форма для верхнего изгиба - Mobile (более плавный изгиб) */}
        <div className="md:hidden absolute top-0 left-0 w-full" style={{ height: '80px', transform: 'translateY(-79px)' }}>
          <svg viewBox="0 0 1920 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C0,20 429.81,40 960,40 C1490.19,40 1920,20 1920,0 L1920,80 L0,80 Z" fill="#F5E6D3" />
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
                <h3 className="great-vibes text-5xl" style={{ color: '#C74B50' }}>{prideTitle}</h3>
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
                  <h4 className="great-vibes text-5xl mb-4" style={{ color: '#C74B50' }}>Горим своим делом</h4>
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
                <h3 className="great-vibes text-5xl" style={{ color: '#C74B50' }}>{missionTitle}</h3>
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
            <h3 className="great-vibes text-5xl" style={{ color: '#C74B50' }}>Горим своим делом</h3>
            <p className="text-gray-800 text-base leading-relaxed">{passionText}</p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.topRight} alt="Процесс приготовления" width={600} height={400} className="block w-full object-cover" />
          </div>

          <div className="space-y-3">
            <h3 className="great-vibes text-5xl" style={{ color: '#C74B50' }}>{prideTitle}</h3>
            <p className="text-gray-800 text-base leading-relaxed">{prideText}</p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <Image src={images.bottomLeft} alt="Работа с тестом" width={600} height={600} className="block w-full object-cover" />
          </div>

          <div className="space-y-3">
            <h3 className="great-vibes text-5xl" style={{ color: '#C74B50' }}>{missionTitle}</h3>
            <p className="text-gray-800 text-base leading-relaxed">{missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
