import * as fs from 'fs';
import path from 'path';
import NodeCache from 'node-cache';
import { json } from '@sveltejs/kit';
import { db, storage } from '../../../../../lib/server/db.js';
import { v4 as uuidv4 } from 'uuid';

import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// export async function GET({ url }) {
// 	const clearCacheParam = url.search.includes('clearcache');

// 	let media = cache.get('media') || { images: [], videos: [] }; // from cache
// 	if (clearCacheParam) {
// 		console.log('skip cache!!');
// 		cache.del('media');
// 		media = { images: [], videos: [] };
// 	}

// 	// Get Images
// 	if (media.images.length === 0) {
// 		// console.log('no media cache! grabbing JSON');

// 		try {
// 			const [files] = await storage
// 				.bucket('ab-blog-5a3aa.appspot.com')
// 				.getFiles({ prefix: 'images/' });

// 			await Promise.all(
// 				files.map(async (file, i) => {
// 					const url = await file.getSignedUrl({
// 						action: 'read',
// 						expires: '03-01-2500' // Set the expiration date as per your requirement
// 					});
// 					if (file.name !== 'images/') {
// 						media.images.push({ name: path.basename(file.name), url: url[0] });
// 					}
// 				})
// 			);
// 		} catch (error) {
// 			// Handle the error appropriately
// 		}

// 		cache.set('media', media, 10000);
// 	}
// 	// TODO: Get Videos

// 	return json(media);
// }

export async function POST({ request, locals }) {
	// Grab files from request

	const formData = await request.formData();
	const files = formData.getAll('image'); // was file now image to support editor.js image uploads
	console.log('files:', files);
	let uploadedFile;

	const uploadPromises = files.map(async (file) => {
		let folder = 'images';
		if (file.type.includes('video')) folder = 'videos';

		const blobName = `${folder}/${Date.now()}-${file.name}`;
		const bucketName = `ab-blog-5a3aa.appspot.com`;
		const bucket = storage.bucket(bucketName);
		const blob = bucket.file(blobName);

		const buffer = await file.arrayBuffer();
		const fileData = Buffer.from(buffer);

		await blob.save(fileData, {
			contentType: file.type
		});

		//save in Firestore
		await db.collection(folder).doc().set({ url: blobName });

		// Get downloadURL
		const downloadURLs = await blob.getSignedUrl({
			action: 'read',
			expires: '03-03-2024' // Specify an expiration date if desired
		});

		// Add to response object
		uploadedFile = {
			success: 1,
			file: {
				url: downloadURLs[0],
				name: file.name
			}
		};
	});

	await Promise.all(uploadPromises);

	return new Response(JSON.stringify(uploadedFile), { status: 200 });
}
