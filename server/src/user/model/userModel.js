const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    address : {
        type : String
    }

}, { timestamps: true });

module.exports = mongoose.model('user_details', userSchema);  
