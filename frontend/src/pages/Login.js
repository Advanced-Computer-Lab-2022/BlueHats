// import { useState } from "react"
// import { useLogin } from "../hooks/useLogin"
// import {Navigate} from 'react-router-dom'
// import { useAuthContext } from '../hooks/useAuthContext'

// const Login = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const {login,isLoading,error} = useLogin()
//   const { user } = useAuthContext()

//   const handleSubmit = async (e) => 
//   {
//     e.preventDefault()
//     await login(username,password)
//   }

//   const handleClick = async (e) => 
//   {
//     if(user)
//     {
//       var loggedinUser = JSON.parse(localStorage.getItem('user'));
//       const savedFlag = loggedinUser.flag
//       console.log("dee"+savedFlag)
//       if(savedFlag == false)
//       {
//         window.location.href=`/changePass`
//       }
//       else
//       {
//         window.location.href=`/`
//       }
//     }
//   }

//   return (
//     <form className="login" onSubmit={handleSubmit}>
//       <div className="title">
//       <h3>Log in</h3>
//       </div>

//       <label>Username:</label>
//       <input
//        type ="text"
//        onChange={(e) => setUsername(e.target.value)}
//        value={username}
//       />

//       <label>Password:</label>
//       <input
//        type ="password"
//        onChange={(e) => setPassword(e.target.value)}
//        value={password}
//       />

//       <button disabled={isLoading} onClick={handleClick} >Log in</button>
//       {error && <div className = "error">{error}</div>}
       
//       <br />
//       <br />

//       <a className = "Forgot password" href = "/forgotPassword">
//                     Forgot Password?
//       </a>

//       <hr />

//       <a className = "Do not have an account? Sign up" href = "/signup">
//       Do not have an account? Sign up
//       </a> 
//     </form>
//   )
// }

// export default Login

import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import * as React from 'react';
import axios from "axios"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () =>
{
    const[error,setError]=useState(null)
    const[loading,isLoading]=useState(null)
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {dispatch} = useAuthContext()

    
    const handleSubmit = async (e) => 
    {
      e.preventDefault()
      setError(null);
    
    }

    const handleClose = () => 
    {
       window.location.href=`/`
    }

    const handlePass = () => 
    {
      window.location.href=`/changePassword`
    }

    const handleClick = async () =>
    {
      isLoading(true)
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      })
      const json = await response.json()
  
      if (!response.ok) {
        isLoading(false)
        setError(json.error)
      }
      if (response.ok) 
      {

        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
        var loggedinUser = JSON.parse(localStorage.getItem('user'));
        const savedFlag = loggedinUser.flag

       
        if(savedFlag == "true")
        {
          setOpen(false)
          window.location.href=`/`
        }
        else
        {
          setOpen(true)
        }

        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
        // update loading state
        isLoading(false)
      }
    }


    return (
          <form className="login" onSubmit={handleSubmit}>
          <div className="title">
          <h3>Log in</h3>
          </div>
    
          <label>Username:</label>
          <input
           type ="text"
           onChange={(e) => setUsername(e.target.value)}
           value={username}
          />
    
          <label>Password:</label>
          <input
           type ="password"
           onChange={(e) => setPassword(e.target.value)}
           value={password}
          />
    
          <button disabled ={loading} onClick={handleClick} >Log in</button>
          {error && <div className = "error">{error}</div>}
            
          <br />
          <br />
    
          <a className = "Forgot password" href = "/forgotPassword">
                        Forgot Password?
          </a>
    
          <hr />
    
          <a className = "Do not have an account? Sign up" href = "/signup">
          Do not have an account? Sign up
          </a> 
        <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Welcome"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You are required to change your password for higher security
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='secondary' onClick={handlePass}>Change password</Button>
        </DialogActions>
      </Dialog>
    </div> 
        </form>
      )
      
}
export default Login

// import { useState } from 'react'
// import {useIndTraineesContext} from './useIndTraineesContext'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useIndTraineesContext()

//   const login = async (username, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('/api/user/login', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ username, password })
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json})

//       // update loading state
//       setIsLoading(false)
//     }
//   }

//   return { login, isLoading, error }
// }