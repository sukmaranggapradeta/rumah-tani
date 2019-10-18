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
             role: role.toLowerCase()
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
    static findAll (req, res, next) {
        User.find({role : req.params.role})
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
    }
    static findOne (req, res, next) {
        User.findOne({_id: req.params.userId})
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
    }
    static update (req, res, next) {
        let input = { ...req.body}
        User.findOneAndUpdate({_id: req.params.userId}, input, {new: true})
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
    }
    static delete (req, res, next) {
        User.findOneAndDelete({ _id: req.params.userId })
         .then(() => {
            res.status(200).json({ message: 'Delete successfully' })
         })
         .catch(next)
    }
}
module.exports = ControllerUser