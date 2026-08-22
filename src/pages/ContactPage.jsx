import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import {
    FaWhatsapp,
    FaTelegram,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt
} from 'react-icons/fa';
import maxIcon from '../assets/images/max-icon.svg';
// Используем свои фото из папки pinterest/ — как и остальные страницы сайта.
import dripBeds from '../assets/images/pinterest/drip-beds.jpg';
import rotorCutaway from '../assets/images/pinterest/rotor-cutaway.jpg';
import '../styles/servicesPage.css';

// Секции страницы контактов — единый стиль с портфолио (каждая на весь экран,
// заголовок секции дублируется в хедере, в центре — описание + контент).
// Секция 1 объединяет контакты и мессенджеры. Секция 2 — форма заявки.
const contactSections = [
    {
        id: 1,
        image: dripBeds,
        title: 'Контакты',
        description:
            'Свяжитесь с нами удобным для вас способом. Отвечаем в течение 30 минут в рабочее время.',
        contacts: {
            phone: '+7 (999) 529-20-65',
            email: 'info@rainlab.ru',
            address: 'Санкт-Петербург и Ленинградская область',
            whatsapp: 'https://wa.me/79995292065',
            telegram: 'https://t.me/+79995292065',
            max: 'https://max.ru/u/f9LHodD0cOI0N1nmW808lpfczahN0wCuCwYwQbIM4xZu8BVNOcdsYcSA3qQ'
        }
    },
    {
        id: 2,
        image: rotorCutaway,
        title: 'Оставить заявку',
        description:
            'Заполните форму и мы свяжемся с вами в ближайшее время, чтобы обсудить ваш проект.'
    }
];

const ContactPage = ({ onTitleChange }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Состояние формы
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const handleChange = (e) =>
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Заявка:', formData);
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    // Сброс скролла и наблюдатель за секциями
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const observerOptions = {
            root: containerRef.current,
            threshold: 0.5
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

    // Сообщаем App о смене активной секции — заголовок отрисуется в хедере
    useEffect(() => {
        if (onTitleChange) {
            onTitleChange(contactSections[activeIndex]?.title || '');
        }
    }, [activeIndex, onTitleChange]);

    return (
        <div className="portfolio-scroll-container" ref={containerRef}>
            <SeoHead
                title="Контакты"
                description="Свяжитесь с TheGreenStone: телефон, WhatsApp, Telegram, MAX, e-mail. Санкт-Петербург и Ленинградская область. Отвечаем за 30 минут."
                path="/contact"
                h1="Контакты TheGreenStone — связаться с нами"
            />
            <Breadcrumbs items={[{ label: 'Контакты', path: '/contact' }]} />

            {contactSections.map((item, index) => (
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
                        <p className="portfolio-section-desc">{item.description}</p>

                        {/* Секция 1 — контакты + мессенджеры (объединены) */}
                        {item.contacts && (
                            <>
                                <div className="pci-row">
                                    <a href={`tel:${item.contacts.phone}`} className="pci-item">
                                        <FaPhone />
                                        <span>{item.contacts.phone}</span>
                                    </a>
                                    <a href={`mailto:${item.contacts.email}`} className="pci-item">
                                        <FaEnvelope />
                                        <span>{item.contacts.email}</span>
                                    </a>
                                    <div className="pci-item">
                                        <FaMapMarkerAlt />
                                        <span>{item.contacts.address}</span>
                                    </div>
                                </div>

                                <div className="pci-row">
                                    <a
                                        href={item.contacts.max}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pci-item"
                                        title="Написать в MAX"
                                    >
                                        <img
                                            src={maxIcon}
                                            alt="MAX"
                                            className="custom-messenger-icon"
                                        />
                                        <span>MAX</span>
                                    </a>
                                    <a
                                        href={item.contacts.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pci-item"
                                        title="Написать в WhatsApp"
                                    >
                                        <FaWhatsapp />
                                        <span>WhatsApp</span>
                                    </a>
                                    <a
                                        href={item.contacts.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pci-item"
                                        title="Написать в Telegram"
                                    >
                                        <FaTelegram />
                                        <span>Telegram</span>
                                    </a>
                                </div>
                            </>
                        )}

                        {/* Секция 2 — форма заявки */}
                        {item.id === 2 && (
                            <form className="portfolio-contact-form" onSubmit={handleSubmit}>
                                <div className="pcf-group">
                                    <label htmlFor="cp-name">Ваше имя</label>
                                    <input
                                        id="cp-name"
                                        type="text"
                                        name="name"
                                        placeholder="Иван Иванов"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="pcf-group">
                                    <label htmlFor="cp-phone">Телефон</label>
                                    <input
                                        id="cp-phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="+7 (___) ___-__-__"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="pcf-group">
                                    <label htmlFor="cp-email">Email</label>
                                    <input
                                        id="cp-email"
                                        type="email"
                                        name="email"
                                        placeholder="example@mail.ru"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="pcf-group">
                                    <label htmlFor="cp-message">Сообщение</label>
                                    <textarea
                                        id="cp-message"
                                        name="message"
                                        placeholder="Расскажите о вашем проекте..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="pcf-submit">
                                    Отправить заявку
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            ))}

            <section className="portfolio-footer-section">
                <Footer />
            </section>

            {/* Индикатор текущего раздела */}
            <div className="portfolio-indicator">
                <span className="indicator-current">
                    {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="indicator-sep">/</span>
                <span className="indicator-total">
                    {String(contactSections.length).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default ContactPage;