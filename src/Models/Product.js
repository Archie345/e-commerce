const mongoose = require("mongoose")


const product = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: url,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
    attributes: {
        type: String,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model("Forms", form);