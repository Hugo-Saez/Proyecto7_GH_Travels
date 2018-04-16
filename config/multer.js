const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,"uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = Multer({storage: storage});

module.exports = upload;