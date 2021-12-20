/** @type {import('@sveltejs/kit').Config} */
import { imagetools } from "vite-imagetools"
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';


const mode = process.env.NODE_ENV;
const dev = mode === 'development';

export default {
	kit: {
		target: '#svelte',
		adapter: adapter({
			env: {
				host: '127.0.0.1',
				port: 3000,
			}
		}),
		vite: {
			plugins: [imagetools({force: true})]
		}
	},
	preprocess: sveltePreprocess({
		sourceMap: dev,
		pug: true,
		postcss: true,
	})
};
