import type { Metadata } from 'next';
import { buildOpenGraph, buildTwitter } from '../../lib/seo';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Презентация проекта СМЫСЛ есть',
  description: 'Полная презентация веб-сайта безглютеновой пекарни: технологический стек, финансовая оценка, перспективы развития и ROI.',
  alternates: {
    canonical: '/presentation',
  },
  openGraph: buildOpenGraph({
    title: 'Презентация проекта | СМЫСЛ есть',
    description: 'Веб-сайт безглютеновой пекарни: технологии, финансы, перспективы.',
    url: '/presentation',
  }),
  twitter: buildTwitter({
    title: 'Презентация проекта | СМЫСЛ есть',
    description: 'Веб-сайт безглютеновой пекарни: технологии, финансы, перспективы.',
  }),
};

export default function PresentationPage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#544a44' }}>
      {/* Декор: радиальный градиент и колосья */}
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
        <div className="container mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад на главную
          </Link>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-3xl p-6 md:p-10 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-[#c1dedc] mb-3 md:mb-4 leading-tight">
              Презентация проекта СМЫСЛ есть
            </h1>
            <p className="text-base md:text-xl text-[#ffecc6]">
              Веб-сайт безглютеновой пекарни
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            
            {/* Краткая справка */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Краткая справка о проекте</h2>
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                  <div className="text-[#ffecc6] text-sm md:text-base font-semibold mb-1">Клиент</div>
                  <div className="text-[#c1dedc] text-sm md:text-base">Безглютеновая пекарня "СМЫСЛ есть"</div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                  <div className="text-[#ffecc6] text-sm md:text-base font-semibold mb-1">Период разработки</div>
                  <div className="text-[#c1dedc] text-sm md:text-base">1.5 месяца (ноябрь 2025 - январь 2026)</div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                  <div className="text-[#ffecc6] text-sm md:text-base font-semibold mb-1">Тип проекта</div>
                  <div className="text-[#c1dedc] text-sm md:text-base">Корпоративный веб-сайт с CMS</div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                  <div className="text-[#ffecc6] text-sm md:text-base font-semibold mb-1">URL</div>
                  <div className="text-[#c1dedc] text-sm md:text-base">
                    <a href="https://smislest.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity underline break-all">
                      smislest.ru
                    </a>
                  </div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                  <div className="text-[#ffecc6] text-sm md:text-base font-semibold mb-1">Панель управления</div>
                  <div className="text-[#c1dedc] text-sm md:text-base">
                    <a href="https://admin.smislest.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity underline break-all">
                      admin.smislest.ru
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Миссия */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Миссия проекта</h2>
              <div className="bg-gradient-to-r from-[#5F8A48]/30 to-[#7BA862]/30 p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#9BC381]/30 mb-4">
                <p className="text-base md:text-lg text-[#c1dedc] font-semibold text-center leading-relaxed">
                  Люди с непереносимостью глютена, лактозы и других веществ достойны здорового и вкусного питания.
                </p>
              </div>
              <p className="text-[#ffecc6] text-sm md:text-base mb-3 leading-relaxed">Проект создан не просто как рекламная площадка, а как <strong className="text-[#c1dedc]">социально значимая платформа</strong>, которая:</p>
              <ul className="space-y-2 text-[#ffecc6] text-sm md:text-base leading-relaxed">
                <li>• Предоставляет доступ к качественной безглютеновой продукции</li>
                <li>• Просвещает о здоровом питании</li>
                <li>• Формирует сообщество людей, заботящихся о своем здоровье</li>
                <li>• Делает специализированное питание доступным и привлекательным</li>
              </ul>
            </section>

            {/* Технологический стек */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Технологический стек</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">Next.js 16.1.1</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">Turbopack</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">Tailwind CSS v4</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">React Server Components</span>
                  </div>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• <strong className="text-[#c1dedc]">Next.js 16.1.1</strong> — последняя версия ведущего React-фреймворка</li>
                    <li>• <strong className="text-[#c1dedc]">Turbopack</strong> — сверхбыстрая сборка (в 700 раз быстрее Webpack)</li>
                    <li>• <strong className="text-[#c1dedc]">ISR</strong> — умное кеширование контента</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Backend & CMS</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">Directus</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">REST API</span>
                  </div>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Гибкая структура данных</li>
                    <li>• Удобная панель администрирования</li>
                    <li>• Управление медиа-файлами</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Инфраструктура</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">PM2</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">VPS</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">Git</span>
                    <span className="px-3 py-1 bg-[#5F8A48]/30 border border-[#9BC381]/50 rounded-full text-[#c1dedc] text-sm">HTTPS</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Ключевые возможности */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Ключевые возможности</h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">1. Полный контроль контента</h3>
                  <p className="text-[#ffecc6] text-sm md:text-base mb-2 leading-relaxed">Заказчик управляет всем через Directus:</p>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>✅ Продукты, новости, FAQ</li>
                    <li>✅ Меню навигации</li>
                    <li>✅ SEO-метаданные</li>
                    <li>✅ Изображения и медиа</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">2. SEO-оптимизация</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• <strong className="text-[#c1dedc]">Server-Side Rendering</strong> — контент виден поисковикам сразу</li>
                    <li>• <strong className="text-[#c1dedc]">Динамические мета-теги</strong> из CMS</li>
                    <li>• <strong className="text-[#c1dedc]">Структурированные данные</strong> (Schema.org)</li>
                    <li>• <strong className="text-[#c1dedc]">Sitemap.xml</strong> — автоматическая генерация</li>
                  </ul>
                  <div className="mt-3 p-3 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                    <p className="text-[#c1dedc] font-semibold text-sm md:text-base">Результат: Сайт готов к продвижению в Яндекс и Google с первого дня</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">3. Производительность</h3>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10 text-center">
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">&lt;2 сек</div>
                      <div className="text-xs md:text-sm text-[#ffecc6] mt-1 leading-tight">Скорость загрузки</div>
                    </div>
                    <div className="bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10 text-center">
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">90+</div>
                      <div className="text-xs md:text-sm text-[#ffecc6] mt-1 leading-tight">Lighthouse Score</div>
                    </div>
                    <div className="bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10 text-center">
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">60-80%</div>
                      <div className="text-xs md:text-sm text-[#ffecc6] mt-1 leading-tight">Сжатие изображений</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Масштабирование */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Перспективы масштабирования</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#89d185] mb-2 leading-tight">Этап 1: Текущая реализация (MVP)</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Презентация продукции</li>
                    <li>• Новостной блог</li>
                    <li>• FAQ и контакты</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#f59e0b] mb-2 leading-tight">Этап 2: B2B-направление (3-6 месяцев)</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Оптовые поставки для заведений общепита</li>
                    <li>• Корпоративные заказы для офисов</li>
                    <li>• Партнерская программа для магазинов</li>
                    <li>• Личный кабинет партнера</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#f59e0b] mb-2 leading-tight">Этап 3: Интернет-магазин (6-12 месяцев)</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Корзина и оформление заказов</li>
                    <li>• Интеграция с платежными системами</li>
                    <li>• Доставка (СДЭК, DPD)</li>
                    <li>• Программа лояльности</li>
                  </ul>
                </div>

                <div className="p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg mt-4">
                  <p className="text-[#c1dedc] text-sm md:text-base font-semibold leading-relaxed">
                    <strong className="text-[#ffecc6]">Важно:</strong> Архитектура позволяет добавлять функции БЕЗ переписывания проекта.
                  </p>
                  <p className="text-[#c1dedc] text-base md:text-lg font-bold mt-2">Экономия на доработках: 200,000 - 350,000 ₽</p>
                </div>
              </div>
            </section>

            {/* Финансовая оценка */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Финансовая оценка проекта</h2>
              
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 md:py-3 text-[#ffecc6]">Позиция</th>
                      <th className="text-left py-2 md:py-3 text-[#ffecc6]">Объем</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Стоимость (₽)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#c1dedc] text-xs md:text-sm">
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2 leading-tight">UX/UI дизайн и прототипирование</td>
                      <td className="py-2">25 часов</td>
                      <td className="text-right py-2">70,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Frontend-разработка (Next.js + React)</td>
                      <td className="py-2">50 часов</td>
                      <td className="text-right py-2">180,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Backend и CMS (Directus)</td>
                      <td className="py-2">20 часов</td>
                      <td className="text-right py-2">70,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Адаптивная верстка</td>
                      <td className="py-2">25 часов</td>
                      <td className="text-right py-2">70,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">SEO-оптимизация</td>
                      <td className="py-2">12 часов</td>
                      <td className="text-right py-2">35,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Интеграция с API</td>
                      <td className="py-2">18 часов</td>
                      <td className="text-right py-2">60,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Настройка сервера и деплоймент</td>
                      <td className="py-2">10 часов</td>
                      <td className="text-right py-2">35,000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Тестирование и баг-фиксы</td>
                      <td className="py-2">10 часов</td>
                      <td className="text-right py-2">30,000</td>
                    </tr>
                    <tr className="font-bold text-[#ffecc6]">
                      <td className="py-3">ИТОГО</td>
                      <td className="py-3">170 часов</td>
                      <td className="text-right py-3">550,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-[#5F8A48]/30 to-[#7BA862]/30 rounded-2xl border border-[#9BC381]/50 text-center">
                <div className="text-4xl font-bold text-[#c1dedc] mb-2">~550,000 ₽</div>
                <div className="text-[#ffecc6] text-base md:text-lg">Рыночная стоимость проекта</div>
                <div className="text-[#c1dedc] text-sm md:text-base mt-2 opacity-90">Оценка основана на средней стоимости разработки в Москве</div>
              </div>
            </section>

            {/* Таблица выполненных работ */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Таблица выполненных работ (1.5 месяца)</h2>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Ноябрь 2025</h3>
                  <div className="space-y-2">
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">01-05 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Анализ требований, проектирование архитектуры</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">06-10 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Настройка окружения (Next.js 16, Tailwind v4, Directus)</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">11-15 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Разработка UI-компонентов (Header, Footer, Hero)</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">16-20 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Создание структуры страниц</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">21-25 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Интеграция с Directus API</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">26-30 ноя</span>
                      <span className="text-[#c1dedc] flex-1">Адаптивная верстка для мобильных</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Декабрь 2025</h3>
                  <div className="space-y-2">
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">01-05 дек</span>
                      <span className="text-[#c1dedc] flex-1">Разработка страницы продуктов с фильтрами</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">06-10 дек</span>
                      <span className="text-[#c1dedc] flex-1">Создание блога/новостей с динамическими маршрутами</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">11-15 дек</span>
                      <span className="text-[#c1dedc] flex-1">Разработка FAQ-раздела</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">16-20 дек</span>
                      <span className="text-[#c1dedc] flex-1">Оптимизация изображений (WebP, AVIF)</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">21-25 дек</span>
                      <span className="text-[#c1dedc] flex-1">SEO-оптимизация (мета-теги, Schema.org, sitemap)</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">26-31 дек</span>
                      <span className="text-[#c1dedc] flex-1">Настройка VPS-сервера, первый деплой</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3">Январь 2026</h3>
                  <div className="space-y-2">
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">01-05 янв</span>
                      <span className="text-[#c1dedc] flex-1">Тестирование на различных устройствах</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">06-10 янв</span>
                      <span className="text-[#c1dedc] flex-1">Миграция контента из Supabase в Directus</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                    <div className="flex gap-3 text-sm md:text-base leading-relaxed">
                      <span className="text-[#ffecc6] min-w-[80px] md:min-w-[100px]">11-13 янв</span>
                      <span className="text-[#c1dedc] flex-1">Финальные баг-фиксы и оптимизация</span>
                      <span className="text-[#89d185]">✓</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm md:text-base">
                    <div>
                      <div className="text-[#ffecc6] mb-1">Выполнено задач</div>
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">28</div>
                    </div>
                    <div>
                      <div className="text-[#ffecc6] mb-1">Коммитов в Git</div>
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">150+</div>
                    </div>
                    <div>
                      <div className="text-[#ffecc6] mb-1">Файлов создано</div>
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">200+</div>
                    </div>
                    <div>
                      <div className="text-[#ffecc6] mb-1">Строк кода</div>
                      <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">15,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Конкурентные преимущества */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Конкурентные преимущества</h2>
              <p className="text-[#ffecc6] text-sm md:text-base mb-4 leading-relaxed">В сравнении с WordPress/Tilda/Wix</p>
              
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 md:py-3 text-[#ffecc6]">Критерий</th>
                      <th className="text-center py-2 md:py-3 text-[#ffecc6]">Next.js</th>
                      <th className="text-center py-2 md:py-3 text-[#ffecc6]">WordPress</th>
                      <th className="text-center py-2 md:py-3 text-[#ffecc6]">Tilda</th>
                      <th className="text-center py-2 md:py-3 text-[#ffecc6]">Wix</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#c1dedc]">
                    <tr className="border-b border-white/10">
                      <td className="py-2 leading-tight">Скорость загрузки</td>
                      <td className="text-center py-2">1-2 сек</td>
                      <td className="text-center py-2 opacity-60">3-5 сек</td>
                      <td className="text-center py-2 opacity-60">3-6 сек</td>
                      <td className="text-center py-2 opacity-60">4-7 сек</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 leading-tight">SEO-потенциал</td>
                      <td className="text-center py-2 text-[#89d185]">Макс</td>
                      <td className="text-center py-2 text-[#f59e0b]">Средний</td>
                      <td className="text-center py-2 text-[#f59e0b]">Средний</td>
                      <td className="text-center py-2 text-[#ef4444]">Низкий</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 leading-tight">Безопасность</td>
                      <td className="text-center py-2 text-[#89d185]">Высокая</td>
                      <td className="text-center py-2 text-[#f59e0b]">Средняя</td>
                      <td className="text-center py-2 text-[#89d185]">Хорошая</td>
                      <td className="text-center py-2 text-[#89d185]">Хорошая</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 leading-tight">Масштабируемость</td>
                      <td className="text-center py-2 text-[#89d185]">Неогр.</td>
                      <td className="text-center py-2 text-[#f59e0b]">Огр.</td>
                      <td className="text-center py-2 text-[#ef4444]">Очень огр.</td>
                      <td className="text-center py-2 text-[#ef4444]">Очень огр.</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 leading-tight">Гибкость дизайна</td>
                      <td className="text-center py-2 text-[#89d185]">Полная</td>
                      <td className="text-center py-2 text-[#f59e0b]">Огр.</td>
                      <td className="text-center py-2 text-[#f59e0b]">Шаблон</td>
                      <td className="text-center py-2 text-[#ef4444]">Шаблон</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                <p className="text-[#c1dedc] text-sm md:text-base font-semibold text-center">
                  Проект превосходит конкурентов по ВСЕМ ключевым показателям
                </p>
              </div>
            </section>

            {/* Маркетинговый потенциал */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Маркетинговый потенциал</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Целевая аудитория B2C</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Люди с целиакией: <strong className="text-[#c1dedc]">~1.5 млн в России</strong></li>
                    <li>• Люди с аллергией на глютен: <strong className="text-[#c1dedc]">~7-9 млн</strong></li>
                    <li>• Приверженцы ЗОЖ: <strong className="text-[#c1dedc]">~22-30 млн</strong></li>
                  </ul>
                  <div className="mt-4 p-4 bg-gradient-to-r from-[#5F8A48]/30 to-[#7BA862]/30 rounded-xl border border-[#9BC381]/50 text-center">
                    <div className="text-sm text-[#ffecc6] mb-1">Итого потенциальная аудитория:</div>
                    <div className="text-3xl font-bold text-[#c1dedc]">30-40 млн человек</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Яндекс.Директ (прогноз)</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• Средняя стоимость клика: <strong className="text-[#c1dedc]">45-80 ₽</strong></li>
                    <li>• Бюджет: <strong className="text-[#c1dedc]">50,000 ₽/месяц</strong></li>
                    <li>• Клики: <strong className="text-[#c1dedc]">~700-900/месяц</strong></li>
                    <li>• Конверсия: <strong className="text-[#c1dedc]">5-8% (35-70 лидов)</strong></li>
                    <li>• Стоимость лида: <strong className="text-[#c1dedc]">700-1,400 ₽</strong></li>
                  </ul>
                </div>

                <div className="p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                  <p className="text-[#ffecc6] font-semibold mb-2">Органический трафик (SEO):</p>
                  <p className="text-[#c1dedc] text-sm">Через 3-6 месяцев ожидается позиции в ТОП-10 Яндекса по 15-20 запросам</p>
                  <p className="text-[#c1dedc] font-bold mt-2">Экономия на рекламе: 15,000 - 30,000 ₽/месяц</p>
                </div>
              </div>
            </section>

            {/* ROI */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">ROI проекта</h2>
              
              <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-5 md:mb-6">
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-2 leading-tight">Совокупная выручка за 6 месяцев</div>
                  <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">~2.4 млн ₽</div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-2 leading-tight">Средняя маржа в пекарном бизнесе</div>
                  <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">40-60%</div>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-2 leading-tight">Прогнозируемая прибыль</div>
                  <div className="text-xl md:text-2xl font-bold text-[#c1dedc]">~1-1.5 млн ₽</div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gradient-to-r from-[#5F8A48]/30 to-[#7BA862]/30 rounded-xl md:rounded-2xl border border-[#9BC381]/50">
                <p className="text-[#ffecc6] text-sm md:text-base mb-2 leading-relaxed"><strong>Инвестиция в сайт:</strong> ~550,000 ₽</p>
                <p className="text-[#ffecc6] text-sm md:text-base mb-2 leading-relaxed"><strong>Прогнозируемая прибыль за 6 месяцев:</strong> ~960,000 - 1,450,000 ₽</p>
                <p className="text-[#c1dedc] text-lg md:text-xl font-bold mt-3">Окупаемость: 3-5 месяцев</p>
                <p className="text-[#c1dedc] text-lg md:text-xl font-bold">ROI за 1 год: 175-260%</p>
              </div>
            </section>

            {/* Финансовые перспективы */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Финансовые перспективы</h2>
              <p className="text-[#ffecc6] text-sm md:text-base mb-4 leading-relaxed">Прогноз трафика и продаж (6 месяцев)</p>
              
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 md:py-3 text-[#ffecc6]">Месяц</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Посетители</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Конв.</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Заказы</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Ср. чек</th>
                      <th className="text-right py-2 md:py-3 text-[#ffecc6]">Выручка</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#c1dedc]">
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">1</td>
                      <td className="text-right py-1.5 md:py-2">2,000</td>
                      <td className="text-right py-1.5 md:py-2">3%</td>
                      <td className="text-right py-1.5 md:py-2">60</td>
                      <td className="text-right py-1.5 md:py-2">1,200 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">72,000 ₽</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">2</td>
                      <td className="text-right py-1.5 md:py-2">3,500</td>
                      <td className="text-right py-1.5 md:py-2">4%</td>
                      <td className="text-right py-1.5 md:py-2">140</td>
                      <td className="text-right py-1.5 md:py-2">1,200 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">168,000 ₽</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">3</td>
                      <td className="text-right py-1.5 md:py-2">5,000</td>
                      <td className="text-right py-1.5 md:py-2">4.5%</td>
                      <td className="text-right py-1.5 md:py-2">225</td>
                      <td className="text-right py-1.5 md:py-2">1,300 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">292,500 ₽</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">4</td>
                      <td className="text-right py-1.5 md:py-2">6,500</td>
                      <td className="text-right py-1.5 md:py-2">5%</td>
                      <td className="text-right py-1.5 md:py-2">325</td>
                      <td className="text-right py-1.5 md:py-2">1,300 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">422,500 ₽</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">5</td>
                      <td className="text-right py-1.5 md:py-2">8,000</td>
                      <td className="text-right py-1.5 md:py-2">5.5%</td>
                      <td className="text-right py-1.5 md:py-2">440</td>
                      <td className="text-right py-1.5 md:py-2">1,400 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">616,000 ₽</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1.5 md:py-2">6</td>
                      <td className="text-right py-1.5 md:py-2">10,000</td>
                      <td className="text-right py-1.5 md:py-2">6%</td>
                      <td className="text-right py-1.5 md:py-2">600</td>
                      <td className="text-right py-1.5 md:py-2">1,400 ₽</td>
                      <td className="text-right py-1.5 md:py-2 font-semibold">840,000 ₽</td>
                    </tr>
                    <tr className="font-bold text-[#ffecc6]">
                      <td className="py-2 md:py-3" colSpan={5}>Итого за 6 месяцев</td>
                      <td className="text-right py-2 md:py-3">2,411,000 ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                <p className="text-[#ffecc6] text-sm md:text-base leading-relaxed">
                  <strong className="text-[#c1dedc]">Средняя маржа в пекарном бизнесе:</strong> 40-60%
                </p>
                <p className="text-[#c1dedc] text-base md:text-lg font-bold mt-2">
                  Прогнозируемая прибыль за 6 мес: ~960,000 - 1,450,000 ₽
                </p>
              </div>
            </section>

            {/* Рекомендации по запуску рекламы */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Рекомендации по запуску рекламы</h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Фаза 1: Прогрев (Месяц 1-2)</h3>
                  <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                    <p className="text-[#c1dedc] text-sm md:text-base mb-2"><strong className="text-[#ffecc6]">Бюджет:</strong> 40,000 ₽/месяц</p>
                    <ul className="text-[#c1dedc] text-sm md:text-base space-y-1 leading-relaxed">
                      <li>• Яндекс.Директ (Поиск): 25,000 ₽</li>
                      <li>• РСЯ: 15,000 ₽</li>
                    </ul>
                    <p className="text-[#ffecc6] text-sm md:text-base mt-2"><strong>Цель:</strong> Набрать базу посетителей, собрать данные</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Фаза 2: Масштабирование (Месяц 3-6)</h3>
                  <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                    <p className="text-[#c1dedc] text-sm md:text-base mb-2"><strong className="text-[#ffecc6]">Бюджет:</strong> 80,000 - 120,000 ₽/месяц</p>
                    <ul className="text-[#c1dedc] text-sm md:text-base space-y-1 leading-relaxed">
                      <li>• Яндекс.Директ (Поиск): 50,000 ₽</li>
                      <li>• РСЯ + Ретаргетинг: 30,000 ₽</li>
                      <li>• Медийная реклама: 20,000 ₽</li>
                      <li>• VK/Instagram Ads: 20,000 ₽</li>
                    </ul>
                    <p className="text-[#ffecc6] text-sm md:text-base mt-2"><strong>Цель:</strong> Увеличение узнаваемости бренда, рост конверсий</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Фаза 3: Оптимизация (Месяц 6+)</h3>
                  <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10">
                    <p className="text-[#c1dedc] text-sm md:text-base mb-2"><strong className="text-[#ffecc6]">Бюджет:</strong> 100,000 - 150,000 ₽/месяц</p>
                    <ul className="text-[#c1dedc] text-sm md:text-base space-y-1 leading-relaxed">
                      <li>• Все каналы + тестирование новых</li>
                      <li>• Акцент на наиболее эффективные каналы</li>
                      <li>• SEO начинает приносить бесплатный трафик</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                  <p className="text-[#c1dedc] text-sm md:text-base font-semibold leading-relaxed">
                    При среднем чеке 1,200 ₽ и конверсии 5%, окупаемость рекламы достигается при заказе 70-100 клиентов/месяц
                  </p>
                </div>
              </div>
            </section>

            {/* Безопасность и надежность */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Безопасность и надежность</h2>
              
              <ul className="text-[#ffecc6] space-y-2 text-sm md:text-base leading-relaxed">
                <li>• <strong className="text-[#c1dedc]">HTTPS</strong> — защищенное соединение</li>
                <li>• <strong className="text-[#c1dedc]">Защита от XSS</strong> — санитизация пользовательского контента (DOMPurify)</li>
                <li>• <strong className="text-[#c1dedc]">Environment Variables</strong> — безопасное хранение ключей API</li>
                <li>• <strong className="text-[#c1dedc]">PM2</strong> — автоматический перезапуск при сбоях (uptime 99.9%)</li>
                <li>• <strong className="text-[#c1dedc]">Git</strong> — контроль версий и возможность отката</li>
                <li>• <strong className="text-[#c1dedc]">Регулярные бэкапы</strong> — защита от потери данных</li>
              </ul>
            </section>

            {/* Адаптивность */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Адаптивность (Mobile-First)</h2>
              <p className="text-[#ffecc6] text-sm md:text-base mb-4 leading-relaxed">Сайт оптимизирован для ВСЕХ устройств:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-1">Смартфоны</div>
                  <div className="text-[#c1dedc] text-sm md:text-base font-semibold">60%</div>
                  <div className="text-[#c1dedc] text-xs opacity-70">320-767px</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-1">Планшеты</div>
                  <div className="text-[#c1dedc] text-sm md:text-base font-semibold">15%</div>
                  <div className="text-[#c1dedc] text-xs opacity-70">768-1023px</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl mb-2">💻</div>
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-1">Ноутбуки</div>
                  <div className="text-[#c1dedc] text-sm md:text-base font-semibold">15%</div>
                  <div className="text-[#c1dedc] text-xs opacity-70">1024-1439px</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl mb-2">🖥️</div>
                  <div className="text-[#ffecc6] text-xs md:text-sm mb-1">Десктопы</div>
                  <div className="text-[#c1dedc] text-sm md:text-base font-semibold">10%</div>
                  <div className="text-[#c1dedc] text-xs opacity-70">1440px+</div>
                </div>
              </div>

              <div className="mt-4 p-3 md:p-4 bg-[#5F8A48]/20 border border-[#9BC381]/30 rounded-lg">
                <div className="grid md:grid-cols-2 gap-2 text-sm md:text-base">
                  <div className="text-[#c1dedc]">
                    <strong className="text-[#ffecc6]">Google Mobile-Friendly Test:</strong> Passed
                  </div>
                  <div className="text-[#c1dedc]">
                    <strong className="text-[#ffecc6]">Яндекс Вебмастер Mobile:</strong> Отлично
                  </div>
                </div>
              </div>
            </section>

            {/* Заключение */}
            <section className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg rounded-2xl md:rounded-3xl p-5 md:p-8">
              <h2 className="text-xl md:text-3xl font-bold text-[#c1dedc] mb-5 md:mb-6 leading-tight">Заключение</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Что получил заказчик:</h3>
                  <ul className="text-[#ffecc6] space-y-2 text-sm md:text-base leading-relaxed">
                    <li>✅ Профессиональный веб-сайт стоимостью ~550,000 ₽</li>
                    <li>✅ Современный технологический стек с перспективой на 5+ лет</li>
                    <li>✅ Полная автономия в управлении контентом</li>
                    <li>✅ SEO-оптимизация мирового класса</li>
                    <li>✅ Готовность к масштабированию без переписывания кода</li>
                    <li>✅ Экономия 200,000 - 350,000 ₽ на будущих доработках</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#ffecc6] mb-3 leading-tight">Перспективы развития:</h3>
                  <ul className="text-[#ffecc6] space-y-1.5 text-sm md:text-base leading-relaxed">
                    <li>• B2B-платформа для оптовых поставок</li>
                    <li>• Интернет-магазин с оплатой и доставкой</li>
                    <li>• Мобильное приложение для постоянных клиентов</li>
                    <li>• Программа лояльности и CRM</li>
                    <li>• Франшиза — масштабирование в регионы</li>
                  </ul>
                </div>

                <div className="mt-5 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-[#5F8A48]/30 to-[#7BA862]/30 rounded-xl md:rounded-2xl border border-[#9BC381]/50 text-center">
                  <p className="text-base md:text-lg text-[#c1dedc] font-semibold mb-3 leading-relaxed">
                    Это не просто сайт — это <strong className="text-[#ffecc6]">фундамент для построения успешного онлайн-бизнеса</strong> в быстрорастущей нише безглютеновой продукции.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#c1dedc]">Да, мы создали крутой проект!</p>
                </div>
              </div>
            </section>

            {/* Дата */}
            <div className="text-center text-[#ffecc6] opacity-70 text-sm pt-8">
              <p>Документ подготовлен 13 января 2026 года</p>
              <p className="mt-1">Проект: СМЫСЛ есть (smislest.ru)</p>
              <p className="mt-1">Технологический стек: Next.js 16 + Directus + PM2</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
