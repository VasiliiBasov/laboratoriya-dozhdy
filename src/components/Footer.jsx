import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">Лаборатория дождя</div>
                    <div className="footer-contacts">
                        <p>г. Санкт-Петербург</p>
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
                    © 2026 Лаборатория дождя. Все права защищены.
                </div>
                {/* Дата обновления (п. PDF «Дата обновления») + ссылка на политику */}
                <div className="footer-updated">
                    Обновлено: <time dateTime="2026-08-22">22 августа 2026 г.</time>
                    {' · '}
                    <Link to="/privacy">Политика конфиденциальности</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
