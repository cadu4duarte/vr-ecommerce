import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
     setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      'header/Header': path.resolve(__dirname, './src/test/MfeMock.tsx'),
      'cards/Cards': path.resolve(__dirname, './src/test/MfeMock.tsx'),
      'footer/Footer': path.resolve(__dirname, './src/test/MfeMock.tsx'),
    },
  },
});