const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: "user_details",
        required: true,
        unique: true
    },

    items: [{
        productId: {
            type: ObjectId,
            ref: "product_details",
            required: true,
            unique: true
        },
        productQuantity: {
            type: Number,
        },
        productPrice: {
            type: Number,
        }

    }],

    totalPrice: {
        type: Number,
        required: true,
    },

    totalItems: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('user_carts', cartSchema);  
