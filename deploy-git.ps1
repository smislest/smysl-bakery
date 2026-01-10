# PowerShell версия автодеплоя через Git
# Используйте этот скрипт на Windows

Write-Host "🚀 Starting Git deployment..." -ForegroundColor Cyan

# 1. Коммит и пуш изменений
Write-Host "`n📝 Committing changes..." -ForegroundColor Blue
git add .

$commitMsg = Read-Host "Enter commit message"
if ($commitMsg) {
    git commit -m $commitMsg
} else {
    Write-Host "No commit message provided, skipping commit" -ForegroundColor Yellow
}

Write-Host "`n⬆️  Pushing to GitHub..." -ForegroundColor Blue
git push origin main

# 2. Деплой на сервер
Write-Host "`n🌐 Deploying to server..." -ForegroundColor Blue

$deployScript = @'
set -e
cd /opt/smysl-bakery

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --production

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart smysl-bakery

echo "✅ Deployment complete!"
pm2 status
'@

ssh root@79.174.82.76 $deployScript

Write-Host "`n🎉 All done! Site is live!" -ForegroundColor Green
Write-Host "📊 Check: https://smislest.ru" -ForegroundColor Yellow
