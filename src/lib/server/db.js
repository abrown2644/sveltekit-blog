import admin from 'firebase-admin';
import serviceAccount from '../../../ab-blog-5a3aa-firebase-adminsdk-w10jw-80b58672d7.json';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});
}

export const db = admin.firestore();
export const storage = admin.storage();
