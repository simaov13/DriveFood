const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/products-controller');

//todos os produtos
router.get('/products', produtosController.getProducts);
//um produto
router.get('/products/:id', produtosController.getProduct);
//adiocionar
router.post('/products', produtosController.adicionarProduto);
//alterar
router.put('/products/:name', produtosController.editarProduto);
//Eliminar
router.delete('/products/:id', produtosController.eliminarProduto);

module.exports = router;