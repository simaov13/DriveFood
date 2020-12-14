const bcrypt = require('bcrypt');

const db = require('../config/sqlite');


exports.getProducts = (req, res) => {
    try {
        let sql = 'SELECT * FROM products';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.getProduct = (req, res) => {
    try {
        let sql = 'SELECT * FROM product WHERE id = ?';

        db.get(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.addProducts = (req, res) => {
    try {
        // req.body
        let username = req.body.username;
        let name = req.body.name;
        let desc = req.body.desc;
        let image = req.body.image;

        // Check if product exists
        let sql = 'SELECT name FROM products WHERE name = ?';
        db.get(sql, [name], (err, result) => {
            if (err) return res.status(500).send(err.message);

            if (result) return res.status(409).send({ message: 'Produto já existe' });
        });

        // Check if product exists
        sql = 'SELECT username FROM users WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);

            if (!result) return res.status(409).send({ message: 'Utilizador já registado' });
        });


        // Insert user in database
        sql = 'INSERT INTO products (username, name, desc, image) VALUES (?,?,?,?)';
        db.run(sql, [username, name, desc, image], (err) => {
            if (err) return res.status(500).send(err.message);

            return res.status(201).send({
                message: 'Produto criado com sucesso!',
                user: {
                    username: username,
                    name: name,
                    desc: desc,
                    image: image,
                },
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.deleteProduct = (req, res) => {
    try {
        let sql = 'DELETE * FROM product WHERE id = ?';

        db.get(sql, [req.params.id], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};