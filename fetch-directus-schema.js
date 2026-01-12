#!/usr/bin/env node
/**
 * Directus Schema Analyzer
 * Fetches all collections and fields from Directus instance
 */

const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://smysl-bakery-directus.onrender.com';
const TOKEN = 'Ysoj__Fjk6I8vddYHp_ZH7EbGxcf4pG8';

const options = {
  hostname: 'smysl-bakery-directus.onrender.com',
  port: 443,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  },
  rejectUnauthorized: false // Allow self-signed certificates
};

function fetchData(path) {
  return new Promise((resolve, reject) => {
    const requestOptions = { ...options, path };
    
    const req = https.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('\x1b[36m🔗 Connecting to Directus...\x1b[0m');
  console.log(`URL: ${BASE_URL}\n`);
  
  try {
    console.log('\x1b[33m📚 Fetching collections...\x1b[0m');
    const collectionsData = await fetchData('/admin/api/collections');
    console.log(`\x1b[32m✅ Found ${collectionsData.data.length} collections\x1b[0m`);
    
    console.log('\x1b[33m📋 Fetching fields...\x1b[0m');
    const fieldsData = await fetchData('/api/schema/fields');
    console.log(`\x1b[32m✅ Found ${fieldsData.data.length} fields\x1b[0m\n`);
    
    // Group fields by collection
    const fieldsByCollection = {};
    fieldsData.data.forEach(field => {
      const collection = field.collection;
      if (!fieldsByCollection[collection]) {
        fieldsByCollection[collection] = [];
      }
      fieldsByCollection[collection].push(field);
    });
    
    // Sort and display report
    console.log('\x1b[36m' + '='.repeat(80) + '\x1b[0m');
    console.log('СТРУКТУРА БД DIRECTUS');
    console.log('\x1b[36m' + '='.repeat(80) + '\x1b[0m\n');
    
    let report = 'СТРУКТУРА БД DIRECTUS\n';
    report += '='.repeat(80) + '\n\n';
    
    const collections = Object.keys(fieldsByCollection).sort();
    
    for (const collectionName of collections) {
      const fields = fieldsByCollection[collectionName].sort((a, b) => 
        a.field.localeCompare(b.field)
      );
      
      console.log(`\x1b[33mКОЛЛЕКЦИЯ: ${collectionName}\x1b[0m`);
      console.log(`  Полей: ${fields.length}`);
      
      report += `КОЛЛЕКЦИЯ: ${collectionName}\n`;
      report += `  Полей: ${fields.length}\n`;
      
      fields.forEach(field => {
        console.log(`  - ${field.field} [${field.type}]`);
        report += `  - ${field.field} [${field.type}]\n`;
      });
      
      console.log();
      report += '\n';
    }
    
    // Save to file
    fs.writeFileSync('directus-schema-report.txt', report, 'utf8');
    console.log('\x1b[32m💾 Report saved to: directus-schema-report.txt\x1b[0m');
    
  } catch (error) {
    console.error(`\x1b[31m❌ Error: ${error.message}\x1b[0m`);
    process.exit(1);
  }
}

main();
