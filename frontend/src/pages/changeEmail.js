import { useState } from "react"
import axios from "axios"
//import { useLogin } from "../hooks/useLogin"
//import {Navigate} from 'react-router-dom'

const ChangeEmail = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(email)
  }

  const handleClick = async () =>
  {
    var loggedinUser = JSON.parse(localStorage.getItem('user'));
    const savedUsername = loggedinUser.username
    const data={username:savedUsername , email}

    axios({
      method:"PATCH",
      url:`/api/instructor/changeEmail`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      alert("Your email has changed");
    })
    .catch(error => 
          {
          console.log(error)
      })
    
   
  }

  return (
    <form className="changeEmail"onSubmit={handleSubmit}>

      <div className="title">
      <h3>Change Email</h3>
      </div>

      <label>New email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       value={email}
      />

      <button onClick={handleClick}>Change Email</button>
      {error && <div className = "error">{error}</div>}
       
    </form>
  )
}

export default ChangeEmail
