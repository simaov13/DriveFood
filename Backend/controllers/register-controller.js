const bcrypt = require('bcrypt');
const db = require('../config/sqlite');
//inicio do ficheiro
const jwt = require("jsonwebtoken");

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
        if (type != 'user' && type != 'driver' && type != 'merchant' && type != 'admin' && type != 'superadmin') {
            res.status(406).send({
                message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant"/"admin/superadmin")'
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
            sql = 'INSERT INTO user (username, name, email, password, city, phone, nif, address, postal_code, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, name, email, hash, city, phone, nif, address, postal_code, type], function (err) {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    //buscar o ultimo id da tabela user (ultima linha inserida)
                    var id_utilizador = this.lastID;
                    //inserir na tabela driver
                    sql1 = 'INSERT INTO driver (phone_security, vehicle, type_license, id_utilizador) VALUES (?,?,?,?)';
                    db.run(sql1, [phone_security, vehicle, type_license, id_utilizador], function (err) {
                        //se erro
                        if (err) {
                            res.status(500).send(err.message)
                            //se nao cria
                        } else {
                            res.status(201).send({
                                // Utilizador registado
                                message: 'Entregador registado com sucesso',
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
        else if (type == 'merchant') {
            // Inserir um utilizador Merchant
            sql = 'INSERT INTO user (username, name, email, password, address, nif, city, postal_code, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
            db.run(sql, [username, name, email, hash, address, nif, city, postal_code, phone, type], function (err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    //buscar o ultimo id da tabela user (ultima linha inserida)
                    var id_utilizador = this.lastID;
                    //inserir dados na tabela merchant
                    sql = 'INSERT INTO merchant (description, logo, id_utilizador) VALUES (?,?,?)';
                    db.run(sql, [description, logo, id_utilizador], function (err) {
                        //se erro
                        if (err) {
                            res.status(500).send(err.message)
                            //se nao cria
                        } else {
                            res.status(201).send({
                                // Utilizador registado
                                message: 'Empresa registada com sucesso',
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
                }
            });
        } else {
            //verificar se existe token
            const tokenUnsplited = req.headers.authorization;
            if (tokenUnsplited) {
                //token
                const token = req.headers.authorization.split(' ')[1];
                var decoded = jwt.verify(token, 'Token');
                //se ele for diferente merchant dá erro, se nao executa
                var id_utilizador = req.params.id_utilizador;
                //verificar o tipo de utilizador
                if (decoded.type != "superadmin") {
                    let response = {
                        message: "failed",
                        request: {
                            type: 'GET',
                            description: 'Obter Informação da Empresa'
                        }
                    }
                    //error
                    res.status(400).send(response);
                } else {
                    //inserir administrador
                    sql = 'INSERT INTO user (username, name, password, nif, address, postal_code , email, city, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    db.run(sql, [username, name, hash, nif, address, postal_code, email, city, phone, type], function (err) {
                        //se erro
                        if (err) {
                            res.status(500).send(err.message)
                        } else {
                            //se nao cria
                            res.status(201).send({
                                // Utilizador registado
                                message: 'Administrador registado com sucesso',
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
                };
            } else {
                //buscar o ultimo id da tabela user (ultima linha inserida)
                var id_utilizador = this.lastID;
                // Inserir um utilizador User
                sql = 'INSERT INTO user (username, name, password, nif, address, postal_code , email, city, phone, type) VALUES (?,?,?,?,?,?,?,?,?,?)';
                db.run(sql, [username, name, hash, nif, address, postal_code, email, city, phone, type], function (err) {
                    //se erro
                    if (err) {
                        res.status(500).send(err.message);
                        throw err;
                    } else {
                        //se nao cria
                        res.status(201).send({
                            // Utilizador registado
                            message: 'Cliente registado com sucesso',
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
            };
        }
    } catch (err) {
        console.log(err);
    }
    return;
};

