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
// РСЃРїРѕР»СЊР·СѓРµРј СЃРІРѕРё С„РѕС‚Рѕ РёР· РїР°РїРєРё pinterest/ вЂ” РєР°Рє Рё РѕСЃС‚Р°Р»СЊРЅС‹Рµ СЃС‚СЂР°РЅРёС†С‹ СЃР°Р№С‚Р°.
import dripBeds from '../assets/images/pinterest/drip-beds.jpg';
import rotorCutaway from '../assets/images/pinterest/rotor-cutaway.jpg';
import '../styles/servicesPage.css';

// РЎРµРєС†РёРё СЃС‚СЂР°РЅРёС†С‹ РєРѕРЅС‚Р°РєС‚РѕРІ вЂ” РµРґРёРЅС‹Р№ СЃС‚РёР»СЊ СЃ РїРѕСЂС‚С„РѕР»РёРѕ (РєР°Р¶РґР°СЏ РЅР° РІРµСЃСЊ СЌРєСЂР°РЅ,
// Р·Р°РіРѕР»РѕРІРѕРє СЃРµРєС†РёРё РґСѓР±Р»РёСЂСѓРµС‚СЃСЏ РІ С…РµРґРµСЂРµ, РІ С†РµРЅС‚СЂРµ вЂ” РѕРїРёСЃР°РЅРёРµ + РєРѕРЅС‚РµРЅС‚).
// РЎРµРєС†РёСЏ 1 РѕР±СЉРµРґРёРЅСЏРµС‚ РєРѕРЅС‚Р°РєС‚С‹ Рё РјРµСЃСЃРµРЅРґР¶РµСЂС‹. РЎРµРєС†РёСЏ 2 вЂ” С„РѕСЂРјР° Р·Р°СЏРІРєРё.
const contactSections = [
    {
        id: 1,
        image: dripBeds,
        title: 'РљРѕРЅС‚Р°РєС‚С‹',
        description:
            'РЎРІСЏР¶РёС‚РµСЃСЊ СЃ РЅР°РјРё СѓРґРѕР±РЅС‹Рј РґР»СЏ РІР°СЃ СЃРїРѕСЃРѕР±РѕРј. РћС‚РІРµС‡Р°РµРј РІ С‚РµС‡РµРЅРёРµ 30 РјРёРЅСѓС‚ РІ СЂР°Р±РѕС‡РµРµ РІСЂРµРјСЏ.',
        contacts: {
            phone: '+7 (999) 529-20-65',
            email: 'info@rain-lab.ru',
            address: 'РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі Рё Р›РµРЅРёРЅРіСЂР°РґСЃРєР°СЏ РѕР±Р»Р°СЃС‚СЊ',
            whatsapp: 'https://wa.me/79995292065',
            telegram: 'https://t.me/+79995292065',
            max: 'https://max.ru/u/f9LHodD0cOI0N1nmW808lpfczahN0wCuCwYwQbIM4xZu8BVNOcdsYcSA3qQ'
        }
    },
    {
        id: 2,
        image: rotorCutaway,
        title: 'РћСЃС‚Р°РІРёС‚СЊ Р·Р°СЏРІРєСѓ',
        description:
            'Р—Р°РїРѕР»РЅРёС‚Рµ С„РѕСЂРјСѓ Рё РјС‹ СЃРІСЏР¶РµРјСЃСЏ СЃ РІР°РјРё РІ Р±Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ, С‡С‚РѕР±С‹ РѕР±СЃСѓРґРёС‚СЊ РІР°С€ РїСЂРѕРµРєС‚.'
    }
];

