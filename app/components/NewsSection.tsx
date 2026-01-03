"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { typograph } from '../../lib/typograph';
import type { NewsItem, NewsImage } from '../../lib/news';

interface NewsSectionProps {
  initialNews?: NewsItem[];
}

export default function NewsSection({ initialNews = [] }: NewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Клиентская загрузка для подстраховки (если серверная не сработала)
  useEffect(() => {
    async function fetchNews() {
      const cacheKey = 'news-cache-v1';
      try {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached) as NewsItem[];
            if (Array.isArray(parsed) && parsed.length > 0 && news.length === 0) {
              setNews(parsed);
            }
          }
        }
      } catch (err) {
        console.warn('News cache read error:', err);
      }
    }
    if (news.length === 0) {
      fetchNews();
    }
  }, [news.length]);

  // Получение URL изображения через filename_disk
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://smysl-bakery-directus.onrender.com";
  const getImageUrl = (img: NewsImage | null) => {
    if (!img || !img.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
  };

  const nextNews = () => {
    setCurrentIndex((prev: number) => (prev + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentIndex((prev: number) => (prev - 1 + news.length) % news.length);
  };

  const getMobileStep = (container: HTMLDivElement) => {
    const gap = 16;
    const style = window.getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft || '0');
    const card = container.querySelector('.news-scroll-card') as HTMLElement | null;
    const cardWidth = card ? card.getBoundingClientRect().width : Math.min(container.clientWidth * 0.85, 320);
    return { step: cardWidth + gap, paddingLeft };
  };

  const handleDotClick = (index: number) => {
    // Для мобильных: скроллим к карточке с учётом реальной ширины
    if (scrollContainerRef.current && window.innerWidth <= 768) {
      const container = scrollContainerRef.current;
      const { step, paddingLeft } = getMobileStep(container);
      container.scrollTo({
        left: paddingLeft + index * step,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    } else {
      setCurrentIndex(index);
    }
  };

  // Обновляем styles для новостей
  const addNewsScrollSnapStyles = () => {
    if (typeof window === 'undefined') return;
    
    const styleId = 'news-scroll-snap-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .news-scroll-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        gap: 16px;
        padding: 16px clamp(1rem, 4vw, 1.5rem) 20px;
        margin: 0;
        width: 100%;
        cursor: grab;
      }
      
      .news-scroll-container:active {
        cursor: grabbing;
      }
      
      .news-scroll-container::-webkit-scrollbar {
        display: none;
      }
      
      .news-scroll-container {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .news-scroll-card {
        flex: 0 0 auto;
        width: min(85vw, 320px);
        scroll-snap-align: center;
      }
      
      @media (min-width: 768px) {
        .news-scroll-container {
          display: none;
        }
      }
      
      @media (max-width: 768px) {
        .news-scroll-card * {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addNewsScrollSnapStyles();
  }, []);

  // Трекинг активной карточки на мобильных при скролле
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { step, paddingLeft } = getMobileStep(container);
      const raw = (container.scrollLeft - paddingLeft) / step;
      const nextIndex = Math.max(0, Math.min(news.length - 1, Math.round(raw)));
      if (nextIndex !== currentIndex) setCurrentIndex(nextIndex);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [news.length, currentIndex]);


  return (
    <section id="news" className="w-full py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#675b53' }}>
      {/* Фоновый узор с градиентом прозрачности (сверху явный, снизу 0) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Стрелки управления ТОЛЬКО для десктопа */}
        <button
          onClick={prevNews}
          className="hidden md:flex absolute left-0 top-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer group"
          style={{
            borderColor: '#fdebc1',
            backgroundColor: '#fdebc1',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#675b53';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fdebc1';
          }}
          aria-label="Предыдущая новость"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="none" />
            <path d="M14 6L8 12L14 18" stroke="#675b53" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#fdebc1]" />
          </svg>
        </button>
        
        <button
          onClick={nextNews}
          className="hidden md:flex absolute right-0 top-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer group"
          style={{
            borderColor: '#fdebc1',
            backgroundColor: '#fdebc1',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#675b53';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fdebc1';
          }}
          aria-label="Следующая новость"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="none" />
            <path d="M10 6L16 12L10 18" stroke="#675b53" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#fdebc1]" />
          </svg>
        </button>

        {/* Заголовок и иконка по центру */}
        <div className="mb-8 md:mb-12 flex flex-col items-center justify-center">
          <Image src="/svg/symbol.svg" alt="" width={80} height={80} className="w-15 h-15 md:w-20 md:h-20 mb-2" loading="lazy" />
          <h2 className="text-3xl md:text-5xl font-normal text-white uppercase text-center">
            НАШИ НОВОСТИ
          </h2>
        </div>

        {/* Мобильная версия - горизонтальный скролл с CSS Scroll Snap */}
        <div className="md:hidden">
          <div ref={scrollContainerRef} className="news-scroll-container">
            {news.map((item) => (
              <div key={item.slug} className="news-scroll-card">
                <Link href={`/news/${item.slug}`} className="w-full h-full rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer text-left flex flex-col min-h-[420px]" style={{ backgroundColor: '#f5f5f0' }}>
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(item.news_photo)}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-sm font-medium text-white bg-[#619e5a]">
                      {item.date}
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-lg font-bold leading-tight line-clamp-2" style={{ color: '#675b53' }}>
                        {typograph(item.title)}
                      </h3>
                      <p className="text-base leading-relaxed line-clamp-4" style={{ color: '#8b7f77' }}>
                        {typograph(item.excerpt)}
                      </p>
                    </div>
                    <div className="pt-6 mt-auto">
                      <span className="font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-1 text-base" style={{ color: '#675b53' }}>
                        Читать далее →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Десктопная версия - карусель из 3 карточек */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {(() => {
            if (news.length === 0) return null;
            const prevIndex = (currentIndex - 1 + news.length) % news.length;
            const nextIndex = (currentIndex + 1) % news.length;
            const visibleIndices = [prevIndex, currentIndex, nextIndex];
            return visibleIndices.map((index) => {
              const item = news[index];
              return (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer text-left"
                  style={{ backgroundColor: '#f5f5f0' }}
                >
                  <div className="relative">
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-sm font-medium z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                      {item.date}
                    </div>
                    <div className="relative aspect-[4/3] bg-gray-200">
                      <Image
                        src={getImageUrl(item.news_photo)}
                        alt={item.title}
                        fill
                        className="object-cover"
                        loading={index === currentIndex ? "eager" : "lazy"}
                        priority={item.id === "1"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-5 md:p-6 space-y-3">
                    <h3 className="text-base md:text-lg font-bold leading-tight line-clamp-2" style={{ color: '#675b53' }}>
                      {typograph(item.title)}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed line-clamp-3" style={{ color: '#8b7f77' }}>
                      {typograph(item.excerpt)}
                    </p>
                    <div className="font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-1" style={{ color: '#675b53' }}>
                      Читать далее →
                    </div>
                  </div>
                </Link>
              );
            });
          })()}
        </div>

        {/* Индикаторы */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
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



