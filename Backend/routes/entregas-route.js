const express = require('express');
const router = express.Router();

const entregasController = require('../controllers/entregas-controller');

//todas as entregas
router.get('/entregas', entregasController.getEntregas);
//uma entrega
router.get('/entrega/:id_entrega', entregasController.getEntrega);
//adicionar uma entrega
router.post('/entrega', entregasController.adicionarEntrega);
//eliminar uma entrega
router.delete('/entrega/:id_Entrega', entregasController.eliminarEntrega);

module.exports = router;