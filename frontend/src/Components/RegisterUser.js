import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { useToast } from '@chakra-ui/react'


const RegisterUser = () => {
    const toast = useToast()
    const [{ user }, dispatch] = useStateValue()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country] = useState('India');
    const [state, setState] = useState();
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate()

    const showToast = () => {
        toast({
            title: "Account Created successfully",
            description: "Your account created successfully",
            duration: 3000,
            isClosable: true,
            status: 'success',
            position: 'top'

        })
    }

    const register = async (e) => {
        e.preventDefault()
        const response = await fetch(`${window.location.origin}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, country: country, state: state, phone: phone, address: address })
        });

        const json = await response.json();
        if (json.success) {
            showToast()
            navigate('/')
            // localStorage.setItem('auth', json.authToken)
            dispatch({
                type: 'SET_USER',
                user: email
            });
            localStorage.setItem("set-email", email)
            console.log(json.authToken)
            localStorage.setItem("auth", json.authToken);


        }
        else {
            alert('Failed to create your account')
        }
    }
    return (
        <div className='login'>
            <i className="fa-solid fa-circle-user mt-32"></i>
            <div className='login__container'>
                <h1 className='text-2xl font-bold'>Sign Up</h1>
                <form>
                    <h5>Name</h5>
                    <input type='text' value={name} onChange={event => setName(event.target.value)} />
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)} />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)} />
                    <h5>Country</h5>
                    <input type='text' value={country} />
                    <h5>State</h5>

                    <select id="country-state" name="country-state" value={state} onChange={e => setState(e.target.value)}>
                        <option value="">Select state</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Chhattisgarh">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                    <h5>Phone Number</h5>
                    <input type='text' value={phone} onChange={event => setPhone(event.target.value)} />
                    <h5>Address</h5>
                    <input type='text' value={address} onChange={event => setAddress(event.target.value)} />
                    <button type='submit' className='login__signInButton' onClick={register}>Create Account</button>

                </form>
                <p>By continuing, you agree to ecommerce's Conditions of Use and Privacy Notice.</p>

            </div>
        </div>
    )
}

export default RegisterUser
