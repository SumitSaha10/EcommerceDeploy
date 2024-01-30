import React, { useContext } from 'react'
import './CheckoutProduct.css'
import cartContext from '../context/cartContext';

const CheckoutProduct = ({ id, name, img, price, quantity, rating }) => {
    const context = useContext(cartContext)
    const { handleRemoveProduct } = context


    return (
        <div className='checkoutProduct' key={id}>
            <img className="checkoutProduct__image" src={img} alt='here is' />
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{name}</p>
                <p className='checkoutProduct__price'>
                    <strong>Qty: {quantity}</strong><br />
                    <small>$</small>

                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {
                        Array(rating)
                            .fill()
                            .map((_) => {
                                return <p>⭐</p>
                            })
                    }
                </div>
                <button onClick={() => handleRemoveProduct({ _id: id, productName: name, productImage: img, productQuantity: quantity, productPrice: price })}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
