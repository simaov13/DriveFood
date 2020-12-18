const express = require('express');
const router = express.Router();

const encomendaController = require('../controllers/encomendas-controller');

//todas as encomendas
router.get('/encomenda', encomendaController.getEncomendas);
//uma encomenda
<<<<<<< Updated upstream
router.get('/encomenda/:id_encomenda', encomendaController.getEncomenda);
//adicionar
router.post('/encomenda', encomendaController.adicionarEncomenda);
//alterar
router.put('/encomenda/:id_encomenda', encomendaController.editarEncomenda);
//eliminar
router.delete('/encomenda/:id_encomenda/:type', encomendaController.eliminarEncomenda);
=======
router.get('/encomenda/:id_order', encomendaController.getEncomenda);
//adicionar
router.post('/encomenda/:id_order', encomendaController.adicionarEncomenda);
//alterar
router.put('/encomenda/:id_order', encomendaController.editarEncomenda);
//eliminar
router.delete('/encomenda/:id_order/:type', encomendaController.eliminarEncomenda);
>>>>>>> Stashed changes

module.exports = router;