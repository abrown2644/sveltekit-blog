import * as fs from 'fs';
import NodeCache from 'node-cache';
import { json } from '@sveltejs/kit';
import { db } from '../../../../lib/server/db.js';
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export async function GET() {
	const posts = cache.get('posts') || []; // from cache

	if (posts.length === 0) {
		console.log('no posts cache! grabbing JSON');

		try {
			const querySnapshot = await db.collection('posts').get();
			querySnapshot.forEach((doc) => {
				let post = doc.data();
				console.log(doc.id, post);
				posts.push({ id: doc.id, title: post.title, slug: post.slug, content: post.content });
			});
		} catch (error) {
			console.log('Error getting documents:', error);
		}

		cache.set('posts', posts, 10000);
	}

	return json(posts);
}
