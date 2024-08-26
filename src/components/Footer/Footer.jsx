import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
      <ul className='footer_categories'>
        <li><Link to='/posts/categories/Agriculture'>Agriculture</Link></li>
        <li><Link to='/posts/categories/Bussiness'>Bussiness</Link></li>
        <li><Link to='/posts/categories/Education'>Education</Link></li>
        <li><Link to='/posts/categories/Programming'>Programming</Link></li>
        <li><Link to='/posts/categories/Weather'>Weather</Link></li>
        <li><Link to='/posts/categories/Investment'>Investment</Link></li>
        <li><Link to='/posts/categories/Art'>Art</Link></li>
        <li><Link to='/posts/categories/Entertainment'>Entertainment</Link></li>
      </ul>
      <div className='footer_copyright'>
        <small>All Rights Reserver &copy; Copyright, Syeda Nousheen</small>
      </div>
      </div>
    </footer>
  )
}

export default Footer
