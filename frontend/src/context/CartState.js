import React, { useState } from 'react'

import CartContext from './cartContext'

const CartState = (props) => {

    const [cartItems, setCartItems] = useState([]);

    const totalAmount = cartItems.reduce((price, item) => price + item.productQuantity * item.productPrice, 0)

    const handleAddProduct = (product) => {

        const productExt = cartItems.find((item) => item._id === product._id);
        if (productExt) {
            setCartItems(cartItems.map((item) => item._id === product._id ? { ...productExt, productQuantity: productExt.productQuantity + 1 } : item));
        }
        else {
            setCartItems([...cartItems, { ...product, productQuantity: 1 }]);
        }

    }

    const handleRemoveProduct = (product) => {
        const productExt = cartItems.find((item) => item._id === product._id);
        if (productExt.productQuantity === 1) {
            setCartItems(cartItems.filter((item) => item._id !== product._id));
        }
        else {
            setCartItems(
                cartItems.map((item) => item._id === product._id ? { ...productExt, productQuantity: productExt.productQuantity - 1 } : item)
            )
        }
    }


    return (
        <CartContext.Provider value={{ cartItems, handleAddProduct, handleRemoveProduct, totalAmount }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;