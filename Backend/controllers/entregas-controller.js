const db = require('../config/sqlite');

//procurar todas as entregas
exports.getEntregas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM deliverie';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar uma entrega por id
exports.getEntrega = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM deliverie WHERE id_deliverie = ?';

        db.get(sql, [req.params.id_deliverie], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};