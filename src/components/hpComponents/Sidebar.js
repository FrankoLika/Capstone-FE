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
    <div className='sidebar'>
      <h2 className='m-3 fw-bold'>
        <span className='text-warning'>Post</span><span className='text-success'>Verse</span>
        <hr></hr>
      </h2>
      <div>
        <div className='my-5'>
          <Link to='/Homepage'>
            <button data-text="Awesome" className="button">
              <span className={!darkMode ? "text-white" : "text-black"}>&nbsp;Home&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Home&nbsp;</span>
            </button>
          </Link>
        </div>
        <div className='my-5'>
          <button data-text="Awesome" className="button">
            <span className={!darkMode ? "text-white" : "null"}>&nbsp;Search&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Search&nbsp;</span>
          </button>
        </div>
        <Link to='/profile'>
          <div className='my-5'>
            <button data-text="Awesome" className="button">
              <span className={!darkMode ? "text-white" : "null"}>&nbsp;Profile&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;Profile&nbsp;</span>
            </button>
          </div>
        </Link>
        <div className='my-5'>
          <button data-text="Awesome" className="button" onClick={handleMode}>
            <span className={!darkMode ? "text-white" : "null"}>{!darkMode ? <span>&nbsp;Light&nbsp;</span> : <span>&nbsp;Dark&nbsp;</span>}</span>
            <span className="hover-text" aria-hidden="true">{!darkMode ? <span>&nbsp;Light&nbsp;</span> : <span>&nbsp;Dark&nbsp;</span>}</span>
          </button>
        </div>
        <div className='my-5'>
          <button data-text="Awesome" className="button" onClick={handleExit}>
            <span className={!darkMode ? "text-white" : "null"}>&nbsp;Exit&nbsp;</span>
            <span className="hover-text" aria-hidden="true">&nbsp;Exit&nbsp;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar