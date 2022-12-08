const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/', productsAPIController.list);
router.get('/detail/:id', productsAPIController.detail);
router.get('/image/:id/', productsAPIController.imageDetail);

module.exports = router;