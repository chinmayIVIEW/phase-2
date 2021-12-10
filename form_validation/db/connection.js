const mysql = require("mysql")
require("dotenv").config()

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Chinmay567..',
    database:'node_mysql',
    connectionLimit:15
})

module.exports = pool