const { Transaction } = require('../models')
const { User } = require('../models')
const { Cart } = require('../models')

class ControllerTransaction {
    static create(req, res, next) {
        let userId = req.params.userId
        let input = { ...req.body, ...{ userId } }
        Transaction.create(input)
            .then(data => {
                return Cart.deleteMany({userId})
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findAll(req, res, next) { 
        let userId = req.params.userId
            Transaction.find({userId}).sort([['createdAt', -1]])
              .then(data => {
              res.status(200).json(data)
            })
              .catch(next)
    }
    static findOne(req, res, next) {
        Transaction.findOne({ _id: req.params.id })
          .then(data => {
              res.status(200).json(data)
          })
          .catch(next)
    }
    static update(req, res, next) {
        let input = {...req.body}
        Transaction.findOne({_id: req.params.id})
          .then(transaction => {
            transaction.set(input)    
            return transaction.save()
          })
          .then(data => {
            res.status(200).json(data)
          })
          .catch(next)
    }
    static delete(req, res, next) { 
        Transaction.findByIdAndDelete({ _id: req.params.id })
        .then(data => {
            res.status(200).json({ message: 'Delete successfully' })
        })
        .catch(next)
    }

}

module.exports = ControllerTransaction