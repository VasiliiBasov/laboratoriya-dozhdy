@echo off
REM =============================================================
REM  Beget deploy: thegreenstone.ru  ->  Лаборатория дождя
REM  Загружает laboratoriya-dozhdy-deploy.zip и распаковывает
REM  на сервере через SSH (WinSCP).
REM
REM  ПЕРЕД ПЕРВЫМ ЗАПУСКОМ:
REM    1. Установите WinSCP: https://winscp.net/
REM    2. В панели Beget (cp.beget.com -> FTP) УЖЕ СОЗДАН FTP-аккаунт
REM       с включённым SSH:
REM         Логин:   lizaptsw_1234
REM         Пароль:  YfaFXyEOg*1%
REM         Путь:    /greenstone.ru/public_html/
REM         Хост:    lizaptsw.beget.tech
REM    3. Подключитесь к Beget по SFTP через WinSCP (порт 22)
REM       (host=lizaptsw.beget.tech, user=lizaptsw_1234,
REM        password=YfaFXyEOg*1%) — чтобы убедиться, что связь работает.
REM    4. Меню: Session -> Generate Session URL/Code...
REM       выберите "Scripted configuration file (.ini)",
REM       поставьте галку "Include encrypted password",
REM       задайте мастер-пароль и сохраните как winscp.ini рядом
REM       с этим .bat.
REM    5. Запустите этот .bat.
REM =============================================================
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
