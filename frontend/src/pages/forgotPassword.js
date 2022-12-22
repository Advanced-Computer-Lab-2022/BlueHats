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
          setLoading(false)
          alert("Email is sent successfully")
      }

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
