const express = require('express');
const router = express.Router();

const productsControllers = require('../controllers/ProductsControllers');

router.get('/', productsControllers.index);
router.get('/:id', productsControllers.getProductById)
router.get('/category/:category', productsControllers.getProductByCategory)
router.delete('/:id', productsControllers.deleteProductById)
router.post('/add', productsControllers.addProduct)
router.put('/editById',productsControllers.editById)
module.exports = router;