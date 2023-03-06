import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom/dist'
import {GoogleOAuthProvider} from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId={'1068137702275-0gl6lf9lmsmh3cg4laopqi7a34mo562a.apps.googleusercontent.com'}>
    <App />
  </GoogleOAuthProvider>
  </BrowserRouter>
  </React.StrictMode>
)
