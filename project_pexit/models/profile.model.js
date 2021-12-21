
module.exports = (sequelize,DataTypes)=>{
    const profile = sequelize.define("Profile",{
        profile_id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        user_name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        display_name : {
            type: DataTypes.STRING,
            allowNull : false
        },
        profession : {
            type: DataTypes.STRING
        },
        professional_role : {
            type: DataTypes.STRING
        },
        email_id :{
            type: DataTypes.STRING,
            unique : true,
            allowNull:false
        },
        phone : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        date_of_birth : {
            type: DataTypes.DATE
        },
        gender : {
            type: DataTypes.STRING
        },
        address : {
            type: DataTypes.STRING(1234)
        },
        country : {
            type: DataTypes.STRING,
            allowNull : false
        },
        state : {
            type: DataTypes.STRING
        },
        location:{
            type: DataTypes.STRING
        },
        postal_location:{
            type: DataTypes.STRING
        },
        summery : {
            type: DataTypes.STRING
        },
        password : {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true
        }
    },{
        updatedAt:false
    })
    return profile
}