"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createDirectus, rest, readItems } from '@directus/sdk';
import type { NewsItem, NewsImage } from '../../lib/news';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';
        const directus = createDirectus(DIRECTUS_URL).with(rest());
        
        const data = await directus.request(
          readItems('news' as any, {
            fields: [
              'id',
              'slug',
              'title',
              'excerpt',
              { news_photo: ['id', 'filename_disk'] },
              'date',
              'content'
            ] as any,
            sort: ['-date'] as any,
          })
        ) as NewsItem[];
        
        console.log('📰 Fetched news:', data?.length || 0);
        setNews(data || []);
      } catch (e) {
        console.error("Ошибка загрузки новостей:", e);
      }
    }
    fetchNews();
  }, []);

  // Получение URL изображения через filename_disk
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://smysl-bakery-directus.onrender.com";
  const getImageUrl = (img: NewsImage | null) => {
    if (!img || !img.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
  };





  return (
    <section id="news" className="w-full py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#675b53' }}>
      {/* Фоновый узор */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
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
        {/* Заголовок */}
        <div className="mb-8 md:mb-12 flex flex-col items-center justify-center">
          <Image src="/svg/symbol.svg" alt="" width={80} height={80} className="w-15 h-15 md:w-20 md:h-20 mb-2" />
          <h2 className="text-3xl md:text-5xl font-normal text-white uppercase text-center">
            НАШИ НОВОСТИ
          </h2>
        </div>

        {/* Простая сетка новостей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 6).map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: '#f5f5f0' }}
            >
              {/* Изображение с датой */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={getImageUrl(item.news_photo)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-normal z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                  {item.date}
                </div>
              </div>
              
              {/* Контент карточки */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg md:text-xl font-bold leading-tight line-clamp-2" style={{ color: '#675b53' }}>
                  {item.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed line-clamp-3" style={{ color: '#8b7f77' }}>
                  {item.excerpt}
                </p>
                <div className="text-sm font-normal hover:opacity-70 transition-opacity inline-flex items-center gap-1 pt-2" style={{ color: '#b0a8a0' }}>
                  Читать далее →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Кнопка "Все новости" */}
        {news.length > 6 && (
          <div className="flex justify-center mt-10">
            <Link
              href="/news"
              className="px-8 py-3 bg-[#fdebc1] text-brown font-medium rounded-full hover:bg-[#fdebc1]/90 transition-colors"
            >
              Все новости
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}



