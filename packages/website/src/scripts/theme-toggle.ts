export function initThemeToggle() {
  const STORAGE_KEY = 'theme'
  const THEME_LIGHT = 'light'
  const THEME_DARK = 'dark'
  
  const html = document.documentElement
  const savedTheme = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const theme = savedTheme || (prefersDark ? THEME_DARK : THEME_LIGHT)
  html.setAttribute('data-theme', theme)
  
  const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme')
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }
  
  const themeToggleBtn = document.getElementById('theme-toggle-btn')
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme)
  }
  
  return { toggleTheme }
}
