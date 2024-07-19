/** @type {import('tailwindcss').Config} */
import * as defaultTheme from 'tailwindcss/defaultTheme'
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '6rem',
				},
			},
			fontFamily: {
				sans: ['var(--font-primary)', defaultTheme.fontFamily.sans],
			},
			colors: {
				black: 'var(--color-black)',
				white: 'var(--color-white)',
				gray: 'var(--color-gray)',
				['gray-light']: 'var(--color-gray-light)',
				violet: 'var(--color-violet)',
				red: 'var(--color-red)',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
}
