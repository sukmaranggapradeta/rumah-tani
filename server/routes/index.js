const route = require('express').Router()
const { 
    ControllerUser, 
    ControllerProduct, 
    ControllerCart, 
    ControllerTransaction,
     } = require('../controllers')
const { authenticate } = require('../middlewares/auth')

route.get('/', (req, res) => {res.status(200).json({message: 'Connect'})})
route.get('/authenticate',authenticate,(req,res)=>{ res.status(200).json({})})
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)

route.post('/product/:userId', ControllerProduct.create)
route.get('/product/all/:userId',  ControllerProduct.findAll) // userId : 'null' to get All data for consumer
route.get('/product/:id',  ControllerProduct.findOne)
route.put('/product/:id', ControllerProduct.update)
route.delete('/product/:id',  ControllerProduct.delete)

route.post('/cart', ControllerCart.create)
route.get('/cart/:id', ControllerCart.findOne)
route.get('/cart/all/:userId', ControllerCart.findAll)
route.put('/cart/:id', ControllerCart.update)
route.delete('/cart/:id', ControllerCart.delete)

route.post('/transaction/:userId', ControllerTransaction.create)
route.get('/transaction/:id', ControllerTransaction.findOne)
route.get('/transaction/all/:userId', ControllerTransaction.findAll)
route.put('/transaction/:id', ControllerTransaction.create)
route.delete('/transaction/:id', ControllerTransaction.create)

route.use('/*', (req, res) => res.status(404).json({error: 'Not Found :('}))

module.exports = route