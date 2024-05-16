const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

    productImage: {
        type: String,
    },

    couponCode: {
        type: String
    },

    discount: {
        type: Number
    },

    discountedAmount: {
        type: Number
    },

    GST_amount: {
        type: Number
    },

    includingGST_amount: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model('product_details', productSchema);  
