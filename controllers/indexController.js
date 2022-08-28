var path = require('path');
const controlador = {
    index:(req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../views/index.html'));
      }
};

module.exports = controlador;