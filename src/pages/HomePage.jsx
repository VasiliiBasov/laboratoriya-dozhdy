import React from 'react';
import '../styles/hero.css';

const HomePage = () => {
    return (
        <div className="main-container">
            {/* Блок с фиксированным фоном */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Ваш заголовок</h1>
                    <p>Описание компании или ключевое сообщение</p>
                </div>
            </section>

            {/* Остальной контент */}
            <div className="content-section">
                {/* Ваши другие компоненты */}
            </div>
        </div>
    );
};

export default HomePage;