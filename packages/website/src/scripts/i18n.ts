import { language } from '../stores/languageStore';
import { translations } from '../translations';

function updateTranslations(lang: 'en' | 'zh') {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    // Resolve dot notation (e.g., 'nav.about')
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k as keyof typeof value];
      } else {
        value = undefined;
        break;
      }
    }

    if (typeof value === 'string') {
      const targetAttr = el.getAttribute('data-i18n-target');
      if (targetAttr) {
        el.setAttribute(targetAttr, value);
      } else {
        // Handle special cases like GlitchText which might use data-text
        if (el.classList.contains('cyber-glitch-effect')) {
          el.setAttribute('data-text', value);
        }
        
        // If the element has children but we only want to update text, it's tricky.
        // But for this project, usually the element just contains text.
        // However, check if it's an input/textarea placeholder
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          (el as HTMLInputElement).placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    }
  });

  // Also update html lang attribute
  document.documentElement.lang = lang === 'en' ? 'en-US' : 'zh-CN';
}

// Subscribe to store changes
language.subscribe(lang => {
  updateTranslations(lang);
});
