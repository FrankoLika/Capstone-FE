import React, { useState } from 'react'
import { Form, FormControl, Container, Row, Col, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login-Register.css'

const Register = () => {
    const [formData, setFormData] = useState({})

    const navigate = useNavigate()
    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5050/register', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`
    }

    return (
        <Container className='h-100'>
            <Row className="row-register justify-content-center align-items-center">
                <Col className='bg-white shadow square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
                    <h2 className='m-3 fw-bold'>PostVerse</h2>
                    <hr></hr>
                    <Form onSubmit={register} className='m-3' style={{ maxWidth: "300px" }}>
                        <FormControl
                            onChange={(e) => setFormData({
                                ...formData,
                                username: e.target.value
                            })}
                            type='text'
                            placeholder='Username'
                            className='m-1'
                        >
                        </FormControl>
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
                            <b>Register</b>
                        </button>
                        <hr></hr>
                        <button className='glow-on-hover-gh mx-1 my-4 h-100' onClick={handleLoginWithGithub}>
                            <b>Login with GitHub</b>
                        </button>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center">
                <Col className='bg-white shadow square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
                    <div className='d-flex justify-content-around mt-3'>
                        <p>Do you have an account?</p>
                        <Link className='text-decoration-none text-info' to="/">Sign in</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register