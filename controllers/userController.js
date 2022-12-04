var path = require('path');
const fs = require('fs');
const db = require('../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;

const controlador = {
    indexUsers: (req,res)=>{
        res.render('users')
    },
    login: (req, res, next) => {
        res.render('login');
    },
    register: (req, res, next) => {
        res.render('register');
    },
    list:(req,res) =>{
        db.User.findAll()
        .then(([users])=>{
            res.render('userList',{users})
        })
        .catch(error => res.send(error))
    },
    add:(req,res)=>{
        res.render('userAdd')
    },
    create:(req,res)=>{
        let user = {
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            //Hace falta el rol_id
            birthday: req.body.birthday,
            genre: req.body.genre
        }

        db.User.create(user)
        .then(function(){
           return res.render('index')
        })
    }
};

module.exports = controlador;