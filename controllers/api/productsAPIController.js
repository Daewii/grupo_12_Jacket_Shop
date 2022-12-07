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
                description: product.description,
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
                        url: 'api/products'
                    },
                    data: productDetail
                }

                res.json(respuesta);
            })
    },
    'detail': async (req, res) => {
        const product = await db.Product
            .findByPk(req.params.id, {
                include: {
                    all: true,
                },
                where: {
                    id: req.params.id
                }
            })
            .then((promProductDetail) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `api/products/${promProductDetail.id}`
                    },
                    data: {
                        "id": promProductDetail.id,
                        "name": promProductDetail.name,
                        "description": promProductDetail.description,
                        "images": {
                            "image1": promProductDetail.productImages[0].productImage,
                        },
                        "category": promProductDetail.category.category,
                        "price": promProductDetail.price,
                        "color": promProductDetail.color.Color,
                        "url_image": `http://localhost:3000/products/detail/${promProductDetail.id}`,
                    }
                }

                res.json(respuesta);
            })
    }
}

module.exports = productsAPIController;