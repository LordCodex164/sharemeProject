import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../Client'
import MasonryLayout from "./MasonryLayout"
import {Spinner} from "./Spinner"
import { searchQuery, feedQuery } from '../utils/data'
const Feed = () => {
  const [pins, setPins] = useState(null) 
  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams() 
  useEffect(() => {
    setLoading(true)
       if(categoryId){
        const query = searchQuery(categoryId)
        client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
      }
     
       else {
       client.fetch(feedQuery)
         .then((data) => {
          setPins(data)
          setLoading(false)
         })
       }
   
     return () => {
       
     }
   }, [categoryId])
  if(loading) return <Spinner message={'we are adding new ideas to your feed'}/>
  if(!pins?.length) return <h2>No Pins Avaliable</h2>
    return (
     <div>
     {pins && <MasonryLayout pins={pins}/>}
    </div> 
    )
  
}

export default Feed