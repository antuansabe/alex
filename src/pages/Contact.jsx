import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { company } from '../data/company';
import { services } from '../data/services';
import Icon, { WhatsAppIcon } from '../components/ui/Icon';
import { submitContactForm, validateEmail } from '../utils/forms';
import { setupScrollAnimations } from '../utils/animations';

/**
 * Flujo unificado — reemplaza el sistema de 2 tabs (Mensaje / Cita).
 * Ahora es UN solo formulario: el usuario escribe su mensaje y, si
 * quiere, marca el checkbox "¿Deseas agendar una visita?" para que
 * aparezcan los campos de fecha y hora, restringidos a los días y
 * horarios definidos en company.appointments.
 */

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
  wantsAppointment: false,
  appointmentDate: '',
  appointmentTime: '',
};

const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function isAllowedDay(dateStr) {
  if (!dateStr) return false;
  const d = new Date(`${dateStr}T00:00:00`);
  return company.appointments.availableDays.includes(d.getDay());
}

function isAllowedTime(timeStr) {
  if (!timeStr) return false;
  const [h] = timeStr.split(':').map(Number);
  return h >= company.appointments.startHour && h < company.appointments.endHour;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('servicio') || '';

  const [form, setForm] = useState({ ...initialForm, service: preselectedService });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      e.email = 'El email es obligatorio';
    } else if (!validateEmail(form.email)) {
      e.email = 'Ingresa un email válido';
    }
    if (!form.message.trim()) e.message = 'Cuéntanos qué necesitas';

    if (form.wantsAppointment) {
      if (!form.appointmentDate) {
        e.appointmentDate = 'Selecciona una fecha';
      } else if (!isAllowedDay(form.appointmentDate)) {
        e.appointmentDate = `Solo agendamos ${company.appointments.daysLabel.toLowerCase()}`;
      }
      if (!form.appointmentTime) {
        e.appointmentTime = 'Selecciona una hora';
      } else if (!isAllowedTime(form.appointmentTime)) {
        e.appointmentTime = `Horario disponible: ${company.appointments.hoursLabel}`;
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleAppointment = () => {
    setForm((prev) => ({ ...prev, wantsAppointment: !prev.wantsAppointment }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState('loading');

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      service: form.service,
      message: form.message,
    };

    if (form.wantsAppointment) {
      payload.tipo_solicitud = 'Mensaje + Solicitud de visita';
      payload.fecha_solicitada = form.appointmentDate;
      payload.hora_solicitada = form.appointmentTime;
    } else {
      payload.tipo_solicitud = 'Mensaje';
    }

    const result = await submitContactForm(payload);

    if (result.success) {
      setSubmitState('success');
      setSubmitMessage(
        form.wantsAppointment
          ? '¡Solicitud enviada! Confirmaremos tu visita pronto.'
          : result.message
      );
      setForm({ ...initialForm });
    } else {
      setSubmitState('error');
      setSubmitMessage(result.message);
    }
  };

  const resetForm = () => {
    setSubmitState('idle');
    setSubmitMessage('');
    setErrors({});
  };

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(company.contact.whatsappMessage)}`;

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container page-header-content">
          <h1>Contacto</h1>
          <p>
            Cuéntanos qué necesitas. Si quieres, agenda de una vez una visita a tus instalaciones.
          </p>
        </div>
        <div className="page-header-shape" style={{ width: 350, height: 350, top: -120, right: -80 }} />
        <div className="page-header-shape" style={{ width: 250, height: 250, bottom: -100, left: -60 }} />
      </section>

      {/* Contact Section */}
      <section style={{ paddingBlock: 'var(--space-10)' }}>
        <div className="container">
          <div className="contact-layout">
            {/* Left: Unified Form */}
            <div className="animate-on-scroll">

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

              {submitState !== 'success' && (
                <form onSubmit={handleSubmit} noValidate id="contact-form-unified">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-name">Nombre *</label>
                      <input
                        type="text"
                        id="cf-name"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Tu nombre completo"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-email">Email *</label>
                      <input
                        type="email"
                        id="cf-email"
                        className={`form-input${errors.email ? ' error' : ''}`}
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-phone">Teléfono</label>
                      <input
                        type="tel"
                        id="cf-phone"
                        className="form-input"
                        placeholder="+52 000 000 0000"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cf-company">Empresa</label>
                      <input
                        type="text"
                        id="cf-company"
                        className="form-input"
                        placeholder="Nombre de tu empresa"
                        value={form.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-service">Servicio de interés</label>
                    <select
                      id="cf-service"
                      className="form-select"
                      value={form.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="cf-message">Mensaje *</label>
                    <textarea
                      id="cf-message"
                      className={`form-textarea${errors.message ? ' error' : ''}`}
                      placeholder="¿En qué podemos ayudarte?"
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                  </div>

                  {/* ── Checkbox: agendar visita ── */}
                  <div
                    style={{
                      background: 'var(--neutral-50)',
                      border: '1px solid var(--neutral-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-4)',
                      marginBottom: 'var(--space-5)',
                    }}
                  >
                    <label
                      htmlFor="cf-wants-appointment"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--neutral-700)',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="cf-wants-appointment"
                        checked={form.wantsAppointment}
                        onChange={toggleAppointment}
                        style={{ width: 18, height: 18, accentColor: 'var(--primary-500)' }}
                      />
                      <Icon name="calendar" size={18} style={{ color: 'var(--primary-500)' }} />
                      ¿Deseas agendar una visita a tus instalaciones?
                    </label>

                    {form.wantsAppointment && (
                      <div style={{ marginTop: 'var(--space-4)' }}>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-500)', marginBottom: 'var(--space-3)' }}>
                          Disponibilidad actual: {company.appointments.daysLabel}, {company.appointments.hoursLabel}
                        </p>
                        <div className="form-grid">
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="cf-appt-date">Fecha preferida *</label>
                            <input
                              type="date"
                              id="cf-appt-date"
                              className={`form-input${errors.appointmentDate ? ' error' : ''}`}
                              value={form.appointmentDate}
                              onChange={(e) => handleChange('appointmentDate', e.target.value)}
                            />
                            {errors.appointmentDate && <p className="form-error">{errors.appointmentDate}</p>}
                          </div>
                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" htmlFor="cf-appt-time">Hora preferida *</label>
                            <input
                              type="time"
                              id="cf-appt-time"
                              className={`form-input${errors.appointmentTime ? ' error' : ''}`}
                              value={form.appointmentTime}
                              onChange={(e) => handleChange('appointmentTime', e.target.value)}
                            />
                            {errors.appointmentTime && <p className="form-error">{errors.appointmentTime}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitState === 'loading'}
                    id="contact-submit-unified"
                    style={{ width: '100%' }}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <span className="spinner" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        {form.wantsAppointment ? 'Enviar mensaje y solicitar visita' : 'Enviar Mensaje'}
                        <Icon name="send" size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Info (sin cambios) */}
            <div className="animate-on-scroll">
              <div className="contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="mail" size={20} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon name="phone" size={20} />
                  </div>
                  <div>
                    <h4>Teléfono / WhatsApp</h4>
                    <a href={`tel:${company.contact.phone}`}>{company.contact.phone}</a>
                  </div>
                </div>

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
