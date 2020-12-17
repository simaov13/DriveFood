const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

//router.get('/users', userController.register);
//editar utilizador
//eliminar utilizador
router.delete('/user/:id_utilizador', usernController.eliminarUtilizador);
module.exports = router;