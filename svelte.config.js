import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		})
	},
	compilerOptions: {
		// disable all warnings coming from node_modules and all accessibility warnings
		warningFilter: (warning) =>
			!warning.filename?.includes('node_modules') && !warning.code.startsWith('a11y')
	}
};

export default config;
