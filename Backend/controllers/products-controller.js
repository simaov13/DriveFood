const bcrypt = require('bcrypt');
const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");

//todos os produtos
exports.getProducts = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM product';

        db.all(sql, [], (err, result) => {
            if (err) res.status(500).send(err.message);

            res.json(result);
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//produto atraves do id
exports.getProduct = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM product WHERE id = ?';

        db.get(sql, [req.params.id], (err, result) => {
            if (err) res.status(500).send(err.message);

            res.json(result);
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//adicionar produtos
exports.adicionarProduto = (req, res) => {
    try {
        // req.body
        let id_produto = req.body.id_produto;
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let logo = req.body.price;
        //define a variavel
        let id_restaurante;
        //token / decoded
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');

        //se ele for diferente merchant dá erro, se nao executa
        if (decoded.type == 'merchant') {

            // Verificar se produto ja existe
            let sql = 'SELECT id_produto FROM product WHERE id_produto = ?';
            db.get(sql, [id_produto], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    if (result) {
                        res.status(409).send({ message: 'Produto já existe' });
                    }
                }
            });
        } else {
            //se ele for diferente merchant dá erro, se nao executa
            var id_utilizador = req.params.id_utilizador;
            //verificar o tipo de utilizador
            if (decoded.type != "merchant") {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação da Empresa'
                    }
                }
                //error
                res.status(400).send(response);
            } else {
                // Inserir produto na base dados
                sql = 'INSERT INTO product (id_produto, name, description, logo, price, id_restaurante) VALUES (?,?,?,?,?,?)';
                db.run(sql, [id_produto, name, description, logo, price, id_restaurante], function (err) {
                    if (err) {
                        res.status(500).send(err.message);
                    } else {
                        res.status(201).send({
                            //produto criado com sucesso
                            message: 'Produto criado com sucesso!',
                            user: {
                                id_produto: id_produto,
                                name: name,
                                description: description,
                                logo: logo,
                                price: price,
                                id_restaurante: id_restaurante
                            },
                        });
                    }
                });
            }
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//alterar produto
exports.editarProduto = (req, res) => {
    try {
        // req.body
        let id_produto = req.body.id_produto;
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let logo = req.body.price;
        //token e decoded
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');

        //se ele for diferente merchant dá erro, se nao executa
        var id_utilizador = req.params.id_utilizador;
        //verificar o tipo de utilizador
        if (decoded.type != "merchant") {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Informação da Empresa'
                }
            }
            //error
            res.status(400).send(response);
        } else {
            //update ao produto
            let sql1 = 'UPDATE product set  name = ?, description = ?, logo = ?, price = ? WHERE  id_produto = ?'
            db.run(sql1, [name, description, logo, price, id_produto], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Produto editado com sucesso' });
                }
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//eliminar produto 
//procura o id 
exports.eliminarProduto = (req, res) => {
    try {

        // req.body
        let id_produto = req.body.id_produto;
        //token e decoded
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');
        //se ele for diferente merchant dá erro, se nao executa
        var id_utilizador = req.params.id_utilizador;
        //verificar o tipo de utilizador
        if (decoded.type != "merchant") {
            let response = {
                message: "failed",
                request: {
                    type: 'GET',
                    description: 'Obter Informação da Empresa'
                }
            }
            //error
            res.status(400).send(response);
        } else {
            //verificar se existe
            let sql = 'SELECT id_produto FROM product WHERE id_produto = ?';
            db.get(sql, [id_produto], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    if (!result) {
                        res.status(409).send({ message: 'Produto não encontrado' });
                    }
                }

            });

            //eliminar produto
            let sql1 = 'DELETE FROM product WHERE id_produto = ?';
            db.get(sql1, [req.params.id_produto], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message:  'Produto eliminado com sucesso' });
                }

            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};