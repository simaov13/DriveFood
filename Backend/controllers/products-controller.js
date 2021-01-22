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


//produto atraves do id
exports.getProduct = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM product WHERE id_produto = ?';

        db.get(sql, [req.params.id_produto], (err, row) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    // Utilizador registado
                    message: 'Produto',
                    product: {
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
        let id_restaurante = req.body.id_restaurante;
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
                    throw "err";
                } else {
                    if (result) {
                        res.status(409).send({ message: 'Produto já existe' });
                        throw "err";
                    }
                }
            });
            // Verificar se restaurante ja existe
            let sql1 = 'SELECT id_restaurante FROM product WHERE id_restaurante = ?';
            db.get(sql1, [id_restaurante], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                    throw "err";
                } else {
                    if (!result) {
                        res.status(409).send({ message: 'Restaurante não existe' });
                        throw "err";
                    } else {
                        //se ele for diferente merchant dá erro, se nao executa
                        var id_utilizador = req.params.id_utilizador;
                        //verificar o tipo de utilizador
                        if (decoded.type != "merchant") {
                            let response = {
                                message: "failed",
                                request: {
                                    type: 'POST',
                                    description: 'Obter Informação da Empresa'
                                }
                            }
                            //error
                            res.status(400).send(response);
                            throw "err";
                        } else {
                            // Inserir produto na base dados
                            sql = 'INSERT INTO product (name, description, logo, price, id_restaurante) VALUES (?,?,?,?,?)';
                            db.run(sql, [name, description, logo, price, id_restaurante], function (err) {
                                if (err) {
                                    res.status(500).send(err.message);
                                    throw "err";
                                } else {
                                    res.status(201).send({
                                        //produto criado com sucesso
                                        message: 'Produto criado com sucesso!',
                                        product: {
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
                }
            });
        }
    } catch (err) {
        console.log(err);
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
        //let id_restaurante = req.body.id_restaurante;
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
                    type: 'PUT',
                    description: 'Obter Informação da Empresa'
                }
            }
            //error
            res.status(400).send(response);
            throw "err";
        } else {
            //update ao produto
            let sql = 'UPDATE product set name = ?, description = ?, logo = ?, price = ? WHERE id_produto = ?'
            db.run(sql, [name, description, logo, price, id_produto], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({
                        //produto criado com sucesso
                        message: 'Produto editado com sucesso!',
                        product: {
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
    } catch (err) {
        console.log(err);
    }
    return;
};

//eliminar produto 
//procura o id 
exports.eliminarProduto = (req, res) => {
    try {
        // req.body
        let id_produto = req.body.id_produto;
        //verificação do token
        const tokenUnsplited = req.headers.authorization;
        if (tokenUnsplited) {
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
                throw "err";
            } else {
                //verificar se existe
                let sql = 'SELECT id_produto FROM product WHERE id_produto = ?';
                db.get(sql, [id_produto], (err, result) => {
                    if (err) {
                        res.status(500).send(err.message);
                        throw "err";
                    } else {
                        if (!result) {
                            res.status(409).send({ message: 'Produto não encontrado' });
                            throw "err";
                        } else {
                            //eliminar produto
                            let sql1 = 'DELETE FROM product WHERE id_produto = ?';
                            db.get(sql1, [req.params.id_produto], (err) => {
                                if (err) {
                                    res.status(500).send(err.message);
                                    throw "err";
                                } else {
                                    res.status(200).send({ message: 'Produto eliminado com sucesso' });
                                }
                            });
                        }
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
    return;
};