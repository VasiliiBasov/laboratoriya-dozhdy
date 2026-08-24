import React from 'react';
import { Helmet } from 'react-helmet-async';

// Базовый домен сайта — единая точка правды для canonical и og:url.
// Если будете переезжать на https с другим доменом — меняйте только эту константу.
const SITE_URL = 'https://rain-lab.ru';
const SITE_NAME = 'Rain-Lab — Лаборатория дождя';
const DEFAULT_DESCRIPTION =
    'Проектирование, монтаж и обслуживание систем автоматического полива в Санкт-Петербурге и Ленинградской области. Автополив под ключ — более 200 проектов.';

// Компания-поставщик оборудования. Упоминается в JSON-LD (Organization.brand)
// и в микроразметке Schema.org. На самом сайте текстом НЕ показывается,
// чтобы не менять дизайн — но поисковики видят.
const BRAND_NAME = 'Поливторг';

// SeoHead решает две задачи из SEO-отчёта beget:
//   1. Обновить <head>: title / description / canonical / og:* / twitter:* /
//      author / dateModified / inLanguage. Делается через <Helmet> — он
//      кладёт всё строго в <head>.
//   2. Один (и только один) видимый/скрытый <h1> на странице —
//      «главный заголовок страницы» по SEO. Рендерится ОТДЕЛЬНО от <Helmet>,
//      потому что Helmet принимает только теги для <head>; <h1> в <head>
//      невалиден и React падает с Invariant Violation.
//
// Параметры:
//   - title:        заголовок страницы. Подмешивается к SITE_NAME.
//   - description:  meta description. По умолчанию DEFAULT_DESCRIPTION.
//   - path:         относительный путь без домена (например "/services").
//   - h1:           обязателен. Текст главного H1 на странице.
//   - h1Hidden:     если true (по умолчанию), H1 визуально скрыт (visually-hidden),
//                   чтобы не менять дизайн. Передайте false, если страница
//                   сама должна показывать свой H1 в видимом контенте.
//   - dateModified: ISO-дата обновления страницы (YYYY-MM-DD).
//                   Используется в Schema.org WebPage.dateModified и meta name="date".
//   - author:       строка-автор. По умолчанию SITE_NAME.
const SeoHead = ({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '/',
    h1,
    h1Hidden = true,
    dateModified,
    author = SITE_NAME,
}) => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
    const fullUrl = `${SITE_URL}${path}`;
    const resolvedDate = dateModified || new Date().toISOString().slice(0, 10);

    // JSON-LD WebPage — расширенная микроразметка (п. «Семантическая разметка»
    // и п. «Расширенные данные» из отчёта beget). Невидимо, в <head>.
    const webPageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${fullUrl}#webpage`,
        url: fullUrl,
        name: fullTitle,
        description,
        inLanguage: 'ru-RU',
        isPartOf: {
            '@type': 'WebSite',
            '@id': `${SITE_URL}#website`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/og-image.jpg`,
            width: 1200,
            height: 630,
        },
        dateModified: resolvedDate,
        datePublished: resolvedDate,
        author: { '@id': `${SITE_URL}#org`, '@type': 'Organization', name: author },
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}#org`,
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        },
    };
return (
        <>
            {/* === HEAD: мета-теги, og, twitter, canonical === */}
            <Helmet>
                {/* Базовые */}
                <html lang="ru" />
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                <meta name="author" content={author} />
                <meta name="date" content={resolvedDate} />

                {/* Canonical — главное требование отчёта beget, п. «Канонический URL» */}
                <link rel="canonical" href={fullUrl} />

                {/* Open Graph — п. «Мета-теги социальных сетей» */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={fullUrl} />
                {/* Картинка для шеринга. Положите og-image.jpg 1200x630 в public/ */}
                <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />

                {/* Доп. SEO-теги — Beget и Яндекс любят их видеть */}
                <meta name="theme-color" content="#0b3a25" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />
                <meta name="revisit-after" content="7 days" />
                <meta name="copyright" content={SITE_NAME} />
                <meta name="geo.region" content="RU-SPE" />
                <meta name="geo.placename" content="Санкт-Петербург" />
                <meta name="geo.position" content="59.9311;30.3609" />
                <meta name="ICBM" content="59.9311, 30.3609" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
                <meta name="googlebot" content="index, follow" />
                <meta name="yandex-verification" content="" />

                {/* Hreflang — для главной указываем себя же */}
                {path === '/' && (
                    <link rel="alternate" hrefLang="ru-RU" href={fullUrl} />
                )}
                <link rel="alternate" hrefLang="x-default" href={fullUrl} />

                {/* Preconnect к внешним ресурсам (ускоряет первый рендер) */}
                <link rel="dns-prefetch" href="//mc.yandex.ru" />
                <link rel="dns-prefetch" href="//www.googletagmanager.com" />

                {/* Расширенный JSON-LD WebPage (невидимо, в <head>) */}
                <script type="application/ld+json">
                    {JSON.stringify(webPageJsonLd)}
                </script>
            </Helmet>

            {/* === BODY: главный H1 страницы (визуально скрыт по умолчанию) ===
                Рендерим ВНЕ <Helmet>, потому что Helmet принимает только
                теги, допустимые внутри <head>. <h1> должен жить в <body>.
                Скрывается через класс .visually-hidden в main.css. */}
            {h1 && (
                <h1 className={h1Hidden ? 'visually-hidden' : undefined}>{h1}</h1>
            )}
        </>
    );
};

export default SeoHead;
export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, BRAND_NAME };