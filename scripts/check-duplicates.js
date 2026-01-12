#!/usr/bin/env node
/**
 * Скрипт для проверки дубликатов записей в коллекциях Directus
 * Использование: DIRECTUS_API_TOKEN=xxx node check-duplicates.js
 */

const https = require('https');

const DIRECTUS_URL = 'https://admin.smislest.ru';
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
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function checkDuplicates() {
  console.log('\n🔍 Проверка дубликатов в коллекциях:\n');

  try {
    // FAQ
    console.log('📋 Проверяю FAQ...');
    const faq = await fetchCollection('faq');
    const faqItems = faq.data || [];
    const faqQuestions = {};
    faqItems.forEach((item) => {
      const q = item.question;
      if (!faqQuestions[q]) faqQuestions[q] = 0;
      faqQuestions[q]++;
    });
    const faqDupes = Object.entries(faqQuestions).filter(([k, v]) => v > 1);
    console.log(`📋 FAQ (${faqItems.length} записей):`);
    if (faqDupes.length > 0) {
      faqDupes.forEach(([q, count]) => {
        console.log(`  ⚠️  Дубликат: "${q.substring(0, 60)}..." - ${count} раз`);
      });
    } else {
      console.log('  ✅ Дубликатов не найдено');
    }

    // Why Gluten Free
    console.log('\n💪 Проверяю Why Gluten Free...');
    const why = await fetchCollection('why_gluten_free');
    const whyItems = why.data || [];
    const whyTitles = {};
    whyItems.forEach((item) => {
      const t = item.title;
      if (!whyTitles[t]) whyTitles[t] = 0;
      whyTitles[t]++;
    });
    const whyDupes = Object.entries(whyTitles).filter(([k, v]) => v > 1);
    console.log(`💪 Why Gluten Free (${whyItems.length} записей):`);
    if (whyDupes.length > 0) {
      whyDupes.forEach(([t, count]) => {
        console.log(`  ⚠️  Дубликат: "${t}" - ${count} раз`);
      });
    } else {
      console.log('  ✅ Дубликатов не найдено');
    }

    // News
    console.log('\n📰 Проверяю News...');
    const news = await fetchCollection('news');
    const newsItems = news.data || [];
    const newsTitles = {};
    const newsSlugs = {};
    newsItems.forEach((item) => {
      if (item.title) {
        if (!newsTitles[item.title]) newsTitles[item.title] = 0;
        newsTitles[item.title]++;
      }
      if (item.slug) {
        if (!newsSlugs[item.slug]) newsSlugs[item.slug] = 0;
        newsSlugs[item.slug]++;
      }
    });
    const newsTitleDupes = Object.entries(newsTitles).filter(([k, v]) => v > 1);
    const newsSlugDupes = Object.entries(newsSlugs).filter(([k, v]) => v > 1);
    console.log(`📰 News (${newsItems.length} записей):`);
    if (newsTitleDupes.length > 0) {
      console.log('  По title:');
      newsTitleDupes.forEach(([t, count]) => {
        console.log(`    ⚠️  "${t.substring(0, 60)}..." - ${count} раз`);
      });
    }
    if (newsSlugDupes.length > 0) {
      console.log('  По slug:');
      newsSlugDupes.forEach(([s, count]) => {
        console.log(`    ⚠️  "${s}" - ${count} раз`);
      });
    }
    if (newsTitleDupes.length === 0 && newsSlugDupes.length === 0) {
      console.log('  ✅ Дубликатов не найдено');
    }

    // Products
    console.log('\n🛒 Проверяю Products...');
    const products = await fetchCollection('products');
    const prodItems = products.data || [];
    const prodTitles = {};
    prodItems.forEach((item) => {
      if (item.title) {
        if (!prodTitles[item.title]) prodTitles[item.title] = 0;
        prodTitles[item.title]++;
      }
    });
    const prodDupes = Object.entries(prodTitles).filter(([k, v]) => v > 1);
    console.log(`🛒 Products (${prodItems.length} записей):`);
    if (prodDupes.length > 0) {
      prodDupes.forEach(([t, count]) => {
        console.log(`  ⚠️  Дубликат: "${t}" - ${count} раз`);
      });
    } else {
      console.log('  ✅ Дубликатов не найдено');
    }

    console.log('\n✅ Проверка завершена!\n');
  } catch (error) {
    console.error('❌ Ошибка при проверке:', error.message);
    process.exit(1);
  }
}

checkDuplicates();
