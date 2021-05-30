/** @type {import('@sveltejs/kit').Config} */
import { imagetools } from "vite-imagetools"
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';


const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	kit: {
		target: '#svelte',
		adapter: adapter(),
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

export default config;
