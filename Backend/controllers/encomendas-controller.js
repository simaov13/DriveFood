const db = require('../config/sqlite');

//procurar todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM order';
        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar uma encomenda por id
exports.getEncomenda = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM order WHERE id_order = ?';
        db.get(sql, [req.params.id_encomenda], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

c