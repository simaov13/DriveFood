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
        let security = req.body.security;
        //merchant
        let description = req.body.description;
        let logo = req.body.logo;
        let approved = 0;



        // verificar se o username já existe
        let sql = 'SELECT username FROM user WHERE username = ?';
        db.get(sql, [username], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (result) res.status(409).send({ message: 'Utilizador já registado' });
        });

        // verificar se email ja existe
        let sql1 = 'SELECT email FROM user WHERE email = ?';
        db.get(sql1, [email], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (result) res.status(409).send({ message: 'Email já registado' });
        });

        //verificar se telemovel ja existe 
        let sql2 = 'SELECT phone FROM user WHERE phone = ?';
        db.get(sql2, [phone], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (result) res.status(409).send({ message: 'Telemóvel já registado' });
        });

        //verificar se nif ja existe 
        let sql3 = 'SELECT nif FROM user WHERE nif = ?';
        db.get(sql3, [nif], (err, result) => {
            if (err) res.status(500).send(err.message);
            if (result) res.status(409).send({ message: 'Nif já registado' });
        });

        // Verificações
        //Username maior que 5 caracteres
        if (username.length < 5) return res.status(411).send({ message: 'O nome de utilizador tem de ter 5 ou mais caracteres' });
        //Palavra passe maior que 8 caracteres
        if (password.length < 8) return res.status(411).send({ message: 'A palavra-passe tem de ter 8 ou mais caracteres' });
        //Não pode ser for diferente de 9
        if (!Number.isInteger(nif) && nif.length != 9) return res.status(406).send({ message: 'NIF inválido' });
        //Não pode ser for diferente de 9
        if (!Number.isInteger(phone) && nif.length != 9) return res.status(406).send({ message: 'Telemovel inválido' });
        
        //Diferente de algum utilizador
        if (type != 'user' && type != 'driver' && type != 'merchant') return res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")' });
        //Se tipo for driver
        if (type === 'driver') {
            //Veiculo Proprio
            if (vehicle != 'sim' && vehicle != 'não') {
                res.status(406).send({ message: 'Veiculo Próprio inválido ("sim" /"não")' });

            }
            //Tipo de carta
            if (type_license != 'am' && type_license != 'a1' && type_license != 'a2' && type_license != 'b') {
                res.status(406).send({ message: 'Tipo de veiculo inválido ("am" /"a1" /"a2" /"b" )' })
            }
            //Seguro de vida
            if (security != 'sim' && security != 'não') {
                res.status(406).send({ message: 'Seguro de vida inválido ("sim" /"não")' });
            }

        }
        //hash
        let hash = bcrypt.hashSync(password, 10);




        //utilizador tipo driver
        if (vehicle != null && type_license != null && phone != null && phone_security != null) {
            // Inserir um utilizador Driver
            sql = 'INSERT INTO user (username,name, email, password, city, phone, phone_security, vehicle, type_license, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, name, email, hash, city, phone, phone_security, vehicle, type_license, type], (err) => {
                if (err) res.status(500).send(err.message);
                res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        name: name,
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
            sql = 'INSERT INTO user (username, name, email, password, address, city, phone, description, logo, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, name, email, hash, address, city, phone, description, logo, type], (err) => {
                if (err) res.status(500).send(err.message);
                res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        name: name,
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
            sql = 'INSERT INTO user (username, name, password, nif, address, postal_code , email, city, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, name, hash, nif, address, postal_code, email, city, phone, type], (err) => {
                if (err) res.status(500).send(err.message);
                res.status(201).send({
                    // Utilizador registado
                    message: 'Utilizador registado com sucesso',
                    user: {
                        username: username,
                        name: name,
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
        res.status(500).send({ message: err.message });
    }
    return;
};