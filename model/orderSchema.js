const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    productId: {
        type: String,
        require: true,
    },
    productImage: {
        type: String,
        require: true,
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

    date: {
        type: Date,
        default: Date.now

    }
});

const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;


