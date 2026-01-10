@echo off
chcp 65001 >nul
echo ========================================
echo 🐳 Локальное тестирование Docker сборки
echo ========================================
echo.

REM Проверяем наличие Docker
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker не установлен!
    echo Установите Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker найден
echo.

REM Проверяем .env.production
if not exist .env.production (
    echo ⚠️  Файл .env.production не найден
    echo Создаём из примера...
    copy .env.production.example .env.production
    echo.
    echo ⚠️  ВАЖНО: Отредактируйте .env.production и замените значения на реальные!
    echo Затем запустите этот скрипт снова.
    pause
    exit /b 1
)

echo ✅ Файл .env.production найден
echo.

echo 🔨 Собираем Docker образ...
docker compose build

if %errorlevel% neq 0 (
    echo ❌ Ошибка при сборке образа
    pause
    exit /b 1
)

echo ✅ Образ собран успешно
echo.

echo ▶️  Запускаем контейнер...
docker compose up -d

if %errorlevel% neq 0 (
    echo ❌ Ошибка при запуске контейнера
    pause
    exit /b 1
)

echo.
echo ✅ Контейнер запущен!
echo.
echo 📍 Приложение доступно на: http://localhost:3000
echo.
echo 📊 Полезные команды:
echo    docker compose ps           - Статус контейнеров
echo    docker compose logs -f web  - Просмотр логов
echo    docker compose down         - Остановить контейнеры
echo    docker compose restart      - Перезапустить
echo.

pause
