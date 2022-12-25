import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import {Navigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login,isLoading,error} = useLogin()

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    await login(email,password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       value={email}
      />

      <label>Password:</label>
      <input
       type ="text"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className = "error">{error}</div>}
       
      <br />
      <br />

      <a className = "Forgot password" href = "/forgotPassword">
                    Forgot Password?
      </a>

      <hr />

      <a className = "Do not have an account? Sign up" href = "/signup">
      Do not have an account? Sign up
      </a> 
    </form>
  )
}

export default Login
