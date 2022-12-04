import { useState } from "react"
import axios from "axios"
//import { useLogin } from "../hooks/useLogin"
//import {Navigate} from 'react-router-dom'

const Biography = () => {
  const [biography, setBiography] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => 
  {
    e.preventDefault()
    console.log(biography)
  }

  const handleClick = async () =>
  {
    const data={biography:biography}
    axios({
      method:"PATCH",
      url:`/api/instructor/updateProfile`,
      data:data,
      headers:{'Content-Type':'application/json'}
    })
    .then(() =>{
      setLoading(false)
      alert("Your biography has been updated");
    })
    .catch(error => 
          {
          console.log(error)
      })
    
   
  }

  return (
    <form className="EditBiography"onSubmit={handleSubmit}>
      <h3>Edit Biography</h3>

      <label>Biography:</label>
      <input
       type ="text"
       onChange={(e) => setBiography(e.target.value)}
       value={biography}
      />

      <button onClick={handleClick}>Update Biography</button>
      {error && <div className = "error">{error}</div>}
       
    </form>
  )
}

export default Biography
