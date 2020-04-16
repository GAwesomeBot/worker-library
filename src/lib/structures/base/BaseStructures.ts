import type { Client } from '../../client/Client';

export abstract class BaseStructure {

	/**
	 * Denoted if a structure was deleted.
	 *
	 * *Will be null if the structure cannot be deleted*
	 */
	public deleted: boolean | null = null;

	public constructor(public readonly client: Client) {}

	/**
	 * Clones the structure.
	 */
	public clone<T = this>(): T {
		return Object.assign(Object.create(this), this);
	}

	/**
	 * Deletes the structure, if possible.
	 */
	// eslint-disable-next-line @typescript-eslint/require-await
	public async delete() {
		if (this.deleted === null) throw new Error('This structure cannot be deleted');

		const clone = this.clone();
		clone.deleted = true;

		return clone;
	}

	/**
	 * Updates the structure data.
	 * @param data The received data
	 */
	protected abstract _patch(data: unknown): void;

}

export abstract class BaseStructureWithID extends BaseStructure {

	/**
	 * The ID of this structure.
	 */
	public abstract id: string;

}
