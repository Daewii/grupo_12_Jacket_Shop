var path = require('path');
const fs = require('fs');
const db = require('../database/models');
const sequelize = db.sequelize;

const controlador = {
    indexProducts: (req, res, next) => {
        res.render('products');
    },
    productList: (req,res,next)=>{
       let prmsProducts = db.Product.findAll({include: ['material', 'color', 'size', 'category']})
       let prmsProductImage = db.ProductImage.findAll();
       Promise.all([prmsProducts, prmsProductImage])
        /*Queda pendiente investigar cómo traer la imagen de cada producto*/ 
            .then(([products, productImage]) =>{
                res.render('productList', {products, productImage})
            })

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
            res.render('productList', {colors, materials, sizes, categories})
        })
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
        let product = db.Products.findByPk(id, {include: ['material', 'color', 'size', 'category', 'productImages']})
        res.render('productEdit', { product });
    },
    productUpdate: (req, res) => {
        let id = req.params.id
        let productToEdit = products.find(product => product.id == id)
        console.log("=======================");
        console.log(req.body);
        console.log("=======================");
        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            image: productToEdit.image
        };

        let newProducts = products.map(product => {
            if (product.id == productToEdit.id) {
                return product = { ...productToEdit }
            }
            return product;
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        res.redirect('/products/');


    },
    ProductDestroy: (req, res) => {
		let id = req.params.id
		let finalProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
    
};

module.exports = controlador;