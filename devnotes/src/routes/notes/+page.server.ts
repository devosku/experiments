import { error, type Actions } from '@sveltejs/kit';

import { addNote, deleteNote, getUserNotes } from '$lib/server/notes';
import type { Note } from '$lib/types.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event): Promise<{ notes: Note[] }> => {
	const session = await event.locals.auth();
	if (!session) {
		error(401, 'Unauthorized');
	}
	const notes = await getUserNotes(event);
	if (notes) {
		return { notes };
	}
	error(404, 'Not found');
}

export const actions = {
	add: async (event) => {
		const session = await event.locals.auth();
		if (!session) {
			error(401, 'Unauthorized');
		}
		const data = await event.request.formData();
		const title = data.get('title')?.toString() || '';
		const content = data.get('content')?.toString() || '';

		await addNote(event, { title, content });

		return { success: true };
	},
	delete: async (event) => {
		const session = await event.locals.auth();
		if (!session) {
			error(401, 'Unauthorized');
		}
		const data = await event.request.formData();
		const noteId = data.get('id')?.toString() || '';

		await deleteNote(event, noteId);

		return { success: true };
	}
} satisfies Actions;
 
