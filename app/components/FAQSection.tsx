"use client";

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Что такое глютен и почему он вреден?",
    answer: "Глютен — это белок, содержащийся в пшенице, ржи и ячмене. Он может вызывать проблемы у людей с целиакией, непереносимостью глютена или чувствительностью к нему. Безглютеновая диета помогает избежать воспалений и улучшить общее самочувствие."
  },
  {
    question: "Кому подходит безглютеновая выпечка?",
    answer: "Наша выпечка идеальна для людей с целиакией, непереносимостью глютена, а также для тех, кто просто хочет питаться более осознанно и разнообразно. Многие выбирают безглютеновые продукты для улучшения пищеварения и общего самочувствия."
  },
  {
    question: "Из чего делается безглютеновая выпечка?",
    answer: "Мы используем только натуральные ингредиенты: рисовую, кукурузную, гречневую муку, миндальную муку, псиллиум и другие безглютеновые альтернативы. Все наши продукты изготавливаются из качественного сырья без искусственных добавок."
  },
  {
    question: "Отличается ли вкус от обычной выпечки?",
    answer: "Нет! Мы гордимся тем, что наша безглютеновая выпечка такая же вкусная и ароматная, как традиционная. Благодаря тщательно подобранным рецептам и технологиям, наши изделия получаются мягкими, пышными и невероятно вкусными."
  },
  {
    question: "Как долго хранится ваша выпечка?",
    answer: "Свежая выпечка хранится 3-5 дней при комнатной температуре в герметичной упаковке. Для более длительного хранения (до 1 месяца) рекомендуем заморозить продукты сразу после получения."
  },
  {
    question: "Как оформить заказ?",
    answer: "Вы можете оформить заказ через наш сайт, написать нам в Telegram или Instagram, либо позвонить по телефону. Мы предлагаем доставку по Москве и самовывоз."
  },
  {
    question: "Какая стоимость доставки?",
    answer: "Доставка по Москве стоит от 500 ₽. При заказе от 3000 ₽ доставка бесплатная. Самовывоз всегда бесплатный."
  },
  {
    question: "Можно ли заказать торт на заказ?",
    answer: "Да! Мы принимаем индивидуальные заказы на торты и другую выпечку. Свяжитесь с нами для обсуждения деталей, и мы создадим для вас уникальный безглютеновый десерт."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org разметка для FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Schema.org разметка */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#c1dedc] mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-[#ffecc6]">
              Отвечаем на самые популярные вопросы о безглютеновой выпечке
            </p>
          </div>

          {/* FAQ список */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/20 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-lg text-[#c1dedc] pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 text-[#ffecc6] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 text-[#ffecc6] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительный CTA */}
          <div className="mt-12 text-center">
            <p className="text-[#ffecc6] mb-4">
              Не нашли ответ на свой вопрос?
            </p>
            <a
              href="/contacts"
              className="inline-block px-8 py-3 bg-[#ffecc6] text-[#544a44] font-semibold rounded-full hover:opacity-90 transition-colors shadow-lg"
            >
              Свяжитесь с нами
            </a>
          </div>
      </div>
    </section>
  );
}
