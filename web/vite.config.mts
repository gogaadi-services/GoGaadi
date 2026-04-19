import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  plugins: [react()],

  resolve: {
    alias: {
      '@gogaadi/component': path.resolve(root, 'libs/ui/components'),
      '@gogaadi/theme': path.resolve(root, 'libs/theme/index.ts'),
      '@gogaadi/interfaces': path.resolve(root, 'libs/entities/index.ts'),
      '@gogaadi/hooks': path.resolve(root, 'libs/ui/hooks/index.ts'),
      '@gogaadi/utils': path.resolve(root, 'libs/utils/index.ts'),
      '@gogaadi/pages': path.resolve(root, 'libs/ui/pages'),
      '@gogaadi/constants': path.resolve(root, 'libs/shared/constants/index.ts'),
      '@gogaadi/services': path.resolve(root, 'libs/services/index.ts'),
      '@gogaadi/store': path.resolve(root, 'libs/services/store/index.ts'),
      '@gogaadi/slices': path.resolve(root, 'libs/services/slices/index.ts'),
      '@gogaadi/state': path.resolve(root, 'libs/services/state/index.ts'),
    },
  },

  server: {
    port: 1600,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    port: 1600,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
