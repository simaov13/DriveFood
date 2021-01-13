const bcrypt = require('bcrypt');
const db = require('../config/sqlite');

//editar utilizador
exports.editarUtilizador = (req, res) => {
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
        let id_utilizador = req.params.id_utilizador;
        //driver
        let vehicle = req.body.vehicle;
        let type_license = req.body.type_license;
        let phone = req.body.phone;
        let phone_security = req.body.phone_security;
        //merchant
        let description = req.body.description;
        let logo = req.body.logo;
        let approved = 0;
        //hash
        let hash = bcrypt.hashSync(password, 10);
        //se ele for diferente user dá erro, se nao executa
        if (req.body.type == 'user') {
            //alterar utilizador
            let sql = 'UPDATE user set username = ?, name = ?, password = ?, nif = ?, address = ?, postal_code = ?, city = ?, phone = ?, email =? WHERE  id_utilizador = ?'
            db.run(sql, [username, name, hash, nif, address, postal_code, city, phone, email, id_utilizador], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Utilizador editado com sucesso' });
                }
            });
        } else if (req.body.type == 'driver') {
            //alterar Condutor
            let sql = 'UPDATE user set username = ?, name= ?, password = ?, address = ?, postal_code = ?, nif =?, city = ?, phone = ?, email = ? WHERE  id_utilizador = ?'
            db.run(sql, [username, name, hash, address, postal_code, nif, city, phone, email, id_utilizador], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    let sql = 'UPDATE driver set  phone_security =?, vehicle =?, type_license =? WHERE  id_utilizador = ?'
                    db.run(sql, [phone_security, vehicle, type_license, id_utilizador], (err) => {
                        if (err) {
                            res.status(500).send(err.message);
                        } else {
                            console.log(this.changes);
                            res.status(200).send({ message: 'Condutor editado com sucesso' });
                        }
                    });
                }

            });
        } else {
            //alterar Empresa 
            let sql = 'UPDATE user set username = ?, name =?, password = ?, address = ?, nif = ?, postal_code = ?, city = ?, phone = ?, email =? WHERE  id_utilizador = ?'
            db.run(sql, [username, name, hash, address, nif, postal_code, city, phone, email, id_utilizador], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    let sql = 'UPDATE merchant set  description =?, logo =? WHERE  id_utilizador = ?'
                    db.run(sql, [description, logo, id_utilizador], (err) => {
                        if (err) {
                            res.status(500).send(err.message);
                        } else {
                            res.status(200).send({ message: 'Empresa editado com sucesso' });
                        }
                    });
                }
            });
        } if (type == 'admin') {
            //alterar utilizador
            let sql = 'UPDATE user set username = ?, name = ?, password = ?, nif = ?, address = ?, postal_code = ?, city = ?, phone = ?, email =? WHERE  id_utilizador = ?'
            db.run(sql, [username, name, hash, nif, address, postal_code, city, phone, email, id_utilizador], (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Administrador editado com sucesso' });
                }
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};

//eliminar utilizador
exports.eliminarUtilizador = (req, res) => {
    try {
        //se ele for diferente user dá erro, se nao executa
        if (type == 'user') {
            //eliminar user
            let sql = 'DELETE FROM user WHERE id_utilizador = ?';
            db.get(sql, [req.params.id_utilizador], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Utilizador eliminado com sucesso' });
                }
            });
        } else if (type == 'admin') {
            //eliminar user
            let sql = 'DELETE FROM user WHERE id_utilizador = ?';
            db.get(sql, [req.params.id_utilizador], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send({ message: 'Administrador eliminado com sucesso' });
                }
            });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};