import https from 'https';

const TOKEN = 'Ysoj__Fjk6I8vddYHp_ZH7EbGxcf4pG8';
const DIRECTUS_URL = 'https://admin.smislest.ru';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const agent = new https.Agent({ rejectUnauthorized: false });
    
    const options = {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      agent
    };
    
    https.get(new URL(url), options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getDirectusSchema() {
  console.log('=== DIRECTUS SCHEMA ===\n');
  
  try {
    // Получаем коллекции
    console.log('📋 Получаем коллекции...');
    const collectionsData = await makeRequest(`${DIRECTUS_URL}/api/schema/collections`);
    console.log(`✓ Коллекций найдено: ${collectionsData.data.length}\n`);
    
    // Получаем поля
    console.log('📋 Получаем поля...');
    const fieldsData = await makeRequest(`${DIRECTUS_URL}/api/schema/fields`);
    console.log(`✓ Полей найдено: ${fieldsData.data.length}\n`);
    
    // Группируем по коллекциям
    const grouped = {};
    fieldsData.data.forEach(field => {
      if (!grouped[field.collection]) {
        grouped[field.collection] = [];
      }
      grouped[field.collection].push(field);
    });
    
    // Выводим результаты
    console.log('=== ПОЛНАЯ СТРУКТУРА DIRECTUS ===\n');
    
    Object.keys(grouped).sort().forEach(collectionName => {
      const fields = grouped[collectionName];
      console.log(`📋 ${collectionName.toUpperCase()}`);
      console.log(`   Полей в коллекции: ${fields.length}`);
      
      fields.forEach(field => {
        console.log(`     • ${field.field} [${field.type}]`);
      });
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.error(error);
  }
}

getDirectusSchema();
