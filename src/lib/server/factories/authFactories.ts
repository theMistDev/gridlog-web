// import { fail, type RequestEvent } from '@sveltejs/kit';

import { FB } from '$lib/config/firebaseConfig';
import { fail, json, type RequestEvent } from '@sveltejs/kit';
import { AuthManagerClass } from '../managers/authManagers';

// export const loginEmailFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const email = formData.get('email');
// 	const password = formData.get('password');
// 	if (email === null || password === null) {
// 		return fail(400, { email, missing: true });
// 	}
// };

export class AuthActionsClass {
	static loginEmailFactory = async (event: RequestEvent) => {
		try {
			const manager = new AuthManagerClass();
			const formData = await event.request.formData();
			const email = formData.get('email');
			const password = formData.get('password');
			if (email === null || password === null) {
				return fail(400, { email, missing: true });
			}
			const res = await manager.loginManager(email, password, event);
			return {
				success: res.success,
				data: res.data,
				message: res.message
			};
		} catch (error) {
			console.log(`error here: ${error}`);
		}
	};

	static resetPasswordFactory = async (event: RequestEvent) => {
		try {
			const manager = new AuthManagerClass();
			const formData = await event.request.formData();
			const email = formData.get('email');
			if (email === null) {
				return fail(400, { email, missing: true });
			}
			const res = await manager.passwordResetManager(email, event);
			return {
				success: res.success,
				data: res.data,
				message: res.message
			};
		} catch (error) {
			console.log(`error here: ${error}`);
		}
	};

	static registerEmailFactory = async (event: RequestEvent) => {
		try {
			const manager = new AuthManagerClass();
			const formData = await event.request.formData();
			const firstName = formData.get('firstName');
			const lastName = formData.get('lastName');
			const email = formData.get('email');
			const password = formData.get('password');

			if (email === null || firstName === null || lastName === null || password === null) {
				return fail(400, { email, firstName, lastName, missing: true });
			}

			const res = await manager.registerManager(
				email,
				firstName,
				lastName,
				password,
				event
			);

			return {
				success: res.success,
				data: res.data,
				message: res.message
			};
		} catch (error) {
			console.log(`error here: ${error}`);

			return {
				success: false,
				data: error
			};
		}
	};
}
