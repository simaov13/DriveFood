const bcrypt = require('bcrypt');

const db = require('../config/sqlite');

//todos os produtos
exports.getProducts = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM product';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


//produto atraves do id
exports.getProduct = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM product WHERE id = ?';

        db.get(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
