const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");

const controlador = {
    productList: (req, res, next) => {
        db.Product.findAll({ include: { all: true } })
            .then((products) => {
                res.render('productList', { products })
            })
            .catch(error => res.send(error))
    },
    productDetail: (req, res, next) => {
        let id = req.params.id;
        db.Product.findByPk(id,
            {
                include: {
                    all: true
                }
            })
            .then((product) => {
                res.render('productDetail', { product });
            })
            .catch(error => res.send(error))
    },
    productCart: (req, res, next) => {
        res.render('cartDetail')
    },
    productAdd: (req, res, next) => {
        let promColors = db.Color.findAll();
        let promMaterials = db.Material.findAll();
        let promSizes = db.Size.findAll();
        let promCategories = db.Category.findAll();

        Promise.all([promColors, promMaterials, promSizes, promCategories])
            .then(([colors, materials, sizes, categories]) => {
                res.render('productAdd', { colors, materials, sizes, categories })
            })
            .catch(error => res.send(error))
    },
    productCreate: (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : "default-image.png",
                category_id: req.body.category_id,
                material_id: req.body.material_id,
                color_id: req.body.color_id,
                size_id: req.body.size_id,
                price: req.body.price

            })
                .then(() => {
                    res.render('index')
                })
        } else {
            let promColors = db.Color.findAll();
            let promMaterials = db.Material.findAll();
            let promSizes = db.Size.findAll();
            let promCategories = db.Category.findAll();
            Promise.all([promColors, promMaterials, promSizes, promCategories])
                .then(([colors, materials, sizes, categories]) => {
                    res.render('productAdd', { colors, materials, sizes, categories, errors: errors.mapped(), old: req.body })
                })
                .catch(error => res.send(error))
        }
    },
    productEdit: (req, res, next) => {
        let id = req.params.id;
        let promProduct = db.Product.findByPk(id, { include: { all: true } })
        let promColors = db.Color.findAll();
        let promMaterials = db.Material.findAll();
        let promSizes = db.Size.findAll();
        let promCategories = db.Category.findAll();
        Promise.all([promProduct, promColors, promMaterials, promSizes, promCategories])
            .then(([product, colors, materials, sizes, categories]) => {
                console.log(product);
                res.render('productEdit', { product, colors, materials, sizes, categories })
            })
            .catch(error => res.send(error))
    },
    productUpdate: async (req, res) => {
        let errors = validationResult(req);
        let productId = req.params.id
        if (errors.isEmpty()) {
            db.Product.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file ? req.file.filename : "default-image.png",
                    category_id: req.body.category_id,
                    material_id: req.body.material_id,
                    color_id: req.body.color_id,
                    size_id: req.body.size_id,
                    price: req.body.price
                },
                {
                    where: { id: productId }
                })
                .then(() => {
                    res.redirect('/')
                })
                .catch(error => res.send(error))
        } else {
            let id = req.params.id;
            let promProduct = db.Product.findByPk(id, { include: { all: true } })
            let promColors = db.Color.findAll();
            let promMaterials = db.Material.findAll();
            let promSizes = db.Size.findAll();
            let promCategories = db.Category.findAll();
            Promise.all([promProduct, promColors, promMaterials, promSizes, promCategories])
                .then(([product, colors, materials, sizes, categories]) => {
                    res.render('productEdit', { product, colors, materials, sizes, categories, errors: errors.mapped(), old: req.body })
                })
                .catch(error => res.send(error))
        }

    },
    productDestroy: async (req, res) => {
        let productId = req.params.id;
        db.Product.destroy({
            where: {
                id: productId
            }
        })
            .then(() => {
                return res.redirect('/products/list')
            })
            .catch(error => res.send(error))
    }

};

module.exports = controlador;