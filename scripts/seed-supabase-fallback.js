/*
 * Fetch news/products from Directus and store last-good snapshots to Supabase S3.
 * Usage (from repo root):
 *   node scripts/seed-supabase-fallback.js
 * Env: uses process.env; also auto-loads .env.local and .env if present (simple parser).
 */

// Allow self-signed certs (same as dev environment)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Fix SSL session errors on Windows (like undici agent in directus.ts)
const initializeUndiciAgent = async () => {
  try {
    const { Agent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new Agent({ connect: { maxCachedSessions: 0 } }));
  } catch (err) {
    console.warn('Could not configure undici agent:', err.message);
  }
};

initializeUndiciAgent().catch(() => {});

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Minimal .env loader (avoids adding deps)
function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
      val = val.slice(1, -1);
    }
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'https://smysl-bakery-directus.onrender.com';
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN || '';

const endpoint = process.env.SUPABASE_S3_ENDPOINT;
const region = process.env.SUPABASE_S3_REGION || 'eu-central-1';
const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY;
const secretAccessKey = process.env.SUPABASE_S3_SECRET_KEY;
const bucket = process.env.SUPABASE_S3_BUCKET || 'SMYSL_BAKERY_STORAGE';
const newsKey = process.env.SUPABASE_NEWS_KEY || 'news.json';
const productsKey = process.env.SUPABASE_PRODUCTS_KEY || 'products.json';

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.error('Missing Supabase S3 env: SUPABASE_S3_ENDPOINT / ACCESS_KEY / SECRET_KEY');
  process.exit(1);
}

const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

async function fetchCollection(collection, fields, sort) {
  const url = new URL(`${DIRECTUS_URL}/items/${collection}`);
  if (fields) url.searchParams.set('fields', fields);
  if (sort) url.searchParams.set('sort', sort);
  const headers = { 'Content-Type': 'application/json' };
  if (DIRECTUS_TOKEN) headers['Authorization'] = `Bearer ${DIRECTUS_TOKEN}`;
  
  try {
    const axios = require('axios');
    const https = require('https');
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      keepAliveTimeout: 1000,
      timeout: 5000
    });
    const res = await axios.get(url.toString(), { 
      headers, 
      httpsAgent,
      timeout: 10000
    });
    return res.data?.data || [];
  } catch (err) {
    throw new Error(`Failed to fetch ${collection}: ${err.message}`);
  }
}

async function putJson(key, data) {
  const body = JSON.stringify(data, null, 2);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: 'application/json',
    CacheControl: 'no-cache',
  }));
  console.log(`✅ Saved ${key} (${Array.isArray(data) ? data.length : 0} items)`);
}

(async () => {
  try {
    console.log('Directus URL:', DIRECTUS_URL);

    console.log('→ Fetching news from Directus...');
    const news = await fetchCollection(
      'news',
      'id,slug,title,excerpt,date,content,news_photo.id,news_photo.filename_disk',
      '-date'
    );
    if (!Array.isArray(news) || news.length === 0) {
      throw new Error('Directus returned no news');
    }
    await putJson(newsKey, news);

    console.log('→ Fetching products from Directus...');
    const products = await fetchCollection(
      'products',
      'id,title,subtitle,description,ingredients,weight,product_photo.id,product_photo.filename_disk'
    );
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Directus returned no products');
    }
    await putJson(productsKey, products);

    console.log('🎉 Done.');
  } catch (err) {
    console.error('❌ Seed failed:', err?.message || err);
    process.exit(1);
  }
})();
