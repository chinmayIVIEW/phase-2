const express = require("express")
const app = express()
const port  = process.env.PORT || 8000
const router = require('./router/router')


app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/api',router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });