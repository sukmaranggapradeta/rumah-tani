const mongoose = require('mongoose')

let cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity : {
        type: Number
    }
},{ timestamps: true })

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart