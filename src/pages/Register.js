import React, { useState } from 'react'
import { Form, FormControl, Container, Row, Col, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Errors from '../components/Errors'
import '../styles/Login-Register.css'

const Register = () => {

    const [errors, setErrors] = useState()

    const [ifErrors, setIfErrors] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({})

    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/', { replace: true });
                }, 1000);
            } else {
                const errorResponse = await res.json();
                setErrors(errorResponse.errors)
                setIfErrors(true)
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/register', { replace: true });
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`
    }

    return (
        <>
            {isLoading ? <Loader />
                : <Container className='h-100'>
                    {ifErrors && <Errors errors={errors} />}
                    <Row className="row-register justify-content-center align-items-center">
                        <Col className='bg-white square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
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
                                    value={formData.username}
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
                                    value={formData.email}
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
                                    value={formData.password}
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
            }
        </>
    )
}

export default Register