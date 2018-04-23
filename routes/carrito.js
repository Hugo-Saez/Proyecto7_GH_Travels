const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    //res.send('carrito');
    res.render('carrito', {
        title: 'Carrito de compra',
        layout: 'layout',
        admin: req.session.admin,
        usuario: req.session.usuario
    });
});


module.exports = router;