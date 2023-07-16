import React, { useState } from 'react'
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import Users from '../profileComponents/Users';
import '../../styles/Search.css'

const NavbarSearch = ({ users }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [inputUsers, setInputUsers] = useState([])
  const [showUsers, setShowUsers] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = () => {
    if (searchTerm !== "") {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setInputUsers(filteredUsers)
    }
  };

  const handleShowUsers = () => {
    setShowUsers(true)
  }
  const handleShowSearch = () => {
    setShowSearch(true)
  }

  return (
    <Container className='search'>
      <Row className='h-100'>
        <Col xs={12} sm={12} md={12} lg={12} className='border-bottom d-flex align-items-center'>
          <Form>
            <FormControl
              type='text'
              placeholder='Search user..'
              onClick={handleShowSearch}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            >
            </FormControl>
          </Form>
          {showSearch &&
            <Button className='mx-1 my-1 bg-success border-warning'
              onClick={() => {
                handleSearch()
                handleShowUsers()
              }}
            >
              Search
            </Button>
          }
        </Col>
      </Row>
      {showUsers && <Users filteredUsers={inputUsers} setShowUsers={setShowUsers} />}
    </Container>
  )
}

export default NavbarSearch