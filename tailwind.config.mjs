/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        soil: {
          950: '#050605',
          900: '#0a0d09',
          800: '#111510',
          700: '#1a2115',
          300: '#b6bfab'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif']
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        floatLayerA: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-18px,24px,0)' }
        },
        floatLayerB: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(25px,-18px,0)' }
        },
        floatLayerC: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(14px,-10px,0)' }
        },
        contourPulse: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '0.8' }
        },
        contourDrift: {
          '0%,100%': {
            backgroundPosition: '0 0, 0 0'
          },
          '50%': {
            backgroundPosition: '18px -14px, -16px 12px'
          }
        },
        contourSpinA: {
          '0%,100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(4deg) scale(1.03)' }
        },
        contourSpinB: {
          '0%,100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(-5deg) scale(0.98)' }
        },
        soilCoreShift: {
          '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(-10px,8px,0) rotate(2deg)' }
        }
      },
      animation: {
        gradientShift: 'gradientShift 9s ease-in-out infinite',
        floatLayerA: 'floatLayerA 17s ease-in-out infinite',
        floatLayerB: 'floatLayerB 13s ease-in-out infinite',
        floatLayerC: 'floatLayerC 11s ease-in-out infinite',
        contourPulse: 'contourPulse 9s ease-in-out infinite',
        contourDrift: 'contourDrift 22s linear infinite',
        contourSpinA: 'contourSpinA 26s linear infinite',
        contourSpinB: 'contourSpinB 18s linear infinite reverse',
        soilCoreShift: 'soilCoreShift 20s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
