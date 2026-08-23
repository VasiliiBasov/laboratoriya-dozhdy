import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/servicesPage.css';

// РЎРѕР±СЃС‚РІРµРЅРЅС‹Рµ С„РѕС‚Рѕ (РїР°РїРєР° pinterest/)
import appUi from '../assets/images/pinterest/app-ui.jpg';
import sprinklerWorking from '../assets/images/pinterest/sprinkler-working.jpg';
import dripPrettyDrop from '../assets/images/pinterest/drip-pretty-drop.jpg';
import dripTechnology from '../assets/images/pinterest/drip-technology.jpg';

// РЎРµРєС†РёРё СЃС‚СЂР°РЅРёС†С‹ "Рћ РЅР°СЃ"
const aboutSections = [
    {
        id: 1,
        image: appUi,
        title: 'Рћ РєРѕРјРїР°РЅРёРё',
        description: 'Р‘РѕР»РµРµ 10 Р»РµС‚ СЃРѕР·РґР°С‘Рј РєРѕРјС„РѕСЂС‚РЅС‹Рµ Рё СѓС…РѕР¶РµРЅРЅС‹Рµ С‚РµСЂСЂРёС‚РѕСЂРёРё. РљРѕРјР°РЅРґР° РёРЅР¶РµРЅРµСЂРѕРІ, Р»Р°РЅРґС€Р°С„С‚РЅС‹С… РґРёР·Р°Р№РЅРµСЂРѕРІ Рё СЃРїРµС†РёР°Р»РёСЃС‚РѕРІ РїРѕ Р°РІС‚РѕРїРѕР»РёРІСѓ.',
        features: [
            {
                title: 'РћРїС‹С‚',
                text: 'Р РµР°Р»РёР·РѕРІР°Р»Рё Р±РѕР»РµРµ 200 РїСЂРѕРµРєС‚РѕРІ СЂР°Р·РЅРѕР№ СЃР»РѕР¶РЅРѕСЃС‚Рё вЂ” РѕС‚ РґР°С‡РЅС‹С… СѓС‡Р°СЃС‚РєРѕРІ РґРѕ РєРѕС‚С‚РµРґР¶РЅС‹С… РїРѕСЃС‘Р»РєРѕРІ'
            },
            {
                title: 'Р“Р°СЂР°РЅС‚РёСЏ',
                text: 'Р”Р°С‘Рј РѕС„РёС†РёР°Р»СЊРЅСѓСЋ РіР°СЂР°РЅС‚РёСЋ РЅР° РІСЃРµ СЂР°Р±РѕС‚С‹ Рё РѕР±РѕСЂСѓРґРѕРІР°РЅРёРµ РґРѕ 5 Р»РµС‚'
            },
            {
                title: 'РЎСЂРѕРєРё',
                text: 'РЎРѕР±Р»СЋРґР°РµРј РґРѕРіРѕРІРѕСЂРЅС‹Рµ СЃСЂРѕРєРё: РїСЂРѕРµРєС‚РёСЂРѕРІР°РЅРёРµ Р·Р° 7 РґРЅРµР№, РјРѕРЅС‚Р°Р¶ Р·Р° 3вЂ“14 РґРЅРµР№'
            },
            {
                title: 'РџРѕРґРґРµСЂР¶РєР°',
                text: 'РЎРµСЂРІРёСЃРЅРѕРµ РѕР±СЃР»СѓР¶РёРІР°РЅРёРµ Рё СЃРµР·РѕРЅРЅР°СЏ РЅР°СЃС‚СЂРѕР№РєР° СЃРёСЃС‚РµРј Р°РІС‚РѕРїРѕР»РёРІР°'
            }
        ]
    },
    {
        id: 2,
        image: sprinklerWorking,
        title: 'РќР°С€Р° РјРёСЃСЃРёСЏ',
        description: 'Р”РµР»Р°РµРј Р·Р°РіРѕСЂРѕРґРЅСѓСЋ Р¶РёР·РЅСЊ РєРѕРјС„РѕСЂС‚РЅРѕР№ вЂ” Р±РµСЂС‘Рј РЅР° СЃРµР±СЏ РІСЃРµ Р·Р°РґР°С‡Рё РїРѕ РѕР·РµР»РµРЅРµРЅРёСЋ Рё Р°РІС‚РѕРїРѕР»РёРІСѓ, С‡С‚РѕР±С‹ РІС‹ РЅР°СЃР»Р°Р¶РґР°Р»РёСЃСЊ СЂРµР·СѓР»СЊС‚Р°С‚РѕРј, Р° РЅРµ СЂР°Р±РѕС‚РѕР№.'
    },
    {
        id: 3,
        image: dripPrettyDrop,
        title: 'РќР°С€Р° РєРѕРјР°РЅРґР°',
        description: 'РРЅР¶РµРЅРµСЂС‹-РїСЂРѕРµРєС‚РёСЂРѕРІС‰РёРєРё, Р»Р°РЅРґС€Р°С„С‚РЅС‹Рµ Р°СЂС…РёС‚РµРєС‚РѕСЂС‹, РјРѕРЅС‚Р°Р¶РЅРёРєРё СЃ РјРЅРѕРіРѕР»РµС‚РЅРёРј РѕРїС‹С‚РѕРј. РљР°Р¶РґС‹Р№ РѕР±СЉРµРєС‚ РІРµРґС‘С‚ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Р№ РјРµРЅРµРґР¶РµСЂ.'
    },
    {
        id: 4,
        image: dripTechnology,
        title: 'РќР°С€Рё С†РµРЅРЅРѕСЃС‚Рё',
        description: 'РљР°С‡РµСЃС‚РІРѕ, РЅР°РґС‘Р¶РЅРѕСЃС‚СЊ, РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ. РСЃРїРѕР»СЊР·СѓРµРј С‚РѕР»СЊРєРѕ СЃРµСЂС‚РёС„РёС†РёСЂРѕРІР°РЅРЅРѕРµ РѕР±РѕСЂСѓРґРѕРІР°РЅРёРµ РІРµРґСѓС‰РёС… РјРёСЂРѕРІС‹С… РїСЂРѕРёР·РІРѕРґРёС‚РµР»РµР№.'
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
                title="Рћ РєРѕРјРїР°РЅРёРё Rain-Lab"
                description="РљРѕРјР°РЅРґР° РёРЅР¶РµРЅРµСЂРѕРІ Рё Р»Р°РЅРґС€Р°С„С‚РЅС‹С… РґРёР·Р°Р№РЅРµСЂРѕРІ Rain-Lab. Р‘РѕР»РµРµ 200 РїСЂРѕРµРєС‚РѕРІ Р°РІС‚РѕРїРѕР»РёРІР° РІ РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРіРµ Рё Р›РµРЅРёРЅРіСЂР°РґСЃРєРѕР№ РѕР±Р»Р°СЃС‚Рё. Р“Р°СЂР°РЅС‚РёСЏ 5 Р»РµС‚."
                path="/about"
                h1="Рћ РєРѕРјРїР°РЅРёРё Rain-Lab вЂ” Р›Р°Р±РѕСЂР°С‚РѕСЂРёСЏ РґРѕР¶РґСЏ"
            />
            <Breadcrumbs items={[{ label: 'Рћ РєРѕРјРїР°РЅРёРё', path: '/about' }]} />

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
                        {/* Р—Р°РіРѕР»РѕРІРѕРє СЃРµРєС†РёРё РѕСЃС‚Р°РІР»РµРЅ С‚РѕР»СЊРєРѕ РІ DOM (РґР»СЏ SEO Рё СЃРєСЂРёРЅСЂРёРґРµСЂРѕРІ).
                            Р’РёР·СѓР°Р»СЊРЅРѕ вЂ” РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ РІ С…РµРґРµСЂРµ С‡РµСЂРµР· .portfolio-header-title,
                            С‡С‚РѕР±С‹ РЅРµ Р±С‹Р»Рѕ РґСѓР±Р»СЏ В«Р·Р°РіРѕР»РѕРІРѕРє + С‚РµРєСЃС‚В». */}
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

                        {/* Р’РЅСѓС‚СЂРµРЅРЅРёРµ СЃСЃС‹Р»РєРё вЂ” Р·Р°РєСЂС‹РІР°СЋС‚ РїСѓРЅРєС‚ В«Р’РЅСѓС‚СЂРµРЅРЅРёРµ СЃСЃС‹Р»РєРёВ» РёР· PDF */}
                        <div className="portfolio-section-links">
                            <Link to="/portfolio" className="portfolio-section-link">
                                РќР°С€Рё РїСЂРѕРµРєС‚С‹ в†’
                            </Link>
                            <Link to="/services" className="portfolio-section-link">
                                РЈСЃР»СѓРіРё в†’
                            </Link>
                            <Link to="/contact" className="portfolio-section-link">
                                РЎРІСЏР·Р°С‚СЊСЃСЏ СЃ РЅР°РјРё в†’
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