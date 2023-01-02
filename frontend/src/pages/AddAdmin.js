import { useEffect } from "react"

// components
import AdminForm from "../components/AdminForm"
import { useAdminsContext } from "../hooks/useAdminsContext"

const NewAdmin = () => {
  const { admin, dispatch } = useAdminsContext()

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin')
      const json = await response.json()

      if (response.ok) 
      {
       dispatch({type: 'SET_ADMINS', payload: json})
      }
    }

    fetchAdmins()
}, [dispatch])

  return (
      <AdminForm />
  )
}
export default NewAdmin

// import { useState } from "react"
// import { useAdminsContext } from '../hooks/useAdminsContext'
// import axios from "axios"

// import * as React from 'react';
// import Radio from '@mui/material/Radio';
// import Button from '@mui/material/Button';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// const Admin = () => {
//   const { dispatch } = useAdminsContext()
//   const [firstName, setFirstname] = useState('')
//   const [lastName, setLastname] = useState('')
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [gender, setGender] = useState('')
//   const [error1, setError] = useState(null)
//   const [message, setMessage] = useState(null)
//   const [loading, setLoading] = useState(null)
//   const [open, setOpen] = React.useState(false);
//   const [emptyFields, setEmptyFields] = useState([])
//  // const {signup , error , isLoading } = useSignup()

//   const handleSubmit = async (e) => 
//   {
//     e.preventDefault()
//     setError(null);
//    // await signup(firstName,lastName,username,email,password,confirmPassword,gender)
//   }

//   const handleClick = async () =>
//   {
//     const admin = {firstName , lastName, username, email, password , gender}

//     const response = await fetch('/api/admin', {
//       method: 'POST',
//       body: JSON.stringify(admin),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const json = await response.json()

//     if (!response.ok) 
//     {
//       setError(json.error)
//       setEmptyFields(json.emptyFields)
//       setMessage(null)
//     }
//     else {
//       setEmptyFields([])
//       setError(null)
//       setFirstname('')
//       setLastname('')
//       setUsername('')
//       setEmail('')
//       setPassword('')
//       setGender('')
//       setError(null)
//       dispatch({type: 'CREATE_ADMIN', payload: json})
//       setMessage("A new admin have been added successfully ")
//     }
//   }


//   return (
//     <form className="admin" onSubmit={handleSubmit}>
                   
//       <div className="title">
//       <h3>New Admin</h3>
//       </div>
    
//       <label>First name :</label>
//       <input
//        type ="text"
//        onChange={(e) => setFirstname(e.target.value)}
//        placeholder="First name"
//        value={firstName}
//       />

//      <label>Last name :</label>
//       <input
//        type ="text"
//        onChange={(e) => setLastname(e.target.value)}
//        placeholder="Last name"
//        value={lastName}
//       />
    
//      <label>Username :</label>
//       <input
//        type ="text"
//        onChange={(e) => setUsername(e.target.value)}
//        placeholder="Username"
//        value={username}
//       />

//       <label>Email:</label>
//       <input
//        type ="text"
//        onChange={(e) => setEmail(e.target.value)}
//        placeholder="Email"
//        value={email}
//        />

//       <label>Password:</label>
//       <input
//        type ="password"
//        placeholder="Password"
//        onChange={(e) => setPassword(e.target.value)}
//        value={password}
//       />
//       <div className="info">
//       <label>Your password should consist of at least 8 characters including uppercase , lowercase and special character</label>
//       </div>

  
//     <FormControl>
//       <label id="demo-controlled-radio-buttons-group">Gender:</label>
//       <RadioGroup
//         row
//         aria-labelledby="demo-controlled-radio-buttons-group"
//         name="controlled-radio-buttons-group"
//         value={gender}
//         onChange={(e) => setGender(e.target.value)}
//       >
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//       </RadioGroup>
//     </FormControl>

      
//     <button onClick={handleClick}>Add Admin</button>

//     {error1 && <div className="error">  {error1}</div>}
//     {message && <div className="msg">  {message}</div>}

//     </form>
//   )
// }

// export default Admin
