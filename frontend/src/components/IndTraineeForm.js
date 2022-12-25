import { useState, /*setCounter*/  } from 'react'
import { useIndTraineesContext } from '../hooks/useIndTraineesContext'
import {useNavigate} from 'react-router-dom'

const IndTraineeForm = () => {
  const { dispatch } = useIndTraineesContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [isPending, setIsPending] = useState(false)
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const indTrainee = {firstName, lastName, username,email, password,gender}
    setIsPending(true)

    const response = await fetch('/api/indTrainee', {
      method: 'POST',
      body: JSON.stringify(indTrainee),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() =>{
        setIsPending(false)
        navigate('/')
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
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
      dispatch({type: 'CREATE_INDTRAINEE', payload: json})
    }

  }

  return (
    <>
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Register!</h3>

      <label>First Name:</label>
      <input 
        type="text" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={firstName}
        className={emptyFields.includes('firstName') ? 'error' : ''} /*commented*/
        required
      />

      <label>Last Name:</label>
      <input 
        type="text" 
        onChange={(e) => setLastName(e.target.value)} 
        value={lastName}
        className={emptyFields.includes('lastName') ? 'error' : ''} /*commented*/
        required
      />

      <label>Username :</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
        className={emptyFields.includes('username') ? 'error' : ''} /*commented*/
        required
      />

      <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''} /*commented*/
        required
      />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        className={emptyFields.includes('password') ? 'error' : ''} /*commented*/
        required
      />

      {/* <label>Gender :</label>
      <select>
      <option value= "Select">Select</option>
        <option value= "Male">Male</option>
        <option value= "Female">Female</option>
      </select> */}

      <label>Gender:</label>
      <input 
        type="text" 
        onChange={(e) => setGender(e.target.value)} 
        value={gender} 
        className={emptyFields.includes('gender') ? 'error' : ''} /*commented*/
        required
      />
    
      {!isPending && <button>Register</button>}
      {isPending && <button disabled> registering ... </button>}
      {error && <div className="error">{error}</div>}
    </form>
    <a className = "Already have an account? Sign in" href = "/login">
    <button>Already have an account? Sign in</button>
    </a>
    </>
  )
}

export default IndTraineeForm 