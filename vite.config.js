// vite.config.js
const path = require('path');
import { defineConfig } from 'vite';
import liveReload from 'vite-plugin-live-reload';

/**
 * @type {import('vite').UserConfig}
 */

module.exports = defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, '/lib/index.ts'),
      name: 'humdinger',
      formats: ['es', 'umd', 'iife'],
    },
  },
  plugins: [liveReload('/demo/scss/**/*.scss')],
});
