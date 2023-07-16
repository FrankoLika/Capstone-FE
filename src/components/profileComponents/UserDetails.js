import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

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
    navigate('/Homepage')
  }

  useEffect(() => {
    getUser()
  }, [])

  //follow following
  const token = localStorage.getItem('jwt')
  const decodedToken = jwtDecode(token);
  const mainProfileId = decodedToken.id;

  const handleFollow = async () => {
    try {
      if (id === mainProfileId) {
        alert("non puoi seguire te stesso")
      } else {                                              // /follow/userTofollow/userProfile
        const req = await fetch(`${process.env.REACT_APP_BASE_URL}/follow/${id}/${mainProfileId}`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          }
        });
      }
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const handleUnfollow = async () => {
    try {                                                 // /follow/userToUnfollow/userProfile
      const req = await fetch(`${process.env.REACT_APP_BASE_URL}/follow/${id}/${mainProfileId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
        }
      });
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

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
            {user.followers && user.followers.includes(mainProfileId) ? (
              <Button variant='danger' onClick={handleUnfollow}>Unfollow</Button>
            ) : (
              <Button variant='success' onClick={handleFollow}>Follow</Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default UserDetails