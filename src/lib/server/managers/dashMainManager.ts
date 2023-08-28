import { Siri } from '../siri';
import type { RequestEvent } from '@sveltejs/kit';

export class DashMainManagerClass {
	private _siri = new Siri();

	getCountManager = async (token: string | null, event: RequestEvent) => {
		try {
			const res = await this._siri.serverGET('admin/waitlist/count', token, event);
			return {
				success: res.success ? res.success : false,
				message: res.message ? res.message : '',
				data: res.data ? res.data : ''
			};
		} catch (error) {
			console.log('get waitlist count error', error);
			return {
				success: false,
				data: error,
				message: `Error: ${error}`
			};
		}
	};
}
