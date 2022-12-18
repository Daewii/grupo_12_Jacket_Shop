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
                image: product.image,
                category: product.category.category,
                detail: `http://localhost:3000/api/products/detail/${product.id}`
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
                        url: 'api/products/'
                    },
                    data: productDetail
                }

                res.json(respuesta);
            })
    },
    'detail': async (req, res) => {
        let id = req.params.id
        const product = await db.Product
            .findByPk(id, {
                include: {
                    all: true,
                },
                where: {
                    id: req.params.id
                }
            })
            .then((productDetail) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `api/products/detail/${productDetail.id}`
                    },
                    data: {
                        "id": productDetail.id,
                        "name": productDetail.name,
                        "description": productDetail.description,
                        "image": productDetail,
                        "category": productDetail.category.category,
                        "price": productDetail.price,
                        "color": productDetail.color.Color,
                        "url_image": `http://localhost:3000/api/products/image/${productDetail.id}`,
                    }
                }

                res.json(respuesta);
            })
    },
    'imageDetail': (req, res) => {
        let id = req.params.id
        db.Product.findByPk(id)
            .then((product) => {
                res.render("imageView", { product })
            })
    }
}

module.exports = productsAPIController;