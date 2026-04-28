/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'levitate': 'levitate 4s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-delayed': 'driftDelayed 15s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 25s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        levitate: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        drift: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(5px, 10px)' },
          '50%': { transform: 'translate(10px, 0px)' },
          '75%': { transform: 'translate(5px, -10px)' },
          '100%': { transform: 'translate(0px, 0px)' }
        },
        driftDelayed: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(-5px, 10px)' },
          '50%': { transform: 'translate(-10px, 0px)' },
          '75%': { transform: 'translate(-5px, -10px)' },
          '100%': { transform: 'translate(0px, 0px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.05)' }
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 5px rgba(59, 130, 246, 0.3)' },
          '50%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(96, 165, 250, 0.4)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      }
    },
  },
  plugins: [],
}