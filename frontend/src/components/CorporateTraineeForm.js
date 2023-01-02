import { useState, /*setCounter*/  } from 'react'
import { useCorporateTraineesContext } from '../hooks/useCorporateTraineesContext'

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

const CorporateTraineeForm = () => {
  const { dispatch } = useCorporateTraineesContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [corporate, setCorporate] = useState('')
  const [message, setMessage] = useState(null)
  const [error1, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
  }

  const handleClick = async () =>
  {
    const corporateTrainee = {firstName , lastName, username, email, password , gender , corporate}

    const response = await fetch('/api/corporateTrainee', {
      method: 'POST',
      body: JSON.stringify(corporateTrainee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setMessage(null)
    }
    else {
      setEmptyFields([])
      setError(null)
      setFirstName('')
      setLastName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setGender('')
      setCorporate('')
      dispatch({type: 'CREATE_CORPORATETRAINEE', payload: json})
      setMessage("A new corporate trainee have been added successfully ")
    }

  }

  return (
    <form className="corporateTrainee" onSubmit={handleSubmit}> 

      <div className="title">
        <h3>Add a New Corporate Trainee</h3>
      </div>

      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={firstName}
      />

      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLastName(e.target.value)} 
        value={lastName}
      />

      <label>Username :</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      />

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
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

    <FormControl>
      <label id="demo-controlled-radio-buttons-group">Corporate:</label>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={corporate}
        onChange={(e) => setCorporate(e.target.value)}
      >
        <FormControlLabel value="GUC" control={<Radio />} label="GUC" />
        <FormControlLabel value="AUC" control={<Radio />} label="AUC" />
        <FormControlLabel value="Google" control={<Radio />} label="Google" />
        <FormControlLabel value="Facebook" control={<Radio />} label="Facebook" />
      </RadioGroup>
    </FormControl>

    <button onClick={handleClick}>Add Corporate Trainee</button>

    {error1 && <div className="error">  {error1}</div>}
    {message && <div className="msg">  {message}</div>}

    </form>
  )
}

export default CorporateTraineeForm 