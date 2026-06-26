/**
 * AF Solutions — Catálogo de Servicios
 * 
 * Para agregar un servicio nuevo, copia un objeto existente
 * y modifica los campos. El sitio se actualiza automáticamente.
 */

export const serviceCategories = [
  {
    id: 'soft',
    title: 'Servicios Soft',
    subtitle: 'Limpieza y mantenimiento de superficies',
    description:
      'Soluciones profesionales de limpieza y cuidado para mantener tus instalaciones impecables y en las mejores condiciones.',
    icon: 'sparkles',
    color: 'secondary',
  },
  {
    id: 'hard',
    title: 'Servicios Hard',
    subtitle: 'Mantenimiento de sistemas e infraestructura',
    description:
      'Mantenimiento preventivo y correctivo para todos los sistemas críticos de tus instalaciones corporativas.',
    icon: 'wrench',
    color: 'primary',
  },
];

export const services = [
  // --- SERVICIOS SOFT ---
  {
    id: 'alfombras',
    category: 'soft',
    title: 'Aspirado y Lavado de Alfombras',
    shortDescription: 'Limpieza profunda profesional para todo tipo de alfombras corporativas.',
    fullDescription:
      'Servicio especializado de aspirado y lavado profundo de alfombras con equipos industriales de última generación. Eliminamos manchas, olores y alérgenos para garantizar un ambiente limpio y saludable en tus instalaciones.',
    icon: 'carpet',
    features: [
      'Aspirado profundo industrial',
      'Lavado con espuma seca',
      'Eliminación de manchas difíciles',
      'Tratamiento anti-ácaros',
      'Secado rápido (4-6 horas)',
    ],
  },
  {
    id: 'tapices',
    category: 'soft',
    title: 'Lavado de Tapices y Sillería',
    shortDescription: 'Restauración y limpieza profunda de muebles tapizados.',
    fullDescription:
      'Devolvemos la vida a tus muebles tapizados con técnicas de limpieza especializadas. Tratamos todo tipo de telas y materiales, eliminando suciedad acumulada y prolongando la vida útil de tu mobiliario.',
    icon: 'sofa',
    features: [
      'Limpieza de telas y viniles',
      'Desinfección profunda',
      'Eliminación de olores',
      'Protección de telas',
      'Servicio in-situ',
    ],
  },
  {
    id: 'limpieza-general',
    category: 'soft',
    title: 'Limpieza General Corporativa',
    shortDescription: 'Mantenimiento integral de limpieza para oficinas y espacios corporativos.',
    fullDescription:
      'Programa completo de limpieza para mantener tus instalaciones en condiciones óptimas. Incluye limpieza de oficinas, áreas comunes, sanitarios y espacios especializados.',
    icon: 'building',
    features: [
      'Limpieza de oficinas',
      'Sanitización de baños',
      'Áreas comunes',
      'Cristales y ventanales',
      'Programas personalizados',
    ],
  },

  // --- SERVICIOS HARD ---
  {
    id: 'electrico',
    category: 'hard',
    title: 'Sistemas Eléctricos',
    shortDescription: 'Mantenimiento preventivo y correctivo de instalaciones eléctricas.',
    fullDescription:
      'Servicio integral de mantenimiento eléctrico para garantizar la seguridad y eficiencia energética de tus instalaciones. Desde revisiones preventivas hasta reparaciones de emergencia.',
    icon: 'zap',
    features: [
      'Mantenimiento preventivo',
      'Diagnóstico de fallas',
      'Tableros eléctricos',
      'Iluminación LED',
      'Puesta a tierra',
    ],
  },
  {
    id: 'hvac',
    category: 'hard',
    title: 'Sistemas HVAC',
    shortDescription: 'Climatización y ventilación para ambientes corporativos óptimos.',
    fullDescription:
      'Mantenimiento completo de sistemas de calefacción, ventilación y aire acondicionado. Garantizamos el confort térmico y la calidad del aire en tus instalaciones.',
    icon: 'thermometer',
    features: [
      'Aires acondicionados',
      'Sistemas de ventilación',
      'Calefacción',
      'Filtros y ductos',
      'Eficiencia energética',
    ],
  },
  {
    id: 'hidrosanitario',
    category: 'hard',
    title: 'Sistemas Hidrosanitarios',
    shortDescription: 'Plomería e instalaciones sanitarias para corporativos.',
    fullDescription:
      'Mantenimiento y reparación de sistemas hidrosanitarios incluyendo tuberías, drenajes, bombas y equipos de tratamiento de agua. Prevención de fugas y optimización del consumo.',
    icon: 'droplets',
    features: [
      'Plomería general',
      'Destape de drenajes',
      'Reparación de fugas',
      'Bombas de agua',
      'Instalaciones sanitarias',
    ],
  },
];

export const getServicesByCategory = (categoryId) =>
  services.filter((s) => s.category === categoryId);

export const getServiceById = (id) =>
  services.find((s) => s.id === id);
