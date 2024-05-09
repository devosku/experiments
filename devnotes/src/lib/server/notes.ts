import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { Note } from '$lib/types';
import { getDatabase } from './database';

export async function getUserNotes(event: ServerLoadEvent | RequestEvent): Promise<Note[]> {
	const db = getDatabase(event);
	const result = await db
		.prepare('SELECT note_id, title, content FROM notes WHERE user_id = ?1')
		.bind(event.locals.user.user_id)
		.all();
	if (result.success) {
		return result.results as unknown as Note[];
	}
	error(500, 'Failed fetching user notes');
}

export async function getUserNote(event: ServerLoadEvent | RequestEvent, noteId: string) {
	const db = getDatabase(event);
	const note = await db
		.prepare('SELECT * FROM notes WHERE user_id = ?1 AND note_id = ?2')
		.bind(event.locals.user.user_id, noteId)
		.first();
	if (note) {
		return note;
	}
	error(500, 'Failed fetching note ' + noteId);
}

export async function addNote(
	event: ServerLoadEvent | RequestEvent,
	note: { title: string; content: string }
) {
	const db = getDatabase(event);
	const result = await db
		.prepare('INSERT INTO notes (title, content, user_id) VALUES (?1, ?2, ?3)')
		.bind(note.title, note.content, event.locals.user.user_id)
		.run();

	if (result.success) {
		return true;
	}
	error(500, 'Failed adding a note');
}

export async function deleteNote(event: ServerLoadEvent | RequestEvent, noteId: string) {
	const db = getDatabase(event);
	const result = await db
		.prepare('DELETE FROM notes WHERE note_id = ?1 AND user_id = ?2')
		.bind(noteId, event.locals.user.user_id)
		.run();

	if (result.success) {
		return true;
	}
	error(500, 'Failed deleting a note ' + noteId);
}
