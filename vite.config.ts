import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://casamentoitaloedaniely.com.br',
        changeOrigin: true,
        secure: false, // se a API usar HTTPS com certificado self-signed
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
