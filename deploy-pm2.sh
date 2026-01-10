#!/bin/bash
# Деплой для pm2 (без Docker)

set -e

SERVER_IP="79.174.82.76"
SERVER_PATH="/opt/smysl-bakery"

echo "🚀 Deploying to pm2 (non-Docker mode)..."

# 1. Собираем локально БЕЗ standalone режима
echo "🔨 Building locally for pm2..."
export DOCKER_BUILD=false
npm run build

# 2. Копируем все необходимые файлы
echo "📦 Uploading files..."
ssh root@$SERVER_IP "mkdir -p $SERVER_PATH"

# Копируем package.json и package-lock.json
scp package.json package-lock.json root@$SERVER_IP:$SERVER_PATH/

# Копируем next.config.js
scp next.config.js root@$SERVER_IP:$SERVER_PATH/

# Копируем .next папку
echo "📂 Uploading .next build..."
rsync -avz --delete .next/ root@$SERVER_IP:$SERVER_PATH/.next/

# Копируем public папку
echo "📂 Uploading public assets..."
rsync -avz --delete public/ root@$SERVER_IP:$SERVER_PATH/public/

# Копируем app папку (на случай если нужны статические файлы)
echo "📂 Uploading app folder..."
rsync -avz --delete app/ root@$SERVER_IP:$SERVER_PATH/app/

# 3. Устанавливаем зависимости на сервере
echo "📥 Installing dependencies on server..."
ssh root@$SERVER_IP "cd $SERVER_PATH && npm ci --production"

# 4. Проверяем/обновляем .env.production
echo "🔍 Checking .env.production..."
if [ -f .env.production ]; then
    scp .env.production root@$SERVER_IP:$SERVER_PATH/
else
    echo "⚠️  Warning: .env.production not found locally"
fi

# 5. Перезапускаем приложение
echo "🔄 Restarting application..."
ssh root@$SERVER_IP << 'ENDSSH'
cd /opt/smysl-bakery
# Останавливаем старый процесс
pm2 delete smysl-bakery 2>/dev/null || true
# Запускаем новый
pm2 start npm --name smysl-bakery -- start
pm2 save
pm2 list
ENDSSH

# 6. Проверяем работоспособность
echo "✅ Testing..."
sleep 3
ssh root@$SERVER_IP "curl -s http://localhost:3000 | head -c 200"

echo ""
echo "🎉 Deployment complete!"
echo "🌐 Check: https://smislest.ru"
echo "📊 Logs: ssh root@$SERVER_IP 'pm2 logs smysl-bakery'"
