import { WSOptionsDefaults } from '@klasa/ws';
import { RestOptionsDefaults } from '@klasa/rest';

import type { ClientOptions } from '../client/Client';

export const ClientOptionsDefaults: Required<ClientOptions> = {
	rest: RestOptionsDefaults,
	ws: WSOptionsDefaults
};
