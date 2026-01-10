#!/bin/bash
# Финальный скрипт деплоя через Docker

set -e

SERVER="root@79.174.82.76"
APP_DIR="/opt/smysl-bakery"

echo "🚀 Docker деплой smysl-bakery"
echo "================================"

# 1. Останавливаем PM2 если работает
echo ""
echo "1️⃣ Останавливаем PM2..."
ssh $SERVER "pm2 delete smysl-bakery 2>/dev/null || echo 'PM2 уже остановлен'"

# 2. Останавливаем старый web контейнер
echo ""
echo "2️⃣ Останавливаем старый web контейнер..."
ssh $SERVER "cd $APP_DIR && docker compose stop web 2>/dev/null || true"
ssh $SERVER "cd $APP_DIR && docker compose rm -f web 2>/dev/null || true"

# 3. Собираем новый образ
echo ""
echo "3️⃣ Собираем Docker образ (это может занять несколько минут)..."
ssh $SERVER "cd $APP_DIR && DOCKER_BUILD=true docker compose build --no-cache web"

# 4. Запускаем контейнер
echo ""
echo "4️⃣ Запускаем контейнер..."
ssh $SERVER "cd $APP_DIR && docker compose up -d web"

# 5. Ждём запуска
echo ""
echo "5️⃣ Ждём запуска приложения..."
sleep 10

# 6. Проверяем статус
echo ""
echo "6️⃣ Проверяем статус..."
ssh $SERVER "docker ps | grep web"

# 7. Проверяем HTTP ответ
echo ""
echo "7️⃣ Проверяем HTTP..."
ssh $SERVER "curl -s -I http://localhost:3000 | head -5"

# 8. Проверяем CSS
echo ""
echo "8️⃣ Проверяем CSS файлы..."
ssh $SERVER "curl -s -I https://smislest.ru/_next/static/chunks/f4f4da5172f569db.css | head -3"

echo ""
echo "✅ Деплой завершён!"
echo "🌐 Проверьте сайт: https://smislest.ru"
echo "📊 Логи: ssh $SERVER 'docker logs -f smysl-bakery-web'"
