/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        50: '12.5rem'
      },
      height: {
        90: '22.5rem'
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--color-primary-foreground))'
        },
        info: 'hsl(var(--color-info))',
        success: 'hsl(var(--color-success))',
        destructive: 'hsl(var(--color-destructive))',
        warning: 'hsl(var(--color-warning))',
        disabled: 'hsl(var(--color-disabled))',
        top: {
          1: 'hsl(var(--color-top-1))',
          2: 'hsl(var(--color-top-2))',
          3: 'hsl(var(--color-top-3))'
        },
        buy: 'hsl(var(--color-success))',
        sell: 'hsl(var(--color-destructive))',
        text: {
          primary: 'hsl(var(--color-text-primary))',
          secondary: 'hsl(var(--color-text-secondary))',
          tertiary: 'hsl(var(--color-text-tertiary))',
          placeholder: 'hsl(var(--color-text-placeholder))'
        },
        background: {
          primary: 'hsl(var(--color-background-primary))',
          secondary: 'hsl(var(--color-background-secondary))',
          tertiary: 'hsl(var(--color-background-tertiary))',
          fourth: 'hsl(var(--color-background-fourth))',
          popover: 'hsl(var(--color-background-popover))',
          overlay: 'hsla(var(--color-background-overlay))',
          input: 'hsla(var(--color-background-input))',
          unactive: 'var(--color-background-unactive)'
        },
        border: {
          DEFAULT: 'hsl(var(--color-border))',
          highlight: 'hsl(var(--color-border-highlight))'
        },
        accordion: {
          arrow: 'hsl(var(--color-accordion-arrow))'
        }
      },
      boxShadow: {
        sm: '0px 0px 4px 0px var(--tw-shadow-color)',
        md: '0px 4px 12px 0px var(--tw-shadow-color)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-up': 'accordion-up 0.2s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out'
      },
      fontFamily: {
        HarmonyOSSans: ['HarmonyOS Sans', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
}
