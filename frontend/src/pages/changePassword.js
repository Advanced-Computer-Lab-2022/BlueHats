import axios from "axios"
import { useState , useEffect } from "react"
import { useLogout } from "../hooks/useLogout"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error1, setError] = useState(null)
  const [open, setOpen] = React.useState(false);
  const {logout} = useLogout()

  const handleClose = () => 
  {
    logout();
    window.location.href=`/login`
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(password)
  }

  const handleClick = async () =>
  {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const savedUsername = loggedinUser.username
    const data={username:savedUsername , password , confirmPassword}

    axios({
      method:"PATCH",
      url:`/api/user/changePassword`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      //alert("Your password has changed. Log in Now with the new password");
      setOpen(true);
    })
    .catch(error => 
          {
            setError(error.response.data.error)
            //setMessage(null)
          console.log(error)
      })
    
   
  }


  return (
    <form className="resetPassword" onSubmit={handleSubmit}>

    <div className="title">
    <h3>Change Password</h3>
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
      
      <button onClick={handleClick} >Change Password</button> 
      {error1 && <div className="error">  {error1}</div>}

      <div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Password changed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your password has changed. Log in Now with the new password!
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

export default  ChangePassword
