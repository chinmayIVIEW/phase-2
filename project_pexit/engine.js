const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
const router = require('./router/router')
const db = require('./models/index.model')
  

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use('/pexit',router)


db.sequelize.sync({force:false})
.then(()=>{
    console.log("table created");
})
.catch(err=>{
    console.log(err);
})


app.listen(port,()=>{
    console.log("server is up and running");
})