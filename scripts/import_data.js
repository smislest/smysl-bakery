#!/usr/bin/env node

const BASE_URL = "https://admin.smislest.ru";
const EMAIL = "pablomarokone@gmail.com";
const PASSWORD = "gochacat1987S";

async function importData() {
  try {
    // Login
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD })
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      throw new Error(`Login failed: ${loginResponse.status} - ${errorText}`);
    }

    const loginData = await loginResponse.json();
    
    if (!loginData.data || !loginData.data.access_token) {
      throw new Error(`Invalid login response: ${JSON.stringify(loginData)}`);
    }

    const token = loginData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    console.log(`Authorized: ${loginData.data.user?.first_name || 'User'}`);

    // FAQ Items
    const faqItems = [
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

    console.log("\nImporting FAQ items...");
    for (const item of faqItems) {
      const response = await fetch(`${BASE_URL}/items/faq`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item)
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`  ✓ ${item.question.substring(0, 50)}...`);
      } else {
        const errorText = await response.text();
        console.log(`  ✗ Error: ${response.status} - ${errorText}`);
      }
    }

    // WhyGlutenFree Items
    const whyItems = [
      {
        title: "Для здоровья",
        description: "Безглютеновое питание помогает улучшить пищеварение, снизить воспаление и повысить уровень энергии",
        icon: "heart"
      },
      {
        title: "100% натурально",
        description: "Используем только качественные натуральные ингредиенты без искусственных добавок и консервантов",
        icon: "check-circle"
      },
      {
        title: "Вкусно",
        description: "Доказываем, что безглютеновая выпечка может быть не только полезной, но и невероятно вкусной",
        icon: "smile"
      },
      {
        title: "Для всех",
        description: "Наша выпечка подходит людям с целиакией, непереносимостью глютена и тем, кто выбирает осознанное питание",
        icon: "users"
      }
    ];

    console.log("\nImporting WhyGlutenFree items...");
    for (const item of whyItems) {
      const response = await fetch(`${BASE_URL}/items/why_gluten_free`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item)
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`  ✓ ${item.title}`);
      } else {
        const errorText = await response.text();
        console.log(`  ✗ Error: ${response.status} - ${errorText}`);
      }
    }

    console.log("\n✓ All data imported successfully!");

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

importData();
