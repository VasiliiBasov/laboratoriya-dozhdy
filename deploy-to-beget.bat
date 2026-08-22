@echo off
REM =============================================================
REM  Beget deploy: thegreenstone.ru  ->  Laboratoriya dozhdya
REM  Synchronizes C:\...\FrogFog\build\ with /home/.../public_html/
REM  using WinSCP `synchronize local` (only changed files transferred).
REM
REM  Files expected next to this .bat:
REM    - winscp.ini    (optional, session settings)
REM    - upload.txt    (WinSCP script)
REM
REM  WinSCP is expected at:
REM    C:\Program Files (x86)\WinSCP\WinSCP.com
REM  or anywhere in PATH as winscp.com.
REM
REM  Pre-requisite: run `npm run build` first.
REM =============================================================
setlocal enableextensions
set "SCRIPT_DIR=%~dp0"
set "BUILD=%SCRIPT_DIR%build"
set "WINSCP=%SCRIPT_DIR%winscp.ini"
set "UPLOAD_SCRIPT=%SCRIPT_DIR%upload.txt"
set "UPLOAD_LOG=%SCRIPT_DIR%winscp-upload.log"

where winscp.com >nul 2>nul
if %ERRORLEVEL%==0 (
  set "WINSCP_EXE=winscp.com"
) else if exist "C:\Program Files (x86)\WinSCP\WinSCP.com" (
  set "WINSCP_EXE=C:\Program Files (x86)\WinSCP\WinSCP.com"
) else (
  echo [ERROR] WinSCP.com not found. Install WinSCP or add it to PATH.
  exit /b 1
)

if not exist "%BUILD%" (
  echo [ERROR] Build directory not found: %BUILD%
  echo Run `npm run build` first.
  exit /b 1
)

if not exist "%UPLOAD_SCRIPT%" (
  echo [ERROR] Upload script not found: %UPLOAD_SCRIPT%
  exit /b 1
)

echo [STEP] Synchronizing local build\ -> remote public_html\...
"%WINSCP_EXE%" /ini="%WINSCP%" /script="%UPLOAD_SCRIPT%" /log="%UPLOAD_LOG%"
if errorlevel 1 (
  echo [ERROR] Sync failed. See log: %UPLOAD_LOG%
  exit /b 1
)

echo.
echo [DONE] Open https://thegreenstone.ru/
endlocal