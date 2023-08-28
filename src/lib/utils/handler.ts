import { applyAction, deserialize } from '$app/forms';
import type { ActionResult } from '@sveltejs/kit';

export const handler = async (endpoint: string, inputData: { [x: string]: any }) => {
	try {
		let data;
		
		let selectionData = new FormData();

		const keys = Object.keys(inputData);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = inputData[key];
			if (value !== null && value !== '') {
				selectionData.append(key, value);
			}
		}

		const response = await fetch(`?/${endpoint}`, {
			method: 'POST',
			body: selectionData
		});

		const result: ActionResult = deserialize(await response.text());
		applyAction(result);

		if (result.type === 'success') {
			data = result.data;
			return {
				success: data?.success ? data.success : false,
				data: data?.data ? data.data : [],
				message: data?.message ? data.message : ''
			};
		} else if (result.type === 'error' && result.error) {
			throw new Error(result.error); // Throw an error if the server returns an error message
		} else {
			throw new Error('Unexpected response from server.'); // Throw an error if the server response is missing or incorrectly formatted
		}
	} catch (error) {
		console.log('error in fetch factory', error);
		return { success: false, data: [] };
	} finally {
	}
};
