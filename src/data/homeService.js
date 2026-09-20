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


  quoteNote:
    'Cotización sin costo: mándanos fotos de los muebles por WhatsApp y te damos precio el mismo día.',

  whatsappMessage:
    'Hola, me interesa el servicio de lavado de muebles a domicilio. ¿Me pueden dar una cotización?',
};
