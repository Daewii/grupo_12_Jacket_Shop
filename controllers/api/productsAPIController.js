const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { promiseImpl } = require('ejs');

const productsAPIController = {
    'list': async (req, res) => {
        const promProducts = await db.Product.findAll({
            include: {
                all: true
            }
        })

        const productsDetail = await promProducts.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.descripcion,
                image: product.productImages[0].productImage,
                category: product.category.category,
                detail: `http://localhost:3000/products/detail/${product.id}`
            }
        })
        const countCategory = ((categoria) => {
            let count = 0;

            promProducts.forEach(product => {
                if (product.category.category === categoria) {
                    count++;
                }
            })

            return count;
        })
        const promCountByCategory = {
            chaquetas: countCategory("Chaqueta"),
            buso: countCategory("Buso")
        }
        Promise.all([promProducts, productsDetail, promCountByCategory])
            .then(([products, productDetail, countByCategory]) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        countByCategory,
                        url: 'api/movies'
                    },
                    data: productDetail
                }

                res.json(respuesta);
            })
    },

}

module.exports = productsAPIController;