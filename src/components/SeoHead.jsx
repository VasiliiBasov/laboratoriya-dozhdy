import React from 'react';
import { Helmet } from 'react-helmet-async';

// Р‘Р°Р·РѕРІС‹Р№ РґРѕРјРµРЅ СЃР°Р№С‚Р° вЂ” РµРґРёРЅР°СЏ С‚РѕС‡РєР° РїСЂР°РІРґС‹ РґР»СЏ canonical Рё og:url.
// Р•СЃР»Рё Р±СѓРґРµС‚Рµ РїРµСЂРµРµР·Р¶Р°С‚СЊ РЅР° https СЃ РґСЂСѓРіРёРј РґРѕРјРµРЅРѕРј вЂ” РјРµРЅСЏР№С‚Рµ С‚РѕР»СЊРєРѕ СЌС‚Сѓ РєРѕРЅСЃС‚Р°РЅС‚Сѓ.
const SITE_URL = 'https://rain-lab.ru';
const SITE_NAME = 'Rain-Lab вЂ” Р›Р°Р±РѕСЂР°С‚РѕСЂРёСЏ РґРѕР¶РґСЏ';
const DEFAULT_DESCRIPTION =
    'РџСЂРѕРµРєС‚РёСЂРѕРІР°РЅРёРµ, РјРѕРЅС‚Р°Р¶ Рё РѕР±СЃР»СѓР¶РёРІР°РЅРёРµ СЃРёСЃС‚РµРј Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРіРѕ РїРѕР»РёРІР° РІ РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРіРµ Рё Р›РµРЅРёРЅРіСЂР°РґСЃРєРѕР№ РѕР±Р»Р°СЃС‚Рё. РђРІС‚РѕРїРѕР»РёРІ РїРѕРґ РєР»СЋС‡ вЂ” Р±РѕР»РµРµ 200 РїСЂРѕРµРєС‚РѕРІ.';

// РљРѕРјРїР°РЅРёСЏ-РїРѕСЃС‚Р°РІС‰РёРє РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ. РЈРїРѕРјРёРЅР°РµС‚СЃСЏ РІ JSON-LD (Organization.brand)
// Рё РІ РјРёРєСЂРѕСЂР°Р·РјРµС‚РєРµ Schema.org. РќР° СЃР°РјРѕРј СЃР°Р№С‚Рµ С‚РµРєСЃС‚РѕРј РќР• РїРѕРєР°Р·С‹РІР°РµС‚СЃСЏ,
// С‡С‚РѕР±С‹ РЅРµ РјРµРЅСЏС‚СЊ РґРёР·Р°Р№РЅ вЂ” РЅРѕ РїРѕРёСЃРєРѕРІРёРєРё РІРёРґСЏС‚.
const BRAND_NAME = 'РџРѕР»РёРІС‚РѕСЂРі';

