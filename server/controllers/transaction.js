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
    static async findAll(req, res, next) { 
        let userId = req.params.userId
        let newData = []
            await Transaction.find({userId}).sort([['createdAt', -1]])
              .then(async data => {
                await data.forEach(async(el,i)=>{
                  await newData.push(el)
                  await el.carts.forEach(async(elCart,iCart)=>{
                    await Product.findById({_id: elCart.productId})
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
      let promise1 = Transaction.find().sort([['createdAt', -1]])
      let promise2 = Product.find({userId})    
      Promise.all([promise1,promise2])
          .then(values => {
            values[0].forEach((transaction,iTransaction)=>{
              transaction.carts.forEach((cart,iCart)=> {
                values[1].forEach((product,iProduct)=>{
                  if(cart.productId == product._id){
                      let obj = {}
                      obj.status = transaction.status
                      obj.customer = cart.userId
                      obj.totalPrice = Number(product.price) * Number(cart.quantity)
                      obj.product = product.name
                      obj.image = product.image || "no image"
                      newData.push(obj)
                  }
                })
              })
            })
            res.status(200).json(newData)
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