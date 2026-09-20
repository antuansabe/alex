import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, getServicesByCategory } from '../data/services';
import { homeService } from '../data/homeService';
import { company } from '../data/company';
import Icon, { WhatsAppIcon } from '../components/ui/Icon';
import { setupScrollAnimations } from '../utils/animations';

export default function Services() {
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  const homeWhatsapp = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    homeService.whatsappMessage
  )}`;

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Nuestros Servicios</h1>
          <p>
            Mantenimiento para corporativos y servicio de lavado de muebles a
            domicilio. Elige la columna que corresponde a lo que necesitas.
          </p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* Dos columnas: corporativo (izq) / domicilio (der) */}
      <section style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container">
          <div className="services-split">

            {/* ============ IZQUIERDA — CORPORATIVO ============ */}
            <div className="services-col" id="col-corporativo">
              <div className="services-col-head animate-on-scroll">
                <span className="section-title-badge">Empresas y corporativos</span>
                <h2>Mantenimiento corporativo</h2>
                <p>
                  Cartera completa de servicios para mantener tus instalaciones
                  en óptimas condiciones.
                </p>
              </div>

              {serviceCategories.map((category) => (
                <div
                  className="services-category animate-on-scroll"
                  key={category.id}
                  id={`category-${category.id}`}
                >
                  <div className="services-category-header">
                    <div className={`services-category-icon ${category.color}`}>
                      <Icon name={category.icon} size={26} />
                    </div>
                    <div>
                      <h3>{category.title}</h3>
                      <p>{category.subtitle}</p>
                    </div>
                  </div>

                  <div className="services-page-grid stagger-children">
                    {getServicesByCategory(category.id).map((service) => (
                      <article
                        className={`service-card animate-on-scroll${category.id === 'soft' ? ' soft' : ''}`}
                        key={service.id}
                        id={`service-card-${service.id}`}
                      >
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
              ))}
            </div>

            {/* ============ DERECHA — A DOMICILIO ============ */}
            <aside className="services-col services-col-home" id="col-domicilio">
              <div className="services-col-head animate-on-scroll">
                <span className="section-title-badge green">Hogar y particulares</span>
                <h2>{homeService.eyebrow}</h2>
                <p>{homeService.subtitle}</p>
              </div>

              <div className="hs-panel animate-on-scroll">
                {/* Qué limpiamos */}
                <h3 className="hs-panel-title">
                  <Icon name="sparkles" size={20} /> {homeService.itemsTitle}
                </h3>
                <div className="hs-items">
                  {homeService.items.map((item) => (
                    <div className="hs-item" key={item.label}>
                      <Icon name={item.icon} size={18} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Por qué */}
                <h3 className="hs-panel-title">
                  <Icon name="shield" size={20} /> {homeService.reasonsTitle}
                </h3>
                <ul className="hs-reasons">
                  {homeService.reasons.map((reason) => (
                    <li key={reason}>
                      <Icon name="check" size={16} />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {/* Proceso */}
                <h3 className="hs-panel-title">
                  <Icon name="wrench" size={20} /> {homeService.processTitle}
                </h3>
                <ol className="hs-process-list">
                  {homeService.process.map((item, index) => (
                    <li key={item.step}>
                      <span className="hs-step-number">{index + 1}</span>
                      <div>
                        <h4>{item.step}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* Badges */}
                <div className="hs-badges">
                  {homeService.badges.map((badge) => (
                    <span className="hs-badge" key={badge}>
                      <Icon name="check" size={14} /> {badge}
                    </span>
                  ))}
                </div>

                <a
                  href={homeWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg hs-panel-cta"
                  id="hs-panel-whatsapp"
                >
                  <WhatsAppIcon size={20} />
                  Cotizar por WhatsApp
                </a>
                <p className="hs-panel-note">{homeService.quoteNote}</p>
              </div>
            </aside>

          </div>
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
