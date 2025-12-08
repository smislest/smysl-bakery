"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const news = [
  {
    id: 1,
    date: "11 ноября 2025",
    title: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!',
    excerpt:
      "Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!",
    image: "/img/news1.jpg",
    fullContent: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси! Мы невероятно гордимся этим достижением и благодарны всем, кто поддержал нас в этом пути. Наш безглютеновый хлеб завоевал сердца экспертов своим неповторимым вкусом и качеством. Это признание мотивирует нас продолжать совершенствовать наш ремесло и радовать вас ещё более вкусными продуктами!',
  },
  {
    id: 2,
    date: "10 октября 2026",
    title: "Мы открыли новую хлебную лавку в центре Москвы",
    excerpt:
      "Мы открыли новую хлебную лавку в центре Москвы. В ассортименте не только хлеб! Но и кое-что ещё...",
    image: "/img/news2.jpg",
    fullContent: "Мы открыли новую хлебную лавку в центре Москвы! Это событие стало важной вехой в развитии нашей пекарни. В новой лавке вы найдёте всё лучшее из нашего ассортимента: безглютеновый хлеб, традиционный хлеб, и множество пекарских изделий. Приходите в гости, мы ждём вас по адресу в центре Москвы. Здесь вас встретят добрые улыбки и самый вкусный хлеб в городе!",
  },
  {
    id: 3,
    date: "1 августа 2026",
    title: "Встречайте новинку!",
    excerpt:
      "Встречайте новинку! Мы приготовили безглютеновый хлеб с добавлением чёрной каракатицы!",
    image: "/img/news3.jpg",
    fullContent: "Встречайте нашу новинку! Мы приготовили уникальный безглютеновый хлеб с добавлением чёрной каракатицы. Этот необычный продукт сочетает в себе пользу безглютенового хлеба с интересным чёрным цветом и мягким вкусом. Попробуйте что-то новое и оцените нашу экспериментальную выпечку. Доступно в ограниченном количестве!",
  },
  {
    id: 4,
    date: "15 июня 2026",
    title: "Запуск программы мастер-классов по безглютеновой выпечке",
    excerpt:
      "Приглашаем всех желающих на наши мастер-классы! Научитесь печь безглютеновый хлеб дома.",
    image: "/img/news1.jpg",
    fullContent: "С этого месяца мы запускаем серию мастер-классов по безглютеновой выпечке! Наши опытные пекари поделятся секретами приготовления вкусного и полезного хлеба без глютена. Вы узнаете о правильном выборе муки, технике замеса теста и особенностях выпечки. Занятия проходят каждую субботу в нашей пекарне. Записывайтесь заранее!",
  },
  {
    id: 5,
    date: "20 мая 2026",
    title: "Сотрудничество с фермерскими хозяйствами",
    excerpt:
      "Мы начали сотрудничество с локальными фермами для использования органических ингредиентов.",
    image: "/img/news2.jpg",
    fullContent: "Мы рады объявить о партнёрстве с местными фермерскими хозяйствами! Теперь в нашей выпечке используются только органические ингредиенты: мука из экологически чистого зерна, свежие яйца от кур свободного выгула, и натуральное масло. Это позволяет нам гарантировать максимальное качество и пользу наших продуктов. Поддерживая нас, вы поддерживаете местных производителей!",
  },
  {
    id: 6,
    date: "5 апреля 2026",
    title: "Новая линейка сладкой безглютеновой выпечки",
    excerpt:
      "Представляем новую коллекцию безглютеновых десертов: кексы, печенье и торты!",
    image: "/img/news3.jpg",
    fullContent: "Мы расширили наш ассортимент! Теперь доступна целая линейка безглютеновых десертов: воздушные кексы с ягодами, хрустящее печенье с шоколадом, и нежные торты для особых случаев. Все десерты готовятся из натуральных ингредиентов без добавления искусственных красителей и консервантов. Попробуйте наши новинки уже сегодня!",
  },
];

