import { EventEmitter } from 'events';

import { mergeDefault } from '@klasa/utils';
import { REST, RESTOptions, RESTManagerEvents } from '@klasa/rest';
import { WebSocketManager, WSOptions, WebSocketManagerEvents } from '@klasa/ws';
import { TimerManager } from '@klasa/timer-manager';

import { ClientOptionsDefaults } from '../utils/Constants';

import type { Structures } from '../structures/base/Interfaces';

export interface ClientOptions {
	rest: RESTOptions;
	ws: Partial<WSOptions>;
}

const EXTENSION_MAP = new Map<keyof Structures, Array<(old: Structures[keyof Structures]) => Structures[keyof Structures]>>();

export class Client extends EventEmitter {

	public ws: WebSocketManager;
	public api: REST;
	public options: Required<ClientOptions>;

	public constructor(options?: Partial<ClientOptions>) {
		super();
		this.options = mergeDefault(ClientOptionsDefaults, options);

		this.api = new REST(this.options.rest)
			.on(RESTManagerEvents.Debug, this.emit.bind(this, RESTManagerEvents.ClientRESTDebug))
			.on(RESTManagerEvents.Ratelimited, this.emit.bind(this, RESTManagerEvents.Ratelimited));

		this.ws = new WebSocketManager(this.api, this.options.ws)
			.on(WebSocketManagerEvents.Debug, this.emit.bind(this, WebSocketManagerEvents.ClientWSDebug));
	}

	public set token(token: string) {
		this.api.token = token;
		this.ws.token = token;
	}

	public async connect() {
		try {
			await this.ws.spawn();
		} catch (err) {
			this.destroy();
			throw err;
		}
	}

	public destroy() {
		TimerManager.destroy();
		this.ws.destroy();
	}

	public static registerExtensibleStructure<K extends keyof Structures>(structure: K) {
		EXTENSION_MAP.set(structure, []);
	}

	public static addExtension<K extends keyof Structures, N extends Structures[K]>(key: K, extender: (base: Structures[K]) => N) {
		const entries = EXTENSION_MAP.get(key);
		if (!entries) throw new RangeError(`Structure ${key} was not registered as an extensible structure!`);
		entries.push(extender);
	}

}
