import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroContent: React.FC = () => {
  const { t, language } = useLanguage();
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const fullText = t('hero.typewriter');
    let index = 0;
    setDisplayText('');

    const type = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1) + '_');
        index++;
        setTimeout(type, 50);
      } else {
        setDisplayText(fullText);
      }
    };

    type();
  }, [language, t]);

  return (
    <>
      <div className="system-status">
        <svg className="terminal-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        <span className="status-text">{t('hero.status')}</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-title-main">{t('hero.title')}</span>
      </h1>
      
      <p className="hero-subtitle">{displayText}</p>
      
      <p className="hero-description">
        {t('hero.subtitle')}
      </p>
      
      <div className="hero-cta">
        <a href="#projects" className="cyber-button cyber-button-cyan">
          <span className="cyber-button-text">{t('hero.cta_work')}</span>
          <div className="cyber-button-overlay"></div>
        </a>
        <a href="#contact" className="cyber-button cyber-button-fuchsia">
          <span className="cyber-button-text">{t('hero.cta_contact')}</span>
          <div className="cyber-button-overlay"></div>
        </a>
      </div>
    </>
  );
};

export default HeroContent;
