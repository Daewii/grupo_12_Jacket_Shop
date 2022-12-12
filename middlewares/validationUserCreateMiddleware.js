const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('first_name').notEmpty().withMessage('Falta tu nombre')
    .bail().isLength({min: 2}).withMessage('El nombre debe tener mínimo 2 caracteres'),
    body('last_name').notEmpty().withMessage('Falta tu apellido')
    .bail().isLength({min: 2}).withMessage('El apellido debe tener mínimo 2 caracteres'),
    body('email').notEmpty().withMessage('Falta tu correo electrónico')
    .bail().isEmail().withMessage('No es un formato de correo válido'),
    body('password').notEmpty().withMessage('Falta tu contraseña'),
]

