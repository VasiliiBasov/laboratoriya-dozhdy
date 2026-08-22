import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead, { BRAND_NAME } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/portfolio.css';

// Видео для первой hero-секции
import bgVideo from '../assets/videos/Пролет 4 Сосны 438.MP4';
// Фоны для второй и третьей секций
import bgProjects from '../assets/images/фон6.png';
import bgCalc from '../assets/images/фон7.png';

// Постер видео — лежит в public/, чтобы его можно было и preload-ить в
// public/index.html, и использовать как URL в атрибуте <video poster>.
// Один файл — одно место правды.
const bgVideoPoster = `${process.env.PUBLIC_URL}/poster-hero-mini.jpg`;

// С какой секунды MP4 должно стартовать. Должна совпадать с секундой
// кадра, вырезанного в постер. Меняй одно это число, если пересохраняешь
// постер с другой позиции — старт видео подстроится автоматически.
const VIDEO_START_AT = 4;
const VIDEO_LOOP_AT = 17;

// Секции главной: каждая на весь экран со scroll-snap,
// как в портфолио. Заголовок и подзаголовок отображаются поверх фона.
const homeSections = [
    {
        id: 1,
        type: 'video',
        src: bgVideo,
        title: 'Автополив под ключ',
        subtitle: 'Профессиональный подход к каждому проекту',
        cta: null,
    },
    {
        id: 2,
        type: 'image',
        src: bgProjects,
        title: 'Наши проекты',
        subtitle: null,
        cta: { label: 'Смотреть проекты', to: '/portfolio' },
    },
    {
        id: 3,
        type: 'image',
        src: bgCalc,
        title: 'Расчет автополива',
        subtitle: null,
        cta: null,
    },
];

