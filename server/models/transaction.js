const mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'pending'
    },
    totalPrice: {
        type: String
    },
    carts: [Object]
},{ timestamps: true })

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction