const mongoose = require("mongoose");
const Product = require("./product");

let cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number
    }
  },
  { timestamps: true }
);

cartSchema.pre('save', function(next) {
    return Product.findOne({
        _id: this.productId,
        stock: { $lt: this.quantity }
    })
    .then(data => {
        if(data) {
            throw ({ code : 400, message: 'Item out of stock' })
        }else {
          next()
        }
    }).catch(err=> {
        throw(err)
    })
})

let Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
