"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createDirectus, rest, readItems } from '@directus/sdk';
import type { NewsItem, NewsImage } from '../../lib/news';
import { newsData as fallbackNews } from '../../lib/news';
import FooterClient from "../components/FooterClient";

export default function NewsListPage() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const cacheKey = 'news-cache-v1';
      try {
        const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
        if (cached) {
          const parsed = JSON.parse(cached) as NewsItem[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNews(parsed);
          }
        }
      } catch (err) {
        console.warn('News cache read error:', err);
      }
      try {
        const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';
        const directus = createDirectus(DIRECTUS_URL).with(rest());
        
        console.log('🔍 Попытка загрузки новостей из Directus...');
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
        
        console.log('📰 Загружено новостей из Directus:', data?.length || 0);
        if (data && data.length > 0) {
          setNews(data);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(cacheKey, JSON.stringify(data));
            }
          } catch (err) {
            console.warn('News cache write error:', err);
          }
        }
      } catch (e) {
        console.error("Ошибка загрузки новостей из Directus:", e);
        console.log('📦 Используем fallback новости');
        try {
          const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
          if (cached) {
            const parsed = JSON.parse(cached) as NewsItem[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              setNews(parsed);
            }
          }
        } catch (err) {
          console.warn('News cache fallback error:', err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';

  const getImageUrl = (img: NewsImage | null) => {
    if (!img || !img.filename_disk) return "/img/placeholder.jpg";
    return `${DIRECTUS_URL}/assets/${img.filename_disk}`;
  };

  if (loading) {
    return (
      <>
        <section className="max-w-6xl mx-auto py-12 px-6 bg-white">
          <nav className="mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition">Главная</Link>
            <span className="mx-2">•</span>
            <span>Новости</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: '#675b53' }}>Новости</h1>
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Загрузка новостей...</p>
          </div>
        </section>
        <FooterClient />
      </>
    );
  }

  return (
    <>
      <section className="max-w-6xl mx-auto py-12 px-6 bg-white">
      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Главная</Link>
        <span className="mx-2">•</span>
        <span>Новости</span>
      </nav>
      <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: '#675b53' }}>Новости</h1>
      
      {news.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-4">Новости загружаются из Directus...</p>
          <p className="text-gray-400 text-sm">Если Directus временно недоступен, новости появятся после восстановления соединения.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-3 bg-[#619e5a] text-white rounded-full hover:bg-[#619e5a]/80 transition">
            Вернуться на главную
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {news.map(item => (
            <Link 
              key={item.slug} 
              href={`/news/${item.slug}`} 
              className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: '#f5f5f0' }}
            >
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
              <div className="p-6 space-y-3">
                <h2 className="text-lg md:text-xl font-bold leading-tight line-clamp-2" style={{ color: '#675b53' }}>
                  {item.title}
                </h2>
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
      )}
      </section>
      <FooterClient />
    </>
  );
}
