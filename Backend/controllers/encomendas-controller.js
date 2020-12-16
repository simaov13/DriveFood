const db = require('../config/sqlite');

//procurar todas as encomendas
exports.getEncomendas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM order';
        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar uma encomenda por id
exports.getEncomenda = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM order WHERE id_order = ?';
        db.get(sql, [req.params.id_encomenda], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
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
        let cancel_reason = req.body.cancel_reason;

        //se ele for diferente user dá erro, se nao executa
        if (req.body.type != 'user') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });        // Check if order exists

        //verificar se a encomenda já existe
        let sql = 'SELECT id_order FROM product WHERE id_order = ?';
        db.get(sql, [id_order], (err, result) => {
            if (err) return res.status(500).send(err.message);
            //encomenda existe
            if (result) return res.status(409).send({ message: 'Encomenda já existe' });
        });

        // criar uma encomenda
        sql = 'INSERT INTO order (id_encomenda, username, id_restaurante, food_name, food_qty, payment_method) VALUES (?,?,?,?,?,?)';
        db.run(sql, [id_encomenda, username, id_restaurante, food_name, food_qty, payment_method], (err) => {
            if (err) return res.status(500).send(err.message);

            return res.status(201).send({
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
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};


a