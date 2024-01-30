import React, { useContext } from 'react'
import "./Cart.css"
// import p from "../Assets/1.jpg"
import cartContext from '../context/cartContext';
import Subtotal from './Subtotal';
const Cart = (props) => {
  const context = useContext(cartContext)
  const { cartItems, handleAddProduct, handleRemoveProduct } = context

  return (
    <div className='cart-container'>
      <div className='cart-items'>
        <header className='cart-items-header'>Cart Items : {cartItems.length}</header>
        <div className='cart-items-item'>
          {cartItems.length === 0 ?
            (<div className="cart-empty">No items are added</div>) : (cartItems.map((items) => {
              return <div key={items._id} className='cart-items-cell'>
                <p className="item-name">{items.productName}</p>
                <img alt="this" src={items.productImage} />
                <div className='btn btn-add-sub'>
                  <button className='btn btn-add' onClick={() => handleAddProduct(items)}>+</button>
                  <button className='btn btn-remove' onClick={() => handleRemoveProduct(items)}>-</button>
                </div>
                <p className='item-quantity'>Quantity: {items.productQuantity}</p>
                <p className='item-price'>Price: ${items.productPrice}</p>
                <p className='item-total'>Total: ${items.productQuantity * items.productPrice}</p>
              </div>
            }))
          }
        </div>
      </div>
      {cartItems.length > 0 ? <Subtotal /> : ""}
    </div>
  )
}

export default Cart
