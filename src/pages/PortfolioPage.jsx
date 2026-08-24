import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/portfolio.css';

// Собственные фото (папка pinterest/)
import sprinklerWorking from '../assets/images/pinterest/sprinkler-working.jpg';
import dripPrettyDrop from '../assets/images/pinterest/drip-pretty-drop.jpg';
import dripTechnology from '../assets/images/pinterest/drip-technology.jpg';
import dripBeds from '../assets/images/pinterest/drip-beds.jpg';
import rotorCutaway from '../assets/images/pinterest/rotor-cutaway.jpg';
import pipesCutaway from '../assets/images/pinterest/pipes-cutaway.jpg';
import nozzleHunter from '../assets/images/pinterest/nozzle-hunter.jpg';
import nozzleUnderground from '../assets/images/pinterest/nozzle-underground.jpg';
import appUi from '../assets/images/pinterest/app-ui.jpg';

const portfolioItems = [
  {
    id: 1,
    images: [sprinklerWorking, dripPrettyDrop, dripBeds],
    title: 'Загородный участок в поселке Сосны',
    description: 'Полный комплекс работ по автополиву и благоустройству территории',
  },
  {
    id: 2,
    images: [dripTechnology, sprinklerWorking, dripPrettyDrop],
    title: 'Ландшафтный проект',
    description: 'Проектирование и монтаж системы автоматического полива',
  },
  {
    id: 3,
    images: [rotorCutaway, nozzleHunter, pipesCutaway],
    title: 'Система автополива',
    description: 'Установка современной системы полива с датчиками влажности',
  },
  {
    id: 4,
    images: [sprinklerWorking, dripTechnology, appUi],
    title: 'Частная территория',
    description: 'Индивидуальный проект озеленения и орошения участка',
  },
  {
    id: 5,
    images: [dripPrettyDrop, nozzleUnderground, dripBeds],
    title: 'Благоустройство',
    description: 'Комплексное благоустройство с системой автополива под ключ',
  },
  {
    id: 6,
    images: [pipesCutaway, sprinklerWorking, rotorCutaway],
    title: 'Строительные работы',
    description: 'Подготовительные и строительные работы на объекте',
  },
  {
    id: 7,
    images: [dripBeds, dripPrettyDrop, appUi],
    title: 'Озеленение',
    description: 'Посадка деревьев, кустарников и устройство газона',
  },
  {
    id: 8,
    images: [nozzleHunter, rotorCutaway, nozzleUnderground],
    title: 'Дизайн сада',
    description: 'Ландшафтный дизайн с декоративными элементами',
  },
  {
    id: 9,
    images: [sprinklerWorking, dripTechnology, dripBeds],
    title: 'Зона отдыха',
    description: 'Обустройство зоны отдыха с системой полива растений',
  },
  {
    id: 10,
    images: [dripPrettyDrop, dripBeds, rotorCutaway],
    title: 'Декоративные элементы',
    description: 'Установка декоративных конструкций и озеленение',
  },
  {
    id: 11,
    images: [appUi, sprinklerWorking, pipesCutaway],
    title: 'Готовый проект',
    description: 'Финальный этап работ и сдача объекта заказчику',
  },
  {
    id: 12,
    images: [nozzleHunter, dripTechnology, nozzleUnderground],
    title: 'Финальный результат',
    description: 'Полностью готовый объект с работающей системой автополива',
  },
];

const PortfolioPage = ({ onTitleChange }) => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Хранит индекс текущей фотографии в каждой секции
  const [photoIndices, setPhotoIndices] = useState(() => portfolioItems.map(() => 0));

  // Наблюдатель за текущей видимой секцией (для индикатора)
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
      onTitleChange(portfolioItems[activeIndex]?.title || '');
    }
  }, [activeIndex, onTitleChange]);

  // Перелистывание фото внутри конкретной секции
  const handlePrev = (sectionIndex, totalImages) => {
    setPhotoIndices((prev) => {
      const next = [...prev];
      next[sectionIndex] = (next[sectionIndex] - 1 + totalImages) % totalImages;
      return next;
    });
  };

  const handleNext = (sectionIndex, totalImages) => {
    setPhotoIndices((prev) => {
      const next = [...prev];
      next[sectionIndex] = (next[sectionIndex] + 1) % totalImages;
      return next;
    });
  };

  return (
    <div className="portfolio-scroll-container" ref={containerRef}>
      <SeoHead
        title="Портфолио проектов"
        description="Примеры работ по автополиву в Санкт-Петербурге: частные участки, ландшафтные проекты, системы дождевания и капельного полива под ключ."
        path="/portfolio"
        h1="Портфолио проектов автополива в Санкт-Петербурге"
      />
      <Breadcrumbs items={[{ label: 'Портфолио', path: '/portfolio' }]} />

      {/* Каждая секция — один объект портфолио на весь экран */}
      {portfolioItems.map((item, index) => {
        const photoIndex = photoIndices[index] || 0;
        return (
          <section
            key={item.id}
            className="portfolio-item-section"
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <div className="portfolio-item-image">
              <img src={item.images[photoIndex]} alt={item.title} loading="lazy" decoding="async" />
              <div className="portfolio-item-overlay" />
            </div>

            {/* Полупрозрачные кнопки перелистывания */}
            <button
              type="button"
              className="portfolio-nav-btn portfolio-nav-prev"
              onClick={() => handlePrev(index, item.images.length)}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              type="button"
              className="portfolio-nav-btn portfolio-nav-next"
              onClick={() => handleNext(index, item.images.length)}
              aria-label="Следующее фото"
            >
              ›
            </button>

            {/* Точки-индикаторы фото */}
            <div className="portfolio-photo-dots">
              {item.images.map((_, i) => (
                <span
                  key={i}
                  className={`portfolio-photo-dot ${i === photoIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Футер в конце скролл-контейнера, как в Hero на главной */}
      <section className="portfolio-footer-section">
        <Footer />
      </section>

      {/* Индикатор текущего проекта (правый нижний угол) */}
      <div className="portfolio-indicator">
        <span className="indicator-current">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="indicator-sep">/</span>
        <span className="indicator-total">{String(portfolioItems.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default PortfolioPage;
