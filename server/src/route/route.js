const express = require('express')
const router = express.Router()



// product api's
const productController = require('../product/controller/productController')
router.post('/createProduct', productController.createProduct)
router.get('/:userId/getProductList', productController.getProductList)

// user api's
const userController = require('../user/controller/userController')
router.post('/registerAndLogin', userController.createUser)
router.get('/userDetails/:userId', userController.getUser)


// cart api's
const cartController = require('../cart/controller/cartController')
router.post('/addToCart/:userId/:productId', cartController.addToCart)
router.patch('/increaseTheProductCount/:userId/:productId', cartController.increaseTheProduct)
router.patch('/decreaseTheProductCount/:userId/:productId', cartController.decreaseTheProduct)
router.get('/getCart/:userId', cartController.getCart)
router.put('/removeFromCart/:userId/:productId', cartController.removeFromCart)
router.get('/applyCoupon/:userId/:productId', cartController.applyCoupon)


// ************ checking your end point valid or not 
router.all("/**", function (req, res) {
    return res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = router