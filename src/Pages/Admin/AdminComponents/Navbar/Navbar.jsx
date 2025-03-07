import React from 'react'
import './Navbar.css'
import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='nav-logo'><span className='maseno'>Maseno</span><span className='mart'>Mart</span></h1>
      <img src={navprofileIcon} className='nav-profile' alt="Profile" />
    </div>
  )
}

export default Navbar
