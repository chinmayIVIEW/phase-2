const express = require("express")
const app = express()
const port = process.env.PORT || 8000
const router = require("./users/router")
const path = require("path")
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api',router)






app.listen(port,()=>{
    console.log("server is running");
})