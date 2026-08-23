import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">Р›Р°Р±РѕСЂР°С‚РѕСЂРёСЏ РґРѕР¶РґСЏ</div>
                    <div className="footer-contacts">
                        <p>Рі. РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі</p>
                        <p>+7 (999) 529-20-65</p>
                        <p>info@rain-lab.ru</p>
                    </div>
                    <div className="footer-social">
                        <a
                            href="https://max.ru/u/f9LHodD0cOI0N1nmW808lpfczahN0wCuCwYwQbIM4xZu8BVNOcdsYcSA3qQ"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            MAX
                        </a>
                        <a href="#">Telegram</a>
                        <a href="#">WhatsApp</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    В© 2026 Р›Р°Р±РѕСЂР°С‚РѕСЂРёСЏ РґРѕР¶РґСЏ. Р’СЃРµ РїСЂР°РІР° Р·Р°С‰РёС‰РµРЅС‹.
                </div>
                {/* Р”Р°С‚Р° РѕР±РЅРѕРІР»РµРЅРёСЏ (Рї. PDF В«Р”Р°С‚Р° РѕР±РЅРѕРІР»РµРЅРёСЏВ») + СЃСЃС‹Р»РєР° РЅР° РїРѕР»РёС‚РёРєСѓ */}
                <div className="footer-updated">
                    РћР±РЅРѕРІР»РµРЅРѕ: <time dateTime="2026-08-22">22 Р°РІРіСѓСЃС‚Р° 2026 Рі.</time>
                    {' В· '}
                    <Link to="/privacy">РџРѕР»РёС‚РёРєР° РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;