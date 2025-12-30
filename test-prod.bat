@echo off
REM Батник для тестирования production версии с ISR включенным
REM Этот батник имитирует production окружение Vercel
REM но требует NODE_TLS_REJECT_UNAUTHORIZED=0 для локального тестирования

REM Проверяем что приложение собрано
if not exist ".next" (
    echo Building application...
    call npm run build
)

echo.
echo =========================================
echo Starting production build (with ISR)
echo .env.production loaded
echo =========================================
echo.

setlocal enabledelayedexpansion

REM На Vercel переменная окружения НЕ нужна
REM Но на локальном сервере нужна для работы с SSL
set NODE_TLS_REJECT_UNAUTHORIZED=0
set NODE_ENV=production

npm start

endlocal
