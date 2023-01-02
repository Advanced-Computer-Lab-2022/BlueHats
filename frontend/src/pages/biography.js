import { useState } from "react"
import axios from "axios"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Biography = () => {
  const [biography, setBiography] = useState('')
  const [loading, setLoading] = useState(true)
  const [error1, setError] = useState(null)
  const [open, setOpen] = useState(false)


  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(biography)
  }

  const handleClose = () => 
  {
    window.location.href=`/editBiography`
  };

  const handleOkay = () => 
  {
    window.location.href=`/instructor/profile`
  };

  const handleClick = async () =>
  {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const savedUsername = loggedinUser.username
    const data={username:savedUsername , biography}

    axios({
      method:"PATCH",
      url:`/api/instructor/updateProfile`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      setError(null)
      setOpen(true)
    })
    .catch(error => 
          {
          setError(error.response.data.error)
          console.log(error)
      })
    
   
  }

  return (
    <form className="EditBiography"onSubmit={handleSubmit}>
      <div className="title">
      <h3>Edit Biography</h3>
      </div>

      <label>Biography:</label>
      <input
       type ="text"
       onChange={(e) => setBiography(e.target.value)}
       value={biography}
      />

      <button onClick={handleClick}>Update Biography</button>
      {error1 && <div className = "error">{error1}</div>}

      <div>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Biography updated!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         Your biography have been updated successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
       
    </form>
  )
}

export default Biography
