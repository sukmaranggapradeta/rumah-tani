const { Cart } = require("../models");

class ControllerCart {
  static create(req, res, next) {
    let input = { ...req.body };
    Cart.create(input)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(next);
  }
  static findOne(req, res, next) {
    Cart.findOne({ _id: req.params.id })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
  static findAll(req, res, next) {
    Cart.find({ userId: req.params.userId })
      .populate("userId")
      .populate("productId")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
  static update(req, res, next) {
    console.log("masuk update", req.body, req.params.id);
    let input = { ...req.body };
    Cart.findOne({ _id: req.params.id })
      .then((cart) => {
        console.log(input, "hasilnya ", cart);
        cart.set(input);
        console.log("sebelum return");
        return cart.save();
      })
      .then((user) => {
        console.log("then 2", user);
        res.status(200).json(user);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    Cart.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({ message: "delete successfully" });
      })
      .catch(next);
  }
  static deleteAll(req, res, next) {
    Cart.deleteMany({ userId: req.params.userId })
      .then((data) => {
        res.status(200).json({ message: "delete successfully" });
      })
      .catch(next);
  }
}

module.exports = ControllerCart;
