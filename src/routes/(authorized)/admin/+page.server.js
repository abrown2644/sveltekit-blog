import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	// if (!locals?.user?.authenticated) throw redirect(307, '/login');
	return locals;
}
