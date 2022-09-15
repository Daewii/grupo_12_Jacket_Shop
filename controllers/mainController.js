var path = require('path');
const controlador = {
    index:(req, res, next) => {
        res.render('index');
      }
};

module.exports = controlador;
