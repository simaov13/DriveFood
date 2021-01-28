const express = require('express');
const router = express.Router();
const cors = require('cors')

const encomendaController = require('../controllers/encomendas-controller');

router.use(cors())
//todas as encomendas
router.get('/encomendas', encomendaController.getEncomendas);
//uma encomenda
router.get('/encomenda/:id_encomenda', encomendaController.getEncomenda);
//adicionar
router.post('/encomenda', encomendaController.adicionarEncomenda);
//alterar
router.put('/encomenda/:id_encomenda', encomendaController.editarEncomenda);
//eliminar
router.delete('/encomenda/:id_encomenda', encomendaController.eliminarEncomenda);


module.exports = router;