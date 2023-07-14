import React from 'react'
import '../styles/Errors.css'
import { nanoid } from 'nanoid'

const Errors = ({ errors }) => {
  return (
    <div className='errors'>
      <div>
        {errors && errors.map((error) => {
          return <div key={nanoid()}>{error.msg.toUpperCase()}</div>
        })}
      </div>
    </div>
  )
}

export default Errors