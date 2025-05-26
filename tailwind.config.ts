import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { merge } from './model/utils/merge'

const ROOT_FONTSIZE = 1

/** root font size to pixel */
const rem = (px: string | number, suffix = 'rem') => {
  const unit = (Number(px) / ROOT_FONTSIZE).toFixed(2)
  return (unit + suffix).replace(/^0rem$/, '0')
}

/** config */
export const withConfig = (config?: Config): Config => {
  return merge(
    {
      darkMode: ['class'],
      content: [
        // page router
        './pages/**/*.{ts,tsx}',
        // components
        './components/**/*.{ts,tsx}',
        // templates
        `../../${process.env.NEXT_PUBLIC_TEMPLATE}/**/*.{js,ts,jsx,tsx,mdx,scss}`,
      ],
      theme: {
        extend: {
          colors: {
            border: 'var(--border)',
            input: 'var(--input)',
            ring: 'var(--ring)',
            'root-background': 'var(--root-background)',
            'root-foreground': 'var(--root-foreground)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            primary: {
              DEFAULT: 'var(--primary)',
              foreground: 'var(--primary-foreground)',
            },
            secondary: {
              DEFAULT: 'var(--secondary)',
              foreground: 'var(--secondary-foreground)',
            },
            destructive: {
              DEFAULT: 'var(--destructive)',
              foreground: 'var(--destructive-foreground)',
            },
            muted: {
              DEFAULT: 'var(--muted)',
              foreground: 'var(--muted-foreground)',
            },
            accent: {
              DEFAULT: 'var(--accent)',
              foreground: 'var(--accent-foreground)',
            },
            popover: {
              DEFAULT: 'var(--popover)',
              foreground: 'var(--popover-foreground)',
            },
            card: {
              DEFAULT: 'var(--card)',
              foreground: 'var(--card-foreground)',
            },
          },
          keyframes: {
            'accordion-down': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
            'caret-blink': {
              '0%,70%,100%': { opacity: '1' },
              '20%,50%': { opacity: '0' },
            },
            wave: {
              '0%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(10%)' },
            },
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'caret-blink': 'caret-blink 1.25s ease-out infinite',
            wave: 'wave 2s ease-in-out infinite',
          },
        },
      },
      plugins: [
        require('tailwindcss-animate'),
        /**
         * @note @layer fix utilities
         */
        plugin(function ({ addUtilities, addBase, addVariant }) {}),
      ],
    } as Config,
    config || {},
  ) as Config
}
