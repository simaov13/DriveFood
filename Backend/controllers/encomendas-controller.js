const bcrypt = require('bcrypt');
//base dados
const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");

//procurar todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM encomenda';
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

//procurar uma encomenda por id
exports.getEncomenda = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM encomenda WHERE id_encomenda = ?';
        db.get(sql, [req.params.id_encomenda], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    // Utilizador registado
                    message: 'Encomenda',
                    encomenda: {
                        id_produto: row.id_produto,
                        name: row.name,
                        description: row.description,
                        logo: row.logo,
                        price: row.price,
                        id_restaurante: row.id_restaurante
                    },
                });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


//adicionar encomenda
exports.adicionarEncomenda = (req, res) => {
    try {
        // req.body
        let id_encomenda = req.body.id_encomenda;
        let id_utilizador = req.body.id_utilizador;
        let id_produto = req.body.id_produto;
        let quantity = req.body.quantity;
        let payment_method = req.body.payment_method;
        let id_restaurante = req.body.id_restaurante;
        //token
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');

        //verificar se a encomenda já existe
        if (decoded.type == 'user' || decoded.type == 'admin') {
            let sql = 'SELECT id_encomenda FROM encomenda WHERE id_encomenda = ?';
            db.get(sql, [id_encomenda], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                    throw "err";
                } else {
                    //encomenda existe
                    if (result) {
                        res.status(409).send({ message: 'Encomenda já existe' });
                        throw "err";
                    }
                }
            });
            //verificar se a produto existe
            let sql1 = 'SELECT id_produto FROM product WHERE id_produto = ?';
            db.get(sql1, [id_produto], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    //encomenda existe
                    if (!result) {
                        res.status(409).send({ message: 'Produto não existe' });
                    }
                }
            });
        }
        //Verificar tipo de pagamento
        if (payment_method != 'dinheiro' && payment_method != 'cartão' && payment_method != 'mbway') {
            res.status(406).send({
                message: 'Tipo de pagamento inválido ("dinheiro"/"cartão"/"mbway")'
            });
            throw 'Tipo de pagamento inválido';
        }
        //var id_utilizador = req.params.id_utilizador;
        //verificar o tipo de utilizador
        if (decoded.type != "admin" && decoded.type != 'user') {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Informação do tipo de utilizador'
                }
            }
            //error
            res.status(400).send(response);
            throw "err";
        } else {
            // criar uma encomenda
            sql = 'INSERT INTO encomenda (id_produto, quantity, id_restaurante, payment_method) VALUES (?,?,?,?)';
            db.run(sql, [id_produto, quantity, id_restaurante, payment_method], function (err) {
                if (err) {
                    res.status(500).send(err.message);
                    throw "err";
                } else {
                    res.status(201).send({
                        //encomenda criada
                        message: 'Encomenda criada com sucesso!',
                        user: {
                            id_encomenda: id_encomenda,
                            id_produto: id_produto,
                            quantity: quantity,
                            id_restaurante: id_restaurante,
                            payment_method: payment_method
                        },
                    });
                }
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//editar encomenda
exports.editarEncomenda = (req, res) => {
    try {
        // req.body
        let id_encomenda = req.body.id_encomenda;
        let username = req.body.username;
        let id_restaurante = req.body.id_restaurante;
        let payment_method = req.body.payment_method;
        // token e decoded
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');

        var id_utilizador = req.params.id_utilizador;
        //verificar o tipo de utilizador
        if (decoded.type != "user" || decoded.type != "admin") {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Informação do Tipo de utilizador'
                }
            }
            //error
            res.status(400).send(response);
            throw "err";
        } else {
            //update encomenda
            let sql = 'UPDATE order set id_utilizador = ?, id_restaurante = ?, paymenth_method = ? WHERE  id_encomenda = ?'
            db.run(sql, [id_utilizador, id_restaurante, payment_method, id_encomenda], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    //encomenda editada 
                    res.status(200).send({
                        //encomenda criada
                        message: 'Encomenda editada com sucesso!',
                        encomenda: {
                            id_encomenda: id_encomenda,
                            id_produto: id_produto,
                            quantity: quantity,
                            id_restaurante: id_restaurante,
                            payment_method: payment_method
                        },
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
    return;
};

//eliminar/cancelar emcomenda atraves do utilizador
exports.eliminarEncomenda = (req, res) => {
    try {
        //req id_encomenda
        let id_encomenda = req.body.id_encomenda;
        //verificação do token
        const tokenUnsplited = req.headers.authorization;
        if (tokenUnsplited) {
            //token
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, 'Token');
            //se ele for diferente merchant dá erro, se nao executa
            if (decoded.type != "user" && decoded.type != "admin") {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação do Tipo de Utilizador'
                    }
                }
                //error
                res.status(400).send(response);
            } else {
                //Eliminar atraves do id
                let sql = 'DELETE FROM encomenda WHERE id_encomenda = ?';
                db.get(sql, [req.params.id_encomenda], (err) => {
                    if (err) {
                        res.status(500).send(err.message);
                        throw "err";
                    } else {
                        res.status(200).send({
                            //encomenda eliminada
                            message: 'Encomenda eliminada com sucesso'
                        });
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
    return;
};