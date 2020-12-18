const bcrypt = require('bcrypt');
const db = require('../config/sqlite');


//Registar
exports.register = (req, res) => {
    try {
        // req.body
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let nif = req.body.nif;
        let address = req.body.address;
        let postal_code = req.body.postal_code;
        let city = req.body.city;
        let type = req.body.type;

        let approved = 0;

        // verificar se o username já existe
        let sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result) return res.status(409).send({ message: 'Utilizador já registado' });
        });

         // verificar se email ja existe
         let sql1 = 'SELECT email FROM user WHERE username = ?';
         db.get(sql, [username], (err, result) => {
             if (err) return res.status(500).send(err.message);
             if (result) return res.status(409).send({ message: 'Email já registado' });
         });

        // Verificações
        //Username maior que 5 caracteres
        if (username.length < 5) return res.status(411).send({ message: 'O nome de utilizador tem de ter 5 ou mais caracteres' });
        //Palavra passe maior que 8 caracteres
        if (password.length < 8) return res.status(411).send({ message: 'A palavra-passe tem de ter 8 ou mais caracteres' });
        //Não pode ser for diferente de 9
        if (!Number.isInteger(nif) && nif.length != 9) return res.status(406).send({ message: 'NIF inválido' });
        if (type != 'user' && type != 'driver' && type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });

        let hash = bcrypt.hashSync(password, 10);

        // Inserir um utilizador
        sql = 'INSERT INTO user (username, password, name, nif, address, postal_code , city, type) VALUES (?,?,?,?,?,?,?,?)';
        db.run(sql, [username, hash, name, nif, address, postal_code, city, type], (err) => {
            if (err) return res.status(500).send(err.message);

            return res.status(201).send({
                // Utilizador registado
                message: 'Utilizador registado com sucesso',
                user: {
                    username: username,
                    name: name,
                    nif: nif,
                    address: address,
                    postal_code : postal_code,
                    city: city,
                    type: type
                },
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};