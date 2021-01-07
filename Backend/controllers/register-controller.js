const bcrypt = require('bcrypt');
const db = require('../config/sqlite');


//Registar
exports.register = (req, res) => {
    try {
        // req.body
        //user
        let username = req.body.username;
        let password = req.body.password;
        let name = req.body.name;
        let nif = req.body.nif;
        let address = req.body.address;
        let postal_code = req.body.postal_code;
        let city = req.body.city;
        let type = req.body.type;
        let email = req.body.email;
        //driver
        let vehicle = req.body.vehicle;
        let type_license = req.body.type_license;
        let phone = req.body.phone;
        let phone_security = req.body.phone_security;
        //merchant
        let description = req.body.description;
        let logo = req.body.logo;
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
        //Diferente de algum utilizador
        if (type != 'user' && type != 'driver' && type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")' });
        //Se tipo for driver
        if (type === 'driver') {
            //Veiculo Proprio
            if (vehicle != 'sim' && vehicle != 'não') {
                return res.status(406).send({ message: 'Veiculo Próprio inválido ("sim" /"não")' });
            }
            //Tipo de carta
            if (type_license != 'am' && type_license != 'a1' && type_license != 'a2' && type_license != 'b') {
                return res.status(406).send({ message: 'Tipo de veiculo inválido ("am" /"a1" /"a2" /"b" )' })
            }
        }
        //hash
        let hash = bcrypt.hashSync(password, 10);




        //utilizador tipo driver
        if (vehicle != null && type_license != null && phone != null && phone_security != null) {
            // Inserir um utilizador Driver
            sql = 'INSERT INTO user (username, email, password, city, phone, phone_security, vehicle, type_license, type) VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, email, hash, city, phone, phone_security, vehicle, type_license, type], (err) => {
                if (err) return res.status(500).send(err.message);
                return res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        password: hash,
                        email: email,
                        city: city,
                        phone: phone,
                        phone_security: phone_security,
                        vehicle: vehicle,
                        type_license: type_license,
                        type: type
                    },
                });

            });
        } else if (description != null && logo != null && phone != null) {
            // Inserir um utilizador Merchant
            sql = 'INSERT INTO user (username, email, password, address, city, phone, description, logo, type) VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, email, hash, address, city, phone, description, logo, type], (err) => {
                if (err) return res.status(500).send(err.message);
                return res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        email: email,
                        password: hash,
                        address: address,
                        city: city,
                        phone: phone,
                        description: description,
                        logo: logo,
                        type: type
                    },
                });

            });
        } else {
            // Inserir um utilizador User
            sql = 'INSERT INTO user (username, password, nif, address, postal_code , email, city, phone, type) VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, hash, nif, address, postal_code, email, city, phone, type], (err) => {
                if (err) return res.status(500).send(err.message);
                return res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        password: hash,
                        nif: nif,
                        address: address,
                        postal_code: postal_code,
                        email: email,
                        city: city,
                        phone: phone,
                        type: type
                    },
                });

            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
};