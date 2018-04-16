var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var destinosModel=require('../models/destinosModel');
var Email = require('../config/emailConfig');

router.get('/',(req,res,next)=> {

    destinosModel.fetchActivo((error, destinos) => {
    if(error) return res.status(500).json(error);
        res.render('home', {
            title: "GeeksHubs Travels",
            layout: "layout",
            admin: req.session.admin,
            usuario: req.session.usuario,
            destinos,
            footerShow: true
        })
    });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'Iniciar Sesion',
            layout: 'layout'
        });
});

router.get('/registro', function(req, res, next) {
    res.render('registro',
        {
            title: 'Registro de Usuario',
            layout: 'layout'
        });
});

router.post('/login', function (req,res) {
    let Usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    };
    userModel.login(Usuario,function (error,result) {
        if(error) return res.status(500).json(error);
        if(!result){
            res.redirect('/login');
        }else{
            req.session.usuario = result.usuario;
            req.session.admin = result.admin;
            if(result.admin){
                res.redirect('/admin/destinos');
            }else{
                res.redirect('/');
            }
        }
    })
});

router.get('/logout',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/')
});

router.post('/registrook', function (req, res) {
    let Usuario={
        usuario:req.body.usuario,
        email:req.body.email,
        password:req.body.password
    };
    userModel.registro(Usuario,function (error,result) {
        if(error) res.status(500).json(error);
        switch (result){
            case 1:
                res.render('registro',{
                    title:"Usuario existente",
                    layout:'layout',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('registro',{
                    title:"Email existente",
                    layout:'layout',
                    errorEmail:true
                });
                break;
            case 3:
                let message = {
                    to: Usuario.email,
                    subject: 'Recuperar contraseña',
                    html: '<p>Hola, para activar la cuenta, pincha en el siguiente enlace</p><a href="http://localhost:3000/activarcuenta/'+ Usuario.password +'">Activar cuenta</a>'
                };
                Email.transporter.sendMail(message, (err, info) => {
                    if(err){
                        res.status(500).send(err);
                        return
                    }
                    Email.transporter.close();
                    res.render('login',{
                        title:"Registro correcto",
                        layout:'layout',
                        correcto:true
                    });
                });
                break;
        }
    })
});

router.get('/activarcuenta/:hash', function (req, res, next) {
    userModel.activarCuenta(req.params.hash, function (error, result) {
        if(error) return res.status(500).json(error);
        res.redirect('/login')
    })
});

router.post('/recuperarpassword', function (req, res, next) {
    userModel.getUser(req.body.email, function (error, result) {
        if(error) return res.status(500).json(error);
        let message = {
            to: result[0].email,
            subject: 'Recuperar contraseña',
            html: '<p>Hola, para recuperar la contraseña, pincha en el siguiente enlace</p><a href="http://localhost:3000/recuperarpassword/'+ result[0].password +'">Recuperar contraseña</a>'
        };
        Email.transporter.sendMail(message, (err, info) => {
            if(err){
                res.status(500).send(err);
                return
            }
            Email.transporter.close();
            res.redirect('/login')
        });
    })
});

router.get('/recuperarpassword/:hash', function (req, res, next) {
    userModel.getUserHash(req.params.hash, function (error, result) {
        if(error) return res.status(500).json(error);
        res.render('nuevoPassword', {
            title: 'Recuperar contraseña',
            layout: 'layout',
            result
        })
    })
});

router.post('/nuevopassword', function (req, res, next) {
    console.log(req.body);
    let usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    };
   userModel.editPassword(usuario, function (error, result) {
       if(error) return res.status(500).json(error);
       res.redirect('/login')
   });
});

module.exports = router;
