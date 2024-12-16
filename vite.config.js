import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgLoader from 'vite-svg-loader';
import eslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	plugins: [
		react(),
		svgLoader(),
		eslintPlugin({
			cache: false,
			include: ['./src/**/*.js', './src/**/*.jsx'],
			exclude: []
		}),
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.js']
	},
	resolve: {
		alias: {
			src: '/src'
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	},
	build: {
		outDir: './build',
		commonjsOptions: { transformMixedEsModules: true },
		rollupOptions: {
			output: {
				manualChunks(id) {
					// You can manually specify chunks based on conditions.
					// For example, separate third-party libraries into a vendor chunk.
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		},
		chunkSizeWarningLimit: 500 // Set the chunk size warning limit to 500kB
	},
	server: {
		// hmr: {
		// 	overlay: false
		// },
		open: true,
		port: 8080
		// proxy: {
		// 	'/api': {
		// 		target: 'https://beans.timesofindia.com',
		// 		changeOrigin: true,
		// 		secure: false
		// 		// rewrite: path => path.replace(/^\/api/, '')
		// 	}
		// }
	}
});
