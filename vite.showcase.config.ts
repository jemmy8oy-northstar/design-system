import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Showcase app config: serves showcase/index.html, importing components straight
// from source so `npm run dev` renders the whole system (used for visual review
// and as the target the Playwright screenshot tests drive).
export default defineConfig({
  root: 'showcase',
  plugins: [react()],
  server: { port: 5183 },
  preview: { port: 4183 },
  build: {
    outDir: '../dist-showcase',
    emptyOutDir: true,
  },
});
