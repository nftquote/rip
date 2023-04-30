import * as fs from 'fs';
import * as url from 'url';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const file = url.fileURLToPath(new URL('package.json', import.meta.url));
const json = fs.readFileSync(file, 'utf8');
const { version } = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			precompress: false,
		}),
		files: {
			assets: 'static',
			hooks: {
				client: 'src/hooks.client',
				server: 'src/hooks.server',
			},
			lib: 'src/lib',
			params: 'src/params',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			appTemplate: 'src/app.html',
			errorTemplate: 'src/error.html',
		},
	},
	serviceWorker: {
		register: false
	},
	version: {
		name: version
	},
	trailingSlash: 'always',
};

export default config;
