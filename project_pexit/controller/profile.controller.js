const db =  require('../models/index.model')
const Profile = db.profile



const Createuser = async (req,res)=>{
    let data = await Profile.create({user_name:req.body.user_name,display_name:req.body.display_name,
        profession:req.body.profession,professional_role:req.body.professional_role,email_id:req.body.email_id,
        phone:req.body.phone,date_of_birth:req.body.date_of_birth,gender:req.body.gender,address:req.body.address,
        country:req.body.country,state:req.body.state,location:req.body.location,postal_location:req.body.postal_location,
        summery:req.body.summery})
    if(data){
        res.json({
            message:"data inserted successfully"
        })
    }else{
        res.json({message:"Something went wrong !!!"})
    }
}

const Readuser = ()=>{
    console.log("i am readuser");
}

const Signup = async()=>{
    let data = await 
    console.log("i am from Signup");
}

const Signin = ()=>{
    console.log("i am from Signin");
}


module.exports = { Readuser,Signup,Signin,Createuser }