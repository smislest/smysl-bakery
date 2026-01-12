// test-directus-fetch.js
// Минимальный тест fetch к Directus из Node.js (ESM)


import https from 'https';


const url = 'https://admin.smislest.ru/api/schema/collections';


(async () => {
  try {
    const agent = new https.Agent({ minVersion: 'TLSv1.2', rejectUnauthorized: false });
    const res = await fetch(url, { 
      agent,
      headers: {
        'Authorization': 'Bearer Ysoj__Fjk6I8vddYHp_ZH7EbGxcf4pG8'
      }
    });
    const json = await res.json();
    console.log('Успех! Ответ:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Ошибка fetch:', err);
  }
})();
