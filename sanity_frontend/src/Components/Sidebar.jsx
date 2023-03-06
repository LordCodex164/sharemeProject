import React, {useState, useEffect, useRef} from 'react'
import {HiMenu} from 'react-icons/hi'
import {Link, NavLink, useNavigate } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import Logo from '../assets/logo.png'
import { categories } from '../utils/data'
// import {IoiosArrowForward} from "react-icons/Io"
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import {AiOutlineLogout} from "react-icons/ai"

const Sidebar = ({user, closeToggle}) => {

  const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all ease-in-out capitalize'
  const isActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all font-extrabold border-r-2 border-black ease-in-out capitalize'
  const handleCloseSidebar = () => {
    if(closeToggle){
       closeToggle(false)
    }
  }

  const navigate = useNavigate()

  const logOut = async () => {
     const logoutHandler = await signOut(auth)
      if (logoutHandler) {
        navigate("/login")
      }
      else {
        navigate("/login")
      }
      
  }
  
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrollbar min-w-210 hide-scrollbar'>
     <div className='flex flex-col'>
       <Link 
       to="/"  
       onClick={handleCloseSidebar}
       className='flex px-5 gap-5 my-6 pt-1 w-190 items-center'>
        <img src={Logo} alt="logo" className="w-full"/>
       </Link>
       <div className='flex flex-col gap-5 links'>
         <NavLink
           to='/'
           className={ ({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
        >
          <RiHomeFill/>
          Home
        </NavLink>
        <h3 className='mt-2 px-5 text-base 2xl:text-xl '>
           Discover Categories
        </h3>
         {categories.slice(0, categories.length - 1).map((category) => (
          <NavLink to={`/category/${category.name}`} key={category.name} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
               <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" /> 
               {category.name}
          </NavLink>
         ))}
       </div>
     </div>
      {user && (
        <Link onClick={handleCloseSidebar} to={`/user-profile/${user.id}`}
         className="flex my-5 mb-3 gap-2 items-center p-2 bg-white rounded-lg mx-"
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt='user-profile'/>
          <p className='text-black'>{user.userName}</p>
  
        </Link>
      )
      }
      <div className='flex justify-center bg-white items-center shadow-md  '>
         
        <button onClick={logOut} className='bg-red-500 w-[90px] gap-2 flex flex-row items-center  text-white font-poppins px-2 py-3 rounded-md'>
        <AiOutlineLogout/> Logout 
        </button>
      </div>
    </div>
  )
}

export default Sidebar