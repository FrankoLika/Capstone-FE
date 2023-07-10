import React, { useState } from 'react'
import '../styles/Login.css'
import { Form, FormControl, Container, Row, Col, } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'
import { Toast } from '../utilities/notifications'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({})

    const successToast = new Toast("Login effettuato con successo!")
    const errorToast = new Toast("Login fallito")

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
            if (jwt) {
                successToast.success();
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
    return (
        <Container className='h-100'>
            <Row className="h-100 justify-content-center align-items-center">
                <Col className='bg-white shadow square border border-warning' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
                    <h3>Post Verse</h3>
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
                        <button type='submit' className='glow-on-hover mx-1 mt-3'>
                            <b>Login</b>
                        </button>
                    </Form>
                    <hr></hr>
                    <Toaster />
                </Col>
            </Row>
        </Container>
    )
}

export default Login