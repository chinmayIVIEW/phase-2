const pool = require("../db/connection")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.api_key, domain: process.env.DOMAIN });


const SignedUp = (data, callback) => {
    let sql_query = `SELECT Email FROM UserRegistration WHERE UserRegistration.Email = '${data.email}';`
    if (sql_query) {
        pool.query(sql_query, (err, result) => {
            if (result.length > 0) {
                callback(null, "User with this Email already Present ")
            } else if (result.length == 0) {
                let Email = data.email
                let Name = data.name
                let Id = data.id
                let Phone = data.phone
                let Password = data.password
                const Token = jwt.sign({ Email, Name, Id, Phone, Password }, process.env.token, { expiresIn: '20m' })

                const mail_cred = {
                    from: 'noreply@hello.com',
                    to: data.email,
                    subject: 'Account Activation Link',
                    html: `
                    <h2>Please Click on given link to Activate your account</h2>
                    <p>${process.env.client_url}/authentication/activate/${Token}</p>`
                };
                mg.messages().send(mail_cred, (err, body) => {
                    if (err) {
                        return callback(err)
                    }
                    return callback(null, "A verification link is sent to your email")
                })
            } else {
                callback(err)
            }
        })
    }
}

const AccVerify = (token_data, callback) => {
    if (token_data) {
        jwt.verify(token_data.token, process.env.token, (err, decodedtoken) => {
            if (err) {
                return callback(err)
            }
            const { Email, Name, Id, Phone, Password } = decodedtoken
            let sql_query = `SELECT Email FROM UserRegistration WHERE UserRegistration.Email = '${Email}';`
            if (sql_query) {
                pool.query(sql_query, (err, result) => {
                    if (err) {
                        callback(err)
                    } else {
                        let sql_query1 = `INSERT INTO UserRegistration (ID,Name,Email,Phone,Password) VALUES ('${Id}','${Name}','${Email}','${Phone}','${Password}')`;
                        pool.query(sql_query1, (err, result) => {
                            if (err) {
                                return callback(err);
                            } else {
                                return callback(null, result)
                            }
                        })
                    }
                })
            }
        })
    } else {
        return res.json({
            err: "Database Error"
        })
    }
}

const Read = (callback) => {
    let sql_query = `SELECT * FROM UserRegistration;`
    pool.query(sql_query, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    })
}

const Update = (data, callback) => {
    let sql_query = `UPDATE UserRegistration SET ID = '${data.id}', Name = '${data.name}', Email = '${data.email}', Phone = '${data.phone}', Password = '${data.password}' where ID = ${data.id};`
    pool.query(sql_query, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    })
}

const Delete = (id, callback) => {
    let sql_query = `DELETE FROM UserRegistration where ID = ${id};`
    pool.query(sql_query, (err, result) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, result)
        }
    })
}

const Signedin = (data, callback) => {
    let email = data.email
    let password = data.password
    let sql_query = `select ID from UserRegistration where Email = '${email}' and Password = '${password}';`
    pool.query(sql_query, (err, result) => {
        if (err) {
            callback(err)
        }
        return callback(null, result)
    })
}

const ForgotPassWord = (data, callback) => {
    let email = data.email
    let sql_query = `SELECT Email FROM UserRegistration WHERE UserRegistration.Email = '${email}';`
    pool.query(sql_query, (err, result) => {
        if (result.length == 0) {
            return callback(null, "Please Sign up first")
        } else if (result.length > 0) {
            const Token = jwt.sign({ email }, process.env.forgot_pass_token, { expiresIn: '20m' })

            const mail_cred = {
                from: 'noreply@hello.com',
                to: email,
                subject: 'Account Activation Link',
                html: `
                <h2>Please Click on given link to Reset your password</h2>
                <p>${process.env.client_url}/resetpassword/${Token}</p>`
            };
            mg.messages().send(mail_cred, (err, body) => {
                if (err) {
                    return callback(err)
                } else {
                    return callback(null, "A Reset Password mail has been sent to your account")
                }
            });
        } else {
            callback(err)
        }
    })
}

const ResetPassword = ({ token, newpass }, callback) => {
    if (token) {
        jwt.verify(token, process.env.forgot_pass_token, (err, decodedtoken) => {
            if (err) {
                return callback(err)
            }
            const { email } = decodedtoken
            let sql_query = `UPDATE UserRegistration SET Password = '${newpass}' where Email = '${email}';`
            pool.query(sql_query, (err, result) => {
                if (err) {
                    return callback(err)
                }
                else {
                    return callback("Password Verify Successfully ")
                }
            })

        })
    } else {
        callback("Authentication Error !!!")
    }
}

module.exports = { SignedUp, AccVerify, Read, Update, Delete, Signedin, ForgotPassWord, ResetPassword }