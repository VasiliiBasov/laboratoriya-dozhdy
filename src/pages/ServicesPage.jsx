import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/servicesPage.css';

// Собственные фото (папка pinterest/)
import sprinklerWorking from '../assets/images/pinterest/sprinkler-working.jpg';
import dripPrettyDrop from '../assets/images/pinterest/drip-pretty-drop.jpg';
import nozzleHunter from '../assets/images/pinterest/nozzle-hunter.jpg';
import dripTechnology from '../assets/images/pinterest/drip-technology.jpg';
import pipesCutaway from '../assets/images/pinterest/pipes-cutaway.jpg';
import nozzleUnderground from '../assets/images/pinterest/nozzle-underground.jpg';
import dripBeds from '../assets/images/pinterest/drip-beds.jpg';

// FAQ — закрывает пункт отчёта beget «Наличие FAQ-блока».
// Ответы на популярные вопросы по автополиву.
const faqItems = [
  {
    q: 'Сколько стоит система автополива под ключ?',
    a: 'Стоимость рассчитывается индивидуально и зависит от площади участка, количества зон полива, типа оборудования и сложности коммуникаций. Ориентировочно — от 13 000 ₽ за сотку под ключ с оборудованием Hunter. Точную смету подготовим после выезда на замер.',
  },
  {
    q: 'Сколько времени занимает монтаж автополива?',
    a: 'Базовый монтаж на участке 6-10 соток — 3-5 рабочих дней. Подготовительные земляные работы, прокладка труб, установка спринклеров, подключение контроллера и пуско-наладка. Сроки фиксируем в договоре.',
  },
  {
    q: 'Нужно ли обслуживать систему зимой?',
    a: 'Да. Каждый год осенью делаем консервацию: продувка труб сжатым воздухом, демонтаж насоса при необходимости, проверка клапанов. Весной — расконсервация и настройка полива под текущий сезон. По желанию заключаем годовой договор на обслуживание.',
  },
  {
    q: 'Какую гарантию вы даёте?',
    a: 'На все оборудование Hunter — заводская гарантия 5 лет. На монтажные работы — гарантия 3 года. Если в течение этого срока что-то выйдет из строя по нашей вине, устраним бесплатно.',
  },
  {
    q: 'Можно ли установить автополив на уже готовый газон?',
    a: 'Да. Используем метод прокола — узкие траншеи, которые быстро зарастают и не портят ландшафт. Если газон ещё не уложен — монтаж пойдёт быстрее и дешевле, поэтому рекомендуем проектировать автополив одновременно с благоустройством.',
  },
  {
    q: 'Сколько воды расходует автополив?',
    a: 'Зависит от площади и типа растений. В среднем — 5-10 л/м² в сутки. Датчики дождя и влажности автоматически отключают полив в непогоду и при достаточной влажности почвы, поэтому перерасхода воды не бывает.',
  },
];

const servicesSections = [
  {
    id: 1,
    image: sprinklerWorking,
    title: 'Автополив под ключ',
    description:
      'Проектирование, монтаж и обслуживание систем автоматического полива для участков любой сложности: схема под ваш источник воды, подбор оборудования Hunter и сезонное сопровождение',
  },
  {
    id: 2,
    image: dripPrettyDrop,
    title: 'Капельный полив',
    description:
      'Экономичная система точечной подачи воды непосредственно в корневую зону растений — для кустарников, цветников, грядок и теплиц. Подключаем к контроллеру с гибкой настройкой зон и времени полива',
  },
  {
    id: 3,
    image: nozzleHunter,
    title: 'Дождевание',
    description:
      'Роторные и веерные спринклеры Hunter для равномерного орошения газонов и больших площадей с настройкой секторов под форму вашего участка',
  },
  {
    id: 4,
    image: dripBeds,
    title: 'Капельный полив для теплиц',
    description:
      'Готовое решение для парников и теплиц: стабильная влажность, экономия воды, минимум ручного труда. Отдельный контроллер, датчики влажности, капельные линии под каждый ряд или грядку, по желанию — бак с подогревом и автоматической подачей',
  },
  {
    id: 5,
    image: pipesCutaway,
    title: 'Проектирование освещения',
    description:
      'Профессиональный светодизайн участка и подсветка зданий: концепция, расстановка светильников, схемы питания, привязки к ландшафту, дорожкам и зонам отдыха. Подбираем технику под задачу и бюджет, согласовываем сценарии вечерней подсветки и управление (включая «умный дом»).',
  },
  {
    id: 6,
    image: pipesCutaway,
    title: 'Монтаж освещения',
    description:
      'Полный цикл работ под ключ: прокладка кабелей в защитной гофре, установка опор и закладных, монтаж светильников, датчиков и контроллеров, подключение к щиту с автоматами и УЗО, пуско-наладка и проверка сценариев. Гарантия на работы и оборудование.',
  },
];

