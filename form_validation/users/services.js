const pool = require("../db/connection")

const Create = (data,callback)=>{
    let sql_query = `INSERT INTO UserRegistration (ID,Name,Email,Phone,Password) VALUES ('${data.id}','${data.name}','${data.email}','${data.phone}','${data.password}')`;
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Read = (callback)=>{
    let sql_query = `SELECT * FROM UserRegistration;`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Update = (data,callback)=>{
    let sql_query = `UPDATE UserRegistration SET ID = '${data.id}', Name = '${data.name}', Email = '${data.email}', Phone = '${data.phone}', Password = '${data.password}' where ID = ${data.id};`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Delete = (id,callback)=>{
    let sql_query = `DELETE FROM UserRegistration where ID = ${id};`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

module.exports = { Create , Read , Update , Delete}