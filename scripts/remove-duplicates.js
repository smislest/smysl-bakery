#!/usr/bin/env node
/**
 * Скрипт для удаления дубликатов из коллекций Directus
 * Оставляет только первую запись из каждой группы дубликатов
 */

const https = require('https');

const DIRECTUS_TOKEN = process.env.DIRECTUS_API_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('❌ Ошибка: DIRECTUS_API_TOKEN не установлен');
  process.exit(1);
}

async function fetchCollection(collection) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'admin.smislest.ru',
      path: `/items/${collection}?limit=-1`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

async function deleteItem(collection, id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'admin.smislest.ru',
      path: `/items/${collection}/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function removeDuplicates() {
  console.log('\n🗑️  Удаление дубликатов:\n');

  try {
    // FAQ
    console.log('📋 Обработка FAQ...');
    const faq = await fetchCollection('faq');
    const faqItems = faq.data || [];
    const faqSeen = new Map();
    const faqToDelete = [];

    faqItems.forEach((item) => {
      const key = item.question;
      if (!faqSeen.has(key)) {
        faqSeen.set(key, item.id);
      } else {
        faqToDelete.push(item.id);
      }
    });

    console.log(`  Найдено ${faqItems.length} записей, уникальных: ${faqSeen.size}, дубликатов: ${faqToDelete.length}`);
    
    for (const id of faqToDelete) {
      const result = await deleteItem('faq', id);
      if (result.status >= 200 && result.status < 300) {
        console.log(`  ✓ Удален дубликат ID: ${id}`);
      } else {
        console.log(`  ✗ Ошибка удаления ID: ${id}`);
      }
    }

    // Why Gluten Free
    console.log('\n💪 Обработка Why Gluten Free...');
    const why = await fetchCollection('why_gluten_free');
    const whyItems = why.data || [];
    const whySeen = new Map();
    const whyToDelete = [];

    whyItems.forEach((item) => {
      const key = item.title;
      if (!whySeen.has(key)) {
        whySeen.set(key, item.id);
      } else {
        whyToDelete.push(item.id);
      }
    });

    console.log(`  Найдено ${whyItems.length} записей, уникальных: ${whySeen.size}, дубликатов: ${whyToDelete.length}`);
    
    for (const id of whyToDelete) {
      const result = await deleteItem('why_gluten_free', id);
      if (result.status >= 200 && result.status < 300) {
        console.log(`  ✓ Удален дубликат ID: ${id}`);
      } else {
        console.log(`  ✗ Ошибка удаления ID: ${id}`);
      }
    }

    console.log('\n✅ Удаление дубликатов завершено!\n');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

removeDuplicates();
