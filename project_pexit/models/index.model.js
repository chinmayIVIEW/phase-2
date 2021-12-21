const db_confg = require('../config/connection')
const {Sequelize,DataTypes} = require("sequelize")

const sequelize = new Sequelize(db_confg.DB,db_confg.USER,db_confg.PASSWORD,{
    host:db_confg.HOST,
    dialect:db_confg.dialect,
    logging:true
})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.profile = require('./profile.model')(sequelize,DataTypes)



module.exports = db
