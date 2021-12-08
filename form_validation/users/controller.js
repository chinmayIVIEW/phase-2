const { Create,Read,Update,Delete } = require("./services")


const CreateUser = (req,res)=>{
    const data = req.body 
    Create(data,(err,result)=>{
        if (err){
            return res.status(500).json({
                success : 0,
                message : "database connection error"
            })
        }
        return res.status(200).json({
            success : 1,
            data : result,
        })
    })
}

const ReadUser = (req,res)=>{
    Read((err,result)=>{
        if (err){
            return res.status(500).json({
                message : "database connection error"
            })
        }else{
            return res.status(200).json({
                data : "success"
            })
        }      
    })

}

const UpdateUser = (req,res) =>{
    let data = req.body
    Update(data,(err,result)=>{
        if (err){
            return res.status(500).json({
                message : "database connection error"
            })
        }else if(!result){
            return res.json({
                message : "No Record found !!!"
            })
        }else{
            return res.status(200).json({
                data : result
            })
        }  
    })
}

const DeleteUser = (req,res)=>{
    let id = req.params.id
    Delete(id,(err,result)=>{
        if(err){
            return res.status(500).json({
            message : "Server Error"
            })       
        }else{
            return res.json({
            message : "Data successfully deleted"
            })
        }
    })
}


module.exports = { CreateUser,ReadUser,UpdateUser,DeleteUser }