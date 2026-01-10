#!/bin/bash
# Автоматический деплой через Git

set -e

echo "🚀 Starting Git deployment..."

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Коммит и пуш изменений
echo -e "${BLUE}📝 Committing changes...${NC}"
git add .
read -p "Enter commit message: " commit_msg
git commit -m "$commit_msg" || echo "No changes to commit"

echo -e "${BLUE}⬆️  Pushing to GitHub...${NC}"
git push origin main

# 2. Деплой на сервер
echo -e "${BLUE}🌐 Deploying to server...${NC}"
ssh root@79.174.82.76 << 'ENDSSH'
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
ENDSSH

echo -e "${GREEN}🎉 All done! Site is live!${NC}"
echo -e "${YELLOW}📊 Check: https://smislest.ru${NC}"
