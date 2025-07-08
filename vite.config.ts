import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'build', // по дефолту 'dist', но нужен 'build'
    sourcemap: false,
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true, // Vite не будет выбирать другой порт при занятости 3000
  },
  define: {
    'process.env': {},
  },
})
