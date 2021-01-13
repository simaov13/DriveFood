const db = require('../config/sqlite');

//procurar todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
        //base dados
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

//procurar uma encomenda por id
exports.getEncomenda = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM order WHERE id_encomenda = ?';
        db.get(sql, [req.params.id_encomenda], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
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
        let id_order = req.body.id_order;
        let username = req.body.username;
        let id_restaurante = req.body.id_restaurante;
        let food_name = req.body.food_name;
        let food_qty = req.body.food_qty;
        let payment_method = req.body.payment_method;
        //let cancel_reason = req.body.cancel_reason;

        //se ele for diferente user dá erro, se nao executa
        if (req.body.type != 'user') res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")' });

        //verificar se a encomenda já existe
        let sql = 'SELECT id_order FROM product WHERE id_order = ?';
        db.get(sql, [id_order], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                //encomenda existe
                if (result) {
                    res.status(409).send({ message: 'Encomenda já existe' });
                }
            }

        });

        // criar uma encomenda
        sql = 'INSERT INTO order (id_encomenda, username, id_restaurante, food_name, food_qty, payment_method) VALUES (?,?,?,?,?,?)';
        db.run(sql, [id_encomenda, username, id_restaurante, food_name, food_qty, payment_method], (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    //encomenda criada
                    message: 'Encomenda criada com sucesso!',
                    user: {
                        id_encomenda: id_encomenda,
                        username: username,
                        id_restaurante: id_restaurante,
                        food_name: food_name,
                        food_qty: food_qty,
                        payment_method: payment_method
                    },
                });
            }
        });
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
        let food_name = req.body.food_name;
        let food_qty = req.body.food_qty;
        let payment_method = req.body.payment_method;

        //se ele for diferente user dá erro, se nao executa
        if (req.body.type != 'user') res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")' });       
        //update encomenda
        let sql = 'UPDATE order set username = ?, id_restaurante = ?, food_name = ?, food_qty = ?, paymenth_method = ? WHERE  id_encomenda = ?'
        db.get(sql, [username, id_restaurante, food_name, food_qty, payment_method, id_encomenda], (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                //encomenda editada 
                res.status(200).send({ message: 'Encomenda editada com sucesso' });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//eliminar/cancelar emcomenda atraves do utilizador
exports.eliminarEncomenda = (req, res) => {
    try {
        //se ele for diferente user dá erro, se nao executa
        if (req.body.type != 'user') res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")' });
        //Eliminar atraves do id
        let sql = 'DELETE FROM encomenda WHERE id_encomenda = ?';
        db.get(sql, [req.params.id_encomenda], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(201).send({
                    //encomenda cancelada
                    message: 'Encomenda cancelada com sucesso'
                });
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};