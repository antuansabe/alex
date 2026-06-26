import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, getServicesByCategory } from '../data/services';
import { company } from '../data/company';
import Icon from '../components/ui/Icon';
import { setupScrollAnimations } from '../utils/animations';

export default function Services() {
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Nuestros Servicios</h1>
          <p>
            Cartera completa de soluciones de mantenimiento corporativo para mantener tus instalaciones en óptimas condiciones
          </p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* Services by Category */}
      <section style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container">
          {serviceCategories.map((category) => {
            const categoryServices = getServicesByCategory(category.id);

            return (
              <div className="services-category animate-on-scroll" key={category.id} id={`category-${category.id}`}>
                {/* Category Header */}
                <div className="services-category-header">
                  <div className={`services-category-icon ${category.color}`}>
                    <Icon name={category.icon} size={26} />
                  </div>
                  <div>
                    <h3>{category.title}</h3>
                    <p>{category.subtitle}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="services-page-grid stagger-children">
                  {categoryServices.map((service) => (
                    <article
                      className={`service-card animate-on-scroll${category.id === 'soft' ? ' soft' : ''}`}
                      key={service.id}
                      id={`service-card-${service.id}`}
                    >
                      {/* Card Header */}
                      <div className="service-card-header">
                        <div className="service-card-icon">
                          <Icon name={service.icon} size={22} />
                        </div>
                        <div>
                          <h3>{service.title}</h3>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--neutral-500)' }}>
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="service-card-body">
                        <p>{service.fullDescription}</p>

                        <ul className="service-card-features">
                          {service.features.map((feature, idx) => (
                            <li className="service-card-feature" key={idx}>
                              <Icon name="check" size={16} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card CTA */}
                      <div className="service-card-cta">
                        <Link
                          to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                          className="btn btn-primary btn-sm"
                          id={`service-cta-${service.id}`}
                        >
                          Solicitar Cotización
                          <Icon name="arrowRight" size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner-content animate-on-scroll">
          <h2>¿Necesitas un servicio personalizado?</h2>
          <p>
            Contáctanos para diseñar un plan de mantenimiento a la medida de tus instalaciones.
          </p>
          <div className="cta-banner-actions">
            <Link to="/contacto" className="btn btn-white btn-lg" id="services-cta-contact">
              Solicitar Cotización
              <Icon name="arrowRight" size={18} />
            </Link>
            <a
              href={`https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(company.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
              id="services-cta-whatsapp"
              style={{ color: 'var(--white)', borderColor: 'hsla(0,0%,100%,0.3)' }}
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
        <div className="cta-banner-shape cta-banner-shape-1" />
        <div className="cta-banner-shape cta-banner-shape-2" />
      </section>
    </>
  );
}
