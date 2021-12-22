const router = require("express").Router()
const {Createuser,Readuser,Signup,Signin} = require("../controller/profile.controller")




router.get('/profile/edit-profile',Createuser)
router.get('/profile',Readuser)
router.post('/signup',Signup)
router.post('/signin',Signin)



module.exports = router