import axios from "axios"
import { useState } from "react"
//import { useSignup } from "../hooks/useSignup"


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //const {signup , error , isLoading } = useSignup()

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(email)
  }

  const handleClick = async () =>
  {
    const data={email:email}
    axios({
      method:"POST",
      url:'/api/indTrainee/forgotPassword',
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      alert("Check your email to reset your password");
    })
    .catch(error => 
          {
          console.log(error)
          })
  }


  return (
    <form className="forgotPassword" onSubmit={handleSubmit}>
      <h3>Reset Password</h3>

      <label>Email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       value={email}
       />

       <button onClick={handleClick}>Change Password</button>
       {error && <div className="error>"> {error}</div>}
    </form>
  )
}

export default ForgotPassword
