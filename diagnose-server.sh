#!/bin/bash
# Диагностика проблемы на сервере

SERVER_IP="79.174.82.76"

echo "🔍 Диагностика сервера..."
echo "========================="

ssh root@$SERVER_IP << 'ENDSSH'
echo "📂 Файловая структура /opt/smysl-bakery:"
ls -la /opt/smysl-bakery/ | head -20

echo ""
echo "📦 Содержимое .next:"
ls -la /opt/smysl-bakery/.next/ 2>/dev/null || echo "❌ .next не найдена"

echo ""
echo "🔧 Процессы pm2:"
pm2 list

echo ""
echo "📝 Логи pm2 (последние 20 строк):"
pm2 logs smysl-bakery --lines 20 --nostream 2>/dev/null || echo "❌ Нет логов"

echo ""
echo "🐳 Docker контейнеры:"
docker ps -a

echo ""
echo "🌐 Проверка порта 3000:"
netstat -tlnp | grep 3000 || echo "❌ Порт 3000 не слушает"

echo ""
echo "🔍 Проверка HTTP ответа:"
curl -I http://localhost:3000 2>/dev/null | head -5

echo ""
echo "📄 Nginx конфиг:"
cat /etc/nginx/sites-available/smislest.ru 2>/dev/null | grep -A 5 "location"
ENDSSH

echo ""
echo "✅ Диагностика завершена"
