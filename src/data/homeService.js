/**
 * AF Solutions — Servicio a Domicilio (hogar / minorista)
 *
 * Todo el contenido de la página "Servicio a Domicilio" vive aquí.
 * Para cambiar precios, textos o pasos del proceso, edita este archivo.
 * No necesitas tocar ningún otro archivo.
 */

export const homeService = {
  eyebrow: 'Servicio a Domicilio',
  title: 'Lavado profesional de salas, sillones, sillas y colchones',
  subtitle:
    'Recupera la limpieza, frescura y apariencia de tus muebles con atención profesional a domicilio.',

  badges: ['Servicio profesional', 'Atención a domicilio', 'CDMX y área metropolitana'],

  // ¿Por qué es importante?
  reasonsTitle: '¿Por qué es importante lavar tu sala o sillones?',
  reasons: [
    'Acumulan polvo, ácaros, sudor, grasa corporal y olores.',
    'La suciedad no siempre es visible a simple vista.',
    'La limpieza profesional ayuda a prolongar la vida útil de los textiles.',
    'Ideal para hogares con niños, mascotas o personas con alergias.',
  ],

  // ¿Qué limpiamos?
  itemsTitle: '¿Qué limpiamos?',
  items: [
    { label: 'Salas y sillones', icon: 'sofa' },
    { label: 'Sillas de comedor', icon: 'sofa' },
    { label: 'Sillas de oficina', icon: 'building' },
    { label: 'Colchones', icon: 'carpet' },
    { label: 'Cabeceras y cojines', icon: 'sparkles' },
  ],

  // Nuestro proceso
  processTitle: 'Nuestro proceso',
  process: [
    { step: 'Inspección', detail: 'Revisamos tipo de tela, manchas y nivel de suciedad.' },
    { step: 'Aspirado profundo', detail: 'Retiramos polvo, ácaros y partículas sueltas.' },
    { step: 'Aplicación de producto', detail: 'Usamos productos adecuados para cada material.' },
    { step: 'Enjuague y extracción', detail: 'Extraemos la suciedad disuelta con equipo profesional.' },
    { step: 'Secado y recomendaciones', detail: 'Aceleramos el secado y te damos cuidados posteriores.' },
  ],

  // Precios estimados
  pricingTitle: 'Precios estimados',
  pricing: [
    { service: 'Silla de comedor tapizada', range: '$80 – $150 c/u' },
    { service: 'Silla de oficina', range: '$150 – $250 c/u' },
    { service: 'Sillón individual', range: '$300 – $450' },
    { service: 'Sillón de 2 plazas', range: '$400 – $550' },
    { service: 'Sillón de 3 plazas', range: '$500 – $600' },
    { service: 'Colchón individual', range: '$500 – $650' },
    { service: 'Colchón matrimonial', range: '$600 – $750' },
    { service: 'Colchón queen / king', range: '$700 – $850' },
  ],
  pricingNotes: [
    'Precios sujetos a tamaño, tipo de tela, nivel de suciedad, manchas, presencia de mascotas y ubicación.',
    'Solicita tu cotización por WhatsApp compartiendo fotos de los muebles.',
  ],

  whatsappMessage:
    'Hola, me interesa el servicio de lavado de muebles a domicilio. ¿Me pueden dar una cotización?',
};
