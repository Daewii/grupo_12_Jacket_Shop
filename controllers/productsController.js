var path = require('path');
const controlador = {
    indexProducts:(req, res, next) => {
        res.render('products');
      },
    productDetail:(req,res,next)=> {
        res.render('productDetail');
    }
};

module.exports = controlador;