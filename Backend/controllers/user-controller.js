const db = require('../config/sqlite');

//editar utilizador
exports.editarUtilizador = (req, res) => {
    try {
        //se ele for diferente user dá erro, se nao executa
        if (req.body.type == 'user') {
            //alterar utilizador
            let sql = 'UPDATE user set username = ?, name = ?, password = ?, nif = ?, address = ?, postal_code = ?, city = ?, phone = ?, email =? WHERE  id_utilizador = ?'
            db.get(sql, [username, name, password, nif, address, postal_code, city, phone, email], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(result).send({ message: 'Utilizador editado com sucesso' });
                }
            });
        } else if (req.body.type == 'driver') {
            //alterar Condutor
            let sql = 'UPDATE user set username = ?, name= ?, password = ?, address = ?, postal_code = ?, nif =?, city = ?, phone = ?, email = ?, phone_security =?, vehicle =?, type_license =? WHERE  id_utilizador = ?'
            db.get(sql, [username,name, password, address, postal_code, nif, city, phone, email, phone_security, vehicle, type_license ], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(result).send({ message: 'Condutor editado com sucesso' });
                }
            });
        }else{
            //alterar Empresa
            let sql = 'UPDATE user set username = ?, name =?, password = ?, address = ?, nif =?,postal_code = ?, city = ?, phone = ?, email =?, description =?, logo =? WHERE  id_utilizador = ?'
            db.get(sql, [username, name, password, address, nif, postal_code, city, phone, email, description, logo], (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(result).send({ message: 'Empresa editado com sucesso' });
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
        if (req.body.type != 'user') res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant/admin")' });
        //eliminar user
        let sql = 'DELETE FROM user WHERE id_utilizador = ?';
        db.get(sql, [req.params.id_utilizador], (err, result) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
    return;
};