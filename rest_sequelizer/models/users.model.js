
module.exports = (sequelize,DataTypes) =>{
    const users = sequelize.define("users",{
            name:{
                type:DataTypes.STRING,
            },
            Address:{
                type:DataTypes.STRING
            },
            gender:{
                type:DataTypes.STRING 
            }
        },{
            // timestamps : false
            // updatedAt:false
        })
    return users 
}

