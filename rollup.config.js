import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import json from '@rollup/plugin-json';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    json(),
    esbuild({
      minify: true,
    }),
    preserveShebangs(),
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      compact: true,
      interop: 'auto',
    },
  ],
  external: [
    'http',
    'harmon',
    'connect',
    'yargs',
    'http-proxy',
    'vite',
    'path',
    'serve-static',
    'fs',
    'fs/promises',
    'finalhandler',
    'chalk',
  ],
};

export default config;
