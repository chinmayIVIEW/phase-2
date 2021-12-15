const db =  require('../models/index')
const Users = db.users


let adduser = async (req,res)=>{

    let data = await Users.create({name:"chinmay",Address:"RKL",gender:"male"})
    if(data){
        res.json({
            message:"data inserted"
        })
    }

}



module.exports = {adduser}