const { Product } = require('../models')
const multer = require('multer')
var upload = multer({ dest: './contents' })

class ControllerProduct {
   static create(req, res, next) {
      let { name, description, stock, price} = req.body
      let { userId } = req.params
      Product
         .create({ name, description, stock, price, userId })
         .then(data => {
            res.status(201).json(data)
         })
         .catch(next)
   }
   static findAll(req, res, next) {
      if(req.params.userId == 'null') {
         Product.find()
            .then(data => {
               res.status(200).json(data)
            })
            .catch(next)
      }else {
         Product.find({userId: req.params.userId})
            .then(data => {
               res.status(200).json(data)
            })
            .catch(next)
      }
   }
   static findOne(req, res, next) {
      Product.findOne({ _id: req.params.id })
         .then(data => {
            res.status(200).json(data)
         })
         .catch(next)
   }
   static update(req, res, next) {
      let input = { ...req.body}
      Product.findOneAndUpdate({ _id: req.params.id }, input, { new: true })
         .then(data => {
            res.status(200).json(data)
         })
         .catch(next)
   }
   static delete(req, res, next) {
      Product.findOneAndDelete({ _id: req.params.id })
         .then(() => {
            res.status(200).json({ message: 'Delete successfully' })
         })
         .catch(next)
   }
}
module.exports = ControllerProduct