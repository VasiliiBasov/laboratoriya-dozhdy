import React, { useState } from 'react';
import '../styles/portfolio.css';

const PortfolioPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Данные для портфолио ландшафтной компании
    const portfolioItems = [
        {
            id: 1,
            title: 'Загородный участок в Подмосковье',
            category: 'частные',
            image: '/images/portfolio-countryside.jpg',
            description: 'Комплексное благоустройство территории с зоной отдыха и декоративным прудом'
        },
        {
            id: 2,
            title: 'Парковая зона бизнес-центра',
            category: 'коммерческие',
            image: '/images/portfolio-business.jpg',
            description: 'Озеленение территории бизнес-парка с системой автоматического полива'
        },
        {
            id: 3,
            title: 'Садовый ландшафт коттеджа',
            category: 'частные',
            image: '/images/portfolio-cottage.jpg',
            description: 'Создание японского сада с каменными композициями и мостиками'
        },
        {
            id: 4,
            title: 'Городской сквер',
            category: 'муниципальные',
            image: '/images/portfolio-park.jpg',
            description: 'Реконструкция городского сквера с детскими площадками и пешеходными дорожками'
        },
        {
            id: 5,
            title: 'Терраса ресторана',
            category: 'коммерческие',
            image: '/images/portfolio-restaurant.jpg',
            description: 'Озеленение летней террасы с вертикальным садом и декоративным освещением'
        },
        {
            id: 6,
            title: 'Усадьба премиум-класса',
            category: 'частные',
            image: '/images/portfolio-estate.jpg',
            description: 'Эксклюзивный ландшафтный дизайн с фонтанами и альпийскими горками'
        }
    ];

    const categories = ['all', 'частные', 'коммерческие', 'муниципальные'];

    const filteredItems = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);

    return (
        <div className="portfolio-page">
            <section className="portfolio-hero">
                <div className="container">
                    <h1>Наши проекты</h1>
                    <p>Реализованные работы по ландшафтному дизайну и благоустройству</p>
                </div>
            </section>

            <section className="portfolio-content">
                <div className="container">
                    {/* Фильтры */}
                    <div className="portfolio-filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category === 'all' ? 'Все проекты' :
                                    category === 'частные' ? 'Частные участки' :
                                        category === 'коммерческие' ? 'Коммерческие объекты' : 'Муниципальные проекты'}
                            </button>
                        ))}
                    </div>

                    {/* Сетка портфолио */}
                    <div className="portfolio-grid">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="portfolio-item">
                                <div className="portfolio-image">
                                    <img src={item.image} alt={item.title} />
                                    <div className="portfolio-category">{item.category}</div>
                                </div>
                                <div className="portfolio-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <button className="portfolio-details-btn">
                                        Смотреть проект
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;