const pool = require("../db/connection")
const {DOMAIN,api_key,token,client_url,forgot_pass_token} = require("./auth")
const jwt = require("jsonwebtoken")
const mailgun = require("mailgun-js");
const mg = mailgun({apiKey: api_key, domain: DOMAIN});



const SignedUp = (data,callback)=>{
    let sql_query = `select * from UserRegistration where Email = '${data.email}';`
    if (sql_query) {
        pool.query(sql_query,(err,result)=>{
            if(err){
                callback(err)
            }else{
                let Email = data.email
                let Name = data.name
                let Id = data.id
                let Phone = data.phone
                let Password = data.password
                const Token = jwt.sign({Email,Name,Id,Phone,Password},token,{expiresIn:'20m'})

                const mail_cred = {
                    from: 'noreply@hello.com',
                    to: data.email,
                    subject: 'Account Activation Link',
                    html:`
                    <h2>Please Click on given link to Activate your account</h2>
                    <p>${client_url}/authentication/activate/${Token}</p>`
                };
                mg.messages().send(mail_cred,(err,body)=> {
                    if (err) {
                        return callback(err)
                    } else {
                        return callback(null,"A Verification Email has been sent to your account")
                    }
                });
            }
        })
    }   
}

const AccVerify = (token_data,callback)=>{
    if(token_data){
        jwt.verify(token_data.token,token,(err,decodedtoken)=>{
            if (err) {
                return callback(err)
            }
            const {Email,Name,Id,Phone,Password} = decodedtoken
            let sql_query = `select * from UserRegistration where Email = '${Email}';`
            if (sql_query) {
                pool.query(sql_query,(err,result)=>{
                    if(err){
                        callback(err)
                    }else{
                        let sql_query1 = `INSERT INTO UserRegistration (ID,Name,Email,Phone,Password) VALUES ('${Id}','${Name}','${Email}','${Phone}','${Password}')`;
                        pool.query(sql_query1,(err,result)=>{
                        if (err){
                            return callback(err);
                        }else{
                            return callback(null,result)
                        }
                        })   
                    }
                })
            }   
        })
    }else{
        return res.json({
            err:"Data Base Error"
        })
    }
}

const Read = (callback)=>{
    let sql_query = `SELECT * FROM UserRegistration;`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Update = (data,callback)=>{
    let sql_query = `UPDATE UserRegistration SET ID = '${data.id}', Name = '${data.name}', Email = '${data.email}', Phone = '${data.phone}', Password = '${data.password}' where ID = ${data.id};`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Delete = (id,callback)=>{
    let sql_query = `DELETE FROM UserRegistration where ID = ${id};`
    pool.query(sql_query,(err,result)=>{
        if (err){
            return callback(err);
        }else{
            return callback(null,result)
        }
    })
}

const Signedin = (data,callback)=>{
    let email = data.email
    let sql_query = `select * from UserRegistration where Email = '${email}';`
    pool.query(sql_query,(err,result)=>{
        if(err){
            callback(err)
        }
        return callback(null,result)
    })
}

const ForgotPassWord = (data,callback)=>{
    let email = data.email
    let sql_query = `select * from UserRegistration where Email = '${email}';`
    pool.query(sql_query,(err,result)=>{
        if(err){
            return callback(err)
        }else if (result.length == 0){
            return callback(null,"User with this email does not exist")
        }
        const Token = jwt.sign({id:result.id},forgot_pass_token,{expiresIn:'20m'})
        const mail_cred = {
            from: 'noreply@hello.com',
            to: email,
            subject: 'Account Activation Link',
            html:`
            <h2>Please Click on given link to Reset your password</h2>
            <p>${client_url}/resetpassword/${Token}</p>`
        };
        mg.messages().send(mail_cred,(err,body)=> {
            if (err) {
                return callback("Server error occured")
            } else {
                return callback(null,"A Reset Password mail has been sent to your account")
            }
        });
    })
}

module.exports = {SignedUp ,AccVerify , Read , Update , Delete , Signedin , ForgotPassWord}