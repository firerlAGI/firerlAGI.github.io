import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex min-h-[2.8rem] items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-sans text-slate-200 transition-all hover:scale-105 hover:border-white/20 hover:bg-white/10"
      title={language === 'en' ? 'Switch to 中文' : 'Switch to English'}
    >
      {language === 'en' ? 'EN' : '中文'}
    </button>
  );
};

export default LanguageSwitcher;
