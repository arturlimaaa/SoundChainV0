import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Include polyfills for crypto, buffer, etc
      include: ['crypto', 'buffer', 'stream']
    })
  ],
  resolve: {
    alias: {
      '@sdk': path.resolve(__dirname, '../../sdk/src')
    }
  },
  server: {
    port: 3000
  }
});
