import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/hpComponents/Sidebar'
import Posts from '../components/hpComponents/Posts'
import NavbarSearch from '../components/hpComponents/NavbarSearch'

const Homepage = () => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const req = await fetch(`${process.env.REACT_APP_BASE_URL}/users`)
    const data = await req.json()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const [darkMode, setDarkMode] = useState(true)

  const handleMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <Container fluid style={!darkMode ? {backgroundColor:"#101010", color:"white"} : {backgroundColor:"white"}}>
      <Row>
        <Col xs={4} sm={4} md={4} lg={3} style={{ height: "100vh" }}>
          <Sidebar handleMode={handleMode} darkMode={darkMode} />
        </Col>
        <Col xs={8} sm={8} md={8} lg={9} className='border-end border-start'>
          <NavbarSearch users={users} />
          <Posts />
        </Col>
      </Row>
    </Container>
  )
}

export default Homepage