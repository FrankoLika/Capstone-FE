import React, { useState } from 'react'
import { Form, FormControl, Container, Row, Col, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import '../styles/Login-Register.css'

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState()

    const [ifErrors, setIfErrors] = useState(false)

    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        localStorage.clear();

        try {
            const res = await fetch('http://localhost:5050/login', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            setErrors(data.message)

            const jwt = data.token
            if (jwt) {
                localStorage.setItem('jwt', jwt);
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/Homepage', { replace: true });
                }, 1000);
            } else {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                setIfErrors(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/github`
    }

    return (
        <>
            {isLoading ? <Loader />
                : <Container className='h-100'>
                    {
                        ifErrors && <div className='d-flex justify-content-center text-danger mt-3'>
                            <div>{errors}</div>
                        </div>
                    }
                    <Row className="row-login justify-content-center align-items-center">
                        <Col className='bg-white square border' xs={10} sm={8} md={6} lg={4} style={{ maxWidth: "300px" }}>
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
                                    <b>Login</b>
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
                                <p>Don't have an account?</p>
                                <Link className='text-decoration-none text-info' to="/register">Sign up</Link>
                            </div>
                        </Col>
                    </Row>

                </Container>
            }
        </>
    )
}

export default Login