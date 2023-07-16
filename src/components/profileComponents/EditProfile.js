import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl, Form, Container, Row, Col, Card } from 'react-bootstrap';
import Loader from '../Loader'


const EditProfile = ({ userId, email, username, setOpenEditProfile }) => {

    const [formData, setFormData] = useState({})

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const res = await fetch(`http://localhost:5050/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setIsLoading(false)
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {isLoading ? <Loader />
                : <> <div className="modal show" style={{ display: "block", backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Modal.Dialog centered size="lg">
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <div className='mt-2'><b>Username:</b></div>
                                <FormControl
                                    type="text"
                                    placeholder={username}
                                    className="m-1"
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        username: e.target.value
                                    })}
                                />
                                <div className='mt-2'><b>Email:</b></div>
                                <FormControl
                                    type="email"
                                    placeholder={email}
                                    className="m-1"
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })}
                                />
                                <div className='mt-2'><b>Password:</b></div>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    className="m-1"
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })}
                                />
                                <Button variant='warning' type="submit" className='mt-2'>Send</Button>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="warning" onClick={() => setOpenEditProfile(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
                </>
            }
        </>
    )
}

export default EditProfile