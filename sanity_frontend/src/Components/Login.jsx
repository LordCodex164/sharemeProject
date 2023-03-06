import React from 'react'
import { useEffect, useState } from 'react'
import shareVideo from "../assets/share (1).mp4"
import Logo from "../assets/logo.png"
import ShareMeLogo from '../assets/logowhite.png'
import camera from '../assets/favicon.png'
import {FaGoogle} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from '../firebase'
import { client } from '../Client'
const Login = () => {
  
  const [user, setUser] = useState({})
  

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider)
  //signInWithRedirect(auth, provider)
}



const navigate = useNavigate()

const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
   setUser(currentUser)
  localStorage.setItem('user', JSON.stringify(currentUser))
     const {displayName, photoURL, uid} = currentUser
    const doc = {
      _id: uid,
      _type: 'user',
      userName: displayName,
      image: photoURL
    } 
    client.createIfNotExists(doc)
    .then(() => {
       navigate('/')
    })
    .catch((error) => {
      console.log(error)
    })
  })  


 useEffect(() => {
  unsubscribe()
 },[])



  return (
    <div className='flex flex-col justify-start items-center h-screen'>
       <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            muted
            controls={false}
            loop
            autoPlay
            className='h-full w-full object-cover'
          />
          <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-col bg-blackOverlay'>
              <div className='p-5'>
                  <img 
                    src={ShareMeLogo}
                    width= "120px"
                    alt="logo"
                  />
              </div>
              <div className='shadow-2xl'>
              <button onClick={googleSignIn} className='flex flex-row items-center justify-center bg-blue-400 py-2 px-2 rounded-md'>
                <FaGoogle className='mr-4 text-blue-500'/> Sign in to get started
              </button>
              </div>
              
          </div>
       </div>
    
    </div>
  )
}

export default Login