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

            // Verificações
            //Username maior que 5 caracteres
            if (username.length < 5) {
                res.status(411).send({
                    message: 'O nome de utilizador tem de ter 5 ou mais caracteres'
                });
                throw "O nome de utilizador tem de ter 5 ou mais caracteres";
            }
            //Palavra passe maior que 8 caracteres
            if (password.length < 8) {
                res.status(411).send({
                    message: 'A palavra-passe tem de ter 8 ou mais caracteres'
                });
                throw 'A palavra-passe tem de ter 8 ou mais caracteres';
            }
            if (type == 'user' || type == 'merchant') {
                //Não pode ser for diferente de 9
                if (!Number.isInteger(nif) && nif.length != 9) {
                    res.status(406).send({
                        message: 'NIF inválido'
                    });
                    throw "Nif inválido";
                }
            }
            //Não pode ser for diferente de 9
            if (!Number.isInteger(phone) && phone.length != 9) {
                res.status(406).send({
                    message: 'Telemovel inválido'
                });
                throw "Telemovel inválido";
            }
            //Diferente de algum utilizador
            if (type != 'user' && type != 'driver' && type != 'merchant') {
                res.status(406).send({
                    message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin")'
                });
                throw 'Tipo de utilizador inválido';
            }
            //Se tipo for driver
            if (type == 'driver') {
                //Veiculo Proprio
                if (vehicle != 'sim' && vehicle != 'não') {
                    res.status(406).send({
                        message: 'Veiculo Próprio inválido ("sim" /"não")'
                    });
                    throw "Veiculo Próprio inválido";
                }
                //Tipo de carta
                if (type_license != 'am' && type_license != 'a1' && type_license != 'a2' && type_license != 'b') {
                    res.status(406).send({
                        message: 'Tipo de veiculo inválido ("am" /"a1" /"a2" /"b" )'
                    });
                    throw "Tipo de veiculo inválido";
                }
                //Seguro de vida
            }
            //hash
            let hash = bcrypt.hashSync(password, 10);




            //utilizador tipo driver
            if (vehicle != null && type_license != null && phone_security != null) {
                // Inserir um utilizador Driver
                console.log(type);
                sql = 'INSERT INTO user (username, name, email, password, city, phone, nif, address, postal_code, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
                db.run(sql, [username, name, email, hash, city, phone, nif, address, postal_code, type], (err) => {
                        if (err) {
                            res.status(500).send(err.message)
                        } else {
                            sql1 = 'INSERT INTO driver (phone_security, vehicle, type_license) VALUES (?,?,?)';
                            db.run(sql, [phone_security, vehicle, type_license], (err) => {
                                    if (err) {
                                        res.status(500).send(err.message)
                                    } else {
                                        res.status(201).send({
                                            // Utilizador registado
                                            message: 'Utilizador registado com sucesso',
                                            user: {
                                                username: username,
                                                name: name,
                                                password: hash,
                                                email: email,
                                                city: city,
                                                nif: nif,
                                                address: address,
                                                phone: phone,
                                                postal_code: postal_code,
                                                phone_security: phone_security,
                                                vehicle: vehicle,
                                                type_license: type_license,
                                                type: type
                                            },
                                        });
                                    }
                                });
                            }
                        });
                }
                else if (description != null || logo != null) {
                    // Inserir um utilizador Merchant
                    sql = 'INSERT INTO user (username, name, email, password, address, nif, city, postal_code, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    db.run(sql, [username, name, email, hash, address, nif, city, postal_code, phone, type], (err) => {
                        if (err) {
                            res.status(500).send(err.message);
                        } else {
                            sql = 'INSERT INTO merchant (description, logo) VALUES (?,?)';
                            res.status(201).send({
                                // Utilizador registado
                                message: 'Utilizador registado com sucesso',
                                user: {
                                    username: username,
                                    name: name,
                                    email: email,
                                    password: hash,
                                    address: address,
                                    postal_code: postal_code,
                                    city: city,
                                    nif: nif,
                                    phone: phone,
                                    description: description,
                                    logo: logo,
                                    type: type
                                },
                            });
                        }
                    });
                } else {
                    // Inserir um utilizador User
                    sql = 'INSERT INTO user (username, name, password, nif, address, postal_code , email, city, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    db.run(sql, [username, name, hash, nif, address, postal_code, email, city, phone, type], (err) => {
                        if (err) {
                            res.status(500).send(err.message)
                        } else {
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
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
            return;
        };