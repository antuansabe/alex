import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HomeService from './pages/HomeService';
import Contact from './pages/Contact';

// Título que aparece en la pestaña del navegador para cada ruta.
// Si agregas una página nueva, agrega también su título aquí.
const pageTitles = {
  '/': 'AF Solutions | Mantenimiento Corporativo Integral',
  '/nosotros': 'Quiénes Somos | AF Solutions',
  '/servicios': 'Servicios de Mantenimiento Corporativo | AF Solutions',
  '/domicilio': 'Lavado de Salas, Sillones y Colchones a Domicilio | AF Solutions',
  '/contacto': 'Contacto y Cotización | AF Solutions',
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title =
      pageTitles[pathname] || 'AF Solutions | Mantenimiento Corporativo Integral';
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/domicilio" element={<HomeService />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
