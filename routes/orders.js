const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const OrderSchema = require('../model/orderSchema')
const { body, validationResult } = require('express-validator');
const router = express.Router()

//Route 1 : Creating order 
router.post('/createorder', fetchuser, [
    body('productId', "Product id can not be empty").isLength({ minLength: 1 }),
    body('productImage', "Image can not be empty").isLength({ minLength: 1 }),
    body('productName', "Enter a product name").isLength({ minLength: 1 }),
    body('productQuantity', "Qunatity can not be empty").isLength({ minLength: 1 }),
    body('productPrice', "price can not be empty").isLength({ minLength: 1 }),

], async (req, res) => {
    //If there are errors return bad requests
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, productImage, productName, productQuantity, productPrice } = req.body;
    try {
        const order = new OrderSchema({
            productId, productImage, productName, productQuantity, productPrice, user: req.id
        })
        const setorder = await order.save()
        success = true
        res.send({ success, setorder })
    } catch (error) {
        res.status(404).send("Some internal error occured")
    }
})

//Route 2 : Fetch all orders

router.post('/fetchallorders', fetchuser, async (req, res) => {
    try {
        const orders = await OrderSchema.find({ user: req.id });
        res.send(orders);
    } catch (error) {
        res.status(404).send("Some internal error occured")
    }
})

module.exports = router