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

        db.get(sql, [req.params.id_entrega], (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    // Utilizador registado
                    message: 'Entrega',
                    entrega: {
                        id_entrega: id_entrega,
                        id_utilizador: id_utilizador,
                        id_encomenda: id_encomenda
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
        let id_encomenda = req.body.id_encomenda;
        let id_utilizador = req.body.id_utilizador;
        //token
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, 'Token');

        //verificar se a encomenda já existe
        if (decoded.type == 'driver') {
            let sql = 'SELECT id_encomenda FROM encomenda WHERE id_encomenda = ?';
            db.get(sql, [id_encomenda], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                    throw "err";
                } else {
                    //encomenda existe
                    if (!result) {
                        res.status(409).send({ message: 'Encomenda já existe' });
                        throw "err";
                    } else {
                        // Inserir entrega na base dados
                        sql = 'INSERT INTO delivery (id_encomenda, id_utilizador) VALUES (?,?)';
                        db.run(sql, [id_encomenda, id_utilizador], (err) => {
                            if (err) {
                                res.status(500).send(err.message);
                                throw "err";
                            } else {
                                res.status(201).send({
                                    //produto criado com sucesso
                                    message: 'Entrega criada com sucesso!',
                                    user: {
                                        id_encomenda: id_encomenda,
                                        id_utilizador: id_utilizador,
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else {
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
        }
    } catch (err) {
        console.log(err);
    }
    return;
};



//eliminar/cancelar emcomenda atraves do utilizador
exports.eliminarEntrega = (req, res) => {
    try {
        //req id_encomenda
        let id_entrega = req.body.id_entrega;
        //verificação do token
        const tokenUnsplited = req.headers.authorization;

        if (tokenUnsplited) {
            //token
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, 'Token');
            //se ele for diferente merchant dá erro, se nao executa
            if (decoded.type != "driver") {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação do Tipo de Utilizador'
                    }
                }
                //error
                res.status(400).send(response);
                throw "err";
            } else {
                //verificar se existe
                let sql = 'SELECT id_entrega FROM delivery WHERE id_entrega = ?';
                db.get(sql, [id_entrega], (result) => {
                    if (!result) {
                        res.status(409).send({ message: 'Entrega não existe' });
                        throw "err";
                    } else {
                        //Eliminar atraves do id
                        let sql1 = 'DELETE FROM delivery WHERE id_entrega = ?';
                        console.log(id_entrega)
                        db.get(sql1, [req.params.id_entrega], (err) => {
                            if (err) {
                                res.status(500).send(err.message);
                                throw "err";
                            } else {
                                res.status(204).send({
                                    //encomenda eliminada
                                    message: 'Entrega eliminada com sucesso'
                                });
                            }
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