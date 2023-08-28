import { FB } from '$lib/config/firebaseConfig';
import { Siri } from '../siri';
import { encryptData } from '../encryptor';
import type { RequestEvent } from '@sveltejs/kit';

export class AuthManagerClass {
	private _siri = new Siri();
	loginManager = async (
		email: FormDataEntryValue,
		password: FormDataEntryValue,
		event: RequestEvent
	) => {
		try {
			const fb = new FB();
			const login = await fb.signInWithEmailAndPassword(email, password);

			if (login.user) {
				if (login.user.emailVerified) {
					const { uid, email } = login.user;
					const token = await login.user.getIdToken();
					const sendToServer = await this._siri.serverPOST(
						'auth/login',
						token,
						{
							uid: uid,
							token: token,
							emailVerified: login.user.emailVerified
						},
						event
					);

					if (sendToServer && sendToServer.success) {
						const encryptedToken = encryptData(token);
						const encryptedUser = encryptData(sendToServer.data.user);

						event.cookies.set('admin-wafconnect-j', encryptedToken);
						event.cookies.set('admin-wafconnect-u', encryptedUser);
						// event.locals.user = sendToServer.data.user;
					}

					return {
						success: sendToServer.success ? sendToServer.success : false,
						message: sendToServer.message ? sendToServer.message : '',
						data: sendToServer.data ? sendToServer.data : ''
					};
				} else {
					console.log('no email verified');
					await fb.sendVerificationEmail(login.user);

					return {
						success: false,
						data: {},
						message: 'Email not verified'
					};
				}
			} else {
				return {
					success: false,
					data: '',
					message: login?.error?.code ? login.error.code : ''
				};
			}
		} catch (error) {
			console.log('login error', error);
			return {
				success: false,
				data: error,
				message: `Error: ${error}`
			};
		}
	};

	passwordResetManager = async (email: FormDataEntryValue, event: RequestEvent) => {
		try {
			const fb = new FB();
			const reset = await fb.sendPasswordResetEmail(email);
			return {
				success: reset.success ? reset.success : false,
				message: reset.message ? reset.message : '',
				data: reset.data ? reset.data : ''
			};
		} catch (error) {
			console.log('login error', error);
			return {
				success: false,
				data: error,
				message: `Error: ${error}`
			};
		}
	};

	signOutManager = async (event: RequestEvent) => {
		console.log('signout called');
		const fb = new FB();
		await fb.signout();
		event.cookies.set('admin-wafconnect-j', '', {
			path: '/',
			maxAge: 0
		});
		event.cookies.set('admin-wafconnect-u', '', {
			path: '/',
			maxAge: 0
		});
		event.locals.jwt = null;
		event.locals.user = null;
	};

	registerManager = async (
		email: FormDataEntryValue,
		firstName: FormDataEntryValue,
		lastName: FormDataEntryValue,
		password: FormDataEntryValue,
		event: RequestEvent
	) => {
		try {
			const token = event.locals.jwt;
			const registerOnServer = await this._siri.serverPOST(
				'auth/register',
				token,
				{
					email: email,
					firstName: firstName,
					lastName: lastName,
					password: password
				},
				event
			);

			return {
				success: registerOnServer.success ? registerOnServer.success : false,
				message: registerOnServer.message ? registerOnServer.message : '',
				data: registerOnServer.data ? registerOnServer.data : ''
			};
		} catch (error) {
			console.log('Error in Register Manager', error);
			return {
				success: false,
				data: error
			};
		}
	};
}
