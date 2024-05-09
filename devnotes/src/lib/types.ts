export interface Note {
    note_id?: number;
    title: string;
    content: string;
    user_id: number;
}

export interface User {
    user_id?: number;
    username: string;
    email: string;
}