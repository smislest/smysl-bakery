-- Обновляем последнюю новость с прямыми ссылками на onrender в rawContent
UPDATE news 
SET content = REPLACE(content, 'https://smysl-bakery-directus.onrender.com', 'https://admin.smislest.ru')
WHERE slug = 'v-gorode-otkrylsya-novyy-ugolok-zdorovya-bezglyutenovaya-pekarnya-smysl-est';

-- Проверяем результат
SELECT slug, 
  CASE WHEN content LIKE '%onrender%' THEN 'Has old URL' ELSE 'OK' END as status
FROM news 
WHERE slug = 'v-gorode-otkrylsya-novyy-ugolok-zdorovya-bezglyutenovaya-pekarnya-smysl-est';
