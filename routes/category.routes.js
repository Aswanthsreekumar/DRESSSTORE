const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Map each API to the Controller functions
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);

// other routes for updating, deleting, fetching one category, etc.

module.exports = router;
