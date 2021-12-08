const router = require("express").Router()
const { CreateUser,ReadUser,UpdateUser,DeleteUser } = require("./controller")


// ? For API use 
router.post('/create',CreateUser)
router.get('/users',ReadUser)
router.put('/update',UpdateUser)
router.delete('/delete/:id',DeleteUser)












router.post('/login',(req,res)=>{
    res.render("login")
})

module.exports = router
