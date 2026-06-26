import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { company } from '../data/company';
import { services } from '../data/services';
import Icon, { WhatsAppIcon } from '../components/ui/Icon';
import { submitContactForm, submitAppointmentForm, validateEmail } from '../utils/forms';
import { setupScrollAnimations } from '../utils/animations';

const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
};

const initialAppointmentForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  notes: '',
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('servicio') || '';

  const [activeTab, setActiveTab] = useState('message');
  const [contactForm, setContactForm] = useState({
    ...initialContactForm,
    service: preselectedService,
  });
  const [appointmentForm, setAppointmentForm] = useState({
    ...initialAppointmentForm,
    service: preselectedService,
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Update preselected service when query param changes
  useEffect(() => {
    if (preselectedService) {
      setContactForm((prev) => ({ ...prev, service: preselectedService }));
      setAppointmentForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validateContactForm = () => {
    const newErrors = {};
    if (!contactForm.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!contactForm.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(contactForm.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    if (!contactForm.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAppointmentFormData = () => {
    const newErrors = {};
    if (!appointmentForm.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!appointmentForm.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(appointmentForm.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    if (!appointmentForm.service) newErrors.service = 'Selecciona un servicio';
    if (!appointmentForm.date) newErrors.date = 'Selecciona una fecha';
    if (!appointmentForm.time) newErrors.time = 'Selecciona una hora';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    setSubmitState('loading');
    setErrors({});

    const result = await submitContactForm(contactForm);

    if (result.success) {
      setSubmitState('success');
      setSubmitMessage(result.message);
      setContactForm({ ...initialContactForm });
    } else {
      setSubmitState('error');
      setSubmitMessage(result.message);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    if (!validateAppointmentFormData()) return;

    setSubmitState('loading');
    setErrors({});

    const result = await submitAppointmentForm(appointmentForm);

    if (result.success) {
      setSubmitState('success');
      setSubmitMessage(result.message);
      setAppointmentForm({ ...initialAppointmentForm });
    } else {
      setSubmitState('error');
      setSubmitMessage(result.message);
    }
  };

  const handleContactChange = (field, value) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAppointmentChange = (field, value) => {
    setAppointmentForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const resetForm = () => {
    setSubmitState('idle');
    setSubmitMessage('');
    setErrors({});
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(company.contact.whatsappMessage)}`;

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Contacto</h1>
          <p>
            Estamos listos para ayudarte. Envíanos un mensaje o agenda una cita con nuestro equipo.
          </p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* Contact Section */}
      <section style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container">
          <div className="contact-layout">
            {/* Left: Contact Form */}
            <div className="animate-on-scroll">
              {/* Tabs */}
              <div className="tabs">
                <button
                  className={`tab${activeTab === 'message' ? ' active' : ''}`}
                  onClick={() => switchTab('message')}
                  id="contact-tab-message"
                >
                  <Icon name="mail" size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Mensaje
                </button>
                <button
                  className={`tab${activeTab === 'appointment' ? ' active' : ''}`}
                  onClick={() => switchTab('appointment')}
                  id="contact-tab-appointment"
                >
                  <Icon name="calendar" size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Solicitar Cita
                </button>
              </div>

              {/* Success State */}
              {submitState === 'success' && (
                <div className="form-success" id="contact-form-success">
                  <Icon name="check" size={24} style={{ marginBottom: 8, color: 'var(--secondary-500)' }} />
                  <p>{submitMessage}</p>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={resetForm}
                    style={{ marginTop: 'var(--space-4)' }}
                    id="contact-form-reset"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              )}

              {/* Error State */}
              {submitState === 'error' && (
                <div style={{ background: 'var(--error)', color: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                  <p>{submitMessage}</p>
                  <button
                    className="btn btn-white btn-sm"
                    onClick={resetForm}
                    style={{ marginTop: 'var(--space-3)' }}
                    id="contact-form-retry"
                  >
                    Intentar de nuevo
                  </button>
                </div>
              )}

              {/* Message Form */}
              {activeTab === 'message' && submitState !== 'success' && (
                <form onSubmit={handleContactSubmit} noValidate id="contact-form-message">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Nombre *</label>
                      <input
                        type="text"
                        id="contact-name"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Tu nombre completo"
                        value={contactForm.name}
                        onChange={(e) => handleContactChange('name', e.target.value)}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email *</label>
                      <input
                        type="email"
                        id="contact-email"
                        className={`form-input${errors.email ? ' error' : ''}`}
                        placeholder="tu@email.com"
                        value={contactForm.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Teléfono</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className="form-input"
                        placeholder="+52 000 000 0000"
                        value={contactForm.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-company">Empresa</label>
                      <input
                        type="text"
                        id="contact-company"
                        className="form-input"
                        placeholder="Nombre de tu empresa"
                        value={contactForm.company}
                        onChange={(e) => handleContactChange('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">Servicio de interés</label>
                    <select
                      id="contact-service"
                      className="form-select"
                      value={contactForm.service}
                      onChange={(e) => handleContactChange('service', e.target.value)}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Mensaje *</label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea${errors.message ? ' error' : ''}`}
                      placeholder="¿En qué podemos ayudarte?"
                      value={contactForm.message}
                      onChange={(e) => handleContactChange('message', e.target.value)}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitState === 'loading'}
                    id="contact-submit-message"
                    style={{ width: '100%' }}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <span className="spinner" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Icon name="send" size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Appointment Form */}
              {activeTab === 'appointment' && submitState !== 'success' && (
                <form onSubmit={handleAppointmentSubmit} noValidate id="contact-form-appointment">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-name">Nombre *</label>
                      <input
                        type="text"
                        id="appt-name"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Tu nombre completo"
                        value={appointmentForm.name}
                        onChange={(e) => handleAppointmentChange('name', e.target.value)}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-email">Email *</label>
                      <input
                        type="email"
                        id="appt-email"
                        className={`form-input${errors.email ? ' error' : ''}`}
                        placeholder="tu@email.com"
                        value={appointmentForm.email}
                        onChange={(e) => handleAppointmentChange('email', e.target.value)}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-phone">Teléfono</label>
                      <input
                        type="tel"
                        id="appt-phone"
                        className="form-input"
                        placeholder="+52 000 000 0000"
                        value={appointmentForm.phone}
                        onChange={(e) => handleAppointmentChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-service">Servicio *</label>
                      <select
                        id="appt-service"
                        className={`form-select${errors.service ? ' error' : ''}`}
                        value={appointmentForm.service}
                        onChange={(e) => handleAppointmentChange('service', e.target.value)}
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                      {errors.service && <p className="form-error">{errors.service}</p>}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-date">Fecha preferida *</label>
                      <input
                        type="date"
                        id="appt-date"
                        className={`form-input${errors.date ? ' error' : ''}`}
                        value={appointmentForm.date}
                        onChange={(e) => handleAppointmentChange('date', e.target.value)}
                      />
                      {errors.date && <p className="form-error">{errors.date}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="appt-time">Hora preferida *</label>
                      <input
                        type="time"
                        id="appt-time"
                        className={`form-input${errors.time ? ' error' : ''}`}
                        value={appointmentForm.time}
                        onChange={(e) => handleAppointmentChange('time', e.target.value)}
                      />
                      {errors.time && <p className="form-error">{errors.time}</p>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="appt-notes">Notas adicionales</label>
                    <textarea
                      id="appt-notes"
                      className="form-textarea"
                      placeholder="Cuéntanos más sobre lo que necesitas..."
                      value={appointmentForm.notes}
                      onChange={(e) => handleAppointmentChange('notes', e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitState === 'loading'}
                    id="contact-submit-appointment"
                    style={{ width: '100%' }}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <span className="spinner" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Cita
                        <Icon name="calendar" size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Info */}
            <div className="animate-on-scroll">
              <div className="contact-info-card">
                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="mail" size={20} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="phone" size={20} />
                  </div>
                  <div>
                    <h4>Teléfono / WhatsApp</h4>
                    <a href={`tel:${company.contact.phone}`}>{company.contact.phone}</a>
                  </div>
                </div>

                {/* Schedule */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="clock" size={20} />
                  </div>
                  <div>
                    <h4>Horario de Atención</h4>
                    <p>{company.schedule.weekdays}</p>
                    <p>{company.schedule.saturday}</p>
                    <p>{company.schedule.sunday}</p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div style={{ marginTop: 'var(--space-6)' }}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg btn-whatsapp"
                    id="contact-whatsapp-btn"
                  >
                    <WhatsAppIcon size={20} />
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
