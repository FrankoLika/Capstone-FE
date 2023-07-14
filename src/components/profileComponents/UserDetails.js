import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

const UserDetails = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const [user, setUser] = useState({})

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

  const backtohome = () => {
    navigate('/homepage')
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
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
      </Card.Body>
    </Card>
    <Button onClick={backtohome}>Home</Button>
    </div>
  )
}

export default UserDetails