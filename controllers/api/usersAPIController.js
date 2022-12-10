const path = require('path');
const fs = require('fs');
const db = require('../../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;

const usersAPIController = {
    'list': async (req, res) => {
        const promUsers = await db.User.findAll({
            include: {
                all:true
            }
        })
        const users = promUsers.map(user => {
            return {
                id: user.id,
                name: user.first_name + " " + user.last_name,
                email: user.email,
                detail: `http://localhost:3000/api/users/detail/${user.id}`
            }
        })
        Promise.all([users])
            .then(([users]) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: 'api/users'
                    },
                    data: users
                }
                res.json(respuesta);
            })
    },
    "detail": async (req, res) => {
        let id = req.params.id
        const promUser = await db.User
            .findByPk(id, {
                include: {
                    all: true,
                },
                where: {
                    id: req.params.id
                }
            })
            .then((user) => {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: `api/users/detail/${user.id}`
                    },
                    data: {
                        "id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "birthday": user.birthday,
                        "genre": user.genre,
                        "profile_photo": `http://localhost:3000/api/users/image/${user.id}`
                    }
                }

                res.json(respuesta);
            })      
    },
    "imageDetail": async (req, res) => {
        let id = req.params.id
        let promUser = db.User.findByPk(id)
            .then((user) => {
                res.render("imageViewUser", { user })
            })
    }
}
module.exports = usersAPIController;