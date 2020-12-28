const express = require('express');
const router = express.Router();

const entregasController = require('../controllers/entregas-controller');

//todas as entregas
router.get('/entrega', entregasController.getEntregas);
//uma entrega
router.get('/entrega/:id_deliverie', entregasController.getEntrega);

module.exports = router;