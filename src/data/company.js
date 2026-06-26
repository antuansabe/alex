/**
 * AF Solutions — Datos Centralizados del Negocio
 * 
 * Edita este archivo para actualizar la información de la empresa
 * en todo el sitio web. No necesitas tocar ningún otro archivo.
 */

export const company = {
  name: 'AF Solutions',
  fullName: 'All Facilities Solutions',
  tagline: 'Mantenimiento corporativo integral con la confianza de siempre',
  description:
    'Cartera completa de servicios de mantenimiento para corporativos. Desde limpieza profesional hasta sistemas eléctricos, HVAC e hidrosanitarios.',
  
  // Contacto
  contact: {
    email: 'contacto@afsolutions.com.mx',
    phone: '+52 775 122 9339',
    whatsapp: '527751229339',
    whatsappMessage: 'Hola, me interesa conocer sus servicios de mantenimiento corporativo. ¿Podrían enviarme más información?',
  },

  // Redes sociales (agregar URLs cuando las tenga)
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },

  // Ubicación
  location: {
    city: 'México',
    address: '', // Agregar dirección cuando esté disponible
    mapUrl: '', // URL de Google Maps embed
  },

  // Horario
  schedule: {
    weekdays: 'Lunes a Viernes: 8:00 AM – 6:00 PM',
    saturday: 'Sábado: 9:00 AM – 2:00 PM',
    sunday: 'Domingo: Cerrado',
  },

  // SEO
  seo: {
    title: 'AF Solutions | Mantenimiento Corporativo Integral',
    description:
      'Servicios profesionales de mantenimiento para corporativos. Limpieza de alfombras, tapices, sistemas eléctricos, HVAC e hidrosanitarios. Solicita tu cotización.',
    keywords:
      'mantenimiento corporativo, limpieza de alfombras, HVAC, sistemas eléctricos, hidrosanitario, facilities management, México',
    ogImage: '/og-image.jpg',
  },

  // Estadísticas (para la sección de stats)
  stats: [
    { number: 10, suffix: '+', label: 'Años de experiencia' },
    { number: 50, suffix: '+', label: 'Clientes satisfechos' },
    { number: 200, suffix: '+', label: 'Proyectos completados' },
    { number: 24, suffix: '/7', label: 'Soporte disponible' },
  ],

  // Valores de la empresa
  values: [
    {
      icon: 'shield',
      title: 'Confianza',
      description: 'Trabajamos con transparencia y responsabilidad en cada proyecto que realizamos.',
    },
    {
      icon: 'star',
      title: 'Calidad',
      description: 'Utilizamos los mejores materiales y técnicas para garantizar resultados excepcionales.',
    },
    {
      icon: 'clock',
      title: 'Puntualidad',
      description: 'Cumplimos con los tiempos establecidos para no afectar la operación de tu empresa.',
    },
    {
      icon: 'users',
      title: 'Profesionalismo',
      description: 'Nuestro equipo está altamente capacitado y certificado en todas las áreas.',
    },
  ],

  // About
  about: {
    mission:
      'Brindar soluciones integrales de mantenimiento que garanticen el óptimo funcionamiento de las instalaciones corporativas, con un compromiso inquebrantable de calidad y servicio.',
    vision:
      'Ser la empresa líder en servicios de mantenimiento corporativo, reconocida por nuestra excelencia operativa, innovación y compromiso con la satisfacción del cliente.',
    history:
      'AF Solutions nació con la visión de ofrecer un servicio de mantenimiento corporativo diferente: integral, profesional y confiable. Con más de una década de experiencia, hemos crecido para convertirnos en un aliado estratégico para facilities managers que buscan calidad y compromiso en cada detalle.',
    founder: {
      name: 'Alejandro Ramos',
      title: 'Director General',
    },
  },
};
