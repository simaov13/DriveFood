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
        let sql = 'SELECT * FROM user WHERE username = ?';
        db.get(sql, [req.params.username], (err, result) => {
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

//Um Administrador pode eliminar um utilizador
exports.eliminarUtilizador = (req, res) => {
    try {
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
        } else {
            //base dados
            let sql = 'DELETE FROM user WHERE id_utilizador = ?';
            db.get(sql, [req.params.id_utilizador], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Utilizador eliminado com sucesso' });
                }
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
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
        let sql = 'SELECT * FROM order';

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
        let sql = 'SELECT * FROM deliverie';

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
        //eliminar restaurante
        let sql = 'DELETE FROM restaurante WHERE id_restaurante = ?';
        db.get(sql, [req.params.id_restaurante], (err, result) => {
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