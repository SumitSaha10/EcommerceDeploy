import React, { useContext, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';
import './Cards.css'

// import products from '../product';
import cartContext from '../context/cartContext';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { useToast } from '@chakra-ui/react';


export default function Cards(props) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getallProducts()
  }, [1])

  const [{ user, product, searchProducts }, dispatch] = useStateValue()

  //Func to get all the products from the database
  const getallProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${window.location.origin}/api/admin90/getallproductsstock`, {
        method: 'GET',

      });
      const json = await response.json()
      setProducts(json)
      dispatch({
        type: 'SEARCH_PRODUCTS',
        searchProducts: json
      })
      setLoading(false)
    } catch (error) {
      alert("Failed to fetch ")
    }
  }

  const [products, setProducts] = useState([])
  const toast = useToast()
  const showToast = () => {
    toast({
      title: "Added to Cart",
      description: "Item added to cart",
      duration: 2000,
      isClosable: true,

    })
  }

  // const { handleAddProduct } = props;
  const navigate = useNavigate()
  const context = useContext(cartContext)
  const { handleAddProduct } = context
  const buyNow = (element) => {
    if (!user) {
      navigate('/login')
    }
    else {
      navigate('/cart')
      handleAddProduct(element)
    }
  }

  const addTocart = (element) => {
    if (!user) {
      navigate('/login')
    }
    else {
      handleAddProduct(element)
      showToast()
    }
  }

  const setProductData = (element) => {
    dispatch({
      type: 'SET_PRODUCT',
      product: element
    })
    navigate('/productpage')
  }
  return (
    <div className='d-flex justify-content-center flex-wrap  my-5'>
      {
        loading ? <HashLoader color="#36d7b7" /> :

          products == [] || products == null ? "No Product found" :
            searchProducts.map((element) => {
              return <div key={element._id} className="card" style={{ "width": "18rem", "margin": "8px" }}>
                <img className="card-image" src={element.productImage} alt=" not loaded" />
                <div className="card-body">
                  <button onClick={() => setProductData(element)}><h3 className="card-title" >{element.productName}</h3></button>
                  <p className="card-description">{element.productDescription}</p>
                  <p className="card-price">$ {element.productPrice}</p>
                  <p className="card-rating">
                    {/* {Array(element.rating).fill().map((_, i) => { */}
                    {/*return*/} <p className='card-star'>⭐⭐⭐⭐⭐</p>
                    {/* })} */}
                  </p>
                  <div className='row'>
                    <button className="btn btn-primary" onClick={() => buyNow(element)}>Buy Now</button>
                    <button className="btn btn-info my-2" onClick={() => addTocart(element)}>Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
                  </div>
                </div>
              </div>
            })
      }


    </div>
  );
}


