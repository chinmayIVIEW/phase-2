const mysql = require("mysql")

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Chinmay567..',
    database:'node_mysql',
    connectionLimit:15
})

const db = mysql.createConnection({
    host : "localhost"
})





module.exports = pool