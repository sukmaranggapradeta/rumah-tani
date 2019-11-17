const { Transaction } = require('../models')
const { User } = require('../models')
const { Cart } = require('../models')
const { Product } = require('../models')

class ControllerTransaction {
    static create(req, res, next) {
        let userId = req.params.userId
        let input = { ...req.body, ...{ userId } }
        let transactionData = []
        Transaction.create(input)
            .then(data => {
              transactionData = data
                return Cart.deleteMany({userId})
            })
            .then(data => {
                res.status(200).json(transactionData)
            })
            .catch(next)
    }
    static findAll(req, res, next) { 
        let userId = req.params.userId
        let newData = []
            Transaction.find({userId}).sort([['createdAt', -1]])
              .then(data => {
                data.forEach((el,i)=>{
                  newData.push(el)
                  el.carts.forEach((elCart,iCart)=>{
                    Product.findById({_id: elCart.productId})
                    .then(product => {
                      newData[i].carts[iCart].products = product
                      if(i == data.length - 1 && iCart == el.carts.length -1){
                        res.status(200).json(newData)
                      }
                    })
                  })
                })
              })
              .catch(next)
    }
    static findAllFarmer(req, res, next) { 
      let userId = req.params.userId
      let newData = []
          Transaction.find().sort([['createdAt', -1]])
            .then(data => {
              data.forEach((el,i)=>{
                el.carts.forEach((elCart,iCart)=>{
                  Product.findById({_id: elCart[iCart].productId})
                  .then(product => {
                    
                  })
                })
              })
          })
          .catch(err => console.log(err))
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