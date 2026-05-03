import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { initLanguage, language as languageAtom, setLanguage as setLanguageStore } from '../stores/languageStore';
import { translations, type Language } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider = ({ children, initialLanguage }: LanguageProviderProps) => {
  const currentLanguage = useStore(languageAtom);
  const didInitRef = useRef(false);

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    initLanguage(initialLanguage);
  }, [initialLanguage]);

  const value = {
    language: currentLanguage,
    setLanguage: setLanguageStore,
    t: translations[currentLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const storeLanguage = useStore(languageAtom);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Keep the first client render aligned with the server-rendered default language.
  const resolvedLanguage: Language = isHydrated
    ? (context?.language ?? storeLanguage)
    : 'zh';

  return {
    language: resolvedLanguage,
    setLanguage: context?.setLanguage ?? setLanguageStore,
    t: translations[resolvedLanguage],
  };
};
