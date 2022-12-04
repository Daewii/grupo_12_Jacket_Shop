const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsAPIController = {
    'list': (req, res) => {
        db.Product.findAll({
            include: ['material', 'color', 'size', 'category']
        })
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    count: products.length,
                    countByCategory: {
                        
                    },
                    url: 'api/movies'
                },
                data: products
            }

                res.json(respuesta);
            })
    },

}

module.exports = productsAPIController;