const shareButtons = [
  { id: "vk", label: "VK", icon: "🔗", url: (title) => `https://vk.com/share.php?url=` },
  { id: "telegram", label: "Telegram", icon: "📱", url: (title) => `https://t.me/share/url?url=` },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", url: (title) => `https://wa.me/?text=` },
  { id: "ok", label: "OK", icon: "✓", url: (title) => `https://ok.ru/share?url=` },
];

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  // Блокируем прокрутку body когда модальное окно открыто
  useEffect(() => {
    if (selectedNews) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedNews]);

  const handleShare = (platform, title) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(title);
    
    const shareUrls = {
      vk: `https://vk.com/share.php?url=${url}&title=${text}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      ok: `https://ok.ru/share?url=${url}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <section id="news" className="w-full py-16 md:py-20 relative overflow-hidden" style={{ backgroundColor: '#675b53' }}>
      {/* Фоновый узор */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="/svg/uzr_bg.svg"
          alt=""
          className="w-full h-full"
          style={{ objectFit: 'fill' }}
          draggable={false}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Стрелки управления по краям */}
        <button
          onClick={prevNews}
          className="hidden md:flex absolute left-0 top-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer group"
          style={{
            borderColor: '#fdebc1',
            backgroundColor: '#fdebc1',
            zIndex: 10,
            display: 'flex'
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
            display: 'flex'
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
          <img src="/svg/symbol.svg" alt="" className="w-15 h-15 md:w-20 md:h-20 mb-2" />
          <h2 className="text-3xl md:text-5xl font-normal text-white uppercase text-center">
            НАШИ НОВОСТИ
          </h2>
        </div>

        {/* Карточки новостей - карусель */}
        <div className="relative overflow-hidden">
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Мобильный вид: показываем только текущую */}
            <div className="block md:hidden w-full">
              {(() => {
                const item = news[currentIndex];
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer text-left w-full"
                    style={{ backgroundColor: '#fdebc1' }}
                  >
                    {/* Дата (бейдж) */}
                    <div className="relative">
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-sm font-medium z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                        {item.date}
                      </div>
                      {/* Изображение */}
                      <div className="relative aspect-[4/3] bg-gray-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={item.id === 1}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    {/* Контент карточки */}
                    <div className="p-5 md:p-6 space-y-3">
                      <h3 className="text-base md:text-lg font-bold text-brown leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-brown/70 text-sm md:text-base leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="text-brown font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
                        Читать далее →
                      </div>
                    </div>
                  </button>
                );
              })()}
            </div>

            {/* Десктопный вид: показываем 3 карточки */}
            {(() => {
              const prevIndex = (currentIndex - 1 + news.length) % news.length;
              const nextIndex = (currentIndex + 1) % news.length;
              const visibleIndices = [prevIndex, currentIndex, nextIndex];
              
              return visibleIndices.map((index) => {
                const item = news[index];
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="hidden md:block rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer text-left"
                    style={{ backgroundColor: '#fdebc1' }}
                  >
                    {/* Дата (бейдж) */}
                    <div className="relative">
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-2xl text-sm font-medium z-10 text-white" style={{ backgroundColor: '#619e5a' }}>
                        {item.date}
                      </div>
                      {/* Изображение */}
                      <div className="relative aspect-[4/3] bg-gray-200">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          priority={item.id === 1}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    {/* Контент карточки */}
                    <div className="p-5 md:p-6 space-y-3">
                      <h3 className="text-base md:text-lg font-bold text-brown leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-brown/70 text-sm md:text-base leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                      <div className="text-brown font-medium hover:text-primary transition-colors inline-flex items-center gap-1">
                        Читать далее →
                      </div>
                    </div>
                  </button>
                );
              });
            })()}
          </div>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center gap-2 mt-8">
          {news.map((_, index) => (
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

      {/* Модальное окно полной новости */}
      {selectedNews && (
        <>
          <style>{`
            .news-modal-content::-webkit-scrollbar {
              width: 8px;
            }
            .news-modal-content::-webkit-scrollbar-track {
              background: transparent;
            }
            .news-modal-content::-webkit-scrollbar-thumb {
              background: #d0d0d0;
              border-radius: 4px;
            }
            .news-modal-content::-webkit-scrollbar-thumb:hover {
              background: #b0b0b0;
            }
            .news-modal-content {
              scrollbar-color: #d0d0d0 transparent;
              scrollbar-width: thin;
            }
          `}</style>
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedNews(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full h-[90vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
              style={{ overflow: 'hidden' }}
            >
              {/* Кнопка закрыть */}
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xl hover:bg-primary/80 transition z-10 cursor-pointer"
              >
                ✕
              </button>

              {/* Изображение - фиксированное */}
              <div className="relative w-full aspect-video bg-gray-200 flex-shrink-0 rounded-t-3xl overflow-hidden">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>

              {/* Прокручиваемое содержимое */}
              <div 
                className="flex-1 overflow-y-auto news-modal-content"
                onWheel={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8 space-y-6">
                  {/* Дата */}
                  <div 
                    className="inline-block px-4 py-2 rounded-2xl text-sm font-medium text-white"
                    style={{ backgroundColor: '#619e5a' }}
                  >
                    {selectedNews.date}
                  </div>

                  {/* Заголовок */}
                  <h2 className="text-2xl md:text-3xl font-bold text-brown">
                    {selectedNews.title}
                  </h2>

                  {/* Полный текст */}
                  <p className="text-brown/80 text-base md:text-lg leading-relaxed">
                    {selectedNews.fullContent}
                  </p>

                  {/* Кнопки поделиться */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-brown mb-3">Поделиться:</p>
                    <div className="flex gap-3">
                      {shareButtons.map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => handleShare(btn.id, selectedNews.title)}
                          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition text-lg cursor-pointer"
                          title={btn.label}
                        >
                          {btn.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Отступ в конце */}
                  <div className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
