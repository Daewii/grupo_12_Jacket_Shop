const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;

const usersAPIController = {
    'list': (req, res) => {
        db.User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    }
     }
     module.exports = usersAPIController;