const router = require("express").Router()
const {adduser} = require('../controller/user.controller')


router.get('/add',adduser)


module.exports = router