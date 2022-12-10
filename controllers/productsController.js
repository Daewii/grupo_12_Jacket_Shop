const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;

const controlador = {
    productList: (req, res, next)=>{
       let prmsProducts = db.Product.findAll({include: ['material', 'color', 'size', 'category']})
       let prmsProductImage = db.ProductImage.findAll();
       Promise.all([prmsProducts, prmsProductImage])
   
            .then(([products, productImage]) =>{
                res.render('productList', {products, productImage})
            })
            .catch(error => res.send(error))
    },
    productDetail: (req, res, next) => {
        let id = req.params.id;
        let promProduct = db.Product.findByPk(id);
        let promSizes = db.Size.findAll();
        let promProductImage = db.ProductImage.findAll({
            where: {
                product_id: id
            }
        });
        Promise.all([promProduct, promSizes, promProductImage])
        .then(([product, sizes, image]) => {
            res.render('productDetail', { product, sizes, image });
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
        .then(([colors, materials, sizes, categories])=> {
            res.render('productAdd', {colors, materials, sizes, categories})
        })
        .catch(error => res.send(error))
    },
    productCreate: async (req, res, next) => {  
        const product = await db.Product.create({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category_id,
            material_id: req.body.material_id,
            color_id: req.body.color_id,
            size_id: req.body.size_id,
            price: req.body.price

        })
        const image = await db.ProductImage.create({
            product_id: product.id,
            productImage: req.file ? req.file.filename : "default-image.png"
        })
        Promise.all([product, image])
        .then(()=> {
            res.render('index')
        })
        .catch(error => res.send(error))
    },
    productEdit: (req, res, next) => {
        let id = req.params.id;
        let promColors = db.Color.findAll();
        let promMaterials = db.Material.findAll();
        let promSizes = db.Size.findAll();
        let promCategories = db.Category.findAll();
        let promProduct = db.Product.findByPk(id, {include: ['material', 'color', 'size', 'category']})
        Promise.all([promProduct, promColors, promMaterials, promSizes, promCategories])
        .then(([product, colors, materials, sizes, categories]) => {
            res.render('productEdit', { product, colors, materials, sizes, categories })
        })
        .catch(error => res.send(error))
    },
    productUpdate: async (req, res) => {
        let productId = req.params.id
        let productToEdit = await db.Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category_id,
                material_id: req.body.material_id,
                color_id: req.body.color_id,
                size_id: req.body.size_id,
                price: req.body.price
            },
            {
                where: {id: productId}
            }
            //falta guardar la imagen a editar y si la imagen no se va a cambiar dejar la que ya esta
        )
        .then(() => {
            res.redirect('/')
        })
        .catch(error => res.send(error))
        
    },
    productDestroy: async (req, res) => {
        let productId = req.params.id;
        let promImage = await db.ProductImage.destroy({
            where: {product_id: productId}
        })
        let promProduct = await db.Product.destroy({ where: { id: productId }})
        Promise.all([promImage, promProduct])
            .then(([image, product]) => {
                return res.redirect('/products/list')
            })
            .catch(error => res.send(error))
    }
    
};

module.exports = controlador;