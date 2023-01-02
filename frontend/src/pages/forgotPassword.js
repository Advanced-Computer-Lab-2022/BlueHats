import axios from "axios"
import { useState } from "react"

import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useSignup } from "../hooks/useSignup"


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error1, setError] = useState(null)
  const [open, setOpen] = React.useState(false);
  //const {signup , error , isLoading } = useSignup()

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(email)
  }

  const handleClose = () => 
  {
    setOpen(false)
  }

  const handleClick = async () =>
  {
    // const data={email:email}
    // axios({
    //   method:"POST",
    //   url:'/api/indTrainee/forgotPassword',
    //   data:data,
    //   headers:{'Content-Type':'application/json'}
    // })
    // .then(() =>{
    //   setLoading(false)
    //   alert("Check your email to reset your password");
    // })
    // .catch(error => 
    //       {
    //       console.log(error)
    //       })

    const response =await fetch('/api/user/forgotPassword',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email})
      })
  
      const json= await response.json()
  
      if(!response.ok){
          setLoading(false)
          setError(json.error)
      }
      if(response.ok){
          localStorage.setItem('email', JSON.stringify(json))
          setError(null)
          setLoading(false)
          setOpen(true);
          //alert("Email is sent successfully")
      }

  }


  return (
    <form className="forgotPassword" onSubmit={handleSubmit}>
      <div className="title">
      <h3>Reset Your Password</h3>
      </div>


      <label>Email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       value={email}
      />

      <div className="info">
      <label>Please enter your email address . You will receive a link to reset your password</label>
      </div>

       {/* <button onClick={handleClick}>Change Password</button> */}
       {/* <Stack direction="row" spacing={10}>
        <Button onClick ={handleClick}variant="contained" style={{ left: 100}} endIcon={<SendIcon />}>
          Send Email
        </Button>
       </Stack> */}
       <button onClick={handleClick}>Send Email </button>
       {error1 && <div className="error">  {error1}</div>}

       <div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          An email have been sent to you to reset your password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='secondary' onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>

    </form>
  )
}

export default ForgotPassword
