import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/servicesPage.css';

// Собственные фото (папка pinterest/)
import appUi from '../assets/images/pinterest/app-ui.jpg';
import sprinklerWorking from '../assets/images/pinterest/sprinkler-working.jpg';
import dripPrettyDrop from '../assets/images/pinterest/drip-pretty-drop.jpg';
import dripTechnology from '../assets/images/pinterest/drip-technology.jpg';

// Секции страницы "О нас"
const aboutSections = [
    {
        id: 1,
        image: appUi,
        title: 'О компании',
        description: 'Более 10 лет создаём комфортные и ухоженные территории. Команда инженеров, ландшафтных дизайнеров и специалистов по автополиву.',
        features: [
            {
                title: 'Опыт',
                text: 'Реализовали более 200 проектов разной сложности — от дачных участков до коттеджных посёлков'
            },
            {
                title: 'Гарантия',
                text: 'Даём официальную гарантию на все работы и оборудование до 5 лет'
            },
            {
                title: 'Сроки',
                text: 'Соблюдаем договорные сроки: проектирование за 7 дней, монтаж за 3–14 дней'
            },
            {
                title: 'Поддержка',
                text: 'Сервисное обслуживание и сезонная настройка систем автополива'
            }
        ]
    },
    {
        id: 2,
        image: sprinklerWorking,
        title: 'Наша миссия',
        description: 'Делаем загородную жизнь комфортной — берём на себя все задачи по озеленению и автополиву, чтобы вы наслаждались результатом, а не работой.'
    },
    {
        id: 3,
        image: dripPrettyDrop,
        title: 'Наша команда',
        description: 'Инженеры-проектировщики, ландшафтные архитекторы, монтажники с многолетним опытом. Каждый объект ведёт персональный менеджер.'
    },
    {
        id: 4,
        image: dripTechnology,
        title: 'Наши ценности',
        description: 'Качество, надёжность, прозрачность. Используем только сертифицированное оборудование ведущих мировых производителей.'
    }
];

const AboutPage = ({ onTitleChange }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const observerOptions = {
            root: containerRef.current,
            threshold: 0.5,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = sectionRefs.current.indexOf(entry.target);
                    if (idx !== -1) {
                        setActiveIndex(idx);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (onTitleChange) {
            onTitleChange(aboutSections[activeIndex]?.title || '');
        }
    }, [activeIndex, onTitleChange]);

    return (
        <div className="portfolio-scroll-container" ref={containerRef}>
            <SeoHead
                title="О компании Rain-Lab"
                description="Команда инженеров и ландшафтных дизайнеров Rain-Lab. Более 200 проектов автополива в Санкт-Петербурге и Ленинградской области. Гарантия 5 лет."
                path="/about"
                h1="О компании Rain-Lab — Лаборатория дождя"
            />
            <Breadcrumbs items={[{ label: 'О компании', path: '/about' }]} />

            {aboutSections.map((item, index) => (
                <section
                    key={item.id}
                    className="portfolio-item-section"
                    ref={(el) => (sectionRefs.current[index] = el)}
                >
                    <div className="portfolio-item-image">
                        <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                        <div className="portfolio-item-overlay" />
                    </div>

                    <div className="portfolio-content-center">
                        {/* Заголовок секции оставлен только в DOM (для SEO и скринридеров).
                            Визуально — отображается в хедере через .portfolio-header-title,
                            чтобы не было дубля «заголовок + текст». */}
                        <h2 className="visually-hidden">{item.title}</h2>
                        <p className="portfolio-section-desc">{item.description}</p>

                        {item.features && (
                            <div className="portfolio-about-features">
                                {item.features.map((f, i) => (
                                    <div key={i} className="paf-card">
                                        <h3>{f.title}</h3>
                                        <p>{f.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Внутренние ссылки — закрывают пункт «Внутренние ссылки» из PDF */}
                        <div className="portfolio-section-links">
                            <Link to="/portfolio" className="portfolio-section-link">
                                Наши проекты →
                            </Link>
                            <Link to="/services" className="portfolio-section-link">
                                Услуги →
                            </Link>
                            <Link to="/contact" className="portfolio-section-link">
                                Связаться с нами →
                            </Link>
                        </div>
                    </div>
                </section>
            ))}

            <section className="portfolio-footer-section">
                <Footer />
            </section>

            <div className="portfolio-indicator">
                <span className="indicator-current">
                    {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="indicator-sep">/</span>
                <span className="indicator-total">
                    {String(aboutSections.length).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default AboutPage;