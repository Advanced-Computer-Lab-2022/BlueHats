import axios from "axios"
import { useState } from "react"
import { Navigate } from "react-router-dom"



const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(password)
  }

  const handleClick = async () =>
  {
    const data={password:password}
    axios({
      method:"PATCH",
      url:`/api/indTrainee/changePassword`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      alert("Your password has changed. Log in Now with the new password");
    })
    .catch(error => 
          {
          console.log(error)
      })
    
   
  }


  return (
    <form className="resetPassword" onSubmit={handleSubmit}>
      <h3>Reset Password</h3>

      <label>New password:</label>
      <input
       type ="text"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
       />

        <label>Confirm password:</label>
        <input
        type ="text"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        />

       <button onClick={handleClick} >Change Password</button> 
       {error && <div className="error>"> {error}</div>}
    </form>
  )
}

export default ResetPassword
