const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/products-controller');

//todos os produtos
<<<<<<< Updated upstream
router.get('/produtos', produtosController.getProducts);
//um produto
router.get('/produto/:id_produto', produtosController.getProduct);
//adiocionar
router.post('/produto', produtosController.adicionarProduto);
//alterar
router.put('/produto/:name', produtosController.editarProduto);
//Eliminar
router.delete('/produto/:id_produto', produtosController.eliminarProduto);
=======
router.get('/products', produtosController.getProducts);
//um produto
router.get('/products/:id', produtosController.getProduct);
//adiocionar
router.post('/products', produtosController.adicionarProduto);
//alterar
router.put('/products/:name', produtosController.editarProduto);
//Eliminar
router.delete('/products/:id', produtosController.eliminarProduto);
>>>>>>> Stashed changes

module.exports = router;