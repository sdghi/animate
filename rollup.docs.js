import { resolve } from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// Production state is based on whether we are watching for changes or not.
const production = !process.env.ROLLUP_WATCH;

const inputFile = resolve(__dirname, 'lib/index.ts');

export default {
  input: inputFile,
  output: [
    {
      file: 'docs/js/humdinger.iife.js',
      name: 'humdinger',
      format: 'iife',
    },
  ],
  plugins: [
    typescript(),
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    production && terser(),
  ],
};
