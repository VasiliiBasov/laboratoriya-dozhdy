# Деплой на Beget (rain-lab.ru → «Лаборатория дождя»)

## Реальные данные из панели cp.beget.com/ftp

- Логин панели: `lizaptsw`
- FTP-сервер (хост): `lizaptsw.beget.tech`
- SSH-порт: 22
- Каталог сайта на сервере: `/home/l/lizaptsw/rain-lab.ru/public_html/`

## Аккаунт для деплоя (уже создан)

В панели Beget (cp.beget.com → FTP) добавлен отдельный FTP-аккаунт с включённым SSH:

| Параметр    | Значение                              |
| ----------- | ------------------------------------- |
| Логин       | `lizaptsw_12345`                      |
| Пароль      | `<см. панель cp.beget.com → FTP>`     |
| Хост SFTP   | `lizaptsw.beget.tech:22`              |

> Сам по себе `lizaptsw_12345` содержит `_`, но это **уже работающий** аккаунт.
> Если в будущем будете пересоздавать — используйте только латиницу и цифры без `_`/`-`.

## Что нужно сделать один раз

1. Установить **WinSCP**: https://winscp.net/eng/download.php
2. Заполнить `winscp.ini` вручную (создаётся в этой папке автоматически
   скриптом `make-winscp-ini.bat` — см. ниже) либо через GUI:
   - Протокол: **SFTP**
   - **Host name**: `lizaptsw.beget.tech`
   - **Port**: `22`
   - **User name**: `lizaptsw_12345`
   - **Password**: `<см. панель cp.beget.com → FTP>`
3. Хост-ключ сервера (уже вписан в `upload.txt`):
   ```
   ssh-ed25519 255 YMhPGeCEuTL7ar3PAikIsHeuq3vjbTx5lSwRb04SPeQ
   ```
   При первом подключении WinSCP предложит принять — нажмите «Принять» (Accept).
4. **Подключиться** через GUI для проверки. Справа должен открыться
   `/home/l/lizaptsw/rain-lab.ru/public_html/` (корневой каталог нового сайта).

## Структура файлов деплоя (все в `.gitignore`)

| Файл                    | Назначение                                              |
| ----------------------- | ------------------------------------------------------- |
| `winscp.ini`            | Сессия WinSCP (опционально)                             |
| `upload.txt`            | Скрипт: `synchronize remote` build/ → public_html/      |
| `deploy-to-beget.bat`   | Запускает WinSCP из консоли с логированием              |
| `winscp-upload.log`     | Лог последнего деплоя                                   |

`build/` создаётся через `npm run build`.

## Быстрый деплой

```bat
npm run build
deploy-to-beget.bat
```

Скрипт:
1. Находит `WinSCP.com` (PATH или `C:\Program Files (x86)\WinSCP\`).
2. Запускает `synchronize remote` из `build/` в `/home/.../public_html/`.
3. Только реально изменённые файлы передаются (по размеру и timestamp).
4. Пишет подробный лог в `winscp-upload.log`.
5. После успеха — открывайте https://rain-lab.ru/.

> **Примечание**: на сервере Beget в `public_html/` могут лежать старые файлы
> (например, `README.txt`, прошлые версии ассетов), которых уже нет в `build/`.
> Синхронизация **их НЕ удалит** (мы убрали `-delete` для безопасности). Если
> нужно убрать мусор — удаляйте вручную через WinSCP GUI.

## Если что-то пошло не так

- **«Build directory not found»** — запустите `npm run build`.
- **«Synchronize failed»** — смотрите `winscp-upload.log`.
- **«Хост-ключ не проверен»** — нажмите «Принять» один раз при первом запуске.
- **«Permission denied»** — убедитесь, что вы залогинены как `lizaptsw_12345`,
  а не как `root`.
- **«Host key mismatch»** — возможно, ключ Beget был перевыпущен.
  Узнайте новый отпечаток через GUI WinSCP → Session → Server/Protocol Info →
  скопируйте fingerprint → обновите строку `-hostkey` в `upload.txt`.

## Безопасность

- Пароль хранится в `upload.txt` и `winscp.ini` в открытом виде
  (это разовый деплой на одной машине).
- **Все эти файлы в `.gitignore`** — случайно в публичный репозиторий
  не утечёт.
- После успешного деплоя рекомендуется сменить пароль Beget и/или удалить
  `upload.txt` / `winscp.ini` с этой машины.
- **ВАЖНО:** если коммитите с этой машины — отзовите старый GitHub PAT
  (через https://github.com/settings/tokens) и создайте новый fine-grained
  с доступом только к этому репозиторию (Contents: Read & Write).

---

## Деплой из GitHub Actions (рекомендуемый путь)

После того, как вы добавили свой публичный ключ в
`/home/l/lizaptsw/.ssh/authorized_keys` на Beget, можно полностью
отказаться от парольной схемы и собирать/деплоить автоматически
из GitHub Actions.

### 1. Локальный приватный ключ

Если ключа ещё нет:

```powershell
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\beget_deploy" -N "" -C "github-actions-beget"
Get-Content "$env:USERPROFILE\.ssh\beget_deploy.pub"
```

Содержимое `beget_deploy.pub` нужно добавить в
`/home/l/lizaptsw/.ssh/authorized_keys` на сервере.

### 2. Secrets репозитория (https://github.com/<owner>/FrogFog/settings/secrets/actions)

| Имя             | Значение                                                          |
| -------------- | ---------------------------------------------------------------- |
| `BEGET_HOST`   | `lizaptsw.beget.tech`                                            |
| `BEGET_USER`   | `lizaptsw_12345`                                                 |
| `BEGET_SSH_KEY` | Содержимое файла `beget_deploy` (приватный ключ целиком, включая `-----BEGIN/END-----`) |

### 3. Триггер

Workflow `.github/workflows/deploy.yml` запускается:

- автоматически при `push` в `main`;
- вручную из вкладки **Actions → Deploy to Beget → Run workflow**.

Шаги:

1. `npm ci` и `npm run build` — получаем `build/index.html`.
2. `Verify build` — sanity-check наличия `build/index.html`.
3. `Trust Beget host key` — записывает `known_hosts` (отпечаток сверен
   через WinSCP).
4. `Deploy via SFTP` — `wlixcc/SFTP-Deploy-Action@v1.2.4` синхронизирует
   `build/` ↔ `/home/l/lizaptsw/rain-lab.ru/public_html/`.

> Действие работает в режиме `synchronize` (без удаления), поэтому
> старые/лишние файлы на сервере не пропадут. Если нужно снести
> предыдущий билд — сделайте это вручную через WinSCP **один раз**, до
> первого автоматического деплоя.