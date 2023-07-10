import React, { useState } from 'react'
import { Form, FormControl, Container, Row, Col, } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'
import { Toast } from '../utilities/notifications'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login-Register.css'

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({})

    const successToast = new Toast("Login effettuato con successo!")
    const errorToast = new Toast("Login fallito")

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5050/login', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            const jwt = data.token
            localStorage.setItem('jwt', jwt);
            if (jwt) {
                successToast.success()
                setTimeout(() => {
                    navigate('/Homepage', { replace: true });
                }, 1000);
            } else {
                errorToast.warning();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`
    }

    return (
        <Container className='h-100'>
            <Row className="row-login justify-content-center align-items-center">
                <Col className='bg-white shadow square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
                    <h2 className='m-3 fw-bold'>PostVerse</h2>
                    <hr></hr>
                    <Form onSubmit={login} className='m-3' style={{ maxWidth: "300px" }}>
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
                        <button type='submit' className='glow-on-hover mx-1 my-4'>
                            <b>Login</b>
                        </button>
                        <hr></hr>
                        <button className='glow-on-hover-gh mx-1 my-4 h-100' onClick={handleLoginWithGithub}>
                            <b>Login with GitHub</b>
                        </button>
                    </Form>
                    <Toaster />
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center">
                <Col className='bg-white shadow square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
                    <div className='d-flex justify-content-around mt-3'>
                        <p>Don't have an account?</p>
                        <Link className='text-decoration-none text-info' to="/register">Sign up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login