let conn=require('../connections/mysqlconnection');
let Destinos={};

// listado de Viajes
Destinos.fetchAll=(cb)=> {
    if (!conn) return cb("No se ha podido realizar conexión");
    const SQL = "SELECT * FROM destinos";
    conn.query(SQL, (error, destinos) => {
        //console.log(destinos);
        if (error) return cb(error);
    else return cb(null, destinos);
})
};

// listado de Viajes activos
Destinos.fetchActivo=(cb)=> {
    if (!conn) return cb("No se ha podido realizar conexión");
    const SQL = "SELECT * FROM destinos WHERE activo=1";
    conn.query(SQL, (error, destinos) => {
        //console.log(destinos);
        if (error) return cb(error);
        else return cb(null, destinos);
    })
};

// Actualización de destinos
Destinos.activoUpdate=(id,cb)=>{
    if (!conn) return cb("No se ha podido realizar conexión.");
    conn.query("SELECT * FROM destinos WHERE id=?",id,function(error,resultado){
        if (error) return cb(error);
        else {
            let valorActivo=resultado[0].activo;
            if (valorActivo==1)
                valorActivo=0;
            else
                valorActivo=1;
            conn.query("Update destinos set activo="+valorActivo+" where id=?",id,function (error,resultado) {
            if (error) return cb(error);
            return cb(null, resultado);
            })
        }
    })
}

// Eliminar destinos
Destinos.destinoDelete=(id,cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    conn.query("SELECT * FROM destinos WHERE id=?",id,function (error,resultado) {
        if(error) return cb(error);
        else {
            conn.query("DELETE FROM destinos WHERE id=?",id,function () {
                if(error) return cb(error);
                return cb(null,resultado);
            })
        }
    })
}

// Nuevo destino
Destinos.destinoCreate=(destino,cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    else {
        conn.query('INSERT INTO destinos SET ?', destino, (error, result) => {
            if (error) return cb(error);
        return cb(null, result);
    })
    }
}

//Sistema de paginación
Destinos.paginate =(offset, limit, cb)=>{
    if(conn) {
        conn.query("SELECT * FROM  destinos LIMIT ?, ?", [offset, limit],(error,rows)=>{
            if(error){
                return cb(error);
            }else{
                conn.query("SELECT COUNT(*) as total FROM destinos",(error, count)=>{
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

module.exports=Destinos;