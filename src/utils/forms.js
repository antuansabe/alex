/**
 * AF Solutions — Form submission logic
 * Uses Web3Forms (free, no backend needed)
 * API key: Get one at https://web3forms.com (free)
 */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'; // Configurable via environment variables

export async function submitContactForm(formData) {
  const data = {
    access_key: WEB3FORMS_KEY,
    subject: `Nuevo contacto de ${formData.name} — AF Solutions`,
    from_name: 'AF Solutions Website',
    ...formData,
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (result.success) {
      return { success: true, message: '¡Mensaje enviado! Te contactaremos pronto.' };
    } else {
      return { success: false, message: 'Error al enviar. Intenta de nuevo.' };
    }
  } catch (error) {
    return { success: false, message: 'Error de conexión. Intenta de nuevo.' };
  }
}

export async function submitAppointmentForm(formData) {
  const data = {
    access_key: WEB3FORMS_KEY,
    subject: `Solicitud de cita de ${formData.name} — AF Solutions`,
    from_name: 'AF Solutions Website',
    type: 'Solicitud de Cita',
    ...formData,
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (result.success) {
      return { success: true, message: '¡Solicitud enviada! Confirmaremos tu cita pronto.' };
    } else {
      return { success: false, message: 'Error al enviar. Intenta de nuevo.' };
    }
  } catch (error) {
    return { success: false, message: 'Error de conexión. Intenta de nuevo.' };
  }
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[\d\s\-+()]{10,}$/.test(phone);
}
