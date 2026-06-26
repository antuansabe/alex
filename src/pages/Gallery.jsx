import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../components/ui/Icon';
import { setupScrollAnimations } from '../utils/animations';

const galleryItems = [
  {
    id: 1,
    title: 'Lavado de Alfombras Corporativas',
    category: 'soft',
    gradient: 'linear-gradient(135deg, #2E7D6B, #48A98A)',
  },
  {
    id: 2,
    title: 'Restauración de Sillería Ejecutiva',
    category: 'soft',
    gradient: 'linear-gradient(135deg, #1B6B5A, #3D9B7A)',
  },
  {
    id: 3,
    title: 'Limpieza General de Oficinas',
    category: 'soft',
    gradient: 'linear-gradient(135deg, #3A8F7D, #5BC4A4)',
  },
  {
    id: 4,
    title: 'Mantenimiento Eléctrico Industrial',
    category: 'hard',
    gradient: 'linear-gradient(135deg, #2B5C8A, #4A8FC4)',
  },
  {
    id: 5,
    title: 'Instalación de Sistemas HVAC',
    category: 'hard',
    gradient: 'linear-gradient(135deg, #1E4D7A, #3878AD)',
  },
  {
    id: 6,
    title: 'Reparación Hidrosanitaria',
    category: 'hard',
    gradient: 'linear-gradient(135deg, #345E90, #5A8EC0)',
  },
  {
    id: 7,
    title: 'Tratamiento de Pisos Corporativos',
    category: 'soft',
    gradient: 'linear-gradient(135deg, #4CAF7D, #7BCFA0)',
  },
  {
    id: 8,
    title: 'Tableros Eléctricos y Cableado',
    category: 'hard',
    gradient: 'linear-gradient(135deg, #1A3A5C, #2E6090)',
  },
  {
    id: 9,
    title: 'Sanitización de Espacios de Trabajo',
    category: 'soft',
    gradient: 'linear-gradient(135deg, #38896E, #60BFA0)',
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const isLightboxOpen = selectedIndex !== null;

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext]);

  // Reset selected index when filter changes, then re-run scroll animations
  useEffect(() => {
    setSelectedIndex(null);
    // Re-run after DOM updates so new items get observed
    const timer = setTimeout(() => setupScrollAnimations(), 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'soft', label: 'Servicios Soft' },
    { id: 'hard', label: 'Servicios Hard' },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Galería</h1>
          <p>Conoce nuestro trabajo</p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* Gallery */}
      <section style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container">
          {/* Filter Buttons */}
          <div className="gallery-filters animate-on-scroll">
            {filters.map((filter) => (
              <button
                key={filter.id}
                id={`gallery-filter-${filter.id}`}
                className={`gallery-filter${activeFilter === filter.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid stagger-children">
            {filteredItems.map((item, index) => (
              <div
                className="gallery-item animate-on-scroll"
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-4)',
                  }}
                >
                  <Icon
                    name="image"
                    size={48}
                    style={{ color: 'hsla(0,0%,100%,0.3)' }}
                  />
                </div>
                <div className="gallery-item-overlay">
                  <span className="gallery-item-caption">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedIndex !== null && filteredItems[selectedIndex] && (
        <div
          className="gallery-modal-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder content for lightbox */}
            <div
              style={{
                width: '80vw',
                maxWidth: 800,
                aspectRatio: '16/10',
                background: filteredItems[selectedIndex].gradient,
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                name="image"
                size={80}
                style={{ color: 'hsla(0,0%,100%,0.3)' }}
              />
            </div>
            <p className="gallery-modal-caption">
              {filteredItems[selectedIndex].title}
            </p>
          </div>

          {/* Close Button */}
          <button
            className="gallery-modal-close"
            onClick={closeLightbox}
            id="gallery-modal-close"
            aria-label="Cerrar"
          >
            <Icon name="close" size={24} />
          </button>

          {/* Prev Button */}
          <button
            className="gallery-modal-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            id="gallery-modal-prev"
            aria-label="Anterior"
          >
            <Icon name="chevronLeft" size={24} />
          </button>

          {/* Next Button */}
          <button
            className="gallery-modal-nav next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            id="gallery-modal-next"
            aria-label="Siguiente"
          >
            <Icon name="chevronRight" size={24} />
          </button>
        </div>
      )}
    </>
  );
}
