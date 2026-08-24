import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from './SeoHead';

// Хлебные крошки (навигация). Визуально скрыты — внешний вид страниц не меняется,
// но доступны для скринридеров и поисковиков. Дополнительно генерируем
// JSON-LD BreadcrumbList в <head>, чтобы Google показывал крошки в выдаче.
const Breadcrumbs = ({ items }) => {
  // items: [{ label: 'Услуги', path: '/services' }, { label: 'Автополив', path: '/services' /* текущая */ }]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      ...items.map((it, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: it.label,
        item: `${SITE_URL}${it.path}`,
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <nav aria-label="breadcrumb" className="visually-hidden">
        <ol>
          <li>
            <Link to="/">{SITE_NAME}</Link>
          </li>
          {items.map((it, idx) => (
            <li key={idx} aria-current={idx === items.length - 1 ? 'page' : undefined}>
              {idx === items.length - 1 ? (
                <span>{it.label}</span>
              ) : (
                <Link to={it.path}>{it.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
