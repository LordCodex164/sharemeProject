import { useState, useEffect } from 'react'
import Home from './containers/Home'
import Login from './Components/Login'
import {Route, Routes} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from './utils/fetchUser'
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(fetchUser())
    if(!user){
      navigate('/login')
    }
  },[])

  return (
    <div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
