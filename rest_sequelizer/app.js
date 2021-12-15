const express = require("express")
const app = express()
const port  = process.env.PORT || 8000
const db =  require('./models/index')
const router = require('./router/router')


app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/api',router)


db.sequelize.sync({force:true})
.then(()=>{
    console.log("table created");
})
.catch(err=>{
    console.log(err);
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });