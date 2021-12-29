const dbconfig = require('../config/db.config')
const {Sequelize,DataTypes} = require("sequelize")


const sequelize = new Sequelize(dbconfig.DB,dbconfig.USER,dbconfig.PASSWORD,{
    host:dbconfig.HOST,
    dialect:dbconfig.dialect,
    logging:true
})



const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.model')(sequelize,DataTypes)




db.sequelize.sync({force:false})
.then(()=>{
    console.log("table created");
})
.catch(err=>{
    console.log(err);
})

module.exports = db