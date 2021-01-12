const bcrypt = require('bcrypt');

const db = require('../config/sqlite');

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
        let username = req.body.username;
        let name = req.body.name;
        let desc = req.body.desc;
        let image = req.body.image;
        //preco produto
        let preco = req.body.preco;
        //define a variavel
        let id_restaurante;


        // Verificar se produto ja existe
        //base dados
        let sql = 'SELECT name FROM product WHERE name = ?';
        db.get(sql, [name], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (result) res.status(409).send({ message: 'Produto já existe' });
        });

        // Verificar se username existe
        //base dados
        sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (!result) res.status(409).send({ message: 'Utilizador já registado' });
        });

        //verificação do id restaurante 
        //base dados
        sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) res.status(500).send(err.message);
            //o id restaurante é igual ao resultado do id restaurante do utilizador 
            if (result) id_restaurante = result.id_restaurante;
        });


        // Inserir produto na base dados
        sql = 'INSERT INTO product (id_produto, username, name, desc, image, preco, id_restaurante) VALUES (?,?,?,?,?,?,?)';
        db.run(sql, [id_produto, username, name, desc, image, preco, id_restaurante], (err) => {
            if (err) res.status(500).send(err.message);

            res.status(201).send({
                //produto criado com sucesso
                message: 'Produto criado com sucesso!',
                user: {
                    id_produto: id_produto,
                    username: username,
                    name: name,
                    desc: desc,
                    image: image,
                    preco: preco,
                    id_restaurante: id_restaurante
                },
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//alterar produto
exports.editarProduto = (req, res) => {
    try {
        //base dados
        let sql = 'UPDATE product set username = ?, name = ?, desc = ?, image = ?, preco = ?, id_restaurante = ? WHERE  id_produto = ?'
        db.get(sql, [req.params.id], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result).send({ message: 'Produto editado com sucesso' });
            }

        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};


//eliminar produto 
//procura o id 
exports.eliminarProduto = (req, res) => {
    try {

        //verificar se existe
        let sql = 'SELECT id_produto FROM product WHERE id_produto = ?';
        db.get(sql, [id_restaurante], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                if (!result) {
                    res.status(409).send({ message: 'Produto não existe / não encontrado' });
                }
            }

        });

        //base dados
        let sql1 = 'DELETE FROM product WHERE id_produto = ?';
        db.get(sql1, [req.params.id_produto], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result).send({ message: 'Produto eliminado com sucesso' });
            }

        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};