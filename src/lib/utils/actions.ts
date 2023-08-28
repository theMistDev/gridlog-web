// import { addCarManager } from '$lib/server/managers/carManager';
// import { createOrUpdateMessageManager } from '$lib/server/managers/messageManager';
// import {
// 	getCarMakesManager,
// 	getCarModelsManager,
// 	getLocationRegionsManager,
// 	getPhoneModelsManager
// } from '$lib/server/managers/optionsManager.';
// import { updateProfileManager } from '$lib/server/managers/profileManager';
// import { searchManager } from '$lib/server/managers/searchManager';
// import { fetchVINDataManager } from '$lib/server/managers/vinDataManager';
// import { fail, type RequestEvent } from '@sveltejs/kit';

// export const fetchRegionsFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const state = formData.get('state');
// 	if (state === null) {
// 		return fail(400, { state, missing: true });
// 	}

// 	const regions = await getLocationRegionsManager(state);

// 	return regions;
// };

// export const fetchPhoneModelsFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const brand_value = formData.get('brand_value');
// 	if (brand_value === null) {
// 		return fail(400, { brand_value, missing: true });
// 	}

// 	const models = await getPhoneModelsManager(brand_value);

// 	return models;
// };

// export const updateProfileFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();

// 	const userID = formData.get('userID');
// 	const phone = formData.get('phone');
// 	const state = formData.get('state');
// 	const region = formData.get('region');

// 	if (userID === null) {
// 		return fail(400, { success: false });
// 	}

// 	const submitData = await updateProfileManager(
// 		userID.toString(),
// 		phone?.toString(),
// 		state?.toString(),
// 		region?.toString()
// 	);

// 	if (!submitData) {
// 		return fail(400, { success: false });
// 	}
// 	const submitResponse = JSON.parse(JSON.stringify(submitData));

// 	return submitResponse;
// };

// // export const sendMessageFactory = async (event: RequestEvent) => {
// // 	const formData = await event.request.formData();
// // 	const senderID = formData.get('senderID');
// // 	const buyer = formData.get('buyer');
// // 	const seller = formData.get('seller');
// // 	const postID = formData.get('postID');
// // 	const category = formData.get('category');
// // 	const message = formData.get('message');
// // 	const messageID = formData.get('messageID');
// // 	const title = formData.get('title');

// // 	if (
// // 		senderID === null ||
// // 		buyer === null ||
// // 		seller === null ||
// // 		postID === null ||
// // 		category === null ||
// // 		message === null
// // 	) {
// // 		console.log('null entries found, sendMessageFactory');
// // 		return fail(400, { senderID, missing: true });
// // 	}

// // 	const sendMessage = await createOrUpdateMessageManager(
// // 		senderID.toString(),
// // 		buyer.toString(),
// // 		seller.toString(),
// // 		postID.toString(),
// // 		category.toString(),
// // 		message.toString(),
// // 		title?.toString(),
// // 		messageID?.toString()
// // 	);

// // 	const submitResponse = JSON.parse(JSON.stringify(sendMessage));

// // 	console.log('submit response from manager', submitResponse);

// // 	return submitResponse;
// // };

// export const handleSearchFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const search = formData.get('search');

// 	if (search === null) {
// 		return fail(400, { search, missing: true });
// 	}

// 	const searchData = await searchManager(search.toString());

// 	const submitResponse = JSON.parse(JSON.stringify(searchData));

// 	return submitResponse;
// };

// export const sendMessageFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const subject = formData.get('subject');
// 	console.log(subject)

// 	// if (search === null) {
// 	// 	return fail(400, { search, missing: true });
// 	// }

// 	// const searchData = await searchManager(search.toString());

// 	// const submitResponse = JSON.parse(JSON.stringify(searchData));

// 	// return submitResponse;
// };

// export const fetchCarMakesFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	const year = formData.get('year');
// 	if (year === null) {
// 		return fail(400, { year, missing: true });
// 	}

// 	const makesData = await getCarMakesManager(year);

// 	const makes = await makesData.map((item: string) => ({
// 		value: item.toLowerCase(),
// 		name: item
// 	}));

// 	return makes;
// };

// export const fetchCarModelsFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();
// 	let data: { [key: string]: any } = {};
// 	for (const [name, value] of formData) {
// 		data[name] = value;
// 	}

// 	const { year, make } = data;

// 	if (year === null || make === null) {
// 		return fail(400, { year, make, missing: true });
// 	}
// 	const modelsData = await getCarModelsManager(year, make);

// 	const models = modelsData.map((item: string) => ({ value: item.toLowerCase(), name: item }));

// 	return models;
// };

// export const createCarRecordFactory = async (event: RequestEvent) => {
// 	try {
// 		const formData = await event.request.formData();

// 		const stringedVINData = formData.get('stringedVINData');
// 		const stringedUserInput = formData.get('stringedUserInput');

// 		if (!stringedUserInput || !stringedVINData) {
// 			return fail(400, { success: false });
// 		}

// 		const submitData = await addCarManager(
// 			JSON.parse(stringedVINData as string),
// 			JSON.parse(stringedUserInput as string)
// 		);

// 		const submitResponse = JSON.parse(JSON.stringify(submitData));
// 		return submitResponse;
// 	} catch (error) {
// 		console.log('error in create car record factory', error);
// 		return error;
// 	}
// };

// export const fetchVINDataFactory = async (event: RequestEvent) => {
// 	const formData = await event.request.formData();

// 	let data: { [key: string]: any } = {};
// 	for (const [name, value] of formData) {
// 		data[name] = value;
// 	}

// 	const VIN = formData.get('VIN');

// 	if (!VIN) {
// 		console.log('no vin sent');
// 		return fail(400, { success: false });
// 	}

// 	const submitData = await fetchVINDataManager(VIN);

// 	if (!submitData) {
// 		return fail(400, { success: false });
// 	}
// 	const submitResponse = JSON.parse(JSON.stringify(submitData));

// 	return submitResponse;
// };
