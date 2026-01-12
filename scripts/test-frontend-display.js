#!/usr/bin/env node
/**
 * Скрипт для создания тестовой записи в FAQ и проверки отображения на фронте
 */

const https = require('https');

const DIRECTUS_TOKEN = process.env.DIRECTUS_API_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('❌ Ошибка: DIRECTUS_API_TOKEN не установлен');
  process.exit(1);
}

async function createFAQ(data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'admin.smislest.ru',
      path: '/items/faq',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function checkFrontend() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/faq',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function test() {
  console.log('\n🧪 Тестирование отображения данных на фронте:\n');

  try {
    // Создаем тестовую запись
    console.log('1️⃣ Создаю тестовую запись в FAQ...');
    const testFaq = {
      question: '🧪 ТЕСТОВЫЙ ВОПРОС - Можно ли заказать безглютеновый торт на день рождения?',
      answer: 'Да! Мы с удовольствием создадим для вас уникальный безглютеновый торт на любой праздник. Свяжитесь с нами для обсуждения дизайна и вкуса.',
    };

    const createResult = await createFAQ(testFaq);
    if (createResult.status >= 200 && createResult.status < 300) {
      console.log('   ✅ Тестовая запись создана, ID:', createResult.data.data.id);
      
      // Ждем немного для ISR
      console.log('\n2️⃣ Ожидаю 3 секунды для обновления кеша...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Проверяем на фронте
      console.log('\n3️⃣ Проверяю отображение через /api/faq...');
      const frontendResult = await checkFrontend();
      
      if (frontendResult.status === 200) {
        const faqItems = Array.isArray(frontendResult.data) ? frontendResult.data : [];
        const testItem = faqItems.find(item => item.question && item.question.includes('🧪 ТЕСТОВЫЙ'));
        
        console.log(`   Всего FAQ записей: ${faqItems.length}`);
        
        if (testItem) {
          console.log('   ✅ Тестовая запись найдена на фронте!');
          console.log(`   Вопрос: ${testItem.question}`);
        } else {
          console.log('   ⚠️  Тестовая запись НЕ найдена на фронте');
          console.log('   Возможно нужно очистить кеш Next.js');
        }
      } else {
        console.log(`   ❌ Ошибка получения данных с фронта: ${frontendResult.status}`);
      }
    } else {
      console.log('   ❌ Ошибка создания записи:', createResult.status);
    }

    console.log('\n✅ Тестирование завершено!\n');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Убедитесь, что dev сервер запущен на localhost:3000');
    }
  }
}

test();
