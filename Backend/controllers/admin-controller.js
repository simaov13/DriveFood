const db = require('../config/sqlite');


//Um Administrador pode ver todos os utilizadores
exports.getUsers = (req, res) => {
    try {
        let sql = 'SELECT * FROM user';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//Um Administrador por ver um utilizador
exports.getUser = (req, res) => {
    try {
        let sql = 'SELECT * FROM user WHERE username = ?';

        db.get(sql, [req.params.username], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//Um Administrador pode eliminar um utilizador
exports.eliminarUtilizador = (req, res) => {
    try {
        //base dados
        let sql = 'DELETE * FROM user WHERE id = ?';
        db.get(sql, [req.params.id_utilizador], (err, result) => {
            if (err) return res.status(500).send(err.message);
            return res.json(result).send({message: 'Utilizador eliminado com sucesso'});
            
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


//Administrador tem acesso a todos os produtos
exports.getProducts = (req, res) => {
    try {
        let sql = 'SELECT * FROM product';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//O administrador tem acesso a todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
        let sql = 'SELECT * FROM order';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//O administrador tem acesso a todas as entregas
exports.getEntregas = (req, res) => {
    try {
        let sql = 'SELECT * FROM deliverie';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


//O administrador tem acesso a todos os restaurante
exports.getRestaurantes = (req, res) => {
    try {
        let sql = 'SELECT * FROM restaurante';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//O administrador pode eiminar um restaurante
exports.eliminarRestaurante = (req, res) => {
    try {
        //eliminar restaurante
        let sql = 'DELETE * FROM restaurante WHERE id_restaurante = ?';
        db.get(sql, [req.params.id_restaurante], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};