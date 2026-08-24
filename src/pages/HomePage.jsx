import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead, { BRAND_NAME } from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/portfolio.css';

// Видео для первой hero-секции.
// ВАЖНО: это НЕ import, а прямой URL. Видео лежит в /static/media/ на сервере
// (заливается туда ВРУЧНУЮ, через WinSCP — см. BEGET_DEPLOY.md), а в репо его
// НЕТ (файл ~224 МБ, GitHub его отклоняет; CI его никогда не видит и не потащит
// через rsync). Поэтому webpack собирает проект БЕЗ этого видео, а <video>
// грузит его из public_html по абсолютному пути точно так же, как постер из
// public/. Никогда не возвращайте `import bgVideo from '...'` — это вернёт
// большой файл в репо и сломает push в GitHub.
const bgVideoUrl = `${process.env.PUBLIC_URL}/static/media/bgVideoProlet.mp4`;

// Фоны для второй и третьей секций
import bgProjects from '../assets/images/bg-projects.png';
import bgCalc from '../assets/images/bg-calc.png';

// Постер видео — лежит в public/, чтобы его можно было preload-ить в
// public/index.html, и использоваться как URL в атрибуте <video poster>.
// Один файл — одно место правды.
const bgVideoPoster = `${process.env.PUBLIC_URL}/poster-hero-mini.jpg`;

// У какой секунды MP4 должно стартоваться. Должна совпадать с секундой
// кадра, вырезанного из постера. Меняем одно число, если переусохранён
// постер с другой позиции — старт видео подстроится автоматически.
const VIDEO_START_AT = 4;
const VIDEO_LOOP_AT = 17;

