const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");
//Um Administrador pode ver todos os utilizadores
exports.getUsers = (req, res) => {
    try {
        let sql = 'SELECT * FROM user';

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

//Um Administrador por ver um utilizador
exports.getUser = (req, res) => {
    try {
        let sql = 'SELECT * FROM user WHERE id_utilizador = ?';
        db.get(sql, [req.params.id_utilizador], (err, row) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador',
                    user: {
                        username: row.username,
                        name: row.name,
                        password: row.hash,
                        nif: row.nif,
                        address: row.address,
                        postal_code: row.postal_code,
                        email: row.email,
                        city: row.city,
                        phone: row.phone,
                        type: row.type
                    },
                });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//Um Administrador pode eliminar um utilizador
exports.eliminarUtilizador = (req, res) => {
    try {
        //verificação do token
        const tokenUnsplited = req.headers.authorization;
        if (tokenUnsplited) {
            //token
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, 'Token');
            var id_utilizador = req.params.id_utilizador;
            //verificar o tipo de utilizador
            if (decoded.type != "admin" || decoded.type != "user") {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação do Utilizador'
                    }
                }
                //error
                res.status(400).send(response);
                throw "err";
            } else {
                //base dados
                let sql = 'DELETE FROM user WHERE id_utilizador = ?';
                db.get(sql, [req.params.id_utilizador], (err) => {
                    if (err) {
                        res.status(500).send(err.message);
                        throw "err";
                    } else {
                        res.status(200).send({ message: 'Utilizador eliminado com sucesso' });
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
    return;
};


//Administrador tem acesso a todos os produtos
exports.getProdutos = (req, res) => {
    try {
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

//O administrador tem acesso a todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
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

//O administrador tem acesso a todas as entregas
exports.getEntregas = (req, res) => {
    try {
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


//O administrador tem acesso a todos os restaurante
exports.getRestaurantes = (req, res) => {
    try {
        let sql = 'SELECT * FROM restaurante';

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

//O administrador pode eiminar um restaurante
exports.eliminarRestaurante = (req, res) => {
    try {
        //verificação do token
        const tokenUnsplited = req.headers.authorization;
        if (tokenUnsplited) {
            //token
            let id_restaurante = req.body.id_restaurante;
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token, 'Token');
            var id_utilizador = req.params.id_utilizador;
            //se ele for diferente merchant dá erro, se nao executa
            if (decoded.type != "admin" || decoded.type != "merchant") {
                let response = {
                    message: "failed",
                    request: {
                        type: 'GET',
                        description: 'Obter Informação do Utilizador ou Empresa'
                    }
                }
                //error
                res.status(400).send(response);
                throw "err";
            } else {
                //eliminar restaurante
                let sql = 'DELETE FROM restaurante WHERE id_restaurante = ?';
                db.get(sql, [req.params.id_restaurante], (err) => {
                    if (err) {
                        res.status(500).send(err.message);
                        throw "err";
                    } else {
                        res.status(200).send({ message: 'Restaurante eliminado com sucesso' });
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
    return;
};