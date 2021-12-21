const router = require("express").Router()
const {Createuser,Readuser,Signup,Signin} = require("../controller/profile.controller")




router.get('/create',Createuser)
router.get('/profiles',Readuser)
router.get('/signup',Signup)
router.get('/signin',Signin)



module.exports = router