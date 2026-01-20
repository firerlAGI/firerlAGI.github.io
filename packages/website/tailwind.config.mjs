/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-blur': 'var(--bg-blur)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'border-color': 'var(--border-color)',
        'divider-color': 'var(--divider-color)',
        'card-bg': 'var(--card-bg)',
        'nav-bg': 'var(--nav-bg)',
        cyber: {
          neon: '#0ff',
          pink: '#f0f',
          yellow: '#ff0',
          dark: '#050505',
          panel: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        cyber: ['"Orbitron"', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        medium: 'var(--duration-medium)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        standard: 'var(--ease-standard)',
        enter: 'var(--ease-enter)',
        exit: 'var(--ease-exit)',
        spring: 'var(--ease-spring)',
        minimal: 'var(--ease-minimal)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0, 0, 0.2, 1) both',
        'grid-move': 'gridMove 20s linear infinite',
        'hero-enter': 'heroEnter 0.75s cubic-bezier(0, 0, 0.2, 1) forwards',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gridMove: {
          '0%': { transform: 'perspective(500px) rotateX(60deg) translateY(0)' },
          '100%': { transform: 'perspective(500px) rotateX(60deg) translateY(50px)' },
        },
        heroEnter: {
          '0%': { opacity: '0', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
