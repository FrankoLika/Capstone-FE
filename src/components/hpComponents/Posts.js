import React, { useState, useEffect } from 'react'
import AddPost from '../postsComponents/AddPost'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



const Posts = ({ users }) => {

  const [isAddPostOpen, setIsAddPostOpen] = useState(false)
  const [posts, setPosts] = useState([])

  const [userPost, setUserPost] = useState(null)

  const handleAddPost = () => {
    setIsAddPostOpen(true)
  }

  const getPosts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`)
      const data = await res.json()
      setPosts(data)
    } catch (error) {

    }
  }

  const getUsernameById = (userId) => {
    const user = users.find(user => user._id === userId);
    return user ? user.username : '';
  };

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
        <button onClick={handleAddPost}>Add post</button>
        { isAddPostOpen && <AddPost setIsAddPostOpen={setIsAddPostOpen} /> }
      <div>
        <span>all posts </span>
        <span> seguiti</span>
      </div>
      <Container>
        <Row>
          {posts && posts.map((post) => {
            const username = getUsernameById(post.author);
            return (
              <Col key={nanoid()} sm={12} md={6} lg={4} className='mt-2'>
                <Card style={{ width: '14rem' }}>
                  <Card.Img variant="top" className='object-fit-cover' style={{ height: "200px" }} src={post.img} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                      {post.content}
                    </Card.Text>
                    <Link to={`/user/${post.author}`}>
                      <Button variant="primary">{username}</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>


  )
}

export default Posts