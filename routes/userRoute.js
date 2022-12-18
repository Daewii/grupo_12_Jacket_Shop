const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController.js');
const validationUserCreateMiddleware = require('../middlewares/validationUserCreateMiddleware')
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware')

var multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: multerStorage })

/* GET home page. */
router.get('/login', userController.login);
router.post('/logged', userController.processLogin)
router.post('/login', userController.processLogin);
router.get('/register', validationUserCreateMiddleware, userController.register);
router.get('/list',userController.list);
router.get('/add', userController.add);
router.post('/create', validationUserCreateMiddleware, userController.create);
router.get('/edit/:id', userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;