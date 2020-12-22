const express = require('express');
const router = express.Router();

const restauranteController = require('../controllers/restaurant-controller');

//todos os restaurantes
router.get('/restaurantes', restauranteController.getRestaurantes);
//um restaurante
router.get('/restaurante/:id_restaurante', restauranteController.getRestaurante);
//adicionar
router.post('/restaurante', restauranteController.adicionarRestaurante);
//alterar
router.put('/restaurante/:id_restaurante',restauranteController.editarRestaurante);
//eliminar
router.delete('/restaurante/:id_restaurante/:type', restauranteController.eliminarRestaurante);

module.exports = router;