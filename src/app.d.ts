// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			user: UserInterface | null;
			jwt: string | null;
		}

		interface UserInterface {
			_id: Types.ObjectId | null;
			uid: string;
			email: string;
			firstName: string;
			lastName: string;
			department: string;
			level: string;
			emailVerified: boolean;
			disabled: boolean;
			createdAt: Date;
			updatedAt: Date;
		}
	}
}

export {};
