const router = require("express").Router()
const { Signup, ReadUser, UpdateUser, DeleteUser, Signin, activateAccount, forgotPassword, resetPassword } = require("./controller")


// ? For API use 
router.post('/signup', Signup)
router.get('/users', ReadUser)
router.put('/update', UpdateUser)
router.delete('/delete/:id', DeleteUser)
router.post('/signin', Signin)
router.post('/email-activate', activateAccount)
router.put('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)



module.exports = router
