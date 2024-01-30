import React, { useEffect, useState } from 'react'
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const response = await fetch(`${window.location.origin}/api/orders/fetchallorders`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('auth')
            }
        })

        const json = await response.json()
        setOrders(json)

    }


    return (
        <div className='container flex flex-col bg-slate-200'>
            <h2 className='mx-auto text-2xl font-semibold'>My Orders</h2>
            {orders.length === 0 ?
                (<div className="text-xl font-semibold">No orders are made</div>) :
                (orders.map((item) => {
                    return <div key={item._id} className='flex justify-center flex-wrap'>
                        <div className="card w-72 m-3">
                            <img className="card-image" src={item.productImage} alt=" not loaded" />
                            <div className="card-body">
                                <h3 className="card-title" >{item.productName}</h3>

                                <p className="card-price">$ {item.productPrice}</p>
                                <p>Order id: {item._id}</p>
                                <p>Date: {item.date}</p>

                            </div>
                        </div>
                    </div>


                }))

            }


        </div>
    )
}

export default Orders
