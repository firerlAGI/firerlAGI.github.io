export type Theme = 'light' | 'dark';

export function getTheme(): Theme {
  if (typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  }
  return 'light';
}

export function setTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
}

export function toggleTheme(): Theme {
  const currentTheme = getTheme();
  const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

export function initTheme(): void {
  if (typeof document !== 'undefined') {
    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  }
}
