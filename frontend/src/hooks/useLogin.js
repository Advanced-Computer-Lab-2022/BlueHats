// // import { useState } from 'react'
// // import { useAuthContext } from './useAuthContext'
// // import axios from "axios"

// // export const useLogin = () =>
// // {
// //     const[error,setError]=useState(null)
// //     const[isLoading,setIsLoading]=useState(null)
// //     const {dispatch} = useAuthContext()

// //     const login = async (username,password) => 
// //     {
// //         setIsLoading(true)
// //         setError(null)
        
// //         const response = await fetch('/api/user/login', {
// //             method: 'POST',
// //             headers: {'Content-Type': 'application/json'},
// //             body: JSON.stringify({ username, password })
// //           })
// //           const json = await response.json()
      
// //           if (!response.ok) {
// //             setIsLoading(false)
// //             setError(json.error)
// //           }
// //           if (response.ok) {
// //             // save the user to local storage
// //             localStorage.setItem('user', JSON.stringify(json))
// //             var loggedinUser = JSON.parse(localStorage.getItem('user'));
// //             const savedFlag = loggedinUser.flag

// //             // update loading state
           
// //             console.log("dina"+savedFlag)
// //             if(savedFlag == false)
// //             {
// //               window.location.href=`/changePass`
// //             }
// //             else
// //             {
// //               window.location.href=`/`
// //             }
// //             // update the auth context
// //             dispatch({type: 'LOGIN', payload: json})
      
// //             setIsLoading(false)
// //           }
// //         }
      
// //     return{login,isLoading,error}
// // }

// // // import { useState } from 'react'
// // // import {useIndTraineesContext} from './useIndTraineesContext'

// // // export const useLogin = () => {
// // //   const [error, setError] = useState(null)
// // //   const [isLoading, setIsLoading] = useState(null)
// // //   const { dispatch } = useIndTraineesContext()

// // //   const login = async (username, password) => {
// // //     setIsLoading(true)
// // //     setError(null)

// // //     const response = await fetch('/api/user/login', {
// // //       method: 'POST',
// // //       headers: {'Content-Type': 'application/json'},
// // //       body: JSON.stringify({ username, password })
// // //     })
// // //     const json = await response.json()

// // //     if (!response.ok) {
// // //       setIsLoading(false)
// // //       setError(json.error)
// // //     }
// // //     if (response.ok) {
// // //       // save the user to local storage
// // //       localStorage.setItem('user', JSON.stringify(json))

// // //       // update the auth context
// // //       dispatch({type: 'LOGIN', payload: json})

// // //       // update loading state
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   return { login, isLoading, error }
// // // }

// import { useState } from 'react'
// import { useAuthContext } from '../hooks/useAuthContext'
// import { useLogout } from "../hooks/useLogout"
// import * as React from 'react';
// import axios from "axios"

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


// const Login = () =>
// {
//     const[error,setError]=useState(null)
//     const[loading,isLoading]=useState(null)
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [open, setOpen] = React.useState(false);
//     const {dispatch} = useAuthContext()

//     const handleClose = () => 
//   {
    
//     window.location.href=`/changePassword`
//   }

//     const handleSubmit = async (e) => 
//     {
//       e.preventDefault()
//       setError(null);
//      // await signup(firstName,lastName,username,email,password,confirmPassword,gender)
//     }

//     const handleClick = async () =>
//     {
//       const response = await fetch('/api/user/login', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ username, password })
//       })
//       const json = await response.json()
  
//       if (!response.ok) {
//         isLoading(false)
//         setError(json.error)
//       }
//       if (response.ok) {
//         // save the user to local storage
//         localStorage.setItem('user', JSON.stringify(json))
//         var loggedinUser = JSON.parse(localStorage.getItem('user'));
//         const savedFlag = loggedinUser.flag

//         // // update loading state
       
//         // console.log("dina"+savedFlag)
//         if(savedFlag == "true")
//         {
//           setOpen(false)
//           window.location.href=`/`
//         }
//         else
//         {
//           setOpen(true)
//         }
        
//         // update the auth context
//         dispatch({type: 'LOGIN', payload: json})
  
//         isLoading(false)
//       }
//     }


//     return (
//           <form className="login" onSubmit={handleSubmit}>
//           <div className="title">
//           <h3>Log in</h3>
//           </div>
    
//           <label>Username:</label>
//           <input
//            type ="text"
//            onChange={(e) => setUsername(e.target.value)}
//            value={username}
//           />
    
//           <label>Password:</label>
//           <input
//            type ="password"
//            onChange={(e) => setPassword(e.target.value)}
//            value={password}
//           />
    
//           <button onClick={handleClick} >Log in</button>
//           {error && <div className = "error">{error}</div>}
            
//           <br />
//           <br />
    
//           <a className = "Forgot password" href = "/forgotPassword">
//                         Forgot Password?
//           </a>
    
//           <hr />
    
//           <a className = "Do not have an account? Sign up" href = "/signup">
//           Do not have an account? Sign up
//           </a>

//           <div>
//        <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Welcome"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//           Your password has changed. Log in Now with the new password!
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Login now</Button>
//         </DialogActions>
//       </Dialog>
//     </div> 
//         </form>
//       )
      
// }
// export default Login

// // import { useState } from 'react'
// // import {useIndTraineesContext} from './useIndTraineesContext'

// // export const useLogin = () => {
// //   const [error, setError] = useState(null)
// //   const [isLoading, setIsLoading] = useState(null)
// //   const { dispatch } = useIndTraineesContext()

// //   const login = async (username, password) => {
// //     setIsLoading(true)
// //     setError(null)

// //     const response = await fetch('/api/user/login', {
// //       method: 'POST',
// //       headers: {'Content-Type': 'application/json'},
// //       body: JSON.stringify({ username, password })
// //     })
// //     const json = await response.json()

// //     if (!response.ok) {
// //       setIsLoading(false)
// //       setError(json.error)
// //     }
// //     if (response.ok) {
// //       // save the user to local storage
// //       localStorage.setItem('user', JSON.stringify(json))

// //       // update the auth context
// //       dispatch({type: 'LOGIN', payload: json})

// //       // update loading state
// //       setIsLoading(false)
// //     }
// //   }

// //   return { login, isLoading, error }
// // }