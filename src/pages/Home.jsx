import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon, { WhatsAppIcon } from '../components/ui/Icon';
import { company } from '../data/company';
import { services } from '../data/services';
import { setupScrollAnimations, animateCounter } from '../utils/animations';
import HeroSlider from '../components/ui/HeroSlider';

function StatItem({ number, suffix, label }) {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animateCounter(el, number, 2000, suffix);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [number, suffix]);

  return (
    <div className="stat-item animate-on-scroll">
      <div className="stat-number" ref={ref}>{number}{suffix}</div>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function Home() {
  // Scroll animations
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(company.contact.whatsappMessage)}`;

  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="hero" id="hero">
        <div className="hero-overlay" />
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />

        <div className="container">
          {/* hero-grid: 2 columnas en desktop (texto + slider), 1 columna en móvil */}
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">✦ Mantenimiento Corporativo Integral</span>

              <h1>
                Soluciones de mantenimiento{' '}
                <span className="highlight">que transforman</span> tus instalaciones
              </h1>

              <p className="hero-description">
                Cartera completa de servicios profesionales de mantenimiento para
                corporativos. Calidad, confianza y resultados garantizados.
              </p>

              <div className="hero-actions">
                <Link to="/contacto" className="btn btn-white btn-lg" id="hero-cta-quote">
                  Solicitar Cotización
                </Link>
                <Link
                  to="/servicios"
                  className="btn btn-outline btn-lg"
                  id="hero-cta-services"
                  style={{ borderColor: 'hsla(0,0%,100%,0.3)', color: '#fff' }}
                >
                  Nuestros Servicios
                </Link>
              </div>

              {/* Nota: el bloque de estadísticas se removió de aquí — ya se
                  muestra una sola vez en la sección "STATS BAR" justo abajo,
                  para no repetir la misma información dos veces seguidas. */}
            </div>

            {/* Slider de imágenes — placeholder ilustrado, listo para
                sustituir por fotos reales cuando el cliente las entregue.
                Ver comentarios en HeroSlider.jsx */}
            <div className="hero-visual">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="stats-bar" id="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {company.stats.map((stat, index) => (
              <StatItem key={index} number={stat.number} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== SERVICES PREVIEW SECTION ====== */}
      <section
        className="section"
        id="services-preview"
        style={{ background: 'var(--neutral-50)' }}
      >
        <div className="container">
          <div className="section-title animate-on-scroll">
            <span className="section-title-badge">Nuestros Servicios</span>
            <h2>Soluciones integrales para tu empresa</h2>
            <p>
              Ofrecemos una cartera completa de servicios de mantenimiento para
              que tus instalaciones funcionen de manera óptima.
            </p>
          </div>

          <div className="services-preview-grid stagger-children">
            {services.slice(0, 6).map((service, index) => (
              <Link
                to="/servicios"
                key={service.id}
                className="card animate-on-scroll"
                id={`service-card-${service.id}`}
              >
                <div className={`card-icon ${index % 2 === 0 ? 'primary' : 'secondary'}`}>
                  <Icon name={service.icon} size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/servicios" className="btn btn-primary" id="services-preview-cta">
              Ver todos los servicios
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ABOUT PREVIEW SECTION ====== */}
      <section className="section" id="about-preview">
        <div className="container">
          <div className="about-preview animate-on-scroll">
            {/* Left: Image */}
            <div className="about-preview-image">
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, hsl(210,55%,18%) 0%, hsl(152,40%,22%) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, hsla(0,0%,100%,0.07) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }} />
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'relative', zIndex: 1, marginBottom: 16 }}
                >
                  <rect width="80" height="80" rx="20" fill="hsla(0,0%,100%,0.08)" />
                  <text
                    x="50%"
                    y="54%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontFamily="'Outfit', sans-serif"
                    fontWeight="700"
                    fontSize="32"
                    fill="white"
                  >AF</text>
                </svg>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'hsla(0,0%,100%,0.9)',
                  position: 'relative',
                  zIndex: 1,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}>
                  AF Solutions
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'hsla(152,45%,65%,0.9)',
                  position: 'relative',
                  zIndex: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginTop: 4,
                  marginBottom: 0,
                }}>
                  Mantenimiento Corporativo
                </p>
              </div>
              <div className="about-preview-badge">
                <div className="about-preview-badge-number">10+</div>
                <div className="about-preview-badge-label">Años de experiencia</div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="about-preview-text">
              <h2>¿Por qué elegir AF Solutions?</h2>
              <p>{company.about.history}</p>

              <div className="about-preview-values">
                {company.values.slice(0, 4).map((value, index) => (
                  <div className="about-value-item" key={index}>
                    <div className="about-value-icon">
                      <Icon name={value.icon} size={18} />
                    </div>
                    <div>
                      <h4>{value.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-6)' }}>
                <Link to="/nosotros" className="btn btn-primary" id="about-preview-cta">
                  Conoce más sobre nosotros
                  <Icon name="arrowRight" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS SECTION — OCULTA ======
           Sección desactivada a petición del cliente (20/09/2026).
           Los testimonios seguían siendo de ejemplo (Carlos Mendoza,
           María Fernández). Para reactivarla hay que: (1) reemplazar
           el contenido de src/data/testimonials.js por testimonios
           reales, y (2) recuperar el bloque JSX del carrusel desde el
           commit b567be1 en git.
      */}

      {/* ====== CTA BANNER ====== */}
      <section className="cta-banner" id="cta-banner">
        <div className="cta-banner-shape cta-banner-shape-1" />
        <div className="cta-banner-shape cta-banner-shape-2" />

        <div className="container">
          <div className="cta-banner-content animate-on-scroll">
            <h2>¿Listo para mejorar tus instalaciones?</h2>
            <p>
              Solicita una cotización sin compromiso y descubre cómo podemos
              transformar tus espacios corporativos.
            </p>

            <div className="cta-banner-actions">
              <Link to="/contacto" className="btn btn-white btn-lg" id="cta-quote">
                Solicitar Cotización
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                id="cta-whatsapp"
                style={{ borderColor: 'hsla(0,0%,100%,0.3)', color: '#fff' }}
              >
                <WhatsAppIcon size={20} />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
