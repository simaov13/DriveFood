const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

//router.get('/users', userController.register);
//editar utilizador
router.put('user/:id_utilizador', userController.editarUtilizador);
//eliminar utilizador
router.delete('/user/:id_utilizador', userController.eliminarUtilizador);
module.exports = router;