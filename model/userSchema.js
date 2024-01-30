const mongoose = require('mongoose')
const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,

    },
    country: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now

    }
});

const user = mongoose.model("Users", User);

module.exports = user;