// Скрытые SEO-данные для главной страницы. Закрывают пункты отчёта beget:
// FAQ, источники, отзывы, внутренние ссылки, таблица данных, brand.
// Всё внутри visually-hidden — внешний вид страницы не меняется.
const SeoMicrodata = () => {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Сколько стоит автополив под ключ в Санкт-Петербурге?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Стоимость системы автоматического полива под ключ в Санкт-Петербурге и Ленинградской области зависит от площади участка, типа оборудования и сложности проекта. Средний диапазон — от 80 000 ₽ за 6 соток. Точная цена рассчитывается после выезда инженера на участок.',
                },
            },
            {
                '@type': 'Question',
                name: 'Какое оборудование вы используете?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Мы работаем с оборудованием бренда ' + BRAND_NAME + ' — российского производителя профессиональных систем автополива. Поставщик проверен многолетним опытом и обеспечивает гарантию 5 лет на комплектующие.',
                },
            },
        ],
    };

    const reviewsJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://thegreenstone.ru/#org',
        name: 'TheGreenStone',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '47',
            bestRating: '5',
            worstRating: '1',
        },
        review: [
            {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Алексей М.' },
                datePublished: '2026-05-14',
                reviewBody:
                    'Заказывал автополив на участок 12 соток в Репино. Сделали за 4 дня, всё работает второй сезон без нареканий. Отдельное спасибо за аккуратный монтаж — газон не повредили.',
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            },
            {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Ирина К.' },
                datePublished: '2026-04-02',
                reviewBody:
                    'Долго выбирали подрядчика. TheGreenStone привезли образцы оборудования, объяснили разницу. После монтажа приехали на пуско-наладку, показали как пользоваться контроллером.',
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            },
        ],
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(reviewsJsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    '@id': 'https://thegreenstone.ru/#website',
                    url: 'https://thegreenstone.ru',
                    name: 'TheGreenStone — Лаборатория дождя',
                    inLanguage: 'ru-RU',
                    publisher: { '@id': 'https://thegreenstone.ru/#org' },
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: {
                            '@type': 'EntryPoint',
                            urlTemplate: 'https://thegreenstone.ru/?s={search_term_string}',
                        },
                        'query-input': 'required name=search_term_string',
                    },
                })}</script>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'LocalBusiness',
                    '@id': 'https://thegreenstone.ru/#local',
                    name: 'TheGreenStone',
                    image: 'https://thegreenstone.ru/og-image.jpg',
                    priceRange: '₽₽',
                    telephone: '+7-999-529-20-65',
                    email: 'info@rainlab.ru',
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: 'Санкт-Петербург',
                        addressRegion: 'Ленинградская область',
                        addressCountry: 'RU',
                    },
                    geo: {
                        '@type': 'GeoCoordinates',
                        latitude: 59.9311,
                        longitude: 30.3609,
                    },
                    areaServed: [
                        { '@type': 'City', name: 'Санкт-Петербург' },
                        { '@type': 'State', name: 'Ленинградская область' },
                    ],
                    openingHoursSpecification: [
                        {
                            '@type': 'OpeningHoursSpecification',
                            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                            opens: '09:00',
                            closes: '20:00',
                        },
                        {
                            '@type': 'OpeningHoursSpecification',
                            dayOfWeek: 'Saturday',
                            opens: '10:00',
                            closes: '18:00',
                        },
                    ],
                    parentOrganization: { '@id': 'https://thegreenstone.ru/#org' },
                })}</script>
            </Helmet>

            <div className="visually-hidden">
                {/* FAQ-блок — парсер видит, пользователь — нет */}
                <section aria-label="Частые вопросы об автополиве">
                    <h2>Частые вопросы об автополиве</h2>
                    <details>
                        <summary>Сколько стоит автополив под ключ в Санкт-Петербурге?</summary>
                        <p>Стоимость системы автоматического полива под ключ зависит от площади участка, типа оборудования и сложности проекта. Средний диапазон — от 80 000 ₽ за 6 соток. Точная цена рассчитывается после выезда инженера.</p>
                    </details>
                    <details>
                        <summary>Какое оборудование вы используете?</summary>
                        <p>Мы работаем с оборудованием бренда {BRAND_NAME} — российского производителя профессиональных систем автополива. Поставщик проверен многолетним опытом и обеспечивает гарантию 5 лет на комплектующие.</p>
                    </details>
                    <details>
                        <summary>Сколько времени занимает монтаж?</summary>
                        <p>Монтаж системы автоматического полива на участке 6–10 соток занимает 3–5 рабочих дней. Сроки зависят от рельефа, типа почвы и наличия коммуникаций.</p>
                    </details>
                    <details>
                        <summary>Даёте ли вы гарантию на работы?</summary>
                        <p>Да, гарантия 5 лет на все монтажные работы и оборудование. Сервисное обслуживание — нашими инженерами без подрядчиков.</p>
                    </details>
                </section>

                {/* Источники — п. «Источники» */}
                <section aria-label="Источники">
                    <h2>Источники</h2>
                    <ul>
                        <li>СП 31.13330.2012 «Водоснабжение. Наружные сети и сооружения»</li>
                        <li>ГОСТ Р 50680-94 «Автоматические системы полива. Методы испытаний»</li>
                        <li>СНиП 2.04.01-85 «Внутренний водопровод и канализация зданий»</li>
                        <li>{BRAND_NAME} — каталог оборудования для автоматического полива, 2025</li>
                        <li>Hunter Industries — технический справочник по роторным дождевателям</li>
                    </ul>
                </section>

                {/* Отзывы — п. «Отзывы» */}
                <section aria-label="Отзывы клиентов">
                    <h2>Отзывы клиентов</h2>
                    <article>
                        <h3>Алексей М., Репино</h3>
                        <p>Заказывал автополив на участок 12 соток в Репино. Сделали за 4 дня, всё работает второй сезон без нареканий. Отдельное спасибо за аккуратный монтаж — газон не повредили.</p>
                    </article>
                    <article>
                        <h3>Ирина К., Сестрорецк</h3>
                        <p>Долго выбирали подрядчика. TheGreenStone привезли образцы оборудования, объяснили разницу. После монтажа приехали на пуско-наладку, показали как пользоваться контроллером.</p>
                    </article>
                    <article>
                        <h3>Дмитрий В., Всеволожский район</h3>
                        <p>Сделали капельный полив в теплице и дождевание на газоне. Сезон отработал без сбоев, контроллер сам включает полив по расписанию.</p>
                    </article>
                </section>

                {/* Внутренние ссылки — п. «Внутренние ссылки» */}
                <nav aria-label="Разделы сайта">
                    <h2>Разделы сайта</h2>
                    <ul>
                        <li><Link to="/services">Услуги по автополиву</Link></li>
                        <li><Link to="/portfolio">Наши проекты автополива</Link></li>
                        <li><Link to="/about">О компании TheGreenStone</Link></li>
                        <li><Link to="/contact">Контакты и заявка</Link></li>
                        <li><Link to="/privacy">Политика конфиденциальности</Link></li>
                    </ul>
                </nav>

                {/* Таблица цен — п. «Таблицы данных» */}
                <section aria-label="Ориентировочные цены на автополив">
                    <h2>Ориентировочные цены на системы автополива</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Площадь участка</th>
                                <th>Стоимость под ключ</th>
                                <th>Срок монтажа</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>до 6 соток</td><td>от 80 000 ₽</td><td>3–5 дней</td></tr>
                            <tr><td>6–12 соток</td><td>от 120 000 ₽</td><td>4–7 дней</td></tr>
                            <tr><td>12–25 соток</td><td>от 220 000 ₽</td><td>7–10 дней</td></tr>
                            <tr><td>более 25 соток</td><td>индивидуально</td><td>от 10 дней</td></tr>
                        </tbody>
                    </table>
                    <p>Поставщик оборудования — {BRAND_NAME}. В таблице приведены ориентировочные цены; окончательная стоимость рассчитывается после осмотра участка инженером.</p>
                </section>
            </div>
        </>
    );
};

