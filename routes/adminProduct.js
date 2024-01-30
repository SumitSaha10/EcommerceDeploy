const express = require("express");
const router = express.Router()
const ProductSchema = require('../model/productSchema')
const jwt = require('jsonwebtoken')

//Route POST: Login for admin.
router.post('/loginforadmin', async (req, res) => {
    const { username, password } = req.body;
    let success = false;
    try {
        if (!username || !password) {
            res.send({ success, error: "Please enter correct credentials." })
        }
        if (username == process.env.USER_NAME && password == process.env.PASSWORD) {
            const data = {
                adminuser: {
                    id: password,
                }
            }
            const authtoken = jwt.sign(data, process.env.JWT_SECRET)
            success = true
            res.send({ success, authtoken })
        } else {
            res.send({ success, error: "Please enter correct credentials." })
        }
    } catch (error) {
        res.status(400).send("Internal server error")
    }
})

//Route 1 POST: for creating a product
router.post("/create-admin-product", async (req, res) => {
    const { productImage, productName, productQuantity, productPrice, productDescription } = req.body;
    try {
        const product = new ProductSchema({
            productImage, productName, productQuantity, productPrice, productDescription
        })
        const setProduct = await product.save()
        res.send(setProduct)
    } catch (error) {
        res.status(400).send("Some internal error occured")
    }
})


//Route 2 GET: to fetch all the products
router.get('/getallproductsstock', async (req, res) => {
    try {
        let products = await ProductSchema.find()
        res.send(products)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Route 3 PUT: for updating a particular product
router.put('/updateproduct/:id', async (req, res) => {
    const { productImage, productName, productQuantity, productPrice, productDescription } = req.body;
    try {
        let updateProduct = { productImage: productImage, productName: productName, productQuantity: productQuantity, productPrice: productPrice, productDescription: productDescription }

        let product = await ProductSchema.findByIdAndUpdate(req.params.id, { $set: updateProduct }, { new: true })
        res.json(product)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//Route 4 DELETE: for deleting product
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        let product = await ProductSchema.findByIdAndDelete(req.params.id)
        res.send(product);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = router;