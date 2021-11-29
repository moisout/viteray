import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'
import esbuild from 'rollup-plugin-esbuild'

export default {
  input: 'src/mod.ts',
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    esbuild({
      minify: true,
    }),
    copy({
      targets: [
        {
          src: 'src/templates/*',
          dest: 'dist/templates/'
        }
      ]
    })
  ],
  output: [
    {
      file: 'bin/bundler.js',
      format: 'cjs',
      compact: true
    }
  ]
}
