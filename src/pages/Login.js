import React, { useState } from 'react'
import '../styles/Login.css'
import { Form, FormControl } from 'react-bootstrap'
const Login = () => {
    const [formData, setFormData] = useState({})

    const login = async (e) => {
        e.preventDefault();
        try {
            const req = await fetch('http://localhost:5050/login', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await req.json()
            const jwt = data.token
            localStorage.setItem('jwt', jwt);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' h-100 d-flex align-items-center justify-content-center'>
            <div className='h-75 w-25 bg-white shadow rounded'>
                <h1 className='text-center mt-3 fst-italic fw-bold'>PostVerse</h1>
                <Form onSubmit={login} className='m-3'>
                    <FormControl
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                        type='email'
                        placeholder='Email'
                        className='m-1'
                    >
                    </FormControl>
                    <FormControl
                        onChange={(e) => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                        type='password'
                        placeholder='Password'
                        className='m-1'
                    >
                    </FormControl>
                    <button type='submit' className='glow-on-hover mx-1 mt-3'>
                        <b>Login</b>
                    </button>
                </Form>
                <hr></hr>
            </div>
        </div>
    )
}

export default Login