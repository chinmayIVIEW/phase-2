const router = require("express").Router()
const {adduser,crud_user,query_data,finder} = require('../controller/user.controller')


router.get('/add',adduser)
router.get('/crud',crud_user)
router.get('/query',query_data)
router.get('/find',finder)



module.exports = router