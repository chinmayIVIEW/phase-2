const { SignedUp, AccVerify, Read, Update, Delete, Signedin, ForgotPassWord, ResetPassword } = require("./services")



const Signup = (req, res) => {
    const data = req.body
    SignedUp(data, (err, result) => {
        if (result) {
            return res.json({
                data: result
            })
        } else if (result == undefined) {
            return res.json({
                message: "A verification link is sent to your email"
            })
        }
        else {
            return res.status(500).json({
                data: result
            })
        }
    })
}

const activateAccount = (req, res) => {
    const token_data = req.body
    AccVerify(token_data, (err, result) => {
        if (result == undefined) {
            return res.json({
                message: "User with this email already exists"
            })
        } else if (err) {
            return res.json({
                message: "Error in signup while account activation"
            })
        } else {
            return res.json({
                message: "Sign up Success"
            })
        }
    })
}

const ReadUser = (req, res) => {
    Read((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "database connection error"
            })
        } else {
            return res.status(200).json({
                data: result
            })
        }
    })
}

const UpdateUser = (req, res) => {
    let data = req.body
    Update(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "database connection error"
            })
        } else if (!result) {
            return res.json({
                message: "No Record found !!!"
            })
        } else {
            return res.status(200).json({
                data: result
            })
        }
    })
}

const DeleteUser = (req, res) => {
    let id = req.params.id
    Delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error"
            })
        } else {
            return res.json({
                message: "Data successfully deleted"
            })
        }
    })
}

const Signin = (req, res) => {
    let data = req.body
    Signedin(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error"
            })
        } else if (result.length == 0) {
            return res.json({
                message: "Record Not Found Please Sign Up !!!"
            })
        } else {
            return res.json({
                message: "You are signed in"
            })
        }
    })
}

const forgotPassword = (req, res) => {
    let data = req.body
    ForgotPassWord(data, (err, result) => {
        if (result) {
            return res.json({
                data: result
            })
        } else if (result == undefined) {
            return res.json({
                message: "A Reset Password mail has been sent to your account"
            })
        } else {
            return res.status(500).json({
                message: result
            })
        }
    })
}

const resetPassword = (req, res) => {
    let { token, newpass } = req.body
    ResetPassword({ token, newpass }, (err, result) => {
        if (result) {
            return res.json({
                data: result
            })
        } else {
            return res.status(500).json({
                message: err
            })
        }
    })
}


module.exports = { Signup, activateAccount, ReadUser, UpdateUser, DeleteUser, Signin, forgotPassword, resetPassword }