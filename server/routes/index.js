const route = require("express").Router();
const {
  ControllerUser,
  ControllerProduct,
  ControllerCart,
  ControllerTransaction
} = require("../controllers");
const { authenticate } = require("../middlewares/auth");
const multer = require("multer");

// const multerConf = {
//   storage: multer.diskStorage({
//     destination: function(req, file, next) {
//       next(null, "./public/products");
//     },
//     filename: function(req, file, next) {
//       const ext = file.mimetype.split("/")[1];
//       next(null, file.fieldname + "-" + Date.now() + "." + ext);
//     }
//   }),
//   fileFilter: function(req, file, next) {
//     if (!file) {
//       next();
//     }
//     const image = file.mimetype.startsWith("image/");
//     if (image) {
//       next(null, true);
//     } else {
//       next({ message: "File type not supported" }, false);
//     }
//   }
// };

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/products/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage });

// const upload = multer({
//   dest: "./public/products/"
// });

route.get("/", (req, res) => {
  res.status(200).json({ message: "Connect" });
});
route.get("/authenticate", authenticate, (req, res) => {
  res.status(200).json({});
});
route.post("/register", ControllerUser.create);
route.post("/login", ControllerUser.login);
route.get("/user/:role", ControllerUser.findAll);
route.get("/user/profile/:userId", ControllerUser.findOne);
route.put("/user/:userId", ControllerUser.update);
route.delete("/user/:userId", ControllerUser.delete);
route.post("/products/image/upload", upload.single("image"), function(req,res,next) {
  res.status(201).json(req.file);
});
route.post("/transaksi/image/upload", upload.single("image"), function(req,res,next) {
  res.status(201).json(req.file);
});
route.post("/user/image/upload", upload.single("image"), function(req,res,next) {
  res.status(201).json(req.file);
});
route.post("/product/:userId", ControllerProduct.create);
route.get("/product/all/:userId", ControllerProduct.findAll); // userId : 'null' to get All data for consumer
route.get("/product/:id", ControllerProduct.findOne);
route.put("/product/:id", ControllerProduct.update);
route.delete("/product/:id", ControllerProduct.delete);

route.post("/cart", ControllerCart.create);
route.get("/cart/:id", ControllerCart.findOne);
route.get("/cart/all/:userId", ControllerCart.findAll);
route.put("/cart/:id", ControllerCart.update);
route.delete("/cart/:id", ControllerCart.delete);

route.post("/transaction/:userId", ControllerTransaction.create);
route.get("/transaction/:id", ControllerTransaction.findOne);
route.get("/transaction/all/customer/:userId", ControllerTransaction.findAll);
route.get("/transaction/all/farmer/:userId", ControllerTransaction.findAllFarmer);
route.put("/transaction/:id", ControllerTransaction.update);
route.delete("/transaction/:id", ControllerTransaction.delete);

route.use("/*", (req, res) => res.status(404).json({ error: "Not Found :(" }));

module.exports = route;
