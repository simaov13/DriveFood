const db = require('../config/sqlite');

//procurar os restaurantes
exports.getRestaurantes = (req, res) => {
    try {
        let sql = 'SELECT * FROM restaurante';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar um restaurante por um id
exports.getRestaurante = (req, res) => {
    try {
        let sql = 'SELECT * FROM restaurante WHERE id_restaurante = ?';

        db.get(sql, [req.params.id_restaurante], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


