const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');

//admin ve os utilizadores
router.get('/users', adminController.getUsers);
//admin ve o utilizador
router.get('/admin/:id_utilizador', adminController.getUser);
//admin elimina um utilizador.
router.delete('/admin/:id_utilizador', adminController.eliminarUtilizador);
//admin ve todos os produtos
router.get('/admin/produtos', adminController.getProdutos);
//admin ve todas as encomendas
router.get('/admin/encomendas', adminController.getEncomendas);
//admin ve todas as entregas
router.get('/admin/entregas', adminController.getEntregas);
//admin ve todos os restaurantes
router.get('/admin/restaurantes', adminController.getRestaurantes);
//admin ve todos os restaurantes
router.delete('/admin/restaurantes/id_restaurante', adminController.eliminarRestaurante);

module.exports = router;
