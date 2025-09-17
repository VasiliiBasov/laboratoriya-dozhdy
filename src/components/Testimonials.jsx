import React from 'react';
import '../styles/testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Иван Петров',
            text: 'Построили дом за 6 месяцев, очень доволен качеством!'
        },
        {
            name: 'Елена Смирнова',
            text: 'Профессиональный подход, все работы выполнены в срок.'
        }
    ];

    return (
        <section id="testimonials" className="testimonials">
            <div className="container">
                <h2>Отзывы клиентов</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <p className="testimonial-author">— {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;