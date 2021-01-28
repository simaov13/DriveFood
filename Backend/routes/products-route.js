const express = require('express');
const router = express.Router();
const cors = require('cors')

const produtosController = require('../controllers/products-controller');

router.use(cors())
//todos os produtos
router.get('/produtos', produtosController.getProducts);
//um produto
router.get('/produto/:id_produto', produtosController.getProduct);
//um produto atraves do restaurante
router.get('/produtos/:id_restaurante', produtosController.getProductsRestaurante);
//adiocionar
router.post('/produto', produtosController.adicionarProduto);
//alterar
router.put('/produto/:id_produto', produtosController.editarProduto);
//Eliminar
router.delete('/produto/:id_produto', produtosController.eliminarProduto);

module.exports = router;