import { decryptData } from '$lib/server/encryptor';
import { redirect } from '@sveltejs/kit';
import type { JwtPayload } from 'jwt-decode';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwtDecode from 'jwt-decode';
import { AuthManagerClass } from '$lib/server/managers/authManagers';

const authorization = (async ({ event, resolve }) => {
	const [encryptedJWT, encryptedUser] = await Promise.all([
		event.cookies.get('admin-wafconnect-j'),
		event.cookies.get('admin-wafconnect-u')
	]);

	event.locals.jwt = encryptedJWT ? await decryptData(encryptedJWT) : null;
	event.locals.user = encryptedUser ? await decryptData(encryptedUser) : null;

	console.log('user', event.locals.user);

	const allowedRoutes = ['/dashboard'];

	if (!event.locals.user && allowedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		throw redirect(303, '/');
	}

	console.log('path name', event.url.pathname);

	if (event.url.pathname.startsWith('/dashboard') && event.locals.jwt !== null) {
		const decoded = jwtDecode<JwtPayload>(event.locals.jwt);

		if (decoded.exp && decoded.exp < Date.now() / 1000) {
			await new AuthManagerClass().signOutManager(event);
			throw redirect(307, '/');
		}
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;

const protection = (async ({ event, resolve }) => {
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});

	return result;
}) satisfies Handle;

export const handle: Handle = sequence(authorization);
