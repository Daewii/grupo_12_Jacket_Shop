const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

/* GET home page. */
router.get('/', productsController.indexProducts);
router.get('/detail', productsController.productDetail);


module.exports = router;