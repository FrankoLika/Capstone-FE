import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl, Form } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

const AddPost = ({ setIsAddPostOpen }) => {

    const token = localStorage.getItem('jwt')
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const closeAddPost = () => {
        setIsAddPostOpen(false)
    }

    const [formData, setFormData] = useState({})
    const [file, setFile] = useState(null)

    const onChangeHandleFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (file) => {
        const fileData = new FormData()
        fileData.append('img', file)

        try {
            const response = await fetch("http://localhost:5050/posts/uploadImg", {
                method: 'POST',
                body: fileData
            })
            return await response.json()
        } catch {
            console.error('File upload error occurred')
        }
    }

    const submitPost = async (e) => {
        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const postFormData = {
                    ...formData,
                    img: uploadedFile.img
                }

                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/new/${userId}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(postFormData)
                });

                if (res.ok) {
                    console.log('Post inviato con successo');
                } else {
                    console.log('Errore durante linvio del post');
                }
                return await res.json()
            } catch (error) {
                console.error('Failed to save the post', error)
            }
        } else {
            console.error('Please select at least one file')
        }
    };


    return (
        <div className="modal show" style={{ display: 'block' }}>
            <Modal.Dialog centered size="lg">
                <Modal.Body>
                    <Form onSubmit={submitPost} encType='multipart/form-data'>
                        <FormControl
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Title"
                            className="m-1"
                        />
                        <FormControl
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Content"
                            className="m-1"
                        />
                        <FormControl
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            className="m-1"
                            name='img'
                            onChange={onChangeHandleFile}
                        />
                        <Button variant="primary" type='submit'>
                            Add Post
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="warning" onClick={closeAddPost}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default AddPost