const db = require('../config/sqlite');

//procurar todas as entregas
exports.getEntregas = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM deliverie';

        db.all(sql, [], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

//procurar uma entrega por id
exports.getEntrega = (req, res) => {
    try {
        //base dados
        let sql = 'SELECT * FROM deliverie WHERE id_deliverie = ?';

        db.get(sql, [req.params.id_deliverie], (err, result) => {
            if (err) return res.status(500).send(err.message);

            return res.json(result);
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};




//Adicionar uma Entrega
exports.adicionarEntrega = (req, res) => {
    try {
        // req.body
        let id_entrega = req.body.id_entrega;
        let username = req.body.username;
        let id_restaurante;


        // Verificar se entrega ja existe
        //base dados
        let sql = 'SELECT id_entrega FROM deliverie WHERE id_entrega = ?';
        db.get(sql, [id_entrega], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result) return res.status(409).send({ message: 'Entrega já existe' });
        });

        // Verificar se username existe
        //base dados
        sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (!result) return res.status(409).send({ message: 'Utilizador já registado' });
        });

        //verificação do id restaurante 
        //base dados
        sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);
            //o id restaurante é igual ao resultado do id restaurante do utilizador 
            if (result) return id_restaurante = result.id_restaurante;
        });


        // Inserir entrega na base dados
        sql = 'INSERT INTO deliverie (id_produto) VALUES (?,?)';
        db.run(sql, [id_produto], (err) => {
            if (err) return res.status(500).send(err.message);
            return res.status(201).send({
                //produto criado com sucesso
                message: 'Entrega criada com sucesso!',
                user: {
                    id_produto: id_produto,
                    username: username
                }
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};