import { FB } from '$lib/config/firebaseConfig';
import { AuthActionsClass } from '$lib/server/factories/authFactories';
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { redirect, type RequestEvent } from '@sveltejs/kit';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { AuthManagerClass } from '$lib/server/managers/authManagers';

export const load = (async (event: RequestEvent) => {
	const manager = new AuthManagerClass();
	await manager.signOutManager(event);
	throw redirect(307, '/');
}) satisfies PageServerLoad;
