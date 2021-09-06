import { resolve } from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// Production state is based on whether we are watching for changes or not.
const production = !process.env.ROLLUP_WATCH;

const inputFile = resolve(__dirname, 'lib/index.ts');

export default {
  input: inputFile,
  output: [
    {
      file: 'dist/humdinger.es.js',
      format: 'es',
    },
    {
      file: 'dist/humdinger.umd.js',
      name: 'humdinger',
      format: 'umd',
    },
    {
      file: 'dist/humdinger.iife.js',
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
