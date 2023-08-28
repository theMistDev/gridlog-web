// import { fail, type RequestEvent } from '@sveltejs/kit';

import { FB } from '$lib/config/firebaseConfig';
import { fail, json, type RequestEvent } from '@sveltejs/kit';
import { SearchManagerClass } from '../managers/searchManager';

export class SearchActionsClass {
	static searchWaitlistFactory = async (event: RequestEvent) => {
		try {
			const manager = new SearchManagerClass();
			const formData = await event.request.formData();
			const query = formData.get('query');
			if (query === null) {
				return fail(400, { query, missing: true });
			}
			const res = await manager.searchWaitlistManager(query, event);
			return {
				success: res.success,
				data: res.data,
				message: res.message
			};
		} catch (error) {
			console.log(`error here: ${error}`);
		}
	};
}
