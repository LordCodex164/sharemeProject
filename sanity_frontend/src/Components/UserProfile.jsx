import React, {useState, useEffect, useRef} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiOutlineLogout} from "react-icons/ai"
import {Route, Routes, Link, useNavigate, useParams } from 'react-router-dom'
import {Spinner} from './Spinner'
import MasonryLayout from './MasonryLayout'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import { BsGoogle } from 'react-icons/bs'
const UserProfile = () => {
  const randomImage = 'https://source.unsplash.com/1600x1900/?nature,photography,cats,flags,wallpaper,america,lions,cars'
  const {userId} = useParams()
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('')
  const [activeBtn, setActiveBtn] = useState('created')
 
  const navigate = useNavigate()
  const activeBtnStyles = 'bg-red-500 text-white rounded-full font-bold p-2 w-20 outline-none'
  const notActiveBtnStyles = 'bg-white text-black rounded-full font-bold p-2 w-20 outline-none'
  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query)
    .then((data) => {
      setUser(data[0])
    })
  },[userId])

  useEffect(() => {
    if(text === "created"){
      const createdPins = userCreatedPinsQuery(userId)
      console.log(createdPins)
      client.fetch(createdPins)
      .then((data) => {
        console.log(data)
        setPins(data)
      })
    }
    else{
      const savedPins = userSavedPinsQuery(userId)
      console.log(savedPins)
      client.fetch(savedPins)
      .then((data) => {
        console.log(data)
        setPins(data)
      })
    }
   
  },[text, userId])
   if(!user){
    return <Spinner message={"Loading User Profile"}/>
  }  

    return (
    <div className='relative pb-2 h-full justify-center items-center'>
     <div className='flex flex-col pb-5'>
       <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
             <img src={randomImage} className="h-370 2xl:h-510 shadow-lg w-full object-cover" alt="random-image"/>
            <img
              className='rounded-full w-20 h-20 shadow-xl -mt-10 object-cover'
              src={user.image}
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
               {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === user._id && (
                <button>
                  <AiOutlineLogout/>
                </button>
              )
              }
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
            Created
            </button>
            <button
            onClick={(e) => {
              setText(e.target.textContent)
              setActiveBtn("saved")
            }
            }
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}>
             Saved
            </button>
          </div>
          
          {pins?.length ? (
            <div className='px-2'>
            <MasonryLayout pins={pins}/>
          </div>
          ):
           (
             <div>
              No Pins Found
             </div>
          )
          }
       </div>
     </div>
    
    </div>
  )
}

export default UserProfile