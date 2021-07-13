// vite.config.js
const path = require('path');
import liveReload from 'vite-plugin-live-reload';

/**
 * @type {import('vite').UserConfig}
 */

module.exports = {
	plugins: [liveReload('/demo/scss/**/*.scss')],
	resolve: {
		alias: { '@': path.resolve(__dirname, './lib') },
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'lib/index.ts'),
			name: '@sdg/animate',
		},
	},
};
