import { dev } from '$app/environment';
import { GRIDLOG_SERVER, GRIDLOG_PUBLIC_APP_TOKEN } from '$env/static/private';
import { AuthManagerClass } from './managers/authManagers';
import type { RequestEvent } from '@sveltejs/kit';

export class Siri {
	private _publicAppToken = GRIDLOG_PUBLIC_APP_TOKEN || '';
	private _server = dev ? 'http://localhost:8080' : GRIDLOG_SERVER || '';

	api = this._server;

	private _privateOptions = {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': this._publicAppToken
		}
	};

	private _publicOptions = {
		method: 'GET',
		mode: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	private _privateConfig = (method: 'GET' | 'POST') => {
		return {
			method: method,
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': this._publicAppToken
			}
		};
	};

	private _privateLoginConfig = (method: 'GET' | 'POST', authorization: string) => {
		return {
			method: method,
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': this._publicAppToken,
				Authorization: authorization
			}
		};
	};

	private _privateTokenConfig = (method: 'GET' | 'POST', authorization: string, body?: any) => {
		return {
			method: method,
			mode: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': this._publicAppToken,
				Authorization: authorization
			},
			body
		};
	};

	private _jwtInvalidMiddleware = async (data: any, event: RequestEvent) => {
		console.log('jwt watch');
		if (data && data.success) {
			return data;
		} else if (
			data.message === 'Authorization header is missing' ||
			data.message === 'JWT Token is missing' ||
			data.message === 'JWT Token did not verify' ||
			data.message === 'Invalid JWT Token'
		) {
			console.log('jwt issue');
			const auth = new AuthManagerClass();
			await auth.signOutManager(event);
			return data;
		} else {
			return data;
		}
	};

	private _get = async (url: string, token: string | null, event: RequestEvent) => {
		try {
			const res = await fetch(url, {
				method: 'GET',
				mode: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': this._publicAppToken,
					Authorization: `Bearer ${token}`
				}
			});

			const fetchedData = await res.json();
			return await this._jwtInvalidMiddleware(fetchedData, event);
		} catch (error) {
			return {
				success: false,
				data: error
			};
		}
	};

	private _post = async (url: string, token: string | null, data: {}, event: RequestEvent) => {
		try {
			const res = await fetch(url, {
				method: 'POST',
				mode: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': this._publicAppToken,
					Authorization: `Bearer ${token}`
				},
				body: data ? JSON.stringify(data) : undefined
			});
			const fetchedData = await res.json();
			return await this._jwtInvalidMiddleware(fetchedData, event);
		} catch (error) {
			// Other error handling
			console.log('Other Error:', error);
			return {
				success: false,
				data: error
			};
		}
	};



	serverGET = async (uri: string, token: string | null, event: RequestEvent) => {
		const url = `${this._server}/${uri}`;
		return await this._get(url, token, event);
	};

	serverPOST = async (uri: string, token: string | null, data: {}, event: RequestEvent) => {
		const url = `${this._server}/${uri}`;
		return await this._post(url, token, data, event);
	};

	// serverPOSTWithToken = async (uri: string, authorization: string, data: any) => {
	// 	const url = `${this._server}/${uri}`;

	// 	try {
	// 		const res = await fetch(url, {
	// 			method: 'POST',
	// 			mode: 'same-origin',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'x-auth-token': this._publicAppToken,
	// 				Authorization: `Bearer ${authorization}`
	// 			},
	// 			body: data ? JSON.stringify(data) : undefined
	// 		});

	// 		return await res.json();
	// 	} catch (error) {
	// 		// Other error handling
	// 		console.log('Other Error:', error);
	// 		return error;
	// 	}
	// };
}
