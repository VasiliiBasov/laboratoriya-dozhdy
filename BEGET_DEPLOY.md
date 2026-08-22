# Деплой на Beget (thegreenstone.ru → «Лаборатория дождя»)

## Реальные данные из панели cp.beget.com/ftp

- Логин панели: `lizaptsw`
- FTP-сервер (хост): `lizaptsw.beget.tech`
- Каталог сайта на сервере: `/greenstone.ru/public_html/`
- **Важно:** Beget отклоняет `_` в логинах FTP/SSH (`lizaptsw_` — нельзя).

## Что нужно сделать один раз

1. Установить **WinSCP**: https://winscp.net/eng/download.php
2. В **панели Beget** (cp.beget.com > FTP) создать FTP-аккаунт с включённым SSH:
   - **Логин**: любой из латинских букв/цифр, **без `_`** (например, `lizaptsw_deploy`).
   - **Пароль**: придумать и запомнить.
   - **Путь**: `/greenstone.ru/public_html/`
   - [x] **Включить SSH**.
3. Открыть WinSCP, протокол **SFTP**:
   - **Host name**: `lizaptsw.beget.tech`
   - **User name**: ваш логин из п.2
   - **Password**: пароль из п.2
   - Нажать «Login». Должно открыться SFTP-соединение.
4. **Session → Generate Session URL/Code...**
   - Выбрать **Scripted configuration file (.ini)**.
   - Поставить [x] **Include encrypted password**.
   - Задать **мастер-пароль** (например, пароль от вашего ПК).
   - Сохранить как `winscp.ini` **рядом с `deploy-to-beget.bat`**.

## Деплой

Просто запустите `deploy-to-beget.bat`.

Скрипт:
1. Загрузит `laboratoriya-dozhdy-deploy.zip` на сервер в каталог,
   который задан в `winscp.ini` (по умолчанию — домашний каталог SSH-логина).
2. Перейдёт в `cd /greenstone.ru/public_html/` и распакует архив (`unzip -o`).
3. Удалит zip-файл.
4. Поставит права 755 на папки и 644 на файлы.
5. Откроет `https://thegreenstone.ru/` (опционально).

## Если что-то пошло не так

- **«winscp.ini not found»** — создайте его по инструкции выше.
- **«Archive not found»** — соберите проект: `npm run build`,
  затем пересоздайте `laboratoriya-dozhdy-deploy.zip`.
- **«Permission denied»** при распаковке — возможно, путь `/greenstone.ru/public_html/`
  не соответствует вашему домену. Уточните в панели Beget домашний каталог сайта
  и поменяйте строку `cd /greenstone.ru/public_html/` в `post-upload.txt`.
- **`unzip: command not found`** — напишите в поддержку Beget, обычно `unzip` есть
  на всех тарифах с SSH. Альтернатива: распаковать локально через WinSCP
  (правый клик на zip → «Extract») и загрузить папку `thegreenstone.ru/`.
- **«только английские буквы и цифры» при создании FTP-аккаунта** — это валидация Beget.
  Уберите `_` из логина.

## Безопасность

- Пароль хранится в `winscp.ini` **в зашифрованном виде** (мастер-пароль).
  Не передавайте этот файл никому.
- Мастер-пароль запомните — без него не получится использовать скрипт.
- `winscp.ini` уже исключён из git (см. `.gitignore`: `/winscp.ini`),
  так что случайно не запушите credentials.
- Если мастер-пароль скомпрометирован, пересоздайте `winscp.ini` через WinSCP.
