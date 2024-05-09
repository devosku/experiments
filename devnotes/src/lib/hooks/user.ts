import { getDatabase } from '$lib/server/database';
import type { User } from '$lib/types';
import { type Handle } from '@sveltejs/kit';

/**
 * Handle creation of new users and fetching the user that is logged in from database.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!session?.user) {
        return resolve(event);
	}
	const db = getDatabase(event);
	let user: User | null = await db
		.prepare('SELECT * FROM users WHERE email = ?1')
		.bind(session.user.email)
		.first();

    if (!user) {
        console.log(`Creating new user: ${session.user.email}`);
        await db.prepare('INSERT INTO users (email, username) VALUES (?1, ?2)')
            .bind(session.user.email, session.user.name)
            .run();
        user = await db
            .prepare('SELECT * FROM users WHERE email = ?1')
            .bind(session.user.email)
            .first();
    }

    event.locals.user = user;
    return resolve(event);
};
