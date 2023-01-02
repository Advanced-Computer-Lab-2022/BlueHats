import axios from "axios"
import { useState } from "react"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error1, setError] = useState(null)
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(password)
  }

  const handleClose = () => 
  {
    window.location.href=`/login`
  };

  const handleClick = async () =>
  {
    var userEmail = JSON.parse(localStorage.getItem('email'));
    const usedEmail = userEmail.email
    const data={email:usedEmail , password , confirmPassword}

    axios({
      method:"PATCH",
      url:`/api/user/resetPassword`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      //alert("Your password has changed. Log in Now with the new password");
      setOpen(true);
      localStorage.removeItem('email')
      setError(null)
    })
    .catch(error => 
          {
          setError(error.response.data.error)
          console.log(error)
      })
    
   
  }


  return (
    <form className="resetPassword" onSubmit={handleSubmit}>

      <div className="title">
      <h3>Reset Password</h3>
      </div>

      <label>New password:</label>
      <input
       type ="password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
       />

        <label>Confirm password:</label>
        <input
        type ="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        />

      <div className="info">
      <label>Your password should consist of at least 8 characters including uppercase , lowercase and special character</label>
      </div>

       <button onClick={handleClick} >Reset Password</button>

       {error1 && <div className="error">  {error1}</div>}

       <div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset your password"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your password has been reset. Log in Now with the new password!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color='secondary' onClick={handleClose}>Login now</Button>
        </DialogActions>
      </Dialog>
    </div>

    </form>
  )
}

export default ResetPassword
