let conn=require('../connections/mysqlconnection');
let userModel={};

userModel.fetchAll=(cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    const SQL="Select * FROM usuarios";
    conn.query(SQL, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
};

userModel.registro=function (usuario,cb) {

    if(!conn) return cb("No existe conexión con la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=?',[usuario.usuario],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            conn.query('SELECT * FROM usuarios WHERE email=?',[usuario.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    conn.query('INSERT INTO usuarios SET ?',[usuario],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                    })
                }
            })
        }
    })
};

userModel.activarCuenta = function (hash, cb) {
    if (!conn) return cb("Fallo al conectar a la BD");
    conn.query('UPDATE usuarios SET activo = 1 WHERE password=?', hash, (error, result) => {
        if (error) return cb(error);
        return cb(null, result)
    });
};

userModel.login = function(usuario,cb) {
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=? AND password=? AND activo = 1',[usuario.usuario,usuario.password],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            let userData = {
              usuario: result[0].usuario,
              admin: result[0].admin
            };
            console.log("Devuelve base datos"+JSON.stringify(userData));
            return cb(null,userData);
        } else {
            return cb(null,null);
        }
    })
};

userModel.edit = function(usuario,cb){
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('UPDATE usuarios SET admin =?, activo=? WHERE id=?', [usuario.admin,usuario.activo,usuario.id])
};

userModel.getUser = function(email,cb){
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE email=?', email, function (error, result) {
        if(error) return cb(error);
        return cb(null, result)
    });
};

userModel.getUserHash = function(hash,cb){
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE password=?', hash, function (error, result) {
        if(error) return cb(error);
        return cb(null, result[0])
    });
};

userModel.editPassword = function(usuario,cb){
    console.log('sadadsa');
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('UPDATE usuarios SET password=? WHERE usuario=?', [usuario.password, usuario.usuario], function (error, result) {
       console.log(error);
       console.log(result);
        if(error) return cb(error);
       return cb(null, result)
    });
};

//Sistema de paginación
userModel.paginate =(offset, limit, cb)=>{
    if(conn) {
        conn.query("SELECT * FROM  usuarios LIMIT ?, ?", [offset, limit],(error,rows)=>{
            if(error){
                return cb(error);
            }else{
                conn.query("SELECT COUNT(*) as total FROM usuarios",(error, count)=>{
                    if(error) {
                        return cb(error)
                    }else{
                        return cb(null,{count,rows});
                    }
                })
            }
        })
    }
}

module.exports = userModel;