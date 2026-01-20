import { atom } from 'nanostores';
import { type Language } from '../translations';

const LANGUAGE_STORAGE_KEY = 'firerlagi-language';

export const language = atom<Language>('zh');

export const initLanguage = (fallback?: Language) => {
  if (typeof window === 'undefined') return;

  let next: Language | undefined;

  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') {
      next = saved;
    }
  } catch {
    next = undefined;
  }

  if (!next && (fallback === 'en' || fallback === 'zh')) {
    next = fallback;
  }

  if (next && next !== language.get()) {
    language.set(next);
  }
};

export const setLanguage = (lang: Language) => {
  language.set(lang);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
    }

    window.dispatchEvent(new CustomEvent('language-change', { detail: lang }));
  }
};
