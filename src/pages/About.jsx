import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { company } from '../data/company';
import Icon from '../components/ui/Icon';
import { setupScrollAnimations } from '../utils/animations';

export default function About() {
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Quiénes Somos</h1>
          <p>
            Conoce la historia, misión y valores que nos impulsan a ofrecer el mejor servicio de mantenimiento corporativo
          </p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* History Section */}
      <section className="about-section">
        <div className="container">
          <div className="animate-on-scroll" style={{ maxWidth: 800, marginInline: 'auto', textAlign: 'center' }}>
            <div className="section-title">
              <span className="section-title-badge">
                <Icon name="building" size={14} />
                Nuestra Historia
              </span>
              <h2>Una Trayectoria de Excelencia</h2>
            </div>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--neutral-600)', lineHeight: 1.8 }}>
              {company.about.history}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section" style={{ background: 'var(--neutral-50)' }}>
        <div className="container">
          <div className="section-title animate-on-scroll">
            <span className="section-title-badge green">
              <Icon name="star" size={14} />
              Nuestro Propósito
            </span>
            <h2>Misión y Visión</h2>
            <p>Los pilares que guían cada decisión y acción en AF Solutions</p>
          </div>

          <div className="about-mission-vision">
            <div className="about-mv-card mission animate-on-scroll">
              <h3>
                <Icon name="shield" size={32} />
                Misión
              </h3>
              <p>{company.about.mission}</p>
            </div>

            <div className="about-mv-card vision animate-on-scroll">
              <h3>
                <Icon name="sparkles" size={32} />
                Visión
              </h3>
              <p>{company.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="about-section">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <span className="section-title-badge">
              <Icon name="star" size={14} />
              Nuestros Valores
            </span>
            <h2>Lo Que Nos Define</h2>
            <p>Los principios fundamentales que orientan nuestro trabajo diario</p>
          </div>

          <div className="about-values-grid stagger-children">
            {company.values.map((value, index) => (
              <div className="card animate-on-scroll" key={index} id={`about-value-${index}`}>
                <div className="card-icon primary">
                  <Icon name={value.icon} size={24} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about-section" style={{ background: 'var(--neutral-50)' }}>
        <div className="container">
          <div className="animate-on-scroll" style={{ maxWidth: 640, marginInline: 'auto', textAlign: 'center' }}>
            <div className="section-title">
              <span className="section-title-badge green">
                <Icon name="users" size={14} />
                Liderazgo
              </span>
              <h2>Nuestro Fundador</h2>
            </div>

            <div className="about-mv-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 'var(--text-2xl)',
                  marginInline: 'auto',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {company.about.founder.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <h3 style={{ justifyContent: 'center' }}>{company.about.founder.name}</h3>
              <p style={{ color: 'var(--primary-500)', fontWeight: 500, marginBottom: 'var(--space-3)' }}>
                {company.about.founder.title}
              </p>
              <p style={{ color: 'var(--neutral-500)', lineHeight: 1.8 }}>
                Con una visión clara y un compromiso inquebrantable con la excelencia, lidera a AF Solutions hacia nuevos estándares de calidad en el mantenimiento corporativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="container cta-banner-content animate-on-scroll">
          <h2>¿Listo para trabajar con nosotros?</h2>
          <p>
            Contáctanos hoy y descubre cómo podemos transformar el mantenimiento de tus instalaciones corporativas.
          </p>
          <div className="cta-banner-actions">
            <Link to="/contacto" className="btn btn-white btn-lg" id="about-cta-contact">
              Contáctanos
              <Icon name="arrowRight" size={18} />
            </Link>
            <Link to="/servicios" className="btn btn-outline btn-lg" id="about-cta-services" style={{ color: 'var(--white)', borderColor: 'hsla(0,0%,100%,0.3)' }}>
              Ver Servicios
            </Link>
          </div>
        </div>
        <div className="cta-banner-shape cta-banner-shape-1" />
        <div className="cta-banner-shape cta-banner-shape-2" />
      </section>
    </>
  );
}
