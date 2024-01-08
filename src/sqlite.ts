// src/index.ts

import BetterSqliteDatabase from 'better-sqlite3';
import type { Database } from 'better-sqlite3';

// Create a table
const createTable = (db: Database) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER
    );
  `;

  db.exec(createTableQuery);
};

// Insert some data
const insertData = (db: Database) => {
  const insertDataQuery = `
    INSERT INTO users (name, age) VALUES
    ('John Doe', 25),
    ('Jane Doe', 30),
    ('Bob Smith', 22);
  `;

  db.exec(insertDataQuery);
};

// Show some data
const showData = (db: Database) => {
  const query = 'SELECT * FROM users;';
  const users = db.prepare(query).all();

  return users;
};

export const testSqlite = (sqlitePath: string) => {
  // Connect to the SQLite database
  const db = new BetterSqliteDatabase(sqlitePath);
  createTable(db);
  insertData(db);

  return new Promise((resolve, reject) => {
    try {
      const users = showData(db);
      // Close the database connection
      db.close();
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

// (async () => {
//   const sqlitePath = 'sqlite.db';
//   const users = await testSqlite(sqlitePath);
//   console.log(users);
// })();
