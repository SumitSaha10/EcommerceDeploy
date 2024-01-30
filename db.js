const mongoose = require("mongoose")
const url = "mongodb+srv://sumit:sumitmongo@cluster0.kulcaui.mongodb.net/eCommerce?retryWrites=true&w=majority";

const connectToMongo = async () => {
    await mongoose.connect(url)
    console.log("Connected to database successfully")

}

module.exports = connectToMongo