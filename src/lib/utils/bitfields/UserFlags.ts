import { BitField, BitFieldObject } from '@klasa/bitfield';

export type UserFlagsResolvable = keyof typeof UserFlags.FLAGS | number | BitFieldObject | ((keyof typeof UserFlags.FLAGS) | number | BitFieldObject)[];

export class UserFlags extends BitField<UserFlagsResolvable> {

	public static FLAGS = {
		DISCORD_EMPLOYEE: 1 << 0,
		DISCORD_PARTNER: 1 << 1,
		HYPESQUAD_EVENTS: 1 << 2,
		BUG_HUNTER_LEVEL_1: 1 << 3,
		HOUSE_BRAVERY: 1 << 6,
		HOUSE_BRILLIANCE: 1 << 7,
		HOUSE_BALANCE: 1 << 8,
		EARLY_SUPPORTER: 1 << 9,
		TEAM_USER: 1 << 10,
		SYSTEM: 1 << 12,
		BUG_HUNTER_LEVEL_2: 1 << 14,
		VERIFIED_BOT: 1 << 16,
		VERIFIED_BOT_DEVELOPER: 1 << 17
	} as const;

}