const ServicesPage = ({ onTitleChange }) => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Состояние открытого вопроса в FAQ
  const [openFaq, setOpenFaq] = useState(null);

  // Наблюдатель за текущей видимой секцией
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

  // Сообщаем App о смене активной секции — заголовок отрисуется в хедере
  useEffect(() => {
    if (onTitleChange) {
      // Если активна FAQ-секция (последняя) — отдаём её заголовок
      if (activeIndex === servicesSections.length) {
        onTitleChange('Вопросы и ответы');
      } else {
        onTitleChange(servicesSections[activeIndex]?.title || '');
      }
    }
  }, [activeIndex, onTitleChange]);

  // JSON-LD FAQPage для расширенной выдачи Google/Яндекса
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };

  return (
    <div className="portfolio-scroll-container" ref={containerRef}>
      <SeoHead
        title="Услуги автополива"
        description="Автополив под ключ, капельный полив, дождевание, устройство газона, дренаж и ливневая канализация в Санкт-Петербурге. Гарантия 5 лет."
        path="/services"
        h1="Услуги автополива в Санкт-Петербурге и Ленинградской области"
      />
      <Breadcrumbs items={[{ label: 'Услуги', path: '/services' }]} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {servicesSections.map((item, index) => (
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
            {/* Заголовок секции оставлен только в DOM (для SEO и скринридеров).
                            Визуально — отображается в хедере через .portfolio-header-title,
                            чтобы не было дубля «заголовок + текст». */}
            <h2 className="visually-hidden">{item.title}</h2>
            <p className="portfolio-section-desc">{item.description}</p>
            {/* Внутренние ссылки — закрывают пункт «Внутренние ссылки» из PDF */}
            <div className="portfolio-section-links">
              <Link to="/portfolio" className="portfolio-section-link">
                Примеры работ →
              </Link>
              <Link to="/contact" className="portfolio-section-link">
                Получить расчёт →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ-секция — 7-я по счёту, единый стиль с остальными. */}
      <section
        key="faq"
        className="portfolio-item-section"
        ref={(el) => (sectionRefs.current[servicesSections.length] = el)}
      >
        <div className="portfolio-item-image">
          <img
            src={dripBeds}
            alt="Часто задаваемые вопросы об автополиве"
            loading="lazy"
            decoding="async"
          />
          <div className="portfolio-item-overlay" />
        </div>

        <div className="portfolio-content-center">
          {/* Заголовок FAQ-секции визуально дублируется в хедере
                        (через onTitleChange('Вопросы и ответы')), поэтому
                        в DOM оставляем, но визуально скрываем. */}
          <h2 className="visually-hidden">Вопросы и ответы</h2>
          <p className="portfolio-section-desc">
            Ответы на самые частые вопросы о системах автоматического полива. Не нашли ответ —
            напишите нам.
          </p>

          <div className="portfolio-faq-list">
            {faqItems.map((it, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`portfolio-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="portfolio-faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{it.q}</span>
                    <span className="portfolio-faq-toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="portfolio-faq-a">
                      <p>{it.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="portfolio-section-links">
            <Link to="/contact" className="portfolio-section-link">
              Задать свой вопрос →
            </Link>
          </div>
        </div>
      </section>

      <section className="portfolio-footer-section">
        <Footer />
      </section>

      {/* Индикатор текущего раздела (теперь включая FAQ) */}
      <div className="portfolio-indicator">
        <span className="indicator-current">
          {String(Math.min(activeIndex + 1, servicesSections.length + 1)).padStart(2, '0')}
        </span>
        <span className="indicator-sep">/</span>
        <span className="indicator-total">
          {String(servicesSections.length + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default ServicesPage;
