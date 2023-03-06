import React, {useState, useEffect, useRef} from 'react'
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth"
  
import { auth } from '../firebase'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from "react-icons/ai"
import {Route, Routes, Link, useNavigate } from 'react-router-dom'
import {Sidebar, UserProfile} from '../Components'
import { client } from '../Client'
import Pins from '../containers/Pins'
import logo from "../assets/logo.png"
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

const Home = () => {

  const scrollRef = useRef(null)
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const [user, setUser] = useState(null)
const navigate = useNavigate()
    const Logout = () => {
        signOut(auth)
        navigate("/Login")
    }

    const userInfo = fetchUser()
    const parsedInfo = JSON.parse(userInfo)
    useEffect(() => {
      const query = userQuery(parsedInfo?.uid)
      const data = client.fetch(query)
      
       data.then((items) => {
        setUser(items[0])
       })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    useEffect(() => {
      scrollRef.current.scrollTo(0,0)
    })
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out' >
       <div className='hidden md:flex h-screen flex-initial'>
       <Sidebar user={user} closeToggle={setToggleSidebar}/>
       </div>  
       <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full shadow-md  flex items-center flex-row justify-between'>
            <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
              <Link to={`user-profile/${user?._id}`}>
                <img src={logo} alt="share-meLogo" className='w-28 rounded-[100px]'/>
              </Link>
              <Link to={`user-profile/${user?._id}`}>
              <img src={`${user?.image}`} alt="share-meLogo" className='w-28 rounded-[100px]'/>
             </Link>
             </div>
             {!toggleSidebar && 
       <div className='bg-white fixed h-screen overflow-y-auto shadow-md animate-slide-in z-10  w-3/4'>
         <div className='flex justify-end absolute w-full items-center p-2'>
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
         </div>
         <Sidebar user={user} closeToggle={setToggleSidebar}/>
       </div>
       }
             </div>  
       <div className='pb-2 flex-1 h-screen overflow-y-scroll ' ref={scrollRef}>
         <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='*' element={<Pins user={user && user}/>}/>
         </Routes>
       </div>

    </div>
  )
}

export default Home