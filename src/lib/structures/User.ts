import { Snowflake } from '@klasa/snowflake';

import { BaseStructureWithID } from './base/BaseStructures';
import { Client } from '../client/Client';
import { UserFlags } from '../utils/bitfields/UserFlags';

import type { APIUserData } from '@klasa/dapi-types';
import type { ImageURLOptions } from '@klasa/rest';

import type { AvatarStructure, TimestampStructure } from './base/Interfaces';

export class User extends BaseStructureWithID implements AvatarStructure, TimestampStructure/* , TextLikeChannel */ {

	/**
	 * The deconstructed snowflake of this structure.
	 * @internal
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	#snowflake: Snowflake;

	public id: string;

	/**
	 * If this user is a bot account.
	 */
	public bot!: boolean;

	/**
	 * This user's username.
	 */
	public username!: string;

	/**
	 * This user's discriminator.
	 */
	public discriminator!: string;

	/**
	 * This user's avatar hash, may be null.
	 */
	public avatarHash!: string | null;

	/**
	 * If this user is an Official Discord System user
	 */
	public system!: boolean;

	/**
	 * This user's flags.
	 */
	public publicFlags!: UserFlags;

	public constructor(client: Client, data: APIUserData) {
		super(client);

		this.id = data.id;
		this.#snowflake = new Snowflake(data.id);

		this._patch(data);
	}

	/**
	 * The timestamp when this structure was created.
	 */
	public get createdTimestamp() {
		return this.#snowflake.timestamp;
	}

	/**
	 * The date object representing when this structure was created.
	 */
	public get createdAt() {
		return this.#snowflake.date;
	}

	public avatarURL(options?: ImageURLOptions) {
		if (this.avatarHash === null) return null;
		return this.client.api.cdn.userAvatar(this.id, this.avatarHash, options);
	}

	public get defaultAvatarURL() {
		return this.client.api.cdn.defaultAvatar(Number(this.discriminator) % 5);
	}

	public dynamicAvatarURL(options?: ImageURLOptions) {
		if (this.avatarHash === null) return this.defaultAvatarURL;
		return this.avatarURL(options) as string;
	}

	/**
	 * The user's full Discord tag (e.g. `Discord#0000`).
	 */
	public get userTag() {
		return `${this.username}#${this.discriminator}`;
	}

	protected _patch(data: APIUserData): void {
		const { avatar, discriminator, username, bot, public_flags, system } = data;
		this.username = username;
		this.discriminator = discriminator;
		this.avatarHash = avatar;
		this.bot = bot ?? false;
		this.system = system ?? false;
		this.publicFlags = new UserFlags(public_flags ?? 0);
	}

}

Client.registerExtensibleStructure('User');
