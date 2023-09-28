// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				floatup: {
					// Existing keyframes
				},
				moveUpToSpot: {
					'0%': { transform: 'translateY(1000px)' },
					'100%': { transform: 'translateY(0px)' },
				},
				fallandfade: {
					'0%': { transform: ' translateY(0px)', opacity: '1' },
					'100%': { transform: 'translateY(500px)', opacity: '0' },
				},
			},
			animation: {
				'spin-slow': 'spin 20s linear infinite',
				'move-up-to-spot': 'moveUpToSpot 5s ease-in-out forwards',
				'fall-and-fade': 'fallandfade 5s ease-in-out forwards',
			},
		},
	},
	plugins: [
		require('tailwindcss-animated'),
	],
};
