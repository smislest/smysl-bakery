# Исправление проблемы с URL Directus

## Проблема
После миграции Directus с `smysl-bakery-directus.onrender.com` на `admin.smislest.ru`, сайт продолжал загружать изображения со старого URL.

## Корневая причина
При выполнении `npm run build` переменные окружения из `.env` файла **не загружались автоматически**. Next.js не видел `process.env.NEXT_PUBLIC_DIRECTUS_URL` и `process.env.DIRECTUS_URL` во время сборки, поэтому использовал hardcoded fallback значения.

## Анализ
1. **Проверка .env на сервере**: ✅ Файл содержал правильные значения
   ```bash
   NEXT_PUBLIC_DIRECTUS_URL=https://admin.smislest.ru
   DIRECTUS_URL=https://admin.smislest.ru
   ```

2. **Проверка lib/directus.ts**: ✅ Код правильный с fallback
   ```typescript
   export const DIRECTUS_URL =
     process.env.NEXT_PUBLIC_DIRECTUS_URL ||
     process.env.DIRECTUS_URL ||
     'https://admin.smislest.ru';
   ```

3. **Проверка HTML выдачи**: ❌ Содержал 200 упоминаний старого URL
   ```bash
   curl http://localhost:3000 | grep -o 'onrender\.com' | wc -l
   # Результат: 200
   ```

4. **Проверка логов pm2**: ❌ Показали использование старого URL
   ```
   imageUrl: 'https://smysl-bakery-directus.onrender.com/assets/...'
   ```

## Решение
Обновлена команда `build` в `package.json` для явной установки переменных окружения:

**Было:**
```json
"build": "next build"
```

**Стало:**
```json
"build": "cross-env NEXT_PUBLIC_DIRECTUS_URL=https://admin.smislest.ru DIRECTUS_URL=https://admin.smislest.ru next build"
```

## Процедура пересборки
```bash
# На сервере
cd /opt/smysl-bakery
pm2 stop smysl-bakery
rm -rf .next
npm run build

# Workaround для Next.js 16.1.1 Turbopack bug
# (на локальной машине)
scp prerender-manifest.json root@79.174.82.76:/opt/smysl-bakery/.next/

# Перезапуск
pm2 restart smysl-bakery
```

## Проверка результата
```bash
# Новый URL (должно быть ~192)
curl -s http://localhost:3000 | grep -o 'admin\.smislest\.ru' | wc -l

# Старый URL (должно быть 0)
curl -s http://localhost:3000 | grep -o 'onrender\.com' | wc -l
```

**Результат после исправления:**
- ✅ 192 упоминания `admin.smislest.ru`
- ✅ 0 упоминаний `onrender.com`

## Почему не работал .env автоматически?
Next.js **загружает** `.env` файлы, но только в runtime (во время работы сервера). Для SSG (Static Site Generation) переменные окружения должны быть **доступны во время билда** - либо через явную установку (`export`), либо через `cross-env`, либо через `.env.local` (который Next.js читает при билде).

## Альтернативные решения
1. **Использовать .env.local** (Next.js читает его автоматически при билде)
2. **Использовать dotenv в package.json**:
   ```json
   "build": "node -r dotenv/config node_modules/.bin/next build"
   ```
3. **Установить переменные в pm2 ecosystem.config.js**
4. **Использовать системные переменные окружения**

## Lessons Learned
- SSG в Next.js использует данные **во время сборки**, а не runtime
- Переменные окружения должны быть доступны процессу `npm run build`
- `cross-env` - универсальный способ передачи переменных (работает на Windows/Linux)
- Fallback значения в коде НЕ ЗАМЕНЯЮТ загрузку переменных окружения при билде
