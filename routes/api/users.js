const express = require('express');
const usersAPIController = require('../../controllers/api/usersAPIController.js');
const router = express.Router();
router.get('/',usersAPIController.list)
module.exports = router