@echo off
REM =============================================================
REM  Beget deploy: thegreenstone.ru
REM  Загружает laboratoriya-dozhdy-deploy.zip и распаковывает
REM  на сервере через SSH (WinSCP).
REM
REM  ПЕРЕД ПЕРВЫМ ЗАПУСКОМ:
REM    1. Установите WinSCP: https://winscp.net/
REM    2. Откройте его, подключитесь к Beget (SFTP),
REM       введите хост/логин/пароль.
REM    3. Меню: Session -^> Generate Session URL/Code...
REM       выберите "Configuration file" (.ini format)
REM       и сохраните как winscp.ini рядом с этим .bat.
REM       Пароль будет зашифрован мастер-паролем.
REM    4. Запустите этот .bat.
REM =============================================================
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "INI=%SCRIPT_DIR%winscp.ini"
set "ZIP=%SCRIPT_DIR%laboratoriya-dozhdy-deploy.zip"

if not exist "%INI%" (
  echo [ERROR] winscp.ini not found: "%INI%"
  echo See instructions at the top of this file.
  exit /b 1
)

if not exist "%ZIP%" (
  echo [ERROR] Archive not found: "%ZIP%"
  echo Build it first, then re-create the zip.
  exit /b 1
)

echo [STEP 1/3] Upload zip...
winscp.exe /ini="%INI%" /script="%SCRIPT_DIR%upload.txt"
if errorlevel 1 (
  echo [ERROR] Upload failed.
  exit /b 1
)

echo.
echo [STEP 2/3] Unzip and set permissions on server...
winscp.exe /ini="%INI%" /script="%SCRIPT_DIR%post-upload.txt"
if errorlevel 1 (
  echo [ERROR] Post-upload failed.
  exit /b 1
)

echo.
echo [STEP 3/3] Done.
echo Open: https://thegreenstone.ru/
endlocal
