const bcrypt = require('bcrypt');

const db = require("../config/sqlite");

exports.login = (req, res) => {
    try {
        // req.body
        let username = req.body.username;
        let password = req.body.password;

        // Check if password matches with the one in database
        let sql = 'SELECT password FROM users WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);

            if (bcrypt.compareSync(password, result.password)) {
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    username: result.username,
                });
            } else {
                return res.status(401).send({ message: 'Falha na autenticação' });
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};