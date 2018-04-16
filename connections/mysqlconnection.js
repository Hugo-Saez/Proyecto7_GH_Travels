const MYSQL=require('mysql');
const CONN=MYSQL.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'GH_Travels'
})

module.exports=CONN;