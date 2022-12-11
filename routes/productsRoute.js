const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController.js');
const validationProductCreate = require('../middlewares/validationProductCreateMiddleware')

var multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: multerStorage });

/* GET home page. */
router.get('/', productsController.productList);
router.get('/detail/:id', productsController.productDetail);
router.get('/cart', productsController.productCart);
router.get('/add', productsController.productAdd);
router.post('/create', upload.single('image'), validationProductCreate, productsController.productCreate);
router.get('/edit/:id', productsController.productEdit);
router.put('/:id', upload.single('image'), productsController.productUpdate);
router.delete('/:id', productsController.productDestroy);
router.get('/list', productsController.productList);

module.exports = router;