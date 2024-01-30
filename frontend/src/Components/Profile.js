import React, { useEffect, useState } from 'react'
import './Profile.css'

import { Link } from 'react-router-dom'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({ name: "", email: "", country: "", state: "", address: "", phone: "" })
    const [divStyle, setDivStyle] = useState({
        display: "none",
        height: "100vh",
        width: "30%",
        backgroundColor: " rgb(255, 252, 247)",
    });
    const [bars, setBars] = useState(true)

    useEffect(() => {
        getUserInfo()
    }, [])

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

    const showSideBar = () => {
        setDivStyle({
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",

            width: "30%",
            backgroundColor: " rgb(255, 252, 247)",
        })
        setBars(false)
    }

    const closeSideBar = () => {

        setDivStyle({
            display: "none",
            height: "100vh",

            width: "30%",
            backgroundColor: " rgb(255, 252, 247)",
        })
        setBars(true)
    }

    return (
        <div className='profile mb-64'>
            {bars ? <button onClick={showSideBar}><i className="fa-solid fa-bars mb-96" ></i></button> : ""}
            <div className="sidebar" style={divStyle}>
                <button onClick={closeSideBar}><i class="fa-solid fa-xmark"></i></button>
                <h3><Link to="/profile">Profile Details</Link></h3>
                <h3><Link to="/cart">Your wish list</Link></h3>
                <h3><Link to="/orders">Your Orders</Link></h3>
            </div>
            <div className='personal-info mt-4'>
                <div className='my-account font-bold text-2xl ml-4'><i className="fa-solid fa-circle-user "></i>My Account</div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Name</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.name}</h2>
                    <hr />
                </div>
                <div className='personal pl-4 font-bold text-black text-2xl'><i className="fa-solid fa-circle-info"></i>Personal Information</div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Email</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.email}</h2>

                </div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Country</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.country}</h2>

                </div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">State</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.state}</h2>

                </div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Phone Number</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.phone}</h2>

                </div>
                <div className="pl-6 mt-1 ml-2">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">Address</h2>
                    <h2 className="title-font text-xl font-medium text-gray-900 mb-3">{userInfo.address}</h2>

                    <button className='font-bold bg-indigo-500 text-white p-2 rounded-lg'>Edit Info</button>
                </div>

            </div>

        </div>
    )
}

export default Profile
