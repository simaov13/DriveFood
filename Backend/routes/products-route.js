const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/products-controller');

//todos os produtos
router.get('/produtos', produtosController.getProducts);
//um produto
router.get('/produto/:id_produto', produtosController.getProduct);
//adiocionar
router.post('/produto', produtosController.adicionarProduto);
//alterar
router.put('/produto/:name', produtosController.editarProduto);
//Eliminar
router.delete('/produto/:id_produto', produtosController.eliminarProduto);

module.exports = router;