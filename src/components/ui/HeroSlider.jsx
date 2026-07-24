import React, { useState, useEffect } from 'react';

/**
 * HeroSlider
 * ------------------------------------------------------------------
 * Slider automático para el header. Usa 3 ilustraciones originales
 * (no fotos) como placeholder mientras el cliente entrega su carpeta
 * de fotos reales (técnicos con EPP, equipos, edificios).
 *
 * CÓMO SUSTITUIR POR FOTOS REALES:
 * Reemplaza el array SLIDES de abajo. En vez de <IllustrationX />,
 * usa: { image: '/img/hero-1.jpg', caption: '...' } y cambia el
 * render de cada slide por un <img src={slide.image} />.
 * ------------------------------------------------------------------
 */

const SLIDES = [
  { id: 'crew', caption: 'Equipo profesional con EPP completo' },
  { id: 'hvac', caption: 'Mantenimiento certificado de sistemas HVAC' },
  { id: 'building', caption: 'Instalaciones corporativas impecables' },
];

function IllustrationCrew() {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="hsl(210,55%,16%)" />
      <rect width="400" height="300" fill="url(#dotsCrew)" opacity="0.5" />
      <defs>
        <pattern id="dotsCrew" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="hsla(0,0%,100%,0.08)" />
        </pattern>
      </defs>
      {/* Technician silhouette */}
      <g transform="translate(150,60)">
        <circle cx="40" cy="30" r="20" fill="hsl(35,70%,68%)" />
        <rect x="15" y="50" width="50" height="70" rx="10" fill="hsl(152,45%,45%)" />
        <rect x="15" y="50" width="50" height="22" rx="8" fill="hsl(45,90%,55%)" />
        <rect x="0" y="115" width="24" height="60" rx="8" fill="hsl(210,20%,25%)" />
        <rect x="56" y="115" width="24" height="60" rx="8" fill="hsl(210,20%,25%)" />
        <rect x="-15" y="55" width="18" height="55" rx="8" fill="hsl(152,45%,45%)" />
        <rect x="77" y="55" width="18" height="55" rx="8" fill="hsl(152,45%,45%)" />
        {/* helmet */}
        <path d="M20 18 A20 20 0 0 1 60 18 Z" fill="hsl(45,90%,55%)" />
      </g>
      {/* Equipment: vacuum */}
      <g transform="translate(260,150)">
        <rect x="0" y="0" width="26" height="70" rx="6" fill="hsl(210,55%,42%)" />
        <circle cx="13" cy="80" r="10" fill="hsl(210,20%,25%)" />
        <rect x="-8" y="-10" width="42" height="14" rx="6" fill="hsl(210,58%,34%)" />
      </g>
      <text x="200" y="270" textAnchor="middle" fill="hsla(0,0%,100%,0.3)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="3">AF SOLUTIONS</text>
    </svg>
  );
}

function IllustrationHVAC() {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="hsl(210,58%,14%)" />
      <rect width="400" height="300" fill="url(#gridHvac)" opacity="0.4" />
      <defs>
        <pattern id="gridHvac" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="hsla(0,0%,100%,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      {/* HVAC rooftop unit */}
      <g transform="translate(110,90)">
        <rect x="0" y="40" width="180" height="90" rx="10" fill="hsl(210,15%,55%)" />
        <rect x="0" y="40" width="180" height="18" rx="8" fill="hsl(210,15%,65%)" />
        <circle cx="45" cy="95" r="26" fill="hsl(210,20%,30%)" />
        <circle cx="45" cy="95" r="26" fill="none" stroke="hsl(152,45%,55%)" strokeWidth="2.5" />
        <g stroke="hsl(152,45%,60%)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="45" y1="75" x2="45" y2="115" />
          <line x1="25" y1="95" x2="65" y2="95" />
          <line x1="31" y1="81" x2="59" y2="109" />
          <line x1="59" y1="81" x2="31" y2="109" />
        </g>
        <circle cx="135" cy="95" r="26" fill="hsl(210,20%,30%)" />
        <circle cx="135" cy="95" r="26" fill="none" stroke="hsl(45,80%,60%)" strokeWidth="2.5" />
        <g stroke="hsl(45,85%,65%)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="135" y1="75" x2="135" y2="115" />
          <line x1="115" y1="95" x2="155" y2="95" />
        </g>
      </g>
      <text x="200" y="270" textAnchor="middle" fill="hsla(0,0%,100%,0.3)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="3">AF SOLUTIONS</text>
    </svg>
  );
}

function IllustrationBuilding() {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="hsl(152,40%,14%)" />
      <rect x="0" y="220" width="400" height="80" fill="hsl(152,35%,18%)" />
      {/* Building */}
      <g transform="translate(120,30)">
        <rect x="0" y="0" width="160" height="190" fill="hsl(210,20%,32%)" />
        <rect x="0" y="0" width="160" height="190" fill="url(#winGrid)" />
        <defs>
          <pattern id="winGrid" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="translate(7,10)">
            <rect width="16" height="16" fill="hsl(45,70%,62%)" opacity="0.55" />
          </pattern>
        </defs>
        <rect x="-10" y="185" width="180" height="14" fill="hsl(210,20%,25%)" />
      </g>
      <text x="200" y="270" textAnchor="middle" fill="hsla(0,0%,100%,0.3)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="3">AF SOLUTIONS</text>
    </svg>
  );
}

const ILLUSTRATIONS = {
  crew: IllustrationCrew,
  hvac: IllustrationHVAC,
  building: IllustrationBuilding,
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px hsla(210,60%,10%,0.35)',
      }}
    >
      {SLIDES.map((slide, i) => {
        const Illustration = ILLUSTRATIONS[slide.id];
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <Illustration />
          </div>
        );
      })}

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '18px 20px',
          background: 'linear-gradient(180deg, transparent, hsla(0,0%,0%,0.55))',
        }}
      >
        <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>
          {SLIDES[index].caption}
        </p>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: '6px' }}>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setIndex(i)}
            aria-label={`Ver imagen ${i + 1}`}
            style={{
              width: i === index ? '18px' : '6px',
              height: '6px',
              borderRadius: '4px',
              border: 'none',
              background: i === index ? 'white' : 'hsla(0,0%,100%,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
