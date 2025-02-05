import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open database connection
const db = await open({
  filename: "books.db",
  driver: sqlite3.Database,
});

// Create books table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
  )
`);

// Check if table is empty
const rowCount = await db.get("SELECT COUNT(*) AS count FROM books");

// Insert two books only if the table is empty
if (rowCount.count === 0) {
  await db.run("INSERT INTO books (title, author) VALUES (?, ?)", [
    "The Great Gatsby",
    "F. Scott Fitzgerald",
  ]);
  await db.run("INSERT INTO books (title, author) VALUES (?, ?)", [
    "1984",
    "George Orwell",
  ]);
}

export default db;
