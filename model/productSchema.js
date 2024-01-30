const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = new Schema({
    productImage: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    productQuantity: {
        type: String,
        require: true,

    },
    productPrice: {
        type: String,
        require: true,

    },
    productDescription: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now

    }
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;


