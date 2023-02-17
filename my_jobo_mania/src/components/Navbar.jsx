import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft,FaUserCircle,FaCaretDown} from 'react-icons/fa'
import { useState } from "react"
import {useAppContext} from '../context/appContext'
import Logo from './Logo'

function Navbar() {
  const[showLogout,setShowLogout] = useState(false)
  const {user,logOut,toggleSidebar} = useAppContext()
  
  return (
   <Wrapper>
    <div className='nav-center'>
      <button className='toggle-btn' onClick={toggleSidebar}>
        <FaAlignLeft />
      </button>
      <div>
        <Logo />
        <h3 className='logo-text'>Dashboard</h3>
      </div>
      <div className="btn-container">
        <button 
        className="btn"
        type='button'
       onClick={() => setShowLogout(!showLogout)} >
       <FaUserCircle />
       {user && user.name}
       <FaCaretDown />
        </button>
        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
          <button
            type="button" 
            className='dropdown-btn'
            onClick={logOut}
           >
               logout
          </button>
        </div>
      </div>
    </div>
   </Wrapper>
  )
}
export default Navbar