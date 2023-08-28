// import CryptoJS from 'crypto-js';

// // Encrypt
// export const encryptData = async (data: any) => {
// 	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// 	return cipherText;
// };

// export const decryptData = async (data: string | CryptoJS.lib.CipherParams) => {
// 	const bytes = CryptoJS.AES.decrypt(data, 'secret key 123');
// 	const decryptedData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// 	return decryptedData;
// };

import CryptoJS from 'crypto-js';
import { WAFCONNECT_SERVER, WAFCONNECT_PUBLIC_APP_TOKEN } from '$env/static/private';

const ENCRYPTION_KEY = WAFCONNECT_PUBLIC_APP_TOKEN || 'no key round';

export const encryptData = (data: any) => {
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
	return cipherText;
};

export const decryptData = (data: string | CryptoJS.lib.CipherParams) => {
	try {
		const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		return decryptedData;
	} catch (error) {
		// Handle decryption errors here (e.g., incorrect key or corrupted data)
		console.error('Decryption error:', error);
		return null;
	}
};
