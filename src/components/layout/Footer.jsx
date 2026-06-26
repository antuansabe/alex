import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';
import { company } from '../../data/company';
import { services } from '../../data/services';

const quickLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/nosotros', label: 'Quiénes Somos' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/galeria', label: 'Galería' },
  { path: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  const featuredServices = services.slice(0, 4);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Brand section */}
          <div className="footer-brand" id="footer-brand">
            <h3 className="footer-brand-name">
              AF <span>Solutions</span>
            </h3>
            <p>{company.description}</p>
            <div className="footer-social" id="footer-social-row">
              <a
                href={company.social.facebook}
                className="footer-social-link"
                id="footer-social-facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Icon name="facebook" size={20} />
              </a>
              <a
                href={company.social.instagram}
                className="footer-social-link"
                id="footer-social-instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Icon name="instagram" size={20} />
              </a>
              <a
                href={company.social.linkedin}
                className="footer-social-link"
                id="footer-social-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div id="footer-quick-links">
            <h4 className="footer-title">Enlaces</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link"
                    id={`footer-link-${link.path.replace('/', '') || 'inicio'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div id="footer-services">
            <h4 className="footer-title">Servicios</h4>
            <ul className="footer-links">
              {featuredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/servicios"
                    className="footer-link"
                    id={`footer-service-${service.id}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div id="footer-contact">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-links">
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="footer-link"
                  id="footer-contact-email"
                >
                  <Icon name="mail" size={16} /> {company.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                  className="footer-link"
                  id="footer-contact-phone"
                >
                  <Icon name="phone" size={16} /> {company.contact.phone}
                </a>
              </li>
              <li>
                <span className="footer-link" id="footer-contact-schedule">
                  <Icon name="clock" size={16} /> {company.schedule.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom" id="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {currentYear} {company.name}. Todos los derechos reservados.</p>
          <p>Mantenimiento corporativo integral en México</p>
        </div>
      </div>
    </footer>
  );
}
