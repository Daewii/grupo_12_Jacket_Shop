const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

/* GET home page. */
router.get('/login', userController.login);
router.post('/logged', userController.processLogin)
//router.post('/login', userController);
router.get('/register', userController.register);
router.get('/list',userController.list);
router.get('/add', userController.add);
router.post('/create',userController.create);
router.get('/edit/:id', userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;