const ContactPage = ({ onTitleChange }) => {
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // РЎРѕСЃС‚РѕСЏРЅРёРµ С„РѕСЂРјС‹
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const handleChange = (e) =>
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Р—Р°СЏРІРєР°:', formData);
        alert('РЎРїР°СЃРёР±Рѕ! РњС‹ СЃРІСЏР¶РµРјСЃСЏ СЃ РІР°РјРё РІ Р±Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ.');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    // РЎР±СЂРѕСЃ СЃРєСЂРѕР»Р»Р° Рё РЅР°Р±Р»СЋРґР°С‚РµР»СЊ Р·Р° СЃРµРєС†РёСЏРјРё
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

    // РЎРѕРѕР±С‰Р°РµРј App Рѕ СЃРјРµРЅРµ Р°РєС‚РёРІРЅРѕР№ СЃРµРєС†РёРё вЂ” Р·Р°РіРѕР»РѕРІРѕРє РѕС‚СЂРёСЃСѓРµС‚СЃСЏ РІ С…РµРґРµСЂРµ
    useEffect(() => {
        if (onTitleChange) {
            onTitleChange(contactSections[activeIndex]?.title || '');
        }
    }, [activeIndex, onTitleChange]);

    return (
        <div className="portfolio-scroll-container" ref={containerRef}>
            <SeoHead
                title="РљРѕРЅС‚Р°РєС‚С‹"
                description="РЎРІСЏР¶РёС‚РµСЃСЊ СЃ Rain-Lab: С‚РµР»РµС„РѕРЅ, WhatsApp, Telegram, MAX, e-mail. РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі Рё Р›РµРЅРёРЅРіСЂР°РґСЃРєР°СЏ РѕР±Р»Р°СЃС‚СЊ. РћС‚РІРµС‡Р°РµРј Р·Р° 30 РјРёРЅСѓС‚."
                path="/contact"
                h1="РљРѕРЅС‚Р°РєС‚С‹ Rain-Lab вЂ” СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ РЅР°РјРё"
            />
            <Breadcrumbs items={[{ label: 'РљРѕРЅС‚Р°РєС‚С‹', path: '/contact' }]} />

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

                        {/* РЎРµРєС†РёСЏ 1 вЂ” РєРѕРЅС‚Р°РєС‚С‹ + РјРµСЃСЃРµРЅРґР¶РµСЂС‹ (РѕР±СЉРµРґРёРЅРµРЅС‹) */}
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
                                        title="РќР°РїРёСЃР°С‚СЊ РІ MAX"
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
                                        title="РќР°РїРёСЃР°С‚СЊ РІ WhatsApp"
                                    >
                                        <FaWhatsapp />
                                        <span>WhatsApp</span>
                                    </a>
                                    <a
                                        href={item.contacts.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pci-item"
                                        title="РќР°РїРёСЃР°С‚СЊ РІ Telegram"
                                    >
                                        <FaTelegram />
                                        <span>Telegram</span>
                                    </a>
                                </div>
                            </>
                        )}

                        {/* РЎРµРєС†РёСЏ 2 вЂ” С„РѕСЂРјР° Р·Р°СЏРІРєРё */}
                        {item.id === 2 && (
                            <form className="portfolio-contact-form" onSubmit={handleSubmit}>
                                <div className="pcf-group">
                                    <label htmlFor="cp-name">Р’Р°С€Рµ РёРјСЏ</label>
                                    <input
                                        id="cp-name"
                                        type="text"
                                        name="name"
                                        placeholder="РРІР°РЅ РРІР°РЅРѕРІ"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="pcf-group">
                                    <label htmlFor="cp-phone">РўРµР»РµС„РѕРЅ</label>
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
                                    <label htmlFor="cp-message">РЎРѕРѕР±С‰РµРЅРёРµ</label>
                                    <textarea
                                        id="cp-message"
                                        name="message"
                                        placeholder="Р Р°СЃСЃРєР°Р¶РёС‚Рµ Рѕ РІР°С€РµРј РїСЂРѕРµРєС‚Рµ..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="pcf-submit">
                                    РћС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            ))}

            <section className="portfolio-footer-section">
                <Footer />
            </section>

            {/* РРЅРґРёРєР°С‚РѕСЂ С‚РµРєСѓС‰РµРіРѕ СЂР°Р·РґРµР»Р° */}
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