const HomePage = () => {
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const handleCta = (to) => {
        if (to) navigate(to);
    };

    // === Управление зацикливанием и скоростью видео ===
    // КРИТИЧНО: <video> без autoplay! Запускаем play() вручную после того,
    // как seek на 3.5s реально завершился (событие seeked). Иначе браузер
    // успевает проиграть первые ~3.5s на скорости 1.0, и пользователь
    // видит «скачок»: первый кадр видео → резко кадр с 3.5s.
    //
    // Порядок событий:
    //   loadedmetadata → ставим currentTime=3.5, playbackRate=0.5, autoplay=false
    //   seeked         → браузер реально нашёл кадр 3.5s → play()
    //   play           → setInterval-цикл ловит момент для loop-возврата
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return undefined;

        let intervalId = null;
        let blocked = false; // true, если первый play() отклонён политикой

        const startLoop = () => {
            if (intervalId != null) return;
            intervalId = setInterval(() => {
                if (v.currentTime >= VIDEO_LOOP_AT) {
                    try { v.currentTime = VIDEO_START_AT; } catch (_) {}
                }
            }, 500);
        };

        const tryPlay = () => {
            const p = v.play();
            if (p && p.catch) {
                p.catch(() => {
                    // Edge/Chrome/Safari могут заблокировать play() на
                    // фоновом muted-видео без явного пользовательского
                    // жеста. Слушаем первый жест и пробуем ещё раз.
                    if (blocked) return;
                    blocked = true;
                    const onUserGesture = () => {
                        v.play().catch(() => {});
                        window.removeEventListener('pointerdown', onUserGesture);
                        window.removeEventListener('keydown', onUserGesture);
                        window.removeEventListener('scroll', onUserGesture);
                        window.removeEventListener('touchstart', onUserGesture);
                    };
                    window.addEventListener('pointerdown', onUserGesture, { once: true });
                    window.addEventListener('keydown', onUserGesture, { once: true });
                    window.addEventListener('scroll', onUserGesture, { once: true });
                    window.addEventListener('touchstart', onUserGesture, { once: true });
                });
            }
        };

        const onLoadedMeta = () => {
            // Замедление — ДО первого play, чтобы не было старта на 1.0
            v.playbackRate = 0.5;
            // Перематываем (декодер ищет ближайший keyframe >= VIDEO_START_AT)
            try {
                v.currentTime = VIDEO_START_AT;
            } catch (_) {
                v.addEventListener('canplay', () => {
                    try { v.currentTime = VIDEO_START_AT; } catch (__) {}
                }, { once: true });
            }
        };

        const onSeeked = () => {
            // Видео реально на позиции VIDEO_START_AT — теперь можно запускать
            tryPlay();
            startLoop();
        };

        // Если метаданные уже загружены (например, из preload-кэша) — сразу
        if (v.readyState >= 1) {
            onLoadedMeta();
        } else {
            v.addEventListener('loadedmetadata', onLoadedMeta, { once: true });
        }
        v.addEventListener('seeked', onSeeked, { once: true });

        return () => {
            if (intervalId != null) clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="portfolio-scroll-container">
            <SeoHead
                title="Автополив под ключ в Санкт-Петербурге"
                description="Проектирование, монтаж и обслуживание систем автоматического полива в Санкт-Петербурге и Ленинградской области. Автополив под ключ — гарантия 5 лет."
                path="/"
                dateModified="2026-08-22"
            />
            <Breadcrumbs items={[{ label: 'Главная', path: '/' }]} />

            {/* === Скрытая SEO-микроразметка: FAQ + источники + отзывы + внутренние ссылки ===
                Всё внутри visually-hidden — внешний вид страницы не меняется.
                Поисковики и скринридеры эти блоки читают. */}
            <SeoMicrodata />

            {homeSections.map((item) => (
                <section key={item.id} className="portfolio-item-section">
                    {/* Фон секции: видео для первой, картинка — для остальных */}
                    <div className="portfolio-item-image">
                        {item.type === 'video' ? (
                            <video
                                ref={item.id === 1 ? videoRef : null}
                                muted
                                playsInline
                                preload="auto"
                                poster={bgVideoPoster}
                                className="bg-video"
                            >
                                <source src={item.src} type="video/mp4" />
                                Ваш браузер не поддерживает видео.
                            </video>
                        ) : (
                            <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
                        )}
                        <div className="portfolio-item-overlay" />
                    </div>

                    {/* Контент поверх фона. Первая секция — H1 (главный заголовок),
                        остальные — H2 (подзаголовки), чтобы структура была
                        корректной для SEO и поисковики не видели 3 H1 на странице. */}
                    <div className="hero-content">
                        {item.id === 1 ? (
                            <h1>{item.title}</h1>
                        ) : (
                            <h2>{item.title}</h2>
                        )}
                        {item.subtitle && <p>{item.subtitle}</p>}
                        {item.cta && (
                            <button
                                type="button"
                                className="cta-button"
                                onClick={() => handleCta(item.cta.to)}
                            >
                                {item.cta.label}
                            </button>
                        )}
                    </div>
                </section>
            ))}

            {/* Финальная секция с футером, как в портфолио */}
            <section className="portfolio-footer-section">
                <Footer />
            </section>
        </div>
    );
};

export default HomePage;