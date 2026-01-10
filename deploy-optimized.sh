#!/bin/bash
# Финальный деплой оптимизированной версии

set -e

echo "🚀 Deploying optimized version..."

# 1. Копируем .next
echo "📦 Uploading .next build..."
scp -r .next root@79.174.82.76:/opt/smysl-bakery/

# 2. Копируем обновленный next.config.js
echo "📝 Uploading next.config.js..."
scp next.config.js root@79.174.82.76:/opt/smysl-bakery/

# 3. Перезагружаем приложение
echo "🔄 Restarting application..."
ssh root@79.174.82.76 "cd /opt/smysl-bakery && pm2 restart smysl-bakery && sleep 2 && curl -s https://smislest.ru | head -c 100"

echo "✅ Deployment complete!"
echo "📊 Check PageSpeed Insights at https://pagespeed.web.dev/?url=https://smislest.ru"
