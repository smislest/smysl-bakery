"use client";

import { useState } from "react";

const news = [
  {
    id: 1,
    date: "11 ноября 2025",
    title: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!',
    excerpt:
      "Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!",
    image: "🏆",
  },
  {
    id: 2,
    date: "10 октября 2026",
    title: "Мы открыли новую хлебную лавку в центре Москвы",
    excerpt:
      "Мы открыли новую хлебную лавку в центре Москвы. В ассортименте не только хлеб! Но и кое-что ещё...",
    image: "🏪",
  },
  {
    id: 3,
    date: "1 августа 2026",
    title: "Встречайте новинку!",
    excerpt:
      "Встречайте новинку! Мы приготовили безглютеновый хлеб с добавлением чёрной каракатицы!",
    image: "🍞",
  },
];

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <section id="news" className="py-20 bg-brown">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-beige">
            НАШИ НОВОСТИ
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={prevNews}
              className="w-12 h-12 rounded-full border-2 border-beige text-beige hover:bg-beige hover:text-brown transition-all flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={nextNews}
              className="w-12 h-12 rounded-full border-2 border-beige text-beige hover:bg-beige hover:text-brown transition-all flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={item.id}
                className={`bg-beige rounded-2xl overflow-hidden transition-all ${
                  isActive ? "ring-4 ring-primary scale-105" : "opacity-70"
                }`}
              >
                <div className="aspect-video bg-beige-dark flex items-center justify-center text-6xl">
                  {item.image}
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-lg text-primary font-medium">
                    {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-brown line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-brown-light text-lg line-clamp-3">
                    {item.excerpt}
                  </p>
                  <button className="text-primary font-medium hover:underline">
                    Читать далее →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-beige w-8"
                  : "bg-beige/50 hover:bg-beige/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
