// vite.config.js
const path = require('path');
import liveReload from 'vite-plugin-live-reload';

/**
 * @type {import('vite').UserConfig}
 */

module.exports = {
	plugins: [liveReload('/docs/scss/**/*.scss')],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'lib/index.ts'),
			name: '@sdg/animate',
		},
	},
};
