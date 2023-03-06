import React, {
    useEffect, 
    useState, 
    useContext,
} 
from "react"
import {
    onAuthStateChanged,
} from "firebase/auth"
import {useNavigate} from "react-router-dom"
const AuthContext = React.createContext()

export const AuthProvider2 = ({children}) => {
   
    const [user, setUser] = useState({})

    useEffect(() => {

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
            if(doc) {
              navigate('/', {replace: true})
            }
            else {
              navigate("/Login")
            }
          })
        })
      
        unsubscribe()
      
        return () => {
          unsubscribe()
        }
       },[])
  
  return <AuthContext.Provider value={{
    user
    }}>
       {children}
  </AuthContext.Provider>
}

export const UseGlobalAuth = () => {
    return useContext(AuthContext)
}