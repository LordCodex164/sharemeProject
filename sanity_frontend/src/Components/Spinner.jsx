import React,{useState} from 'react'
import {Discuss} from "react-loader-spinner"
export const Spinner = ({message}) => {    return (
    <div className='flex flex-col justify-center w-full h-full'>
   <Discuss
  visible={true}
  height="80"
  width="80"
  ariaLabel="comment-loading"
  wrapperStyle={{}}
  wrapperClass="comment-wrapper"
  color="#fff"
  backgroundColor="#F4442E"
   />
   <p>{message}</p>
    </div>
  )
}
