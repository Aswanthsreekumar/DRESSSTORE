const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Route to get all products
router.get('/api/products', productController.getProducts);

// Route to get a product by ID
router.get('/api/products/:id', productController.getProductById);

// Route to add a new product
router.post('/api/products', productController.createProduct);

// Route to update a product by ID
router.put('/api/products/:id', productController.updateProduct);

// Route to remove a product by ID
router.delete('/api/products/:id', productController.deleteProduct);
// Export the Router

module.exports = router;
