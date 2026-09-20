import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon, { WhatsAppIcon } from '../components/ui/Icon';
import { company } from '../data/company';
import { homeService } from '../data/homeService';
import { setupScrollAnimations } from '../utils/animations';

export default function HomeService() {
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    homeService.whatsappMessage
  )}`;

  return (
    <>
      {/* ====== PAGE HEADER ====== */}
      <section className="page-header">
        <div className="container page-header-content">
          <span className="hero-badge">✦ {homeService.eyebrow}</span>
          <h1>{homeService.title}</h1>
          <p>{homeService.subtitle}</p>

          <div className="hs-badges">
            {homeService.badges.map((badge) => (
              <span className="hs-badge" key={badge}>
                <Icon name="check" size={14} /> {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* ====== POR QUÉ + QUÉ LIMPIAMOS ====== */}
      <section className="section" id="hs-why">
        <div className="container">
          <div className="hs-two-col">
            {/* Por qué */}
            <div className="animate-on-scroll">
              <div className="hs-block-head">
                <div className="services-category-icon primary">
                  <Icon name="shield" size={22} />
                </div>
                <h2>{homeService.reasonsTitle}</h2>
              </div>
              <ul className="hs-reasons">
                {homeService.reasons.map((reason) => (
                  <li key={reason}>
                    <Icon name="check" size={16} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qué limpiamos */}
            <div className="animate-on-scroll">
              <div className="hs-block-head">
                <div className="services-category-icon secondary">
                  <Icon name="sparkles" size={22} />
                </div>
                <h2>{homeService.itemsTitle}</h2>
              </div>
              <div className="hs-items">
                {homeService.items.map((item) => (
                  <div className="hs-item" key={item.label}>
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROCESO ====== */}
      <section className="section" id="hs-process" style={{ background: 'var(--neutral-50)' }}>
        <div className="container">
          <div className="section-title animate-on-scroll">
            <span className="section-title-badge">Cómo trabajamos</span>
            <h2>{homeService.processTitle}</h2>
          </div>

          <div className="hs-process stagger-children">
            {homeService.process.map((item, index) => (
              <div className="hs-step animate-on-scroll" key={item.step}>
                <div className="hs-step-number">{index + 1}</div>
                <h4>{item.step}</h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRECIOS ====== */}
      <section className="section" id="hs-pricing">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <span className="section-title-badge">Tarifas</span>
            <h2>{homeService.pricingTitle}</h2>
          </div>

          <div className="hs-pricing-card animate-on-scroll">
            <table className="hs-pricing-table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Rango aproximado</th>
                </tr>
              </thead>
              <tbody>
                {homeService.pricing.map((row) => (
                  <tr key={row.service}>
                    <td>{row.service}</td>
                    <td className="hs-price">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="hs-pricing-notes">
              {homeService.pricingNotes.map((note) => (
                <p key={note}>* {note}</p>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg hs-pricing-cta"
              id="hs-pricing-whatsapp"
            >
              <WhatsAppIcon size={20} />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="cta-banner">
        <div className="container cta-banner-content animate-on-scroll">
          <h2>¡Agenda tu servicio!</h2>
          <p>
            Cotización rápida por WhatsApp, atención a domicilio en CDMX y área metropolitana.
          </p>
          <div className="cta-banner-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white btn-lg"
              id="hs-cta-whatsapp"
            >
              <WhatsAppIcon size={20} />
              WhatsApp {company.contact.phone}
            </a>
            <Link
              to="/contacto"
              className="btn btn-outline btn-lg"
              id="hs-cta-contact"
              style={{ color: 'var(--white)', borderColor: 'hsla(0,0%,100%,0.3)' }}
            >
              Dejar mis datos
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
        <div className="cta-banner-shape cta-banner-shape-1" />
        <div className="cta-banner-shape cta-banner-shape-2" />
      </section>
    </>
  );
}
