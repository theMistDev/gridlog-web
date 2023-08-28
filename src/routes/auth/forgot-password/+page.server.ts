import { AuthActionsClass } from '$lib/server/factories/authFactories';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ cookies }) => {
	// const user = await db.getUserFromSession(cookies.get('sessionid'));
	// return { user };
}) satisfies PageServerLoad;

export const actions = {
	resetPassword: AuthActionsClass.resetPasswordFactory
} satisfies Actions;
