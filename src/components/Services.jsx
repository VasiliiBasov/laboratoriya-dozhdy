import React from 'react';
import '../styles/services.css';

const Services = () => {
    const services = [
        {
            title: 'Строительство домов',
            description: 'Полный цикл от проекта до сдачи под ключ'
        },
        {
            title: 'Ремонт и отделка',
            description: 'Качественные материалы и современные технологии'
        },
        {
            title: 'Ландшафтный дизайн',
            description: 'Создадим уютное пространство вокруг вашего дома'
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2>Наши услуги</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;