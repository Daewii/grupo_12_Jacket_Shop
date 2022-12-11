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
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
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
]

