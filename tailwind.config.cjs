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
				scaleUp: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(3)' },
				  },
				  scaleUp2x: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(2)' },
				  },
				  scaleUpDown: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(3)' },
					'100%': { transform: 'scale(1)' },
				  },
				  slowScroll: {
					'0%': { transform: 'translateY(0px)' },
					'100%': { transform: 'translateY(-390px)' },
				  },
			},
			animation: {
				// Existing animations
				'spin-slow': 'spin 20s linear infinite',
				'move-up-to-spot': 'moveUpToSpot 5s ease-in-out forwards',
				'fall-and-fade': 'fallandfade 5s ease-in-out forwards',
				'scale-up': 'scaleUp 2s ease-in-out forwards',
				'scale-up2x': 'scaleUp 2s ease-in-out forwards',
				'scale-up-down': 'scaleUpDown 5s ease-in-out forwards',
				'slow-scroll': 'slowScroll 10s ease-in-out forwards',
			  },
			
		},
	},
	plugins: [
		require('tailwindcss-animated'),
	],
};
