-- Глобальная замена всех ссылок onrender на новый домен
UPDATE news SET content = REPLACE(content, 'https://smysl-bakery-directus.onrender.com', 'https://admin.smislest.ru');
UPDATE news SET rawContent = REPLACE(rawContent, 'https://smysl-bakery-directus.onrender.com', 'https://admin.smislest.ru');

-- Проверка результата
SELECT 'news' as table_name, COUNT(*) as updated 
FROM news 
WHERE content LIKE '%onrender%' OR rawContent LIKE '%onrender%';
