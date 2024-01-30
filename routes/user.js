const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../model/userSchema');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "Mywebtoken@"
const fetchuser = require('../middleware/fetchuser')
//Route 1 : Sign in 

router.post('/createuser', [
    body('name', "Name must be at least 3 characters").isLength({ min: 5 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 8 characters").isLength({ min: 8 }),
    body('country', "Country cannot be empty").isLength({ min: 1 }),
    body('state', "State cannot be empty").isLength({ min: 1 }),
    body('phone', "Please enter a valid phone number").isLength({ min: 10, max: 10 }).isNumeric(),
    body('address', "Address cannot be empty").isLength({ min: 12 })

], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ success, error: "Please enter an valid email" });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = bcrypt.hashSync(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            country: req.body.country,
            state: req.body.state,
            phone: req.body.phone,
            address: req.body.address,

        })

        const data = {
            user: {
                id: user._id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY)
        success = true;
        res.json({ success, authToken })
    }
    catch (err) {

        res.status(500).send("Some error occured")
    }
})

//ROUTE 2 : Login Route

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 8 characters").isLength({ min: 8 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { email, password } = req.body
        let user = await User.findOne({ email: email });
        if (!user) {
            success = false
            return res.status(404).json({ success, error: "Please try to login with correct credentials" });
        }

        const cPassword = await bcrypt.compare(password, user.password)
        if (!cPassword) {
            success = false;
            return res.status(404).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user._id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY)
        success = true;
        res.json({ success, authToken })
    }
    catch (err) {

        res.status(500).send("Some error occured")
    }
})

//Route 3 : get logged in user details

router.post('/getuser', fetchuser, async (req, res) => {
    let success = false
    try {
        const userid = req.id;
        const user = await User.findOne({ _id: userid }).select("-password");
        success = true
        res.send({ success, user });
    }
    catch (err) {

        res.status(500).send("Some error occured")
    }
});

module.exports = router