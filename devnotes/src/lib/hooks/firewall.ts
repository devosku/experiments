import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!session) {
		if (
			event.route.id !== '/' &&
			!event.route.id?.startsWith('/info') &&
			!event.route.id?.startsWith('/signin') &&
			!event.route.id?.startsWith('/signout')
		) {
			redirect(303, '/');
		}
	}
	return resolve(event);
};
