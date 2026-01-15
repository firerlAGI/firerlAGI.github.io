// Load translation files into window object for React components
export async function loadTranslations() {
  if (typeof window === 'undefined') return;

  try {
    const translations: Record<string, any> = {};
    
    // Import translation files
    const enTranslations = await import('../i18n/en.json');
    const zhTranslations = await import('../i18n/zh.json');
    
    translations.en = enTranslations.default;
    translations.zh = zhTranslations.default;
    
    // Store in window object for React components to access
    (window as any).__TRANSLATIONS__ = translations;
  } catch (error) {
    // Silently fail - translations will fall back to keys
  }
}
