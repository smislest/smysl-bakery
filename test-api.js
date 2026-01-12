#!/usr/bin/env node

/**
 * Скрипт для тестирования API routes локально
 * Используется: node test-api.js
 */

const tests = [
  {
    name: 'GET /api/header',
    url: 'http://localhost:3000/api/header',
    timeout: 5000,
  },
  {
    name: 'GET /api/news',
    url: 'http://localhost:3000/api/news',
    timeout: 5000,
  },
  {
    name: 'GET /api/products',
    url: 'http://localhost:3000/api/products',
    timeout: 5000,
  },
  {
    name: 'GET /api/menu',
    url: 'http://localhost:3000/api/menu',
    timeout: 5000,
  },
  {
    name: 'GET /api/site',
    url: 'http://localhost:3000/api/site',
    timeout: 5000,
  },
];

async function testAPIs() {
  console.log('🧪 Тестирование API Routes...\n');
  
  for (const test of tests) {
    try {
      const response = await fetch(test.url, {
        method: 'GET',
        signal: AbortSignal.timeout(test.timeout),
      });

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      const dataPreview = typeof data === 'string' 
        ? data.substring(0, 100)
        : JSON.stringify(data).substring(0, 100);

      console.log(`✅ ${test.name}`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Data preview: ${dataPreview}...`);
      console.log();
    } catch (error) {
      console.log(`❌ ${test.name}`);
      console.log(`   Error: ${error.message}`);
      console.log();
    }
  }
}

testAPIs();
