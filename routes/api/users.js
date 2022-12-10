const express = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController.js');
const router = express.Router();

router.get('/',usersAPIController.list);
router.get('/detail/:id', usersAPIController.detail);
router.get('/image/:id/', usersAPIController.imageDetail);

module.exports = router