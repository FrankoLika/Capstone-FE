import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Button, FormControl, Form } from 'react-bootstrap';
import EditProfile from './EditProfile';

const Profile = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [user, setUser] = useState({})
  const [openEditProfile, setOpenEditProfile] = useState(false)

  const followers = user.followers;
  const followersCount = followers?.length ?? 0;

  const following = user.following;
  const followingCount = following?.length ?? 0

  const getUser = async () => {
    try {
      const req = await fetch(`http://localhost:5050/users/${id}`)
      const data = await req.json()
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditProfile = () => {
    setOpenEditProfile(true)
  }
  const backtohome = () => {
    navigate('/Homepage')
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div>
      <Button variant='warning' onClick={backtohome} className='m-3'>Home</Button>
      <div className='w-100 d-flex justify-content-center'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={user.avatar} />
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>
              Followers: {followersCount}
            </Card.Text>
            <Card.Text>
              Following: {followingCount}
            </Card.Text>
            <Button variant='success' onClick={handleEditProfile}>Edit</Button>
            {openEditProfile ? <EditProfile userId={user._id} email={user.email} username={user.username} setOpenEditProfile={setOpenEditProfile} /> : null}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Profile