var express = require('express');
var router = express.Router();
const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"uploads/");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }

});
const upload = Multer({storage: storage});

router.get('/',(req,res,next)=>{
    res.render('subir',{
        title:'Subida de archivos',
        layout: 'template'});
})
router.post('/upload',upload.single('file'),(req, res, next)=>{
    res.json(req.file);
})
module.exports = router;

