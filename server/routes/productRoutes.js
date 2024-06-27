const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProducts,
  addReview,
  deleteProduct,
} = require('../controllers/productController');

// Routes
router.post('/products', addProduct);
router.get('/products', getProducts);
router.post('/products/:id/review', addReview);
router.delete('/products/:id', deleteProduct);

module.exports = router;
