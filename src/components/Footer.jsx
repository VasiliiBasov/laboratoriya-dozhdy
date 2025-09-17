import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">СтройКомплекс</div>
                    <div className="footer-contacts">
                        <p>г. Москва, ул. Строителей, 15</p>
                        <p>+7 (123) 456-78-90</p>
                        <p>info@stroycomplex.ru</p>
                    </div>
                    <div className="footer-social">
                        <a href="#">VK</a>
                        <a href="#">Telegram</a>
                        <a href="#">WhatsApp</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    © 2023 СтройКомплекс. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

export default Footer;