const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
const auth = require('./router/auth.router')
const db = require('./models/index.model')
const cookieparser = require('cookie-parser')
const CLIENT_ID = process.env.CLIENT_ID
// Google Auth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
  

// middleware
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

function checkAuthentication(req, res,next) {
    let token = req.cookies['session-token']
    let user = {}

    async function  verify(){
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:CLIENT_ID
        })
        const payload = ticket.getPayload()
        user.name = payload.name
        user.email = payload.email
        user.picture = payload.picture
    }
    verify()
    .then(()=>{
        req.user = user
        next()
    })
    .catch(err=>{
        res.redirect('/login')
    })
}

app.post('/login',(req,res)=>{
    let token = req.body.token
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    }
    verify()
    .then(()=>{
        res.cookie('session-token',token)
        res.send("success")
    }) 
    .catch(console.error);
})

app.get('/profile',checkAuthentication,(req,res)=>{
    let user = req.user
    res.render('profile',{user})
})

app.get('/protect',checkAuthentication,(req,res)=>{
    res.render('protected')
})


app.get('/signup',(req,res)=>{
    res.render('sign_up')
})



app.get('/logout',(req,res)=>{
    res.clearCookie('session-token')
    res.redirect('/login')
})


// app.use('/pexit',auth)


db.sequelize.sync({force:false})
.then(()=>{
    console.log("table created");
})
.catch(err=>{
    console.log(err);
})


app.listen(port,(err,result)=>{
    if(err){
        console.log(err);
    }
    console.log("server running");
})