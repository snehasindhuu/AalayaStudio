/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1117',
        surface: '#1E222D',
        primary: '#3F4EFF',
        gold: '#D4AF37',
        'gold-light': '#E5C158',
        'text-primary': '#F4F4F6',
        'text-muted': '#A0A5B5',
        'border-color': '#2A2E3D',
        'status-pending': '#F59E0B',
        'status-completed': '#10B981',
        'status-alert': '#EF4444',
      },
      fontFamily: {
        grifter: ['Grifter Bold', 'Inter', 'sans-serif'],
        satoshi: ['Satoshi Variable', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
