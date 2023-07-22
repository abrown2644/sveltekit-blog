import { fail, redirect } from '@sveltejs/kit';
import { users } from '$lib//server//users.js';

export async function load({ cookies }) {
	// if user already authenticated go to home page
	const user = cookies.get('dmauth') ? { email: cookies.get('dmauth'), authenticated: true } : null;
	if (user) throw redirect(303, '/admin');
}

export const actions = {
	login: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) return fail(400, { email, missing: true });

		const auth = users.get(email) == password ? true : false;

		if (auth) {
			cookies.set('dmauth', email);
		} else {
			return fail(400, { email, incorrect: true });
		}

		locals.user = { email: email, authenticated: true };
		throw redirect(303, '/admin');
	}
};