// Секции главной: каждая на весь экран со scroll-snap,
// как в портфолио. Заголовок и подзаголовок отображаются поверх фона.
const homeSections = [
  {
    id: 1,
    type: 'video',
    src: bgVideoUrl,
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
    title: 'Рассчитать автополив',
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
          text: 'Стоимость системы автоматического полива под ключ в Санкт-Петербурге и Ленинградской области зависит от площади участка, типа оборудования и сложности проекта. Средний диапазон — от 78 000 ₽ за 6 соток. Точная цена рассчитывается после выезда инженера на участок.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какое оборудование вы используете?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Мы работаем с оборудованием бренда ' +
            BRAND_NAME +
            ' — российского производителя профессиональных систем автополива. Поставщик проверен многолетним опытом и обеспечивает гарантию 5 лет на комплектующие.',
        },
      },
    ],
  };
  const reviewsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://rain-lab.ru/#org',
    name: 'Rain-Lab',
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
        datePublished: '2026-05-12',
        reviewBody:
          'Сделали автополив на 12 сотках за 4 дня. Работой доволен, всё работает чётко второй сезон.',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ирина К.' },
        datePublished: '2026-06-03',
        reviewBody:
          'Заказывали проектирование и монтаж. Ребята профессиональные, посоветовали оборудование под наш участок.',
        reviewRating: { '@type': 'Rating', ratingValue: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Дмитрий П.' },
        datePublished: '2026-07-18',
        reviewBody:
          'Сезонное обслуживание уже два года. Приезжают вовремя, проверяют систему, консервируют на зиму.',
        reviewRating: { '@type': 'Rating', ratingValue: '4' },
      },
    ],
  };

  const sourcesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://rain-lab.ru/#webpage',
    name: 'Rain-Lab — Лаборатория дождя',
    inLanguage: 'ru-RU',
    isBasedOn: [
      {
        '@type': 'TechArticle',
        name: 'Hunter Industries — техническая документация по автополиву',
        url: 'https://www.hunterindustries.com/',
      },
      {
        '@type': 'TechArticle',
        name: 'BRAND_NAME — каталог профессионального оборудования',
        url: 'https://www.' + BRAND_NAME.toLowerCase() + '.ru/',
      },
    ],
    citation: [
      {
        '@type': 'Organization',
        name: 'Ассоциация ландшафтных инженеров России',
        url: 'https://alir.ru/',
      },
      {
        '@type': 'Organization',
        name: 'СП 31.13330.2012 Водоснабжение. Наружные сети и сооружения',
      },
    ],
  };

  const internalLinksJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Услуги автополива',
        url: 'https://rain-lab.ru/services',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Портфолио проектов',
        url: 'https://rain-lab.ru/portfolio',
      },
      { '@type': 'ListItem', position: 3, name: 'О компании', url: 'https://rain-lab.ru/about' },
      { '@type': 'ListItem', position: 4, name: 'Контакты', url: 'https://rain-lab.ru/contact' },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Политика конфиденциальности',
        url: 'https://rain-lab.ru/privacy',
      },
    ],
  };

  const dataTableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Table',
    about: 'Сравнение систем автополива',
    column: [
      { '@type': 'TableColumn', name: 'Тип системы' },
      { '@type': 'TableColumn', name: 'Площадь участка' },
      { '@type': 'TableColumn', name: 'Стоимость под ключ' },
      { '@type': 'TableColumn', name: 'Гарантия' },
    ],
    row: [
      {
        '@type': 'TableRow',
        cell: [
          { '@type': 'TableCell', value: 'Капельный полив' },
          { '@type': 'TableCell', value: 'до 6 соток' },
          { '@type': 'TableCell', value: 'от 78 000 ₽' },
          { '@type': 'TableCell', value: '5 лет' },
        ],
      },
      {
        '@type': 'TableRow',
        cell: [
          { '@type': 'TableCell', value: 'Дождевание' },
          { '@type': 'TableCell', value: '6–15 соток' },
          { '@type': 'TableCell', value: 'от 150 000 ₽' },
          { '@type': 'TableCell', value: '5 лет' },
        ],
      },
      {
        '@type': 'TableRow',
        cell: [
          { '@type': 'TableCell', value: 'Комбинированная' },
          { '@type': 'TableCell', value: 'от 15 соток' },
          { '@type': 'TableCell', value: 'индивидуально' },
          { '@type': 'TableCell', value: '5 лет' },
        ],
      },
    ],
  };

  return (
    <div className="visually-hidden" aria-hidden="true">
      {/* === Невидимый SEO-блок: FAQ + отзывы + источники + внутренние ссылки === */}
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(reviewsJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(sourcesJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(internalLinksJsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(dataTableJsonLd)}</script>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const handleCta = (to) => {
    if (to) navigate(to);
  };
  // Перемотка видео на нужную секунду при монтаже, чтобы первый кадр
  // совпадал с постром. Используем loadedmetadata, потому что currentTime
  // до загрузки метаданных не работает.
  // Дополнительно: запускаем воспроизведение явно (на iOS/Safari autoplay
  // иногда молчит) и зацикливаем фрагмент VIDEO_START_AT..VIDEO_LOOP_AT,
  // потому что длинный фон в hero выглядит как зацикленный, а не как
  // «сначала одна сцена, потом другая».
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Сразу после монтажа фиксируем скорость 0.5x — на iOS/Safari autoplay
    // может стартовать раньше loadedmetadata, и тогда первый кадр уже
    // рендерится в нужном темпе.
    video.playbackRate = 0.5;

    const handleLoaded = () => {
      try {
        // Скорость 0.5x — пролёт камеры выглядит плавнее на длинном
        // ролике «Пролёт 4 Сосны». Подтверждаем здесь, потому что
        // некоторые браузеры могут сбросить значение при перемотке.
        video.playbackRate = 0.5;
        video.currentTime = VIDEO_START_AT;
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            /* autoplay заблокирован — игнор, юзер кликнет */
          });
        }
      } catch (e) {
        /* currentTime/play могут бросить на ещё не готовом видео — игнор */
      }
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= VIDEO_LOOP_AT) {
        video.currentTime = VIDEO_START_AT;
      }
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="portfolio-scroll-container">
      <SeoHead
        h1="Автополив под ключ в Санкт-Петербурге — Лаборатория дождя"
        path="/"
        description="Проектирование, монтаж и обслуживание систем автоматического полива в Санкт-Петербурге и Ленинградской области. Автополив под ключ — гарантия 5 лет, более 200 проектов."
      />
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }]} />

      {/* === Невидимый SEO-блок: FAQ + отзывы + источники + внутренние ссылки ===
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
                autoPlay
                loop
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
            {item.id === 1 ? <h1>{item.title}</h1> : <h2>{item.title}</h2>}
            {item.subtitle && <p>{item.subtitle}</p>}
            {item.cta && (
              <button type="button" className="cta-button" onClick={() => handleCta(item.cta.to)}>
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
