var express = require('express');
var router = express.Router();
var Email = require('../config/emailConfig');
var destinosModel=require('../models/destinosModel');
var userModel=require('../models/userModel');
var upload = require('../config/multer');
const paginate = require('express-paginate');


router.get('/', function(req, res, next) {
  res.status(200).json(req.session || "Sesión no disponible");
});


router.get('/destinos', function(req, res, next) {
    console.log("Entra en admin destinos");
    let page=(parseInt(req.query.page) || 1) -1;
    let limit = 1;
    let offset = page * limit ;

    destinosModel.paginate(offset, limit, (error, destinos)=>{
        console.log(JSON.stringify(destinos));
        if(error){
            console.log('Error ->'+ error);
            return res.status(500).send(error);
        }

        if(req.session.admin==1){
            const currentPage = offset ===0 ? 1:(offset/limit)+1;
            const totalCount = destinos.count[0].total;
            const pageCount = Math.ceil(totalCount /limit);
            const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);

            res.render('adminview',{
                title:"Gestión de destinos",
                layout:"layout",
                admin: req.session.admin,
                usuario: req.session.usuario,
                destinos: destinos.rows,
                currentPage,
                links: pagination,
                hasNext: paginate.hasNextPages(pageCount),
                pageCount
            })
        }
        else{
            res.redirect('/');
        }
    })
});

router.get('/destinos/active/:id', function (req,res,next) {
    destinosModel.activoUpdate(req.params.id, (error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

router.get('/destinos/delete/:id', function (req,res,next) {
    destinosModel.destinoDelete(req.params.id,(error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

router.post('/destinos/create', upload.single('imagen'), function (req,res,next) {
    let imagenUrl = "/" + req.file.destination + req.file.filename
    let destino={
        viaje:req.body.viaje,
        precio:req.body.precio,
        fecha_sal:req.body.fecha_sal,
        fecha_vuel:req.body.fecha_vuel,
        descripcion:req.body.descripcion,
        imagen:imagenUrl,
        activo:req.body.activo
    };
    destinosModel.destinoCreate(destino,(error,dest)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admin/destinos');
        }
    })
});

/*router.get('/usuarios', function(req, res, next) {
    //console.log(req.body);
    userModel.fetchAll((error,usuarios)=>{
        if(error) return res.status(500).json(error);
        if(req.session.admin==1){
            res.render('usersview',{
                title:"Gestión de usuarios",
                layout:"layout",
                admin: req.session.admin,
                usuario: req.session.usuario,
                usuarios
            })
        }
        else{
            res.redirect('/');
        }
    })
});*/

router.get('/usuarios', function(req, res, next) {
    let page=(parseInt(req.query.page) || 1) -1;
    let limit = 1;
    let offset = page * limit ;

    userModel.paginate(offset, limit, (error,usuarios)=>{
        if(error) return res.status(500).json(error);
        if(req.session.admin==1){
            const currentPage = offset ===0 ? 1:(offset/limit)+1;
            const totalCount = usuarios.count[0].total;
            const pageCount = Math.ceil(totalCount /limit);
            const pagination = paginate.getArrayPages(req)(10,pageCount, currentPage);

            res.render('usersview',{
                title:"Gestión de usuarios",
                layout:"layout",
                admin: req.session.admin,
                usuario: req.session.usuario,
                usuarios: usuarios.rows,
                currentPage,
                links: pagination,
                hasNext: paginate.hasNextPages(pageCount),
                pageCount
            })
        }
        else{
            res.redirect('/');
        }
    })
});

router.post('/usuarios', function(req, res, next) {
    let usuario={
        admin:req.body.admin,
        activo:req.body.activo,
        id:req.body.id
    }
    userModel.edit(usuario,(error,usu)=>{
        if(error)return res.status(500).json(error);
    })
    res.redirect('/admin/usuarios');
});

router.get('/recuperarpassword/:hash', function (req, res, next) {
    userModel.getUserHash(req.params.hash, function (error, result) {
        if(error) return res.status(500).json(error);
        let message = {
            to: result.email,
            subject: 'Recuperar contraseña',
            html: '<p>Hola, para recuperar la contraseña, pincha en el siguiente enlace</p><a href="http://localhost:3000/recuperarpassword/'+ result.password +'">Recuperar contraseña</a>'
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

module.exports = router;

