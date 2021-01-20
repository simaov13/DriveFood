const express = require('express');
const router = express.Router();

const entregasController = require('../controllers/entregas-controller');

//todas as entregas
router.get('/entregas', entregasController.getEntregas);
//uma entrega
router.get('/entrega/:id_entrega', entregasController.getEntrega);

module.exports = router;