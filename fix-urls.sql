-- Заменяем старые URL Render на новый домен
UPDATE news SET content = REPLACE(content, 'https://smysl-bakery-directus.onrender.com/assets/', 'https://admin.smislest.ru/assets/');

-- Проверяем результат
SELECT id, title, 
  CASE WHEN content LIKE '%onrender%' THEN 'Still has old URL' ELSE 'OK' END as status
FROM news;
