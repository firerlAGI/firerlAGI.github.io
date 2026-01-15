export type Language = 'en' | 'zh';

export const i18nConfig = {
  defaultLocale: 'en' as Language,
  locales: ['en', 'zh'] as Language[],
  translations: {
    'en': 'en.json',
    'zh': 'zh.json',
  },
}