// SeoHead СЂРµС€Р°РµС‚ РґРІРµ Р·Р°РґР°С‡Рё РёР· SEO-РѕС‚С‡С‘С‚Р° beget:
//   1. РћР±РЅРѕРІРёС‚СЊ <head>: title / description / canonical / og:* / twitter:* /
//      author / dateModified / inLanguage. Р”РµР»Р°РµС‚СЃСЏ С‡РµСЂРµР· <Helmet> вЂ” РѕРЅ
//      РєР»Р°РґС‘С‚ РІСЃС‘ СЃС‚СЂРѕРіРѕ РІ <head>.
//   2. РћРґРёРЅ (Рё С‚РѕР»СЊРєРѕ РѕРґРёРЅ) РІРёРґРёРјС‹Р№/СЃРєСЂС‹С‚С‹Р№ <h1> РЅР° СЃС‚СЂР°РЅРёС†Рµ вЂ”
//      В«РіР»Р°РІРЅС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹В» РїРѕ SEO. Р РµРЅРґРµСЂРёС‚СЃСЏ РћРўР”Р•Р›Р¬РќРћ РѕС‚ <Helmet>,
//      РїРѕС‚РѕРјСѓ С‡С‚Рѕ Helmet РїСЂРёРЅРёРјР°РµС‚ С‚РѕР»СЊРєРѕ С‚РµРіРё РґР»СЏ <head>; <h1> РІ <head>
//      РЅРµРІР°Р»РёРґРµРЅ Рё React РїР°РґР°РµС‚ СЃ Invariant Violation.
//
// РџР°СЂР°РјРµС‚СЂС‹:
//   - title:        Р·Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹. РџРѕРґРјРµС€РёРІР°РµС‚СЃСЏ Рє SITE_NAME.
//   - description:  meta description. РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ DEFAULT_DESCRIPTION.
//   - path:         РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅС‹Р№ РїСѓС‚СЊ Р±РµР· РґРѕРјРµРЅР° (РЅР°РїСЂРёРјРµСЂ "/services").
//   - h1:           РѕР±СЏР·Р°С‚РµР»РµРЅ. РўРµРєСЃС‚ РіР»Р°РІРЅРѕРіРѕ H1 РЅР° СЃС‚СЂР°РЅРёС†Рµ.
//   - h1Hidden:     РµСЃР»Рё true (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ), H1 РІРёР·СѓР°Р»СЊРЅРѕ СЃРєСЂС‹С‚ (visually-hidden),
//                   С‡С‚РѕР±С‹ РЅРµ РјРµРЅСЏС‚СЊ РґРёР·Р°Р№РЅ. РџРµСЂРµРґР°Р№С‚Рµ false, РµСЃР»Рё СЃС‚СЂР°РЅРёС†Р°
//                   СЃР°РјР° РґРѕР»Р¶РЅР° РїРѕРєР°Р·С‹РІР°С‚СЊ СЃРІРѕР№ H1 РІ РІРёРґРёРјРѕРј РєРѕРЅС‚РµРЅС‚Рµ.
//   - dateModified: ISO-РґР°С‚Р° РѕР±РЅРѕРІР»РµРЅРёСЏ СЃС‚СЂР°РЅРёС†С‹ (YYYY-MM-DD).
//                   РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РІ Schema.org WebPage.dateModified Рё meta name="date".
//   - author:       СЃС‚СЂРѕРєР°-Р°РІС‚РѕСЂ. РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ SITE_NAME.
const SeoHead = ({
    title,
    description = DEFAULT_DESCRIPTION,
    // path вЂ” РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅС‹Р№ РїСѓС‚СЊ Р‘Р•Р— РґРѕРјРµРЅР° (РЅР°РїСЂРёРјРµСЂ "/services").
    // РџРѕР»РЅС‹Р№ URL СЃРѕР±РµСЂС‘С‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РєР°Рє SITE_URL + path.
    path = '/',
    // h1 вЂ” РѕР±СЏР·Р°С‚РµР»РµРЅ. Р­С‚Рѕ В«РіР»Р°РІРЅС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє СЃС‚СЂР°РЅРёС†С‹В» РїРѕ SEO.
    // Р РµРЅРґРµСЂРёРј visually-hidden, С‡С‚РѕР±С‹ РІРЅРµС€РЅРёР№ РІРёРґ СЃС‚СЂР°РЅРёС† РЅРµ РјРµРЅСЏР»СЃСЏ.
    h1,
    // h1Hidden вЂ” РµСЃР»Рё true (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ), H1 РІРёР·СѓР°Р»СЊРЅРѕ СЃРєСЂС‹С‚ (visually-hidden).
    // Р•СЃР»Рё false, H1 Р±СѓРґРµС‚ РІРёРґРёРјС‹Рј вЂ” РёСЃРїРѕР»СЊР·СѓР№С‚Рµ СЌС‚Рѕ, РєРѕРіРґР° РґРёР·Р°Р№РЅ СЃС‚СЂР°РЅРёС†С‹
    // РїСЂРµРґРїРѕР»Р°РіР°РµС‚ СЏРІРЅС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє.
    h1Hidden = true,
    // ISO-РґР°С‚Р° РѕР±РЅРѕРІР»РµРЅРёСЏ СЃС‚СЂР°РЅРёС†С‹ (YYYY-MM-DD). Р•СЃР»Рё РЅРµ СѓРєР°Р·Р°РЅР° вЂ” СЃРµРіРѕРґРЅСЏ.
    dateModified,
    // РђРІС‚РѕСЂ СЃС‚СЂР°РЅРёС†С‹ (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ вЂ” SITE_NAME).
    author = SITE_NAME,
}) => {
    const fullTitle = title ? `${title} вЂ” ${SITE_NAME}` : SITE_NAME;
    const fullUrl = `${SITE_URL}${path}`;
    // Р•СЃР»Рё dateModified РЅРµ РїРµСЂРµРґР°РЅ вЂ” Р±РµСЂС‘Рј СЃРµРіРѕРґРЅСЏ РІ ISO-С„РѕСЂРјР°С‚Рµ (YYYY-MM-DD).
    const resolvedDate =
        dateModified || new Date().toISOString().slice(0, 10);

    // JSON-LD WebPage вЂ” СЂР°СЃС€РёСЂРµРЅРЅР°СЏ РјРёРєСЂРѕСЂР°Р·РјРµС‚РєР° (Рї. В«РЎРµРјР°РЅС‚РёС‡РµСЃРєР°СЏ СЂР°Р·РјРµС‚РєР°В»
    // Рё Рї. В«Р Р°СЃС€РёСЂРµРЅРЅС‹Рµ РґР°РЅРЅС‹РµВ» РёР· РѕС‚С‡С‘С‚Р° beget). РќРµРІРёРґРёРјРѕ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ.
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
            {/* === HEAD: РјРµС‚Р°-С‚РµРіРё, og, twitter, canonical === */}
            <Helmet>
                {/* Р‘Р°Р·РѕРІС‹Рµ */}
                <html lang="ru" />
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                <meta name="author" content={author} />
                <meta name="date" content={resolvedDate} />
                <meta name="generator" content="Rain-Lab" />

                {/* Canonical вЂ” РіР»Р°РІРЅРѕРµ С‚СЂРµР±РѕРІР°РЅРёРµ РѕС‚С‡С‘С‚Р° beget, Рї. В«РљР°РЅРѕРЅРёС‡РµСЃРєРёР№ URLВ» */}
                <link rel="canonical" href={fullUrl} />

                {/* Open Graph вЂ” Рї. В«РњРµС‚Р°-С‚РµРіРё СЃРѕС†РёР°Р»СЊРЅС‹С… СЃРµС‚РµР№В» */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={fullUrl} />
                {/* РљР°СЂС‚РёРЅРєР° РґР»СЏ С€РµСЂРёРЅРіР°. РџРѕР»РѕР¶РёС‚Рµ og-image.jpg 1200x630 РІ public/ */}
                <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />

                {/* Р”РѕРї. SEO-С‚РµРіРё вЂ” Beget Рё РЇРЅРґРµРєСЃ Р»СЋР±СЏС‚ РёС… РІРёРґРµС‚СЊ */}
                <meta name="theme-color" content="#0b3a25" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />
                <meta name="revisit-after" content="7 days" />
                <meta name="copyright" content={SITE_NAME} />
                <meta name="geo.region" content="RU-SPE" />
                <meta name="geo.placename" content="РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі" />
                <meta name="geo.position" content="59.9311;30.3609" />
                <meta name="ICBM" content="59.9311, 30.3609" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
                <meta name="googlebot" content="index, follow" />
                <meta name="yandex-verification" content="" />

                {/* Hreflang вЂ” РґР»СЏ РіР»Р°РІРЅРѕР№ СѓРєР°Р·С‹РІР°РµРј СЃРµР±СЏ Р¶Рµ */}
                {path === '/' && (
                    <link rel="alternate" hrefLang="ru-RU" href={fullUrl} />
                )}
                <link rel="alternate" hrefLang="x-default" href={fullUrl} />

                {/* Preconnect Рє РІРЅРµС€РЅРёРј СЂРµСЃСѓСЂСЃР°Рј (СѓСЃРєРѕСЂСЏРµС‚ РїРµСЂРІС‹Р№ СЂРµРЅРґРµСЂ) */}
                <link rel="dns-prefetch" href="//mc.yandex.ru" />
                <link rel="dns-prefetch" href="//www.googletagmanager.com" />

                {/* Р Р°СЃС€РёСЂРµРЅРЅС‹Р№ JSON-LD WebPage (РЅРµРІРёРґРёРјРѕ, РІ <head>) */}
                <script type="application/ld+json">
                    {JSON.stringify(webPageJsonLd)}
                </script>
            </Helmet>

            {/* === BODY: РіР»Р°РІРЅС‹Р№ H1 СЃС‚СЂР°РЅРёС†С‹ (РІРёР·СѓР°Р»СЊРЅРѕ СЃРєСЂС‹С‚ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ) ===
                Р РµРЅРґРµСЂРёРј Р’РќР• <Helmet>, РїРѕС‚РѕРјСѓ С‡С‚Рѕ Helmet РїСЂРёРЅРёРјР°РµС‚ С‚РѕР»СЊРєРѕ
                С‚РµРіРё, РґРѕРїСѓСЃС‚РёРјС‹Рµ РІРЅСѓС‚СЂРё <head>. <h1> РґРѕР»Р¶РµРЅ Р¶РёС‚СЊ РІ <body>.
                РЎРєСЂС‹РІР°РµС‚СЃСЏ С‡РµСЂРµР· РєР»Р°СЃСЃ .visually-hidden РІ main.css. */}
            {h1 && (
                <h1 className={h1Hidden ? 'visually-hidden' : undefined}>{h1}</h1>
            )}
        </>
    );
};

export default SeoHead;
export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, BRAND_NAME };
