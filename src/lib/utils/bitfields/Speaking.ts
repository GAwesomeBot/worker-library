import { BitField, BitFieldObject } from '@klasa/bitfield';

export type SpeakingResolvable = keyof typeof Speaking.FLAGS | number | BitFieldObject | ((keyof typeof Speaking.FLAGS) | number | BitFieldObject)[];

export class Speaking extends BitField<SpeakingResolvable> {

	public static FLAGS = {
		SPEAKING: 1 << 0,
		SOUNDSHARE: 1 << 1
	} as const;

}

