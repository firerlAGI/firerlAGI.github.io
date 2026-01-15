import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ContactHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <h2 className="section-title">{t('contact.title')}</h2>
      <p className="contact-subtitle">{t('contact.subtitle')}</p>
    </>
  );
};

export default ContactHeader;
