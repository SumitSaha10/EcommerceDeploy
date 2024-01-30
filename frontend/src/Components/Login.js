import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { useToast } from '@chakra-ui/react'
const LogIn = () => {
    const toast = useToast()
    const [{ user }, dispatch] = useStateValue()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const showToast = () => {
        toast({
            title: "Logged in successfully",
            description: "Your logged in successfully",
            duration: 3000,
            isClosable: true,
            status: 'success',
            position: 'top'

        })
    }

    const login = async (e) => {
        e.preventDefault()
        const response = await fetch(`${window.location.origin}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const json = await response.json();
        if (json.success) {
            showToast()
            navigate('/')
            // localStorage.setItem('auth', json.authToken)
            dispatch({
                type: 'SET_USER',
                user: email,

            })
            localStorage.setItem("set-email", email)
            localStorage.setItem("auth", json.authToken);
        }
        else {
            alert('Failed to logged in')
        }
    }


    return (
        <div className='login'>
            <i class="fa-solid fa-circle-user"></i>
            <div className='login__container'>
                <h1 className='text-2xl font-bold'>Sign In</h1>
                <form>

                    <h5>Email</h5>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)} />
                    <button type='submit' className='login__signInButton' onClick={login}>Sign In</button>

                </form>
                <p>By continuing, you agree to ecommerce's Conditions of Use and Privacy Notice.</p>
                <p>Don't have an account <Link to='/signup' className='text-blue-500'>Create account</Link></p>
            </div>
        </div>
    )
}

export default LogIn
