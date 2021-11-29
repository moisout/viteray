import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import json from '@rollup/plugin-json';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    esbuild({
      // minify: true,
    }),
    replace({
      preventAssignment: true,
    }),
    preserveShebangs(),
  ],
  output: [
    {
      file: 'bin/index.js',
      format: 'esm',
      // compact: true,
    },
  ],
};

export default config;
