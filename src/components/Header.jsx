import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../assets/images/logo.png';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Логотип компании" className="logo-img" />
                    </Link>
                </div>

                {/* Десктопное меню */}
                <nav className="main-nav">
                    <ul>
                        <li><Link to="/services" onClick={() => setMobileMenuOpen(false)}>Услуги</Link></li>
                        <li><Link to="/portfolio" onClick={() => setMobileMenuOpen(false)}>Портфолио</Link></li>
                        <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>О нас</Link></li>
                        <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Блог</Link></li>
                        <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Контакты</Link></li>
                    </ul>
                </nav>

                {/* Контакты и кнопка */}
                <div className="header-contacts">
                    <a href="tel:+79999999999" className="phone-link">+7 (999) 999-99-99</a>
                    <button className="callback-btn">Заказать звонок</button>
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
            </div>
        </header>
    );
}

export default Header;