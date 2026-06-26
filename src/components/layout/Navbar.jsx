import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/nosotros', label: 'Quiénes Somos' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/galeria', label: 'Galería' },
  { path: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection — transparent at top, solid after 50px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navbarClass = `navbar ${isScrolled ? 'scrolled' : 'transparent'}`;

  return (
    <>
      <nav className={navbarClass} id="navbar-main">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="navbar-logo-link">
            <span className="navbar-logo-text">
              AF <span>Solutions</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="navbar-links" id="navbar-desktop-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                  id={`navbar-link-${link.path.replace('/', '') || 'inicio'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link to="/contacto" className="btn btn-primary navbar-cta" id="navbar-cta-desktop">
            Cotización Gratis
          </Link>

          {/* Hamburger button */}
          <button
            className="navbar-hamburger"
            id="navbar-hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        id="mobile-menu-overlay"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile slide-in menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <button
          className="mobile-menu-close"
          id="mobile-menu-close-btn"
          onClick={closeMobileMenu}
          aria-label="Cerrar menú"
        >
          <Icon name="close" size={24} />
        </button>

        <ul className="mobile-menu-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`mobile-menu-link ${location.pathname === link.path ? 'active' : ''}`}
                id={`mobile-link-${link.path.replace('/', '') || 'inicio'}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contacto"
          className="btn btn-primary mobile-menu-cta"
          id="mobile-menu-cta-btn"
          onClick={closeMobileMenu}
        >
          Cotización Gratis
        </Link>
      </div>
    </>
  );
}
