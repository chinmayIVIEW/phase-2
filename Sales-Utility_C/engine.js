const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT
const db = require('./models/index.js')
const contact = require('./router/profile.router')


app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/api',contact)

  




db.sequelize.sync({force:false})
.then(()=>{
    console.log("table created")
})
.catch(err=>{
    console.log(err);
})



app.listen(port,()=>{
    console.log("server up and running")
})