export async function handle({ event, resolve }) {
	event.locals.user = event.cookies.get('dmauth')
		? { email: event.cookies.get('dmauth'), authenticated: true }
		: null;

	if (!event.locals.user && event.url.pathname.includes('/admin')) {
		return new Response(null, {
			status: 303,
			headers: { location: '/login' }
		});
	}

	return await resolve(event);
}
