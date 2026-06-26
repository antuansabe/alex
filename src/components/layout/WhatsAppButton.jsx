import React from 'react';
import { WhatsAppIcon } from '../ui/Icon';
import { company } from '../../data/company';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(company.contact.whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      id="whatsapp-float-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon size={28} />
      <span className="whatsapp-tooltip">Escríbenos por WhatsApp</span>
    </a>
  );
}
