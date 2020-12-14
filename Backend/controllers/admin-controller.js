const db = require('../config/sqlite');

exports.getUsers = (req, res) => {
    try {
        let sql = 'SELECT * FROM users';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.getUser = (req, res) => {
    try {
        let sql = 'SELECT * FROM users WHERE username = ?';

        db.get(sql, [req.params.username], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};