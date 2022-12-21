const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const guestMiddleware = require ('../middlewares/guestMiddleware')

/* GET home page. */
router.get('/',guestMiddleware, mainController.index);

module.exports = router;