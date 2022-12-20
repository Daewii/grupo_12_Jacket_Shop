var path = require('path');
const fs = require('fs');
const db = require('../database/models');
const { promiseImpl } = require('ejs');
const sequelize = db.sequelize;
const bcrypt = require ('bcryptjs');
const { validationResult } = require("express-validator");


const controlador = {
    indexUsers: (req,res)=>{
        res.render('users')
    },
    login: (req, res, next) => {
        
        res.render('login');
    },
    processLogin:(req,res)=>{
        /*db.User.findOne({
            where: { email: req.body.email }
        })
        .then((userToLog)=>{
           let userLogged = req.session.userLogged = userToLog
            console.log(userLogged);*/
            res.render('index')

            /*if(userToLog.email == null){
                return res.render('register',{
                    errors:{
                        email:{
                            msg:'Email no registrado.'
                        }
                    }
                })
            }*/

            
        //})
    },
    register: (req, res, next) => {
        console.log(req.session.userLogged);
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
    create:  (req,res)=>{
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = db.User.create({
                 first_name : req.body.first_name,
                 last_name: req.body.last_name,
                 email: req.body.email,
                 //Encriptación de contraseña con hashing
                 password: bcrypt.hashSync(req.body.password, 10) ,
                 //Hace falta el rol_id
                 birthday: req.body.birthday,
                 genre: req.body.genre,
                 profile_photo: req.file ? req.file.filename : "default-image.png"
                 
             })
     
             .then(() => {
                return res.render('index') 
             })
             .catch(error => res.send(error))
        } else {
            res.render('register', { errors: errors.mapped(), old: req.body })
        }
    },
    edit:(req,res)=>{
        let id = req.params.id;
        db.User.findByPk(id)
        .then(user=>{
            res.render('userEdit',{user})
        }
        )
    },
    update:  (req, res) =>{
        let userId = req.params.id
        db.User.update({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            //Hace falta el rol_id
            birthday: req.body.birthday,
            genre: req.body.genre
        },{
            where: {id: userId}
        }
        )
        .then(() => {
            res.redirect('/')
        })
    },
        destroy: (req, res) => {
        let userId = req.params.id;
        db.User.destroy({ where: { id: userId }})

            .then((user) => {
                return res.render('index',{user})
            })
            .catch(error => res.send(error))
    }
};

module.exports = controlador;