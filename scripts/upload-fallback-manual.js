#!/usr/bin/env node
/**
 * Manually upload fallback data to Supabase S3
 * Usage: node scripts/upload-fallback-manual.js
 */

const fs = require('fs');
const path = require('path');

// Simple .env loader
function loadEnv(filePath) {
  const envFile = fs.readFileSync(filePath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      let value = valueParts.join('=').trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key.trim()] = value;
    }
  });
}

loadEnv(path.join(__dirname, '..', '.env.local'));

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const endpoint = process.env.SUPABASE_S3_ENDPOINT;
const region = process.env.SUPABASE_S3_REGION || 'eu-central-1';
const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY;
const secretAccessKey = process.env.SUPABASE_S3_SECRET_KEY;
const bucket = process.env.SUPABASE_S3_BUCKET || 'SMYSL_BAKERY_STORAGE';

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.error('❌ Missing Supabase S3 env vars:', { endpoint: !!endpoint, accessKeyId: !!accessKeyId, secretAccessKey: !!secretAccessKey });
  process.exit(1);
}

const s3Client = new S3Client({
  region,
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
});

// Test fallback data - using real data from lib/news.ts
const testNews = [
  {
    id: "1",
    date: "2025-11-11",
    title: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!',
    excerpt: "Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси!",
    slug: "khleb-goda-2026",
    news_photo: null,
    content: 'Победа в номинации «Хлеб года 2026» на международном фестивале хлеба в штате Нью-Джерси! Мы невероятно гордимся этим достижением и благодарны всем, кто поддержал нас в этом пути. Наш безглютеновый хлеб завоевал сердца экспертов своим неповторимым вкусом и качеством. Это признание мотивирует нас продолжать совершенствовать наш ремесло и радовать вас ещё более вкусными продуктами!',
  },
  {
    id: "2",
    date: "2026-10-10",
    title: "Мы открыли новую хлебную лавку в центре Москвы",
    excerpt: "Мы открыли новую хлебную лавку в центре Москвы. В ассортименте не только хлеб! Но и кое-что ещё...",
    slug: "novaya-lavka-moskva",
    news_photo: null,
    content: "Мы рады представить новую хлебную лавку в центре Москвы",
  },
  {
    id: "3",
    date: "2026-08-01",
    title: "Встречайте новинку!",
    excerpt: "Встречайте новинку! Мы приготовили безглютеновый хлеб с добавлением чёрной каракатицы!",
    slug: "novinka-chernaya-karakatica",
    news_photo: null,
    content: "Встречайте новинку! Мы приготовили безглютеновый хлеб с добавлением чёрной каракатицы!",
  },
  {
    id: "4",
    date: "2026-07-15",
    title: "Новинка из Directus - свежая новость",
    excerpt: "Это новая новость которую мы добавили в Directus",
    slug: "svezha-novost-iz-directus",
    news_photo: null,
    content: "Содержание новой новости из Directus",
  },
  {
    id: "5",
    date: "2026-06-01",
    title: "Ещё одна новость",
    excerpt: "Пятая новость для проверки fallback",
    slug: "esche-odna-novost",
    news_photo: null,
    content: "Полное содержание пятой новости",
  },
];

const testProducts = [
  {
    id: "1",
    slug: "bezglutenovyy-hleb",
    title: "Безглютеновый хлеб",
    description: "Наш фирменный безглютеновый хлеб из натуральных ингредиентов",
  },
  {
    id: "2",
    slug: "hleb-bez-moloka",
    title: "Хлеб без молока",
    description: "Веганский хлеб без молочных продуктов",
  },
  {
    id: "3",
    slug: "zakvaska-hleb",
    title: "Хлеб на закваске",
    description: "Традиционный хлеб на натуральной закваске",
  },
  {
    id: "4",
    slug: "zhitnyy-hleb",
    title: "Ржаной хлеб",
    description: "Классический ржаной хлеб",
  },
  {
    id: "5",
    slug: "kukuruznyy-hleb",
    title: "Кукурузный хлеб",
    description: "Хлеб с кукурузной мукой",
  },
  {
    id: "6",
    slug: "novyy-produkt",
    title: "Новый продукт из Directus",
    description: "Это новый продукт который мы добавили",
  },
];

async function uploadJson(key, data) {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
      CacheControl: 'no-cache',
    });

    await s3Client.send(command);
    console.log(`✅ Uploaded ${key} (${JSON.stringify(data).length} bytes)`);
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

async function main() {
  console.log('📤 Uploading fallback data to Supabase...');
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Bucket: ${bucket}`);
  console.log('');

  try {
    await uploadJson('news.json', testNews);
    await uploadJson('products.json', testProducts);
    console.log('');
    console.log('✅ All fallback data uploaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Upload failed');
    process.exit(1);
  }
}

main();
