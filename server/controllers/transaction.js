const { Transaction } = require("../models");
const { User } = require("../models");
const { Cart } = require("../models");
const { Product } = require("../models");

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
                if (data.length === 0) {
                  res.status(200).json([]);
                } else {
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
              }
              })
              .catch(next)
    }
    static async findAllFarmer(req, res, next) { 
      var userId = req.params.userId
      var newData = []
      var promise1 = Transaction.find().sort([['createdAt', -1]])
      var promise2 = Product.find({userId})
      var finalResult = []
      await Promise.all([promise1,promise2])
          .then(async values => {
            await values[0].forEach(async(transaction,iTransaction)=>{
              await transaction.carts.forEach(async (cart,iCart)=> {
                await values[1].forEach(async (product,iProduct)=>{
                  if(cart.productId == product._id){
                      var obj = {}
                      obj.status = transaction.status
                      obj.namaPemesan = cart.username
                      obj.totalHarga = Number(product.price) * Number(cart.quantity)
                      obj.barang = product.name
                      obj.gambar = product.image || "no image"
                      obj.dataPenerima = transaction.receiverData
                      obj.buktiPembayaran = transaction.paymentSlip
                      obj.totalPesananan = cart.quantity
                      obj.deskripsiBarang = product.description
                      obj.tanggalPemesanan = transaction.createdAt
                      obj.noInvoice = transaction._id
                      newData.push(obj)
                  }
                }
              );
            });
          });
        }
      })
      .catch(next);
  }
  static findAllFarmer(req, res, next) {
    let userId = req.params.userId;
    let newData = [];
    let promise1 = Transaction.find().sort([["createdAt", -1]]);
    let promise2 = Product.find({ userId });
    Promise.all([promise1, promise2])
      .then((values) => {
        values[0].forEach((transaction, iTransaction) => {
          transaction.carts.forEach((cart, iCart) => {
            values[1].forEach((product, iProduct) => {
              if (cart.productId == product._id) {
                let obj = {};
                obj.status = transaction.status;
                obj.customer = cart.userId;
                obj.totalPrice = Number(product.price) * Number(cart.quantity);
                obj.product = product.name;
                obj.image = product.image || "no image";
                newData.push(obj);
              }
            });
          });
        });
        res.status(200).json(newData);
      })
      .catch((err) => console.log(err));
  }
  static findOne(req, res, next) {
    Transaction.findOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let input = { ...req.body };
    Transaction.findOne({ _id: req.params.id })
      .then((transaction) => {
        transaction.set(input);
        return transaction.save();
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    Transaction.findByIdAndDelete({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({ message: "Delete successfully" });
      })
      .catch(next);
  }
}

module.exports = ControllerTransaction;
