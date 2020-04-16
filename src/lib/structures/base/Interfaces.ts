import type { ImageURLOptions } from '@klasa/rest';
import type { User } from '../User';

export interface Structures {
	User: typeof User;
}

export interface TimestampStructure {
	/**
	 * The timestamp when this structure was created.
	 */
	readonly createdTimestamp: number;
	/**
	 * The date object representing when this structure was created.
	 */
	readonly createdAt: Date;
}

export interface AvatarStructure {
	/**
	 * The URL to the user's avatar.
	 */
	avatarURL(options?: ImageURLOptions): string | null;
	/**
	 * The URL to the user's default avatar.
	 */
	readonly defaultAvatarURL: string;
	/**
	 * The URL to the user's avatar if they have one, or their default otherwise.
	 */
	dynamicAvatarURL(options?: ImageURLOptions): string;
}
