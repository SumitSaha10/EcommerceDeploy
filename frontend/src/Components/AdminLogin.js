import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const AdminLogin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const toast = useToast()

    //Function to show the toast
    const showToast = (title, description, duration, isClosable, status, position) => {
        toast({
            title: title,
            description: description,
            duration: duration,
            isClosable: isClosable,
            status: status,
            position: position

        })
    }

    //Function for login
    const login = async () => {
        try {
            const res = await fetch(`${window.location.origin}/api/admin90/loginforadmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, password: password })
            })
            const json = await res.json()
            if (json.success) {
                localStorage.setItem("authtokenadmin", json.authtoken)
                navigate("/admincreateproduct")
                showToast("Login Successful", "Your Login Successfully done", 2500, true, "success", "top")
            }
            else {
                showToast("Login Error", "Please Enter Correct Credentials", 2500, true, "error", "top")
            }
        } catch (error) {
            showToast("Internal server error", "Server is not responding", 2500, true, "error", "top")
        }
    }
    return (
        <div className='adminlogin mt-8'>
            <h2 className='text-center text-2xl'>Admin Panel</h2>
            <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full mt-10 md:mt-0">
                <h2 class="text-gray-900 text-xl font-medium title-font mb-5">Admin Login</h2>
                <div class="relative mb-4">
                    <label for="full-name" class="leading-7 text-sm text-gray-600">User Name</label>
                    <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={username} onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <div class="relative mb-4">
                    <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                    <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={login}>Login</button>
                <p class="text-xs text-gray-500 mt-3">Login to manage ecommerce website.</p>
            </div>
        </div>
    )
}

export default AdminLogin
