"use client";

import Link from 'next/link';

export default function ContactsPageClient() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#544a44' }}>
      {/* Декор: радиальный градиент и колосья как на главной */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '1100px',
            height: '1100px',
            background: 'radial-gradient(circle at center, rgba(255, 236, 198, 0.25) 0%, rgba(255, 236, 198, 0.12) 40%, transparent 70%)',
            filter: 'blur(0px)',
          }}
        />

        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px]">
          <img
            src="/img/l_wheat.png"
            alt="Декоративные колосья"
            className="w-full h-auto select-none"
            draggable={false}
            loading="lazy"
          />
        </div>
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[240px] xl:w-[280px]">
          <img
            src="/img/r_wheat.png"
            alt="Декоративные колосья"
            className="w-full h-auto select-none"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Хедер-подобная секция */}
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад на главную
          </Link>
        </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#c1dedc] mb-4">
              Контакты
            </h1>
            <p className="text-xl text-[#ffecc6]">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          {/* Контактная информация */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Левая колонка - контакты */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-8 border border-white/10">
              {/* Адрес */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#c1dedc] mb-2">Адрес производства</h3>
                  <p className="text-[#ffecc6]">
                    г. Москва, ул. Примерная, д. 1, стр. 1
                  </p>
                  <p className="text-white/80 text-sm mt-2">
                    (точный адрес уточняется)
                  </p>
                </div>
              </div>

              {/* Телефон */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#c1dedc] mb-2">Телефон</h3>
                  <a href="tel:+74951234567" className="text-[#ffecc6] hover:opacity-80 transition-colors text-lg">
                    +7 (495) 123-45-67
                  </a>
                  <p className="text-white/80 text-sm mt-2">
                    Звонки принимаются ежедневно с 9:00 до 21:00
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#c1dedc] mb-2">Email</h3>
                  <a href="mailto:info@smislest.ru" className="text-[#ffecc6] hover:opacity-80 transition-colors">
                    info@smislest.ru
                  </a>
                </div>
              </div>

              {/* Режим работы */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#c1dedc] mb-2">Режим работы</h3>
                  <p className="text-[#ffecc6]">
                    Понедельник - Пятница: 8:00 - 20:00
                  </p>
                  <p className="text-[#ffecc6]">
                    Суббота - Воскресенье: 10:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Правая колонка - социальные сети и дополнительная информация */}
            <div className="space-y-8">
              {/* Социальные сети */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-[#c1dedc] mb-6">Мы в социальных сетях</h3>
                <div className="space-y-4">
                  <a 
                    href="https://t.me/smyslest" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-[#ffecc6]"
                  >
                    <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[#ffecc6] font-semibold">Telegram</div>
                      <div className="text-white/80 text-sm">@smyslest</div>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/smyslest" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all text-[#ffecc6]"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-[#ffecc6] font-semibold">Instagram</div>
                      <div className="text-white/80 text-sm">@smyslest</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Доставка и самовывоз */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-[#c1dedc] mb-4">Доставка и самовывоз</h3>
                <div className="space-y-3 text-[#ffecc6]">
                  <p>
                    <strong className="text-[#c1dedc]">Доставка по Москве:</strong> от 500 ₽
                  </p>
                  <p>
                    <strong className="text-[#c1dedc]">Бесплатная доставка:</strong> при заказе от 3000 ₽
                  </p>
                  <p>
                    <strong className="text-[#c1dedc]">Самовывоз:</strong> бесплатно
                  </p>
                </div>
              </div>

              {/* Юридическая информация */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-[#c1dedc] mb-4">Реквизиты</h3>
                <div className="space-y-2 text-[#ffecc6] text-sm">
                  <p><strong className="text-[#c1dedc]">ИП:</strong> Иванов Иван Иванович</p>
                  <p><strong className="text-[#c1dedc]">ИНН:</strong> 123456789012</p>
                  <p><strong className="text-[#c1dedc]">ОГРНИП:</strong> 123456789012345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Карта */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-[#c1dedc] mb-6">Как нас найти</h3>
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa1b0899bfd294471a0bb5d91ac1e5b3c1c68111a48c26b2d2cdad140c84908ff&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen
                title="Карта местоположения пекарни СМЫСЛ есть"
              ></iframe>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
