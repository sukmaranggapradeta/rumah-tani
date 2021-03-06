const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    price: {
      type: String
    },
    stock: {
      type: Number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    satuan: {
      type: String
    }
  },
  { timestamps: true }
);

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
