import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row  place-content-evenly'>
      <NavLink className='font-serif text-white  px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300' to="/" >
        HOMEPAGE
      </NavLink>
      <NavLink className='font-serif text-white  px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300' to="/pastes">
       MY WORK
      </NavLink>


    </div>
  )
}

export default Navbar
