import { Siri } from '../siri';
import type { RequestEvent } from '@sveltejs/kit';

export class SearchManagerClass {
	private _siri = new Siri();
	searchWaitlistManager = async (query: FormDataEntryValue, event: RequestEvent) => {
		try {
			const sendToServer = await this._siri.serverPOST(
				'admin/waitlist/search',
				event.locals.jwt,
				{
					query: query
				},
				event
			);

			if (sendToServer && sendToServer.success) {
				return {
					success: sendToServer.success ? sendToServer.success : false,
					message: sendToServer.message ? sendToServer.message : '',
					data: sendToServer.data ? sendToServer.data : []
				};
			} else {
				return {
					success: false,
					data: [],
					message: 'search query not found'
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
}
