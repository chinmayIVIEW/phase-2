const db =  require('../models/index')
const Profile = db.profile



const contact = async(req,res)=>{
    console.log(req.body)
    let data = await Profile.create({full_name:req.body.full_name,company_name:req.body.company_name,
    email:req.body.email,subject:req.body.subject,messages:req.body.message})
    if (data) {
        res.json({
            message: "Data inserted Successfully !!!"
        })
    }else{
        res.json({
            message: "Oops !! Something went wrong"
        })
    }
}


module.exports = {contact}
