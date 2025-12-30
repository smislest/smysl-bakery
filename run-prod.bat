@echo off
REM Батник для запуска Next.js в production режиме на локальном сервере
REM Production конфиг будет загружен из .env.production
REM 
REM Важно: На локальном сервере требуется отключение SSL проверки 
REM из-за проблем с OpenSSL при соединении с Directus
REM На Vercel это не требуется

setlocal enabledelayedexpansion

REM Установка переменной окружения для Node.js (только для development)
set NODE_TLS_REJECT_UNAUTHORIZED=0
set NODE_ENV=production

REM Запуск приложения
npm start

endlocal
