const db =  require('../models/index')
const Users = db.users
const {sequalize,Op} = require("sequelize")

let adduser = async (req,res)=>{

    // to insert the data
    let data = await Users.create({name:"chinmay kumar",Address:"BBSR",gender:"male"})

    if(data){
        res.json({
            message:"data inserted"
        })
    }
}

let crud_user = async(req,res)=>{
    // to insert the data
//     let data = await Users.create({name:"chinmay123",Address:"pan",gender:"male"})
    // if (data) {
    //     res.status(200).json({
    //         message:"success"
    //     })       
    // }

    // to update a perticular data
    // let data = await Users.update({name:"Subarna",Address:"Banglore"},{
    //     where:{
    //         id:1
    //     }
    // }) 

    // to delete the data
    // let data = await Users.destroy({
    //     where : {
    //         id: 3
    //     }
    // })

    // to drop the table or truncate/delete the table
    // let data = await Users.destroy({
    //     truncate:true
    // })

    // to insert data in bulk
    // let data = await Users.bulkCreate([
    //     {name:"chinmay1",Address:"RKL",gender:"male"},
    //     {name:"chinmay2",Address:"RKL1",gender:"male"},
    //     {name:"chinmay3",Address:"RKL2",gender:"male"}
    // ])

    // find all the data
    // let data = await Users.findAll()

    // to find one data
    let data = await Users.findOne()
    if (data) {
        res.status(200).json({
            data:data,
            message:"success"
        })       
    }
}

let query_data = async(req,res)=>{
    // let data = await Users.findAll({
    //     attributes:['name','gender']
    // })

    // include and exclude
    // let data = await Users.findAll({
    //     attributes : {exclude:['createdAt','updatedAt'],
    //     include : [[sequalize.fn('concat',sequalize.col('name'),' singh'),'fullName']]
    //     }
    // }) 

    // condition
    let data = await Users.findAll({
        where : {
            // id : 2
            // id : {[Op.eq] : 2}
        },
        order:[
            ['name','DESC']
            // ['gender','DESC']
        ]
    })

    // let data = await Users.count()
    if (data) {
        res.json({
            message:"success",
            data:data
        })
    }
}

let finder = async(req,res)=>{
    // let data = await Users.findAndCountAll({
    //     where:{
    //         gender:"male"
    //     }
    // })
    let [data,created] = await Users.findOrCreate({
        where:{name:'dummy1'},
        defaults:{
            Address:"bbsr",
            gender:"female"
        }
    })
    if (data) {
        res.json({
            message:"success",
            data:data,
            add:created
        })
    }
}

module.exports = {adduser,crud_user,query_data,finder}