import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/server.ts',
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    esbuild({
      minify: true,
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      compact: true,
    },
  ],
};

export default config;
