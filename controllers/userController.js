var path = require('path');

const controlador = {
    login:(req, res, next) => {
        res.render('login');
      },
    register:(req,res,next)=> {
        res.render('register');
    }
};

module.exports = controlador;