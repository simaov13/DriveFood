const bcrypt = require('bcrypt');

const db = require('../config/sqlite');

exports.register = (req, res) => {
    try {
        // req.body
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let nif = req.body.nif;
        let address = req.body.address;
        let zip = req.body.zip;
        let city = req.body.city;
        let type = req.body.type;

        let approved = 0;

        // Check if user already exists in database
        let sql = 'SELECT username FROM users WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) return res.status(500).send(err.message);

            if (result) return res.status(409).send({ message: 'Utilizador já registado' });
        });

        // Verifications
        if (username.length < 5) return res.status(411).send({ message: 'O nome de utilizador tem de ter 5 ou mais caracteres' });
        if (password.length < 8) return res.status(411).send({ message: 'A palavra-passe tem de ter 8 ou mais caracteres' });
        if (!Number.isInteger(nif) && nif.length != 9) return res.status(406).send({ message: 'NIF inválido' });
        if (type != 'user' && type != 'driver' && type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant")' });

        if (type === 'user') approved = 1;

        let hash = bcrypt.hashSync(password, 10);

        // Insert user in database
        sql = 'INSERT INTO users (username, password, name, nif, address, zip, city, type, approved) VALUES (?,?,?,?,?,?,?,?,?)';
        db.run(sql, [username, hash, name, nif, address, zip, city, type, approved], (err) => {
            if (err) return res.status(500).send(err.message);

            return res.status(201).send({
                message: 'Utilizador registado com sucesso',
                user: {
                    username: username,
                    name: name,
                    nif: nif,
                    address: address,
                    zip: zip,
                    city: city,
                    type: type,
                    approved: approved,
                },
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};