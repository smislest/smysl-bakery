import Link from "next/link";
import FooterClient from "../components/FooterClient";
import type { Metadata } from "next";
import { getSiteSettings } from "../../lib/siteSettingsData";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivacyPage() {
  const seoData = await getSiteSettings();
  return (
    <>
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
          {/* Кнопка назад */}
          <div className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[#ffecc6] hover:opacity-80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              На главную
            </Link>
          </div>

          {/* Заголовок */}
          <div className="container mx-auto px-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 shadow-lg">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#c1dedc] leading-tight break-words">
                Политика конфиденциальности
              </h1>
            </div>
          </div>

          {/* Контент */}
          <div className="container mx-auto px-4 pb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-lg">
              <div className="space-y-8 text-[#ffecc6]">

                <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">1. Введение</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Пекарня &quot;СМЫСЛ есть&quot; уважает вашу приватность и обязуется защищать
              персональные данные. Настоящая политика конфиденциальности описывает,
              как мы собираем, используем и защищаем вашу информацию.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              2. Какую информацию мы собираем
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-3">Мы можем собирать следующую информацию:</p>
            <ul className="space-y-2 pl-6 list-disc text-base md:text-lg">
              <li>Имя и контактная информация (при оформлении заказа)</li>
              <li>Адрес доставки</li>
              <li>Информация об использовании сайта (логи, cookies)</li>
              <li>Информацию о ваших предпочтениях и интересах</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              3. Как мы используем вашу информацию
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-3">Мы используем собранную информацию для:</p>
            <ul className="space-y-2 pl-6 list-disc text-base md:text-lg">
              <li>Обработки заказов и доставки продукции</li>
              <li>Коммуникации с вами по поводу вашего заказа</li>
              <li>Улучшения нашего сайта и услуг</li>
              <li>Отправки информационных писем (с вашего согласия)</li>
              <li>Аналитики и статистики использования сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              4. Защита данных
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Мы используем современные методы безопасности для защиты ваших
              персональных данных от неавторизованного доступа, изменения,
              раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              5. Cookies
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Наш сайт использует cookies для улучшения пользовательского опыта.
              Вы можете отключить cookies в настройках браузера.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              6. Ваши права
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-3">У вас есть право:</p>
            <ul className="space-y-2 pl-6 list-disc text-base md:text-lg">
              <li>Запросить доступ к своим персональным данным</li>
              <li>Исправить неточные данные</li>
              <li>Удалить свои данные</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              7. Контакты
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-3">
              Если у вас есть вопросы о политике конфиденциальности, пожалуйста,
              свяжитесь с нами:
            </p>
            <ul className="list-none space-y-2 text-base md:text-lg">
              <li>
                📧 Email:{' '}
                <a href="mailto:info@smysl-est.ru" className="underline text-[#c1dedc] hover:opacity-80">
                  info@smysl-est.ru
                </a>
              </li>
              <li>
                📞 Телефон:{' '}
                <a href="tel:+79991234567" className="underline text-[#c1dedc] hover:opacity-80">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>📍 Адрес: 111675, Россия, г. Москва, ул. Святоозерская, дом 8</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#c1dedc]">
              8. Изменения политики
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Мы оставляем за собой право изменять данную политику
              конфиденциальности. Последнее обновление: январь 2026 г.
            </p>
          </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterClient seoData={seoData} />
    </>
  );
}
