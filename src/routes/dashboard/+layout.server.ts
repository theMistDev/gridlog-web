import { DashMainManagerClass } from '$lib/server/managers/dashMainManager';
import type { LayoutServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';

export const load = (async (event: RequestEvent) => {
	const user = event.locals.user;
	return {  user };
}) satisfies LayoutServerLoad;
