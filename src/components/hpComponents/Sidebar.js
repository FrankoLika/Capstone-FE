import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Sidebar.css'
const Sidebar = ({ handleMode, darkMode }) => {
  const navigate = useNavigate()

  const handleExit = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <h1 className='m-3 fw-bold'>PostVerse</h1>
      <hr></hr>
      <div>
        <div className='my-3'>
          <Link to='/Homepage'>
            <button data-text="Awesome" class="button">
              <span className={!darkMode ? "text-white" : "null"}>&nbsp;Home&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Home&nbsp;</span>
            </button>
          </Link>
        </div>
        <div className='my-3'>
          <button data-text="Awesome" class="button">
            <span className={!darkMode ? "text-white" : "null"}>&nbsp;Search&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Search&nbsp;</span>
          </button>
        </div>
        <Link to='/profile'>
          <div className='my-3'>
            <button data-text="Awesome" class="button">
              <span className={!darkMode ? "text-white" : "null"}>&nbsp;Profile&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Profile&nbsp;</span>
            </button>
          </div>
        </Link>
        <div className='my-3'>
          <button data-text="Awesome" class="button" onClick={handleMode}>
            <span className={!darkMode ? "text-white" : "null"}>{!darkMode ? <span>&nbsp;Light&nbsp;</span> : <span>&nbsp;Dark&nbsp;</span>}</span>
            <span className="hover-text" aria-hidden="true">{!darkMode ? <span>&nbsp;Light&nbsp;</span> : <span>&nbsp;Dark&nbsp;</span>}</span>
          </button>
        </div>
        <div className='my-3'>
          <button data-text="Awesome" class="button" onClick={handleExit}>
            <span className={!darkMode ? "text-white" : "null"}>&nbsp;Exit&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Exit&nbsp;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar