DROP TABLE IF EXISTS notes;
CREATE TABLE IF NOT EXISTS notes (
    note_id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY, 
    username TEXT,
    email TEXT UNIQUE
);
