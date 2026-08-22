import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
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
            />
            <Breadcrumbs items={[{ label: 'Главная', path: '/' }]} />

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