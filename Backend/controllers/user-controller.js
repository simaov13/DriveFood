const db = require('../config/sqlite');

//editar utilizador
exports.editarUtilizador = (req, res) => {
    try {
        //se ele for diferente user dá erro, se nao executa
        if (req.body.type != 'user') res.status(406).send({ message: 'Tipo de utilizador inválido ("user"/"driver"/"merchant/admin")' });
        //alterar utilizador
        let sql = 'UPDATE user set username = ?, password = ?, adress = ?, postal_code = ?, city = ?, phone = ?, email =? WHERE  id_utilizador = ?'
        db.get(sql, [username, password, adress, postal_code, city, phone, email], (err, result) => {
            if (err) res.status(500).send(err.message);
            res.json(result).send({ message: 'Restaurante editado com sucesso' });

        });
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
        let sql = 'DELETE * FROM user WHERE id_utilizador = ?';
        db.get(sql, [req.params.id_utilizador], (err, result) => {
            if (err)  res.status(500).send(err.message);

             res.json(result);
        });
    } catch (err) {
         res.status(500).send({ message: err.message });
    }
    return;
};