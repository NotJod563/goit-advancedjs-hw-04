import { defineConfig } from 'vite';

export default defineConfig({
  base: '/goit-advancedjs-hw-04/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});