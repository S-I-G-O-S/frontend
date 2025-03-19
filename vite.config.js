import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@styles': path.resolve(__dirname, './src/styles'),
			'@assets': path.resolve(__dirname, './public/assets'),
			'@services': path.resolve(__dirname, './src/services'),
			'@backend': path.resolve(__dirname, './src/services/backend'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@provider': path.resolve(__dirname, './src/provider'),
			'@context': path.resolve(__dirname, './src/context'),
			'@vis.gl/react-google-maps/examples.js': 'https://visgl.github.io/react-google-maps/scripts/examples.js'
		},
	},
	build: {
		/* 
		  rollupOptions: {
			output: {
			  // Configuração de chunks para temas
			  manualChunks: {
				themes: './src/styles/themes.css', 
			  },
			},
		  },
		*/
		// Configurações gerais de build
		//   Evita warnings para chunks grandes
		//chunkSizeWarningLimit: 500, 
		// Divide o CSS em arquivos separados para otimização
		cssCodeSplit: true, 
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
		open: false, // Abre o navegador automaticamente
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
