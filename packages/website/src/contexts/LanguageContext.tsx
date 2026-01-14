import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LANGUAGE_STORAGE_KEY = 'firerlagi-language';

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'zh')) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return 'en';
};

const storeLanguage = (lang: Language) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to write language to localStorage:', error);
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  useEffect(() => {
    // Update language state when localStorage changes (e.g., in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LANGUAGE_STORAGE_KEY && e.newValue) {
        const newLang = e.newValue as Language;
        if (newLang === 'en' || newLang === 'zh') {
          setLanguageState(newLang);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    storeLanguage(lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values for SSR compatibility
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en,
    };
  }
  return context;
};
