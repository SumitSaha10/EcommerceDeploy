import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import cartContext from './context/cartContext'
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from '@chakra-ui/react';
export default function Navbar() {
  const [{ user, searchProducts }, dispatch] = useStateValue()
  const context = useContext(cartContext)
  const { cartItems } = context
  const navigate = useNavigate()
  const logout = () => {

    navigate('/')
    dispatch({
      type: "SET_USER",
      action: null
    })
    localStorage.removeItem("set-email")
    localStorage.removeItem("auth")
    window.location.reload()
  }

  const searchFilter = (e) => {
    if (e.keyCode == 8) {
      window.location.reload()
    } else {
      let data = searchProducts.filter(d => d.productName.toLowerCase().includes(e.target.value.toLowerCase()))

      dispatch({
        type: 'SEARCH_PRODUCTS',
        searchProducts: data
      })
    }

  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-light fw-bold" to="/">ecommerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/product">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/adminlogin">Admin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/cart"><i className="fa-solid fa-cart-shopping"></i>
                <span>{cartItems.length === 0 ? "" : cartItems.length}</span>
              </Link>
            </li>
            <li className="nav-item">
              {!user ?
                <Link className="nav-link text-light" to="/login">SignIn</Link>
                : <span className="nav-link text-light">{user}</span>}
            </li>
            {user ?
              <li className='nav-item'>
                <Menu>
                  <MenuButton>
                    <Avatar name={user} src='' className='bg-red-200' />
                  </MenuButton>
                  <MenuList>
                    <MenuItem><Link to='profile'>Personal Info</Link></MenuItem>
                    <MenuItem><i className="fa-solid fa-right-from-bracket text-black"></i><button onClick={logout}>Log out</button></MenuItem>

                  </MenuList>
                </Menu>

              </li> : ""}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onKeyDown={searchFilter} />

          </form>
        </div>
      </div>
    </nav>
  )
}

