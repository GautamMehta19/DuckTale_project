const productModel = require('../model/productModel')


const createProduct = async (req, res) => {
    try {
        let data = req.body
        let { productName, price, couponCode, discount, GST_amount } = data
        if (!productName || !price) {
            return res.status(400).send({
                status: false,
                message: 'productName, price are required'
            })
        }
        let discountedAmount = price
        if(!discount){
            data.discount = 0
        }
        if (discount) {
            if (discount > price) {
                return res.status(400).send({
                    status: false,
                    message: 'discount amount not be greater then the price'
                })
            }
            discountedAmount = price - discount
        }
        data.discountedAmount = discountedAmount

        let includingGST_amount = discountedAmount
        if(!GST_amount){
            data.GST_amount = 0
        }
        if (GST_amount) {
            GST_amount = discountedAmount * (GST_amount / 100)
            includingGST_amount = GST_amount + discountedAmount
        }
        data.includingGST_amount = includingGST_amount

        let createProduct = await productModel.create(data)
        return res.status(201).send({
            status: true,
            message: 'succesfully created product',
            data: createProduct
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const getProductList = async (req, res)=>{
    try{
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).send({
                status: false,
                message: `userId is required`
            })
        }
        let getProduct = await productModel.find()
        return res.status(200).send({
            status: false,
            message : `got all product list`,
            data : getProduct
        })

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    createProduct,
    getProductList
}