const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/projeto.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
        return false;
    }
    console.log('Connected to (SQLITE) database.');
});

module.exports = db;