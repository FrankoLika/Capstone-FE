import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl, Form } from 'react-bootstrap';
import Loader from '../Loader'


const EditProfile = ({ userId, email, username, setOpenEditProfile }) => {

    const [formData, setFormData] = useState({})

    const [isLoading, setIsLoading] = useState(false);

    const [isAvatarOpen, setIsAvatarOpen] = useState(false)

    const [avatar, setAvatar] = useState("")


    const handleAvatar = () => {
        setIsAvatarOpen(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const res = await fetch(`http://localhost:5050/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    avatar: avatar
                })
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
                            <Button onClick={handleAvatar}>avatar</Button>
                            {isAvatarOpen ? <div>
                                <div className='d-flex align-items-center justify-content-around '>
                                    <Button onClick={() => {
                                        setAvatar('https://tse1.mm.bing.net/th?id=OIP.Ci0my8oDslQQ_jNQ7mFCYwHaFb&pid=Api&P=0&h=180')
                                        setIsAvatarOpen(false)
                                        }}>
                                        <img src="https://tse1.mm.bing.net/th?id=OIP.Ci0my8oDslQQ_jNQ7mFCYwHaFb&pid=Api&P=0&h=180" alt="Button Image" />
                                    </Button>
                                    <Button>b</Button>
                                    <Button>c</Button>
                                    <Button>d</Button>
                                </div>
                                <div className='d-flex align-items-center justify-content-around '>
                                    <Button>e</Button>
                                    <Button>f</Button>
                                    <Button>g</Button>
                                    <Button>h</Button>
                                </div>
                            </div>
                                : <Form onSubmit={handleSubmit}>
                                    <div>Username</div>
                                    <FormControl
                                        type="text"
                                        placeholder={username}
                                        className="m-1"
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            username: e.target.value
                                        })}
                                    />
                                    <div>Email</div>
                                    <FormControl
                                        type="email"
                                        placeholder={email}
                                        className="m-1"
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            email: e.target.value
                                        })}
                                    />
                                    <div>Password</div>
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        className="m-1"
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            password: e.target.value
                                        })}
                                    />
                                    <Button type="submit">Send</Button>
                                </Form>
                            }

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