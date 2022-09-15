const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

/* GET home page. */
router.get('/login', userController.login);
router.get('/register', userController.register);


module.exports = router;