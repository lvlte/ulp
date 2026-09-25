import { defineConfig } from 'tsdown';

export default defineConfig([{
  format: 'esm',
  unbundle: true,
  entry: './src/index.ts',
  outDir: './dist/esm',
  tsconfig: './tsconfig.json',
  fixedExtension: false,
  outputOptions: {
    comments: {
      jsdoc: false,
    },
  },
}, {
  format: 'cjs',
  unbundle: true,
  entry: 'src/index.ts',
  outDir: './dist/cjs',
  tsconfig: './tsconfig-cjs.json',
  outExtensions() {
    return { js: '.js' };
  },
  outputOptions: {
    comments: {
      jsdoc: false,
    },
  },
}, {
  format: 'umd',
  platform: 'neutral',
  target: 'es2016',
  outDir: './dist/umd',
  entry: './src/index.ts',
  globalName: 'ulp',
  outputOptions: {
    entryFileNames: 'ulp.js',
  },
}, {
  format: 'umd',
  platform: 'neutral',
  target: 'es2016',
  outDir: './dist/umd',
  entry: './src/index.ts',
  globalName: 'ulp',
  minify: true,
  sourcemap: true,
  outputOptions: {
    entryFileNames: 'ulp.min.js',
  },
}]);
