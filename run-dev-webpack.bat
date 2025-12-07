@echo off
REM Запуск Next.js dev с webpack (без Turbopack)
set NEXT_DISABLE_TURBOPACK=1
cd /d "%~dp0"
node node_modules\next\dist\bin\next dev -H 127.0.0.1 -p 3003
