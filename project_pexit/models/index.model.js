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
db.experience = require('./experience.model')(sequelize,DataTypes)
db.profile.hasMany(db.experience,{
    foreignKey:'profile_id'
})
db.education = require('./eduaction.model')(sequelize,DataTypes)
db.profile.hasMany(db.education,{
    foreignKey:'profile_id'
})
db.awards = require('./awards.model')(sequelize,DataTypes)
db.profile.hasMany(db.awards,{
    foreignKey:'profile_id'
})

db.posts = require('./post.model')(sequelize,DataTypes)
db.profile.hasMany(db.posts,{
    foreignKey:'profile_id'
})

db.like_comments = require('./like&comments.model')(sequelize,DataTypes)
db.posts.hasMany(db.like_comments,{
    foreignKey:'post_id'
})

db.my_circle = require('./my-circle.model')(sequelize,DataTypes)
db.profile.hasMany(db.my_circle,{
    foreignKey:'profile_id'
})


module.exports = db
 