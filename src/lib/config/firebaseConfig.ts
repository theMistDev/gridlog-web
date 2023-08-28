import {
	initializeApp,
	getApps,
	getApp,
	type FirebaseApp,
	FirebaseError,
	type FirebaseOptions
} from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	type Auth,
	type Unsubscribe,
	type User,
	sendEmailVerification
} from 'firebase/auth';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/private';

export class FB {
	// config = {
	// 	apiKey: env.FIREBASE_API_KEY,
	// 	authDomain: env.FIREBASE_AUTH_DOMAIN,
	// 	projectId: env.FIREBASE_PROJECT_ID,
	// 	storageBucket: env.FIREBASE_STORAGE_BUCKET,
	// 	messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
	// 	appId: env.FIREBASE_APP_ID,
	// 	measurementId: env.FIREBASE_MEASUREMENT_ID
	// };

	private _config: FirebaseOptions = {
		apiKey: 'AIzaSyBKR4ciZtxK03FDirbZptN7wxjbtDKj4-k',
		authDomain: 'grid-log.firebaseapp.com',
		projectId: 'grid-log',
		storageBucket: 'grid-log.appspot.com',
		messagingSenderId: '807139374854',
		appId: '1:807139374854:web:e6ed14db58a0be9857d087'
	};



	private _getFirebaseConfig = () => {
		if (!this._config || !this._config.apiKey) {
			throw new Error(
				'No Firebase configuration object provided.' +
					'\n' +
					"Add your web app's configuration object to firebase-config.js"
			);
		} else {
			return this._config;
		}
	};

	private _getFirebaseApp = () => {
		let firebaseApp: FirebaseApp;
		const firebaseAppConfig = this._getFirebaseConfig();
		if (getApps.length === 0) {
			firebaseApp = initializeApp(firebaseAppConfig);
		} else {
			firebaseApp = getApp();
		}
		return firebaseApp;
	};

	private _getFirebaseAuth = () => {
		let auth: Auth;
		let unsubOnAuthStateChangedHandler: Unsubscribe;
		auth = getAuth(this._getFirebaseApp());
		auth.useDeviceLanguage();

		if (browser) {
			unsubOnAuthStateChangedHandler = onAuthStateChanged(auth, this._onAuthStateChangedHandler);
		}
		return auth;
	};

	private _onAuthStateChangedHandler = (user: any) => {
		if (user) {
			console.log('user is logged in');
		} else {
			// this.getFirebaseAuth;
			// unsubOnAuthStateChangedHandler();
			console.log('user is logged out');
		}
	};

	signInWithEmailAndPassword = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				this._getFirebaseAuth(),
				email.toString(),
				password.toString()
			);
			const user = userCredential.user;
			return { user: user };
		} catch (error) {
			return {
				error: error,
				user: null
			};
		}
	};

	signout = async () => {
		try {
			return signOut(this._getFirebaseAuth());
		} catch (error) {
			console.error('Sign Out Error', error);
		}
	};

	sendPasswordResetEmail = async (email: FormDataEntryValue) => {
		try {
			await sendPasswordResetEmail(this._getFirebaseAuth(), email.toString());
			return {
				success: true,
				message: 'password reset mail sent successfully',
				data: {}
			};
		} catch (error) {
			return {
				success: false,
				message: 'password reset mail not sent',
				data: { error }
			};
		}
	};

	sendVerificationEmail = async (user: User) => {
		try {
			await sendEmailVerification(user);

			return {
				success: true,
				message: 'verification mail sent successfully',
				data: {}
			};
		} catch (error) {
			return {
				success: false,
				message: 'verification mail not sent',
				data: { error }
			};
		}
	};
}
