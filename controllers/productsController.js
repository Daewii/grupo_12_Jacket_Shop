var path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/DBProducts.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controlador = {
    indexProducts: (req, res, next) => {
        res.render('products');
    },
    productDetail: (req, res, next) => {
        let id = req.params.id;
        let product = products.find(oneProduct => oneProduct.id == id);
        res.render('productDetail', { product });
    },
    productCart: (req, res, next) => {
        res.render('cartDetail')
    },
    productAdd: (req, res, next) => {
        res.render('productAdd')
    },
    productCreate: (req, res, next) => {
        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : "default-image.png",
            category: req.body.category,
            materials: req.body.materials,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products')
    },
    productEdit: (req, res, next) => {
        let id = req.params.id;
        let product = products.find(oneProduct => oneProduct.id == id)
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