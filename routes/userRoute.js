const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const multer = require('multer');
const path = require('path');

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
//router.post('/login', userController);
router.get('/register', userController.register);
router.get('/list',userController.list);
router.get('/add', userController.add);
router.post('/create',upload.single('image'),userController.create);
router.get('/edit/:id', userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;