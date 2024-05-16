const cartModel = require('../model/cartModel')
const productModel = require('../../product/model/productModel')


const addToCart = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let productId = req.params.productId
        if (!productId) {
            return res.status(400).send({
                status: false,
                message: `productId is required`
            })
        }
        let getProductById = await productModel.findById(productId)

        let getCartOfUser = await cartModel.findOne({
            userId: userId
        })
        if (getCartOfUser) {
            for (let i = 0; i < getCartOfUser.items.length; i++) {
                if (getCartOfUser.items[i].productId == productId) {
                    return res.status(400).send({
                        status: false,
                        message: `this productId- ${productId}, already added to your cart list`
                    })
                }
            }
            let obj = {
                userId: userId,
                items: {
                    productId: productId,
                    productQuantity: 1,
                    productPrice: getProductById.includingGST_amount
                },
                totalPrice: getCartOfUser.totalPrice + getProductById.includingGST_amount,
                totalItems: getCartOfUser.totalItems + 1
            }
            let getUpdated = await cartModel.findByIdAndUpdate(getCartOfUser._id,
                { userId: obj.userId, totalPrice: obj.totalPrice, totalItems: obj.totalItems, $push: { items: obj.items } },
                { new: true }
            )
            return res.status(200).send({
                status: true,
                message: `successfully added to cart of userId- ${userId}`,
                data: getUpdated
            })
        }

        let obj = {
            userId: userId,
            items: {
                productId: productId,
                productQuantity: 1,
                productPrice: getProductById.includingGST_amount
            },
            totalPrice: getProductById.includingGST_amount,
            totalItems: 1
        }
        let createCartOfUser = await cartModel.create(obj)
        return res.status(200).send({
            status: true,
            message: `successfully added to cart of userId- ${userId}`,
            data: createCartOfUser
        })

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const increaseTheProduct = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let productId = req.params.productId
        if (!productId) {
            return res.status(400).send({
                status: false,
                message: `productId is required`
            })
        }
        let getProductById = await productModel.findById(productId)
        if (!getProductById) {
            return res.status(400).send({
                status: false,
                message: `productId not present in db`
            })
        }
        let getCartOfUser = await cartModel.findOne({
            userId: userId
        }).populate('items.productId')
        if (!getCartOfUser) {
            return res.status(400).send({
                status: false,
                message: `cart not created`
            })
        }
        // console.log(getProductById, getCartOfUser)

        let totalAmount = getCartOfUser.totalPrice
        for (let i = 0; getCartOfUser.items.length; i++) {
            // console.log(getCartOfUser.items[i].productId._id == productId) 
            if (getCartOfUser.items[i].productId._id == productId) {
                getCartOfUser.items[i].productQuantity++
                getCartOfUser.items[i].productPrice += getProductById.includingGST_amount
                totalAmount += getProductById.includingGST_amount
                break
            }
        }
        getCartOfUser.totalPrice = totalAmount
        getCartOfUser.totalItems = getCartOfUser.items.length
        let getUpdated = await cartModel.findByIdAndUpdate(getCartOfUser._id,
            { $set: getCartOfUser },
            { new: true }
        )
        return res.status(200).send({
            status: true,
            message: `successfully added to cart of userId- ${userId}`,
            data: getUpdated
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const decreaseTheProduct = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let productId = req.params.productId
        if (!productId) {
            return res.status(400).send({
                status: false,
                message: `productId is required`
            })
        }
        let getProductById = await productModel.findById(productId)
        let getCartOfUser = await cartModel.findOne({
            userId: userId
        }).populate('items.productId')
        // console.log(getProductById, getCartOfUser)
        if (getCartOfUser.items.length == 0) {
            return res.status(400).send({
                status: false,
                message: `Cart is now empty`
            })
        }

        let totalAmount = getCartOfUser.totalPrice
        for (let i = 0; getCartOfUser.items.length; i++) {
            if (getCartOfUser.items[i].productQuantity <= 1) {
                getCartOfUser.items.splice(i, 1);
                getCartOfUser.totalItems = getCartOfUser.items.length
                getCartOfUser.totalPrice = totalAmount - getProductById.includingGST_amount
                let getUpdated = await cartModel.findByIdAndUpdate(getCartOfUser._id,
                    { $set: getCartOfUser },
                    { new: true }
                )
                return res.status(200).send({
                    status: true,
                    message: `successfully added to cart of userId- ${userId}`,
                    data: getUpdated
                })
            }
            if (getCartOfUser.items[i].productId._id == productId) {
                getCartOfUser.items[i].productQuantity--
                getCartOfUser.items[i].productPrice -= getProductById.includingGST_amount
                totalAmount = totalAmount - getProductById.includingGST_amount
                break
            }
        }
        getCartOfUser.totalPrice = totalAmount
        getCartOfUser.totalItems = getCartOfUser.items.length
        // console.log(getCartOfUser)
        let getUpdated = await cartModel.findByIdAndUpdate(getCartOfUser._id,
            { $set: getCartOfUser },
            { new: true }
        )
        return res.status(200).send({
            status: true,
            message: `successfully added to cart of userId- ${userId}`,
            data: getUpdated
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const getCart = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let getCartOfUser = await cartModel.findOne({
            userId: userId
        }).populate('items.productId')
        if (!getCartOfUser) {
            return res.status(400).send({
                status: false,
                message: `empty cart- No Product Added`
            })
        }
        return res.status(200).send({
            status: true,
            message: `list of cart`,
            data: getCartOfUser
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const removeFromCart = async (req, res) => {
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let productId = req.params.productId
        if (!productId) {
            return res.status(400).send({
                status: false,
                message: `productId is required`
            })
        }

        let getCartOfUser = await cartModel.findOne({
            userId: userId
        }).populate('items.productId')
        for (let i = 0; getCartOfUser.items.length; i++) {
            if (getCartOfUser.items[i].productId._id == productId) {
                getCartOfUser.totalPrice -= getCartOfUser.items[i].productPrice
                getCartOfUser.items.splice(i, 1)
                getCartOfUser.totalItems = getCartOfUser.items.length
                let getUpdated = await cartModel.findByIdAndUpdate(getCartOfUser._id,
                    { $set: getCartOfUser },
                    { new: true }
                )
                return res.status(200).send({
                    status: true,
                    message: `successfully added to cart of userId- ${userId}`,
                    data: getUpdated
                })
            }
        }
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}



const applyCoupon = async (req, res) => {
    try {
        let couponCode = req.query.couponCode
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let productId = req.params.productId
        if (!productId) {
            return res.status(400).send({
                status: false,
                message: `productId is required`
            })
        }

        let getCartOfUser = await cartModel.findOne({
            userId: userId
        }).populate('items.productId')

        for (let i = 0; getCartOfUser.items.length; i++) {
            if (getCartOfUser.items[i].productId.couponCode) {
                // console.log(getCartOfUser.items[i].productId.couponCode)
                if (getCartOfUser.items[i].productId.couponCode == couponCode) {
                    return res.status(200).send({
                        status: true,
                        message: `couponCode matched`,
                        data: 100
                    })
                }
                else {
                    return res.status(400).send({
                        status: false,
                        message: `couponCode does not matched`
                    })
                }
            }

        }

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    addToCart,
    increaseTheProduct,
    decreaseTheProduct,
    getCart,
    removeFromCart,
    applyCoupon
}