import { useState } from "react"
import axios from "axios"

import * as React from 'react';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Signup = () => {
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [error1, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(null)
  const [agree, setAgree] = useState(false);
  const [open, setOpen] = React.useState(false);
 // const {signup , error , isLoading } = useSignup()

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    setError(null);
   // await signup(firstName,lastName,username,email,password,confirmPassword,gender)
  }
  
  const handleClose = () => 
  {
    setOpen(false)
  };

  const handleLink = () =>
  {
    setOpen(true)
  }
  const handleClick = async () =>
  {
      const data= {firstName ,lastName , username , email, password, confirmPassword,gender}
      const response = await axios({
        method:"POST",
        url:`/api/user/signup`,
        data:data,
        headers:{'Content-Type':'application/json'}
      })
      .then(() => 
      {
        setLoading(false)
        setMessage("Check your email to activate your account")
      })
      .catch(error => 
            {
              setError(error.response.data.error)
              setMessage(null)
            // console.log("hadwa "+ error1)
            })
  }

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
                   
      <div className="title">
      <h3>Sign up</h3>
      </div>
    
      <label>First name :</label>
      <input
       type ="text"
       onChange={(e) => setFirstname(e.target.value)}
       placeholder="First name"
       value={firstName}
      />

     <label>Last name :</label>
      <input
       type ="text"
       onChange={(e) => setLastname(e.target.value)}
       placeholder="Last name"
       value={lastName}
      />
    
     <label>Username :</label>
      <input
       type ="text"
       onChange={(e) => setUsername(e.target.value)}
       placeholder="Username"
       value={username}
      />

      <label>Email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Email"
       value={email}
       />

      <label>Password:</label>
      <input
       type ="password"
       placeholder="Password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
      />
      <div className="info">
      <label>Your password should consist of at least 8 characters including uppercase , lowercase and special character</label>
      </div>

      <label>Confirm Password:</label>
      <input
       type ="password"
       placeholder="Confirm password"
       onChange={(e) => setConfirmPassword(e.target.value)}
       value={confirmPassword}
      />

  
    <FormControl>
      <label id="demo-controlled-radio-buttons-group">Gender:</label>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>

      

    <div className="checkbox">
      <label>
        <input type="checkbox" id="agree" onChange={checkboxHandler} />
        <label> I agree to the <a className = "accept" onClick={handleLink}>
            Terms of Use and Privacy Policy
        </a> </label>
            
      </label>
    </div>

    <button onClick={handleClick} disabled={!agree}>Sign up</button>

        <br/><br/>
        <hr/>
  
    <a className = "AlreadyHaveAnAccount" href = "/login">
      Already have an account? Login
    </a> 

    {error1 && <div className="error">  {error1}</div>}
    {message && <div className="msg">  {message}</div>}

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
        {"Terms and conditions"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Hi
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      </Dialog>
    </div>

    </form>
  )
}

export default Signup
