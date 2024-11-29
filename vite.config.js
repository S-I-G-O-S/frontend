import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para facilitar os imports
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Configuração de chunks para temas
        manualChunks: {
          themes: [
            './src/themes/salmaoDark.css', 
            './src/themes/salmaoLight.css'], 
        },
      },
    },
    // Configurações gerais de build
    chunkSizeWarningLimit: 500, // Evita warnings para chunks grandes
    cssCodeSplit: true, // Divide o CSS em arquivos separados para otimização
  },
  /*
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Variáveis SCSS globais (se usar SCSS)
      },
    },
  },
  */
  server: {
    port: 5173, // Porta do servidor dev
    open: true, // Abre o navegador automaticamente
    /*proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy para o backend (ajuste a URL do backend)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },*/
  },
  base: '/', // Ajuste se precisar hospedar o site em um subdiretório
});
