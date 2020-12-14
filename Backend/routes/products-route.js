const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products-controller');

//Return all products
router.get('/products', productsController.getProducts);
//Return product
router.get('/products/:id', productsController.getProduct);
//Create product
router.post('/products', productsController.addProducts);
//Delete product
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;