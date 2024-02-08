const express = require("express")

const app = express()

require('dotenv').config()
const port = 6000
const cors = require("cors")
const path = require("path");


const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY)
const connectToMongo = require("./db")
connectToMongo()
app.use(express.json({ limit: '5mb' }))


app.use(cors({
    origin: "http://localhost:3000",
}))

//static files





app.post("/checkout", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.productName
                        },
                        unit_amount: (item.productPrice) * 100
                    },
                    quantity: item.productQuantity * 1
                }
            }),
            success_url: "https://ecommerce-ruddy-six.vercel.app?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "https://ecommerce-ruddy-six.vercel.app"
        })
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.use("/api/auth", require("./routes/user"))
app.use("/api/senddata", require("./routes/senddata"))
app.use("/api/orders", require("./routes/orders"))
app.use('/api/admin90', require("./routes/adminProduct"))


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get('/order/success', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);

    res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});

app.listen(port, () => {
    console.log(`Ecommerce app listening in http://localhost:${port}`)
})