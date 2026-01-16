import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../translations';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 border border-cyan-500/50 bg-black/50 hover:bg-cyan-900/30 text-cyan-400 text-sm font-mono transition-all rounded hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
      title={language === 'en' ? 'Switch to 中文' : 'Switch to English'}
    >
      {language === 'en' ? 'EN' : '中文'}
    </button>
  );
};

export default LanguageSwitcher;
