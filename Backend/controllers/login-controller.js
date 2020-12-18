const bcrypt = require('bcrypt');
const db = require("../config/sqlite");

//Login
exports.login = (req, res) => {
    try {
        //req.body
        let username = req.body.username;
        let password = req.body.password;

        //Token
        var token = jwt.sign({
            email: email,
            type: type
        }, config.secret, {
            algorithm: 'HS256',
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });

        var VerificarCampos = false;

        //verificar se os campos estao vazios
        if (email === '' || password === '') {
            VerificarCampos = true;
        }

        //Verifique se a senha combina com a do banco de dados
        let sql = 'SELECT password FROM user WHERE username = ?';
        //se os campos estiverem prenchifod
        if (!VerificarCampos) {
            db.get(sql, [username], (err, result) => {
                if (err) return res.status(500).send(err.message);
                if (bcrypt.compareSync(password, result.password)) {
                    return res.status(200).send({
                        message: 'Autenticado com sucesso',
                        //retorna o array com o username e o type
                        user: {
                            username: result.username,
                            type: result.type,
                        },
                    });
                } else {
                    //Falha na autenticação
                    return res.status(401).send({ message: 'Falha na autenticação' });
                }
            });
        }//fecha o verificar
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
