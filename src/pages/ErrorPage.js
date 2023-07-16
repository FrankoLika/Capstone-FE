import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Errorpage = () => {
  return (
    <div className='w-100 text-center mt-5'>
      <h1>Error Page</h1>
      <p>Oops! Something went wrong.</p>
      <Link to="/">
      <Button className='my-3'>Login</Button>
      </Link>
      <p>Or if you are logged in:</p>
      <Link to="/homepage">
      <Button className='my-2'>Homepage</Button>
      </Link>
    </div>
  )
}

export default Errorpage