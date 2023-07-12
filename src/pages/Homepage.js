import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/hpComponents/Sidebar'
import Posts from '../components/hpComponents/Posts'
import Profile from '../components/hpComponents/Profile'

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <Container fluid className={!darkMode ? "bg-dark text-white" : "bg-white"}>
      <Row>
        <Col xs={5} sm={5} md={5} lg={3} className='border-end'>
          <Sidebar handleMode={handleMode} darkMode={darkMode} />
        </Col>
        <Col xs={7} sm={7} md={7} lg={9} className='border-end'>
          <Profile />
          <Posts />
        </Col>
      </Row>

    </Container>
  )
}

export default Homepage