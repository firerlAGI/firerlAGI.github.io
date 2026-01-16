import { atom } from 'nanostores';
import { type Language } from '../translations';

const LANGUAGE_STORAGE_KEY = 'firerlagi-language';

// Initialize with a default, but we'll try to hydrate from localStorage on client
export const language = atom<Language>('en');

// Helper to set language and persist
export const setLanguage = (lang: Language) => {
  language.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    // Dispatch a custom event for non-reactive parts if needed
    window.dispatchEvent(new CustomEvent('language-change', { detail: lang }));
  }
};

// Initialize on client side
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'zh') {
    language.set(stored as Language);
  }
}
