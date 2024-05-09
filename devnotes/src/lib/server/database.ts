import { error, type ServerLoadEvent, type RequestEvent } from "@sveltejs/kit";

export function getDatabase(event: ServerLoadEvent | RequestEvent) {
	const DB = event.platform?.env.DB;
	if (!DB) {
		error(500, 'Failed loading the database');
	}
	return DB;
}