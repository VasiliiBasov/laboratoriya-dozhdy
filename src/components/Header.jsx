import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// ДОБАВИЛИ ИМПОРТ ИКОНОК
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import '../styles/header.css';
import logo from '../assets/images/logo20.png';
import maxIcon from '../assets/images/max-icon.webp';

function Header({ portfolioTitle = '' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [displayedTitle, setDisplayedTitle] = useState(portfolioTitle);
    const [titleFading, setTitleFading] = useState(false);
    // Скрывает заголовок в хедере, когда в viewport виден футер
    // (на последней секции scroll-snap, иначе заголовок накладывается на содержимое футера).
    const [footerInView, setFooterInView] = useState(false);
    const location = useLocation();
    // Полноэкранные страницы в едином стиле — на них показывается заголовок текущего раздела в хедере.
    // Главную ('/') намеренно НЕ включаем: на ней большой центральный заголовок в .hero-content,
    // дублировать его в хедере не нужно.
    const fullscreenRoutes = ['/portfolio', '/services', '/about', '/contact'];
    const isFullscreen = fullscreenRoutes.includes(location.pathname);

    // Плавная смена заголовка портфолио: сначала fade-out, затем подмена текста и fade-in
    useEffect(() => {
        if (portfolioTitle === displayedTitle) return;
        setTitleFading(true);
        const timeout = setTimeout(() => {
            setDisplayedTitle(portfolioTitle);
            setTitleFading(false);
        }, 220);
        return () => clearTimeout(timeout);
    }, [portfolioTitle, displayedTitle]);

    // Эффект для скрытия хедера при скролле
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Эффект для закрытия мобильного меню при изменении размера экрана
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Следим за появлением .portfolio-footer-section в viewport на fullscreen-страницах.
    // Когда он появляется (scroll-snap привёл к футеру) — скрываем заголовок хедера,
    // чтобы он не накладывался на контент футера.
    useEffect(() => {
        if (!isFullscreen) {
            setFooterInView(false);
            return undefined;
        }

        const footer = document.querySelector('.portfolio-footer-section');
        if (!footer) return undefined;

        // root = .portfolio-scroll-container (он инициатор скролла на fullscreen-страницах).
        // Если его нет (например, переход между страницами), fallback на null (=viewport).
        const scrollRoot = document.querySelector('.portfolio-scroll-container');

        const observer = new IntersectionObserver(
            (entries) => {
                // entries[0].intersectionRatio > 0 — футер частично виден.
                // Используем threshold 0.15 — секция футера ~высоты viewport, поэтому
                // как только 15% появилось — заголовок пора прятать.
                setFooterInView(entries.some((e) => e.intersectionRatio > 0.15));
            },
            {
                root: scrollRoot,
                threshold: [0, 0.15, 0.5, 1],
            },
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, [isFullscreen, location.pathname]);

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Логотип компании" className="logo-img" />
                    </Link>
                </div>

                {/* Название текущего объекта портфолио — отображается только на странице портфолио.
                    Блок всегда в DOM, чтобы не дёргать остальные элементы хедера при переключении страниц.
                    Показ/скрытие — плавно через opacity.
                    Скрывается на последней секции (футер) — иначе заголовок накладывается на содержимое футера. */}
                <div className={`portfolio-header-title ${isFullscreen && displayedTitle && !footerInView ? 'visible' : ''} ${titleFading || footerInView ? 'fade' : ''}`}>
                    {displayedTitle && <h2>{displayedTitle}</h2>}
                </div>

                {/* КОНТАКТЫ И МЕССЕНДЖЕРЫ */}
                <div className="header-contacts">
                    <a href="tel:+79995292065" className="phone-link">+7 (999) 529-20-65</a>

                    <div className="messenger-icons">
                        {/* ДОБАВИЛИ МЕССЕНДЖЕР MAX */}
                        <a
                            href="https://max.ru/u/f9LHodD0cOI0N1nmW808lpfczahN0wCuCwYwQbIM4xZu8BVNOcdsYcSA3qQ" // Вставьте вашу ссылку на профиль MAX
                            target="_blank"
                            rel="noopener noreferrer"
                            className="messenger-link max"
                            title="Написать в MAX"
                        >
                            <img src={maxIcon} alt="MAX" className="custom-messenger-icon" />
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/79995292065"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="messenger-link whatsapp"
                            title="Написать в WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>

                        {/* Telegram */}
                        <a
                            href="https://t.me/+79995292065"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="messenger-link telegram"
                            title="Написать в Telegram"
                        >
                            <FaTelegram />
                        </a>
                    </div>
                </div>

                {/* Кнопка мобильного меню */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Меню"
                >
                    <span className={`menu-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`menu-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`menu-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                </button>

                {/* Десктопное меню */}
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/services" onClick={() => setMobileMenuOpen(false)}>Услуги</Link></li>
                        <li><Link to="/portfolio" onClick={() => setMobileMenuOpen(false)}>Портфолио</Link></li>
                        <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>О нас</Link></li>
                        <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Контакты</Link></li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Header;