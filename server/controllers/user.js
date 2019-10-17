const { compare } = require('../helpers/bcryptjs')
const { User } = require('../models')

class ControllerUser {
    static login(req, res, next) {
        let { email, password } = req.body
        User
         .findOne({ email })
         .then(user => {
            if (!user) {
                throw({ code : 400, message: 'Username/ password invalid' })
            } else {
                if (!password){
                    throw ({ code : 400, message: 'Username/ password invalid' })
                }
                if (!compare(password, user.password)) {
                    throw({ code : 400, message: 'Username/ password invalid' })
                } else {
                    res.status(200).json({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role 
                     })
                }
            }
         })
         .catch(next)
    }
    static create (req,res, next) {
        let { name, email, password, role } = req.body
        User
         .create({
             email,
             password,
             name,
             role
         })
         .then(data =>{
            res.status(201).json({ 
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            })
         })
         .catch(next)
    }
}
module.exports = ControllerUser