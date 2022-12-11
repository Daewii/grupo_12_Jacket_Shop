const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('Falta escribir un nombre para el producto')
    .isLength({min: 5}),
    body('description').notEmpty().withMessage('Falta escribir una descripción del producto'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de
             archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    }),
    body('category_id').notEmpty().withMessage('Falta elegir una categoria'),
    body('material_id').notEmpty().withMessage('Falta elegir un material'),
    body('color_id').notEmpty().withMessage('Falta elegir un color'),
    body('size_id').notEmpty().withMessage('Falta elegir una talla'),
    body('price').notEmpty().withMessage('Falta escribir un precio para el producto')
]

