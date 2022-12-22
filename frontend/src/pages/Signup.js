import { useState } from "react"
import axios from "axios"
import { useSignup } from "../hooks/useSignup"


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
 // const {signup , error , isLoading } = useSignup()

  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    setError(null);
   // await signup(firstName,lastName,username,email,password,confirmPassword,gender)
  }
  
  const handleClick = async () =>
  {
    // if(confirmPassword !== password)
    // {
    //   setError("Passwords do not match")
    // }
    // else
    // {
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
        //alert("Check your email to activate your account");
        setMessage("Check your email to activate your account")
      })
      .catch(error => 
            {
              setError(error.response.data.error)
            // console.log("hadwa "+ error1)
            })
    //}
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
       value={firstName}
      />

     <label>Last name :</label>
      <input
       type ="text"
       onChange={(e) => setLastname(e.target.value)}
       value={lastName}
      />
    
     <label>Username :</label>
      <input
       type ="text"
       onChange={(e) => setUsername(e.target.value)}
       value={username}
      />

      <label>Email:</label>
      <input
       type ="text"
       onChange={(e) => setEmail(e.target.value)}
       value={email}
       />

      <label>Password:</label>
      <input
       type ="password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
      />

      <label>Confirm Password:</label>
      <input
       type ="password"
       onChange={(e) => setConfirmPassword(e.target.value)}
       value={confirmPassword}
      />

      <label>Gender:</label>
      <input
       type ="text"
       onChange={(e) => setGender(e.target.value)}
       value={gender}
      />

          <div className="checkbox">
            <label>
            <input type="checkbox" id="agree" onChange={checkboxHandler} />
            <label> I agree to the <a className = "accept" href = "/login">
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

    </form>
  )
}

export default Signup
