const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");

//procurar todas as entregas
exports.getEntregas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM delivery';
        db.all(sql, [], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//procurar uma entrega por id
exports.getEntrega = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM delivery WHERE id_entrega = ?';

        db.get(sql, [req.params.id_entrega], (err, row) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    // Utilizador registado
                    message: 'Entrega',
                    entrega: {
                        id_produto: row.id_produto,
                        username: row.username,
                        id_restaurante: row.id_restaurante
                    },
                });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//Adicionar uma Entrega
exports.adicionarEntrega = (req, res) => {
    try {
        // req.body
        let id_entrega = req.body.id_entrega;
        let username = req.body.username;
        let id_restaurante = req.body.id_restaurante;
        // Verificar se entrega ja existe
        let sql = 'SELECT id_entrega FROM delivery WHERE id_entrega = ?';
        db.get(sql, [id_entrega], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
                throw "err";
            } else {
                if (result) {
                    res.status(409).send({ message: 'Entrega já existe' });
                    throw "err";
                }
            }
        });
        // Verificar se username existe
        sql = 'SELECT id_utilizador FROM user WHERE id_utilizador = ?';
        db.get(sql, [id_utilizador], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
                throw "err";
            } else {
                if (!result) {
                    res.status(409).send({ message: 'Utilizador já registado' });
                    throw "err";
                }
            }
        });
        //verificação se o restaurante existe
        sql = 'SELECT id_restaurante FROM restaurante WHERE id_restaurante = ?';
        db.get(sql, [id_restaurante], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                if (!result) {
                    res.status(409).send({ message: 'Restaurante não existe' });
                    throw "err";
                }
            }
        });
        // Inserir entrega na base dados
        sql = 'INSERT INTO delivery (id_produto, username, id_restaurante) VALUES (?,?,?)';
        db.run(sql, [id_produto], (err) => {
            if (err) {
                res.status(500).send(err.message);
                throw "err";
            } else {
                res.status(201).send({
                    //produto criado com sucesso
                    message: 'Entrega criada com sucesso!',
                    user: {
                        id_produto: id_produto,
                        username: username,
                        id_restaurante: id_restaurante
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
    return;
};