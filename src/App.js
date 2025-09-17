import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects3D from './components/Projects3D';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import PortfolioPage from './pages/PortfolioPage';
import Testimonials from "./components/Testimonials";

function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <Testimonials />
            <ContactForm />
        </>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/portfolio" element={<PortfolioPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;