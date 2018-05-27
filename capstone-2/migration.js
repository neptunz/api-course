const dbfile = process.env.TEST_DATABASE || './database.sqlite';
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database(dbfile);
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS Artist`);

  db.run(`CREATE TABLE IF NOT EXISTS Artist(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    biography TEXT NOT NULL,
    is_currently_employeed INTEGER DEFAULT 1
  );`);

  db.run(`DROP TABLE IF EXISTS Series`);

  db.run(`CREATE TABLE IF NOT EXISTS Series(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL
  );`);

  db.run(`DROP TABLE IF EXISTS Issue`);

  db.run(`CREATE TABLE IF NOT EXISTS Issue(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    issue_number TEXT NOT NULL,
    artist_id INTEGER FOREIGN KEY REFERENCES Artist id NOT NULL,
    series_id INTEGER FOREIGN KEY REFERENCES Series id NOT NULL
    series_id INTEGER ON Issue.id = Series.id NOT NULL
  );`);

});
