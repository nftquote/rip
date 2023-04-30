import { readFileSync } from 'fs';
import { join } from 'path';
import { type UserConfig, defineConfig, loadEnv } from 'vite';
import inject from '@rollup/plugin-inject';
import { sveltekit } from '@sveltejs/kit/vite';

type Mode = 'development' | 'production';
type Network = 'ic' | 'local';
type StringMap = Record<string, string>;
type CanisterIdDef = { ic?: string; local?: string; };
type CanisterIdDefMap = Record<string, CanisterIdDef>;

export default defineConfig((config: UserConfig): UserConfig => {
	const gv = new GlobalVariables({ config }).setup();

	return {
		mode: gv.mode,
		plugins: [sveltekit()],
		build: {
			target: 'es2020',
			rollupOptions: {
				plugins: [
					// 글로벌 변수로 inject 하는 플러그인
					// ex. import { Buffer } from 'buffer'; 생성
					inject({
						modules: {
							'Buffer': ['buffer', 'Buffer'],
						},
					}),
				],
			},
		},
		optimizeDeps: {
			esbuildOptions: {
				// Node.js global 변수 설정
				define: {
					'global': 'globalThis'
				},
			},
		},
		define: {
			'process.env': {
				...gv.getCanisterIdEnvMap(),
				'DFX_NETWORK': gv.network,
			},
		},
	};
});

class GlobalVariables {
	private _mode: Mode = 'development';
	private _host: string = 'http://127.0.0.1:8000';
	private _network: Network = 'local';
	private _canisterIdDefMap: CanisterIdDefMap = {};

	constructor({ config }: { config: UserConfig }) {
		this._mode = (config.mode as Mode | undefined) ?? 'development';
	}

	setup(): this {
		this._host = this._network === 'local' ? 'http://127.0.0.1:8000' : 'https://ic0.app';
		this._network = (process.env.DFX_NETWORK as Network || undefined) ?? 'local';
		this._canisterIdDefMap = GlobalVariables.readCanisterIdDefMap(this._network);

		process.env = {
			...process.env,
			...loadEnv(this._mode, process.cwd()),
			...this.getCanisterIdEnvMap((name) => `VITE_${name.toUpperCase()}_CANISTER_ID`),
			VITE_DFX_NETWORK: this._network,
			VITE_HOST: this._host,
		}

		return this;
	}

	get host(): string {
		return this._host;
	}

	get mode(): Mode {
		return this._mode;
	}

	get network(): Network {
		return this._network;
	}

	get canisterIdDefMap(): CanisterIdDefMap {
		return this._canisterIdDefMap;
	}

	getCanisterIdEnvMap(keyFactory = (name: string) => `${name.toUpperCase()}_CANISTER_ID`): StringMap {
		return Object.entries(this._canisterIdDefMap).reduce((env, entry) => {
			const [name, idDef] = entry;
	
			return {
				...env,
				[keyFactory(name)]: idDef[this._network],
			};
		}, {});
	}
	
	static readCanisterIdDefMap(network: Network): CanisterIdDefMap {
		const filePath =
			network === 'ic'
				? join(process.cwd(), "..", 'canister_ids.json')
				: join(process.cwd(), "..", '.dfx', 'local', 'canister_ids.json');
		let config: CanisterIdDefMap = {};

		try {
			config = JSON.parse(readFileSync(filePath, 'utf-8'));
		} catch (e) {
			throw Error(`Could not get canister ID from ${filePath}: ${e}`);
		}

		return config;
	}
}
