import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { nanoid } from 'nanoid';
import { ListGroupItem } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/Users.css'

const Users = ({ filteredUsers, setShowUsers }) => {

    const closeModal = () => {
        setShowUsers(false)
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block' }}
        >
            <Modal.Dialog centered size='lg'>
                <Modal.Body>
                    <ListGroup>
                        {filteredUsers.map((user) => {
                            return <div key={nanoid()} className='d-flex border-bottom justify-content-between'>
                                <div className='p-1'>
                                    <img src={user.avatar} className='w-25 rounded' alt='avatar' />
                                </div>
                                <Link to={`/user/${user._id}`} className='text-decoration-none'>
                                    <div className='p-1'>
                                        <ListGroupItem className='border-0 username' key={nanoid()}>{user.username}</ListGroupItem>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </ListGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="warning" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default Users