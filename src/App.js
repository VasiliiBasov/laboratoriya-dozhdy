import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';

function AppContent() {
  const location = useLocation();

  // Полноэкранные страницы в стиле портфолио — для них применяется .portfolio-main
  // и отображается заголовок текущего раздела в хедере.
  // /privacy — обычная страница с футером, без scroll-snap.
  const fullscreenRoutes = ['/', '/portfolio', '/services', '/about', '/contact'];
  const isFullscreen = fullscreenRoutes.includes(location.pathname);

  // Название текущего объекта/раздела (для отображения в хедере)
  const [portfolioTitle, setPortfolioTitle] = useState('');

  const handlePortfolioTitleChange = useCallback((title) => {
    setPortfolioTitle(title);
  }, []);

  // Сбрасываем скролл при смене маршрута, чтобы не было скачка фона/текста
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Header portfolioTitle={portfolioTitle} />
      <main
        key={location.pathname}
        className={`${isFullscreen ? 'portfolio-main ' : ''}page-fade-wrapper`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/portfolio"
            element={<PortfolioPage onTitleChange={handlePortfolioTitleChange} />}
          />
          <Route
            path="/services"
            element={<ServicesPage onTitleChange={handlePortfolioTitleChange} />}
          />
          <Route path="/about" element={<AboutPage onTitleChange={handlePortfolioTitleChange} />} />
          <Route
            path="/contact"
            element={<ContactPage onTitleChange={handlePortfolioTitleChange} />}
          />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
