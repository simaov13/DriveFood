const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');

//admin ve os utilizadores
router.get('/users', adminController.getUsers);
//admin ve o utilizador
router.get('/user/:username', adminController.getUser);
//admin elimina um utilizador.
router.delete('/user/:id_utilizador', adminController.eliminarUtilizador);
//admin ve todos os produtos
router.get('/users/produtos', adminController.getProducts);
//admin ve todas as encomendas
router.get('/user/encomendas', adminController.getEncomendas);
//admin ve todas as entregas
router.get('/user/entregas', adminController.getEntregas);
//admin ve todos os restaurantes
router.get('/user/restaurantes', adminController.getRestaurantes);
//admin ve todos os restaurantes
router.delete('/user/restaurantes/id_restaurante', adminController.eliminarRestaurante);

module.exports = router;
