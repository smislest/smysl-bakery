@echo off
REM Батник для запуска Next.js в development режиме
REM Development конфиг будет загружен из .env.local
REM
REM Требуется NODE_TLS_REJECT_UNAUTHORIZED=0 из-за проблем с SSL на локальном сервере

setlocal enabledelayedexpansion

REM Установка переменной окружения для Node.js (только для development)
set NODE_TLS_REJECT_UNAUTHORIZED=0
set NODE_ENV=development

REM Запуск приложения
npm run dev

endlocal
