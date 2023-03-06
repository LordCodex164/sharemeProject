import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar, Feed, CreatePin, PinDetail, Search } from '../Components'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
     <div className='bg-gray-50'>
       <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     </div>
     <div className='h-full'>
     <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/category/:categoryId" exact element={<Feed />} />
          <Route path="/pin-detail/:pinId" exact element={<PinDetail user={user && user} />} />
          <Route path="/create-pin" exact element={<CreatePin user={user && user} key={user} />} />
          <Route path="/search" exact element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
    </Routes>
     </div>
    </div>
  )
}

export default Pins