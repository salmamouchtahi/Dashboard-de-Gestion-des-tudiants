const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app.db');

// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    filiere TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS filieres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);
});

module.exports = db;