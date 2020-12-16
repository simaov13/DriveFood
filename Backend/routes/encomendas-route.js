const express = require('express');
const router = express.Router();

const encomendaController = require('../controllers/encomendas-controller');

//todas as encomendas
router.get('/encomenda', encomendaController.getEncomendas);
//uma encomenda
router.get('/encomenda/:id_order', encomendaController.getEncomenda);
//adicionar
router.post('/encomenda/:id_order', encomendaController.adicionarEncomenda);
//alterar
router.put('/encomenda/:id_order', encomendaController.editarEncomenda);
//eliminar
router.delete('/encomenda/:id_order/:type', encomendaController.eliminarEncomenda);

module.exports = router;