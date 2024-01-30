import React, { useContext, useState, useEffect } from 'react'
import './Payment.css';

import { Link } from 'react-router-dom';
import cartContext from '../context/cartContext';

import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import { useToast } from '@chakra-ui/react'


const Payment = () => {
    const toast = useToast()
    const context = useContext(cartContext)
    const { cartItems, totalAmount } = context
    const [userInfo, setUserInfo] = useState({ name: "", email: "", country: "", state: "", address: "", phone: "" })

    useEffect(() => {
        getUserInfo()
    }, [])

    const showToast = () => {
        toast({
            title: "Order added successfully",
            description: "Your order added successfully",
            duration: 3000,
            isClosable: true,
            status: 'success',
            position: 'top'

        })
    }

    const getUserInfo = async () => {
        try {
            if (localStorage.getItem('auth')) {
                const response = await fetch(`${window.location.origin}/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('auth')
                    },
                });

                const json = await response.json();
                setUserInfo({
                    name: json.user.name,
                    email: json.user.email,
                    country: json.user.country,
                    state: json.user.state,
                    address: json.user.address,
                    phone: json.user.phone
                })

            }
        } catch (e) {
            alert(e)
        }
    }

    // code for creating Order

    const createOrder = () => {

        try {
            if (localStorage.getItem('auth')) {
                cartItems.map(async (item) => {

                    const response = await fetch(`${window.location.origin}/api/orders/createorder`, {
                        method: 'POST',
                        headers: {
                            'auth-token': localStorage.getItem('auth'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId: item._id, productName: item.productName, productImage: item.productImage, productQuantity: item.productQuantity, productPrice: item.productPrice, })
                    });

                    await response.json();

                })
            }
            showToast()


        } catch (error) {
            alert("Server ploblem")
        }
    }

    const placeOrder = async (e) => {
        e.preventDefault()

        const items = cartItems
        //Stripe payment call
        try {
            const res = await fetch(`${window.location.origin}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({

                    items: items

                })

            })
            const data = await res.json()
            window.location = data.url




        } catch (error) {
            alert(error.message)
            console.log(error.message)
        }

        // Code for creating order
        createOrder()


    }
    return (
        <div className='payments'>
            <div className='payments__container'>
                <h1>
                    Checkout {<Link to='/checkout'>{cartItems?.length} items</Link>}
                </h1>
                {/* Payment Section - delivery section */}
                <div className='payments__section'>
                    <div className='payments__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payments__address'>
                        <p>{userInfo.name}</p>
                        <p>{userInfo.address}</p>
                        <p>{userInfo.state},{userInfo.country}</p>
                        <p>Ph: {userInfo.phone}</p>
                    </div>
                </div>
                {/* Payment Section - review items */}
                <div className='payments__section'>
                    <div className='payments__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payments__items'>
                        {cartItems.map(item => {
                            return <CheckoutProduct
                                key={item._id}
                                id={item._id}
                                name={item.productName}
                                img={item.productImage}
                                quantity={item.productQuantity}
                                price={item.productPrice}
                                rating={5} />
                        })}
                    </div>
                </div>
                {/* Payment Section -Payment method */}
                {cartItems.length > 0 ?
                    <div className='payments__section'>
                        <div className='payments__title'>
                            <h3>Payment Method</h3>
                        </div>
                        <div className='payments__details'>
                            {/* Stripe magic will go */}
                            <form /*onSubmit={handleSubmit}*/>
                                {/* <CardElement onChange={handleChange} /> */}
                                <div className='payments__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={totalAmount}
                                        displayType='text'
                                        thousandSeparator={true}
                                        prefix='$'


                                    />
                                    <button className='bg-sky-400 text-white p-1' onClick={placeOrder}>
                                        <span>Buy Now</span>
                                    </button>
                                </div>
                                {/* {error && <div>{error}</div>} */}
                            </form>
                        </div>
                    </div>
                    :
                    <div className='text-center text-2xl'>No Items left</div>}
            </div>
        </div>
    )
}

export default Payment
