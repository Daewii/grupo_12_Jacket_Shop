const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name').notEmpty().withMessage('No debes dejar este campo vacio')
    .bail().isLength({min: 5}).withMessage('El nombre debe tener mínimo 5 caracteres'),
    body('description').notEmpty().withMessage('No debes dejar este campo vacio')
    .bail().isLength({min: 20}).withMessage('la descripción debe tener mínimo 20 caracteres de largo'), 
    body('category_id').notEmpty().withMessage('debes elegir una categoría'),
    body('material_id').notEmpty().withMessage('debes elegir un material'),
    body('color_id').notEmpty().withMessage('debes elegir un color'),
    body('size_id').notEmpty().withMessage('debes elegir una talla'),
    body('price').notEmpty().withMessage('No debes dejar este campo vacio')
]

