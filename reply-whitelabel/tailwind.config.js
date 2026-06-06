module.exports = {
  darkMode: 'class',
  content: ['index.html', 'app.html'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: 'rgb(var(--brand) / <alpha-value>)', strong: 'rgb(var(--brand-strong) / <alpha-value>)', fg: 'rgb(var(--brand-fg) / <alpha-value>)' },
        bg:      'rgb(var(--bg) / <alpha-value>)',
        surface: { DEFAULT: 'rgb(var(--surface) / <alpha-value>)', 2: 'rgb(var(--surface-2) / <alpha-value>)' },
        fg:      'rgb(var(--fg) / <alpha-value>)',
        muted:   'rgb(var(--muted-fg) / <alpha-value>)',
        line:    'rgb(var(--border) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger:  'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: { sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      borderRadius: { DEFAULT: 'var(--radius)', xl2: '1.25rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(2,6,23,.04), 0 8px 24px -8px rgba(2,6,23,.10)',
        glow: '0 20px 60px -20px rgba(79,70,229,.45)',
      },
    },
  },
  plugins: [],